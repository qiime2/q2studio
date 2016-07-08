// remote.app.getPath('home') breaks redux-electron-store/webpack as the
// renderer side is trying to be imported into the main process code
const initialState = '';

const directoryReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'DIRECTORY_CHANGE': {
        return action.directory;
    }
    default:
        return state;
    }
};

export default directoryReducer;
