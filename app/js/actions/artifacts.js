import { makeB64Digest } from '../util/auth';

export const newArtifact = (artifact) => ({
    type: 'NEW_ARTIFACT',
    artifact
});

export const expectingArtifact = () => ({
    type: 'EXPECTING_ARTIFACT'
});

export const removedArtifact = (uuid) => ({
    type: 'DELETE_ARTIFACT',
    uuid
});

export const deleteArtifact = (uuid) => {
    return (dispatch, getState) => {
        const { artifacts, connection: { uri, availableApis, secretKey } } = getState();
        const artifact = artifacts.find(a => a.uuid === uuid);
        const url = `http://${uri.split('/')[0]}${availableApis[0]}${artifact.uri}`;
        const method = 'DELETE';
        const timestamp = Date.now();
        const body = JSON.stringify({
            artifact
        });
        const digest = makeB64Digest(secretKey, method, url, timestamp, body);
        fetch(url, {
            method,
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
                dispatch(removedArtifact(uuid));
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
