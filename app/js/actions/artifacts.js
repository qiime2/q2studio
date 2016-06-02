import fetch from 'isomorphic-fetch';
import es6Promise from 'es6-promise';

import actions from './index';

es6Promise.polyfill();

export const newArtifact = (artifact) => ({
    type: 'NEW_ARTIFACT',
    artifact
});

export const linkInputArtifact = (plugin, workflow, input, artifact) => ({
    type: 'LINK_INPUT_ARTIFACT',
    plugin,
    workflow,
    input,
    artifact
});

export const expectingArtifact = () => ({
    type: 'EXPECTING_ARTIFACT'
});

export const hiddenDeleteArtifact = (uuid) => ({
    type: 'DELETE_ARTIFACT',
    uuid
});

export const deleteArtifact = (uuid) => {
    return (dispatch, getState) => {
        const { artifacts, connection: { uri, availableApis, secretKey } } = getState();
        const httpVerb = 'DELETE';
        const timestamp = Date.now();
        const artifact = artifacts.filter(a => a.uuid === uuid)[0];
        const body = JSON.stringify({
            artifact
        });
        const digest = actions.makeB64Digest(secretKey, httpVerb, timestamp, body);
        fetch(`http://${uri.split('/')[0]}${availableApis[0]}${artifact.uri}`, {
            method: httpVerb,
            headers: new Headers({
                Authorization: `HMAC-SHA256 ${digest}`,
                'Content-Type': 'application/json',
                'X-QIIME-Timestamp': timestamp
            }),
            body
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            if (json.success) {
                dispatch(hiddenDeleteArtifact(uuid));
            }
        });
    };
};

export const loadArtifacts = () => {
    return (dispatch, getState) => {
        const { connection: { uri, availableApis } } = getState();
        fetch(`http://${uri.split('/')[0]}${availableApis[0]}artifacts`, {
            method: 'GET'
        })
        .then((response) => (response.json()))
        .then((json) => {
            json.artifacts.map(artifact => (
                dispatch(newArtifact(artifact))
            ));
        });
    };
};

export const refreshArtifacts = () => {
    return (dispatch, getState) => {
        const { artifacts, connection: { uri, availableApis } } = getState();
        fetch(`http://${uri.split('/')[0]}${availableApis[0]}artifacts`, {
            method: 'GET'
        })
        .then((response) => (response.json()))
        .then((json) => {
            json.artifacts.map(a0 => {
                for (const artifact of artifacts) {
                    if (artifact.uuid === a0.uuid) {
                        return false;
                    }
                }
                dispatch(newArtifact(a0));
                return true;
            });
        });
    };
};
