import { fetchAPI } from '../util/auth';

const clearWindowStateWithId = (id) => ({
    type: 'CLEAR_WINDOW_STATE',
    id
});

export const clearWindowState = (id) => {
    return (dispatch, getState) => {
        const { connection: { secretKey, uri }, windowState } = getState();
        if (windowState[id]) {
            const focusWindow = windowState[id];
            Object.keys(focusWindow).forEach(key => {
                fetchAPI(secretKey, 'DELETE', `http://${uri}/api/workspace/view/${key}`);
            });
            dispatch(clearWindowStateWithId(id));
        }
        return true;
    };
};
