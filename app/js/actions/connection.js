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

export const successfullyConnected = (result) => ({
    type: 'SUCCESFULLY_CONNECTED',
    result
});

export const updateConnectionStatus = (status) => ({
    type: 'UPDATE_STATUS',
    status
});

const makeB64Digest = (secretKey, httpVerb, requestTime, body = JSON.stringify({})) => {
    const byteArray = CryptoJS.enc.Base64.parse(secretKey);
    const message = [
        httpVerb,
        window.location.origin,
        requestTime,
        'application/json',
        body.length
    ];

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, byteArray);
    message.map(value => hmac.update(value.toString()));
    const hash = hmac.finalize().toString(CryptoJS.enc.Base64);

    return hash;
};

const shakeHandsWithServer = () => {
    return (dispatch, getState) => {
        dispatch(updateConnectionStatus('Validating credentials'));
        const { connection: { uri, availableApis, secretKey } } = getState();
        const httpVerb = 'POST';
        const requestTime = Date.now();
        const body = JSON.stringify({});
        const digest = makeB64Digest(secretKey, httpVerb, requestTime, body);

        fetch(`http://${uri.split('/')[0]}${availableApis[0]}`, {
            method: httpVerb,
            headers: new Headers({
                Authorization: `HMAC-SHA256 ${digest}`,
                'Content-Type': 'application/json',
                'Request-Date': requestTime
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
