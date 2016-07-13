import { spawn } from 'child_process';
import path from 'path';

import { app, BrowserWindow, ipcMain as ipc } from 'electron';
import which from 'which';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;


const startRestAPI = (callback) => {
    // find the conda python and use that to infer the conda bin directory
    // which needs to be reapplied to the front of our path so that subprocess
    // spawns work correctly.
    const python = which.sync('python', { all: true })
                        .find(binaryPath => binaryPath.search('conda') !== -1);
    const condaBin = path.dirname(python);

    const api = spawn('python', ['-u', '-m', 'qiime_studio'], {
        env: {
            ...process.env,
            // prepend conda bin to PATH
            PATH: `${condaBin}:${process.env.PATH}`
        }
    });

    let started = false;
    api.stdout.on('data', (data) => {
        if (!started) {
            started = true;
            callback.apply(null, data.toString('utf8').split(' '));
        } else {
            process.stdout.write(`API: ${data}`);
        }
    });

    api.stderr.on('data', (data) => {
        process.stderr.write(`API (error): ${data}`);
    });

    api.on('close', (code) => {
        process.stdout.write(`API process exited with code ${code}`);
    });
};

const makeURL = (port, secretKey) => {
    const secret = encodeURIComponent(secretKey);
    const frag =
        `#type=ESTABLISH_CONNECTION&uri=localhost%3A${port}&secret_key=${secret}`;
    if (process.env.NODE_ENV === 'development') {
        return `http://localhost:4242/${frag}`;
    }
    return `file://${__dirname}/index.html${frag}`;
};

const createWindow = () => {
    // Create the browser window.
    win = new BrowserWindow({ width: 1024, height: 800 });

    startRestAPI((port, secret) => win.loadURL(makeURL(port, secret)));

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
};

// these can be combined once we have the central store as we can just setup
// a url that fetches the state like a normal router route, and no data at all will
// need to be passed along in this window opening, as we'll have store access

ipc.on('open-job-page', (event, data) => {
    const jobWindow = new BrowserWindow({ parent: win });
    let url = `file://${__dirname}/index.html#job/${data.uuid}`;
    if (process.env.NODE_ENV === 'development') {
        url = `http://localhost:4242/#job/${data.uuid}`;
    }
    jobWindow.loadURL(url);
    jobWindow.webContents.once('dom-ready', () => {
        jobWindow.webContents.send('pass-job-data', data);
    });
});

ipc.on('open-artifact-page', (event, data) => {
    const artifactWindow = new BrowserWindow({ parent: win });
    let url = `file://${__dirname}/index.html#artifact/${data.uuid}`;
    if (process.env.NODE_ENV === 'development') {
        url = `http://localhost:4242/#artifact/${data.uuid}`;
    }
    artifactWindow.loadURL(url);
    artifactWindow.webContents.once('dom-ready', () => {
        artifactWindow.webContents.send('pass-artifact-data', data);
    });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
