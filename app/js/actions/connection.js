import actions from './index';
import { makeB64Digest } from '../util/auth';


const establishConnectionHidden = (uri, secretKey) => ({
    type: 'ESTABLISH_CONNECTION',
    uri,
    secretKey
});

const establishAvailableAPIList = (availableApis) => ({
    type: 'ESTABLISH_API_LIST',
    availableApis
});

export const successfullyConnected = (result) => ({
    type: 'SUCCESFULLY_CONNECTED',
    result
});

export const updateConnectionStatus = (status) => ({
    type: 'UPDATE_STATUS',
    status
});


const shakeHandsWithServer = () => {
    return (dispatch, getState) => {
        dispatch(updateConnectionStatus('Validating credentials'));
        const { connection: { uri, availableApis, secretKey } } = getState();
        const url = `http://${uri.split('/')[0]}${availableApis[0]}`;
        const method = 'POST';
        const requestTime = Date.now();
        const body = JSON.stringify({});
        const digest = makeB64Digest(secretKey, method, url, requestTime, body);

        fetch(url, {
            method,
            headers: new Headers({
                Authorization: `HMAC-SHA256 ${digest}`,
                'Content-Type': 'application/json',
                'X-QIIME-Timestamp': requestTime
            }),
            body
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(successfullyConnected(false));
                throw Error(response.statusText);
            }
            return response;
        })
        .then(() => dispatch(actions.loadPlugins()));
    };
};

export const establishConnection = (uri, secretKey) => {
    return (dispatch, getState) => {
        dispatch(establishConnectionHidden(uri, secretKey));
        const { connection } = getState();
        fetch(`http://${connection.uri}`, {
            method: 'GET'
        })
        .then((response) => (response.json()))
        .then((json) => dispatch(establishAvailableAPIList(json.available)))
        .then(() => dispatch(shakeHandsWithServer()));
    };
};
