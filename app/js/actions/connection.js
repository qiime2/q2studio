import fetch from 'isomorphic-fetch';
import es6Promise from 'es6-promise';
import CryptoJS from 'crypto-js';

import actions from './index';

es6Promise.polyfill();

const establishConnectionHidden = (uri, secretKey) => ({
    type: 'ESTABLISH_CONNECTION',
    uri,
    secretKey
});

const establishAvailableAPIList = (availableApis) => ({
    type: 'ESTABLISH_API_LIST',
    availableApis
});

const alertReducerOfConnection = () => ({
    type: 'HANDSHAKE_SERVER'
});

export const successfullyConnected = (result) => ({
    type: 'SUCCESFULLY_CONNECTED',
    result
});

const updateConnectionStatus = (status) => ({
    type: 'UPDATE_STATUS',
    status
});

const shakeHandsWithServer = () => {
    return (dispatch, getState) => {
        dispatch(alertReducerOfConnection());
        const { connection: { uri, availableApis, secretKey } } = getState();
        const byteArray = CryptoJS.enc.Base64.parse(secretKey);
        const requestTime = Date.now();
        const message = ['POST', window.location.origin, requestTime, 'application/json', 0];
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, byteArray);
        for (let i = 0; i < message.length; i++) {
            hmac.update(message[i].toString());
        }
        const hash = hmac.finalize().toString(CryptoJS.enc.Base64);

        fetch(`http://${uri.split('/')[0]}${availableApis[0]}`, {
            method: 'POST',
            headers: new Headers({
                Authorization: `HMAC-SHA256 ${hash}`,
                'Content-Type': 'application/json',
                'Request-Date': requestTime
            })
        })
        .then((response) => {
            if (!response.ok) {
                dispatch(successfullyConnected(false));
                throw Error(response.statusText);
            }
            return response;
        })
        .then(() => dispatch(updateConnectionStatus('Fetching Plugins')))
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
        .then((json) => (dispatch(establishAvailableAPIList(json.available))))
        .then(() => (dispatch(shakeHandsWithServer())));
    };
};
