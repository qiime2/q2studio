import { spawn } from 'child_process';
import path from 'path';

import { app, BrowserWindow } from 'electron';
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

    const api = spawn('python', ['-m', 'qiime_studio'], {
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
            console.log(`API: ${data}`); // eslint-disable-line no-console
        }
    });

    api.stderr.on('data', (data) => {
        console.error(`API (error): ${data}`); // eslint-disable-line no-console
    });

    api.on('close', (code) => {
        console.log(`API process exited with code ${code}`); // eslint-disable-line no-console
    });
};

const makeURL = (port, secretKey) => {
    const secret = encodeURIComponent(secretKey);
    const frag =
        `#type=ESTABLISH_CONNECTION&uri=localhost%3A${port}%2Fapi%2F&secret_key=${secret}`;
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
