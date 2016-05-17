import fetch from 'isomorphic-fetch';
import es6Promise from 'es6-promise';
import { enc, HmacSHA256 as hmacSHA256 } from 'crypto-js';

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
        const byteArray = enc.Base64.parse(secretKey);

        const hmac = hmacSHA256('test', byteArray).toString(enc.Base64);

        fetch(`http://${uri.split('/')[0]}${availableApis[0]}`, {
            method: 'POST',
            headers: new Headers({
                Authorization: `HMAC-SHA256 ${hmac}`,
                'Content-Type': 'application/json',
                'Request-Date': Date.now()
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
