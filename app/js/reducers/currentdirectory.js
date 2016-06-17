import { remote } from 'electron';

const initialState = remote.app.getPath('home');

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
