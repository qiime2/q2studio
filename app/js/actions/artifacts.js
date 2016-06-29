import actions from './';
import { fetchAPI } from '../util/auth';

export const newArtifact = (artifact) => ({
    type: 'NEW_ARTIFACT',
    artifact
});

export const newVisualization = (visualization) => ({
    type: 'NEW_VISUALIZATION',
    visualization
});

export const expectingArtifact = () => ({
    type: 'EXPECTING_ARTIFACT'
});

export const removedArtifact = (uuid) => ({
    type: 'DELETE_ARTIFACT',
    uuid
});

export const removedVisualization = (uuid) => ({
    type: 'DELETE_VISUALIZATION',
    uuid
});

export const clearArtifacts = () => ({
    type: 'CLEAR_ARTIFACTS'
});

export const deleteArtifact = (uuid, type) => {
    return (dispatch, getState) => {
        const {
            artifacts: { artifacts, visualizations },
            connection: { uri, availableApis, secretKey }
        } = getState();
        let item;
        if (type === 'artifact') {
            item = artifacts.find(a => a.uuid === uuid);
        } else if (type === 'visualization') {
            item = visualizations.find(a => a.uuid === uuid);
        }
        const url = `http://${uri.split('/')[0]}${availableApis[0]}${item.uri}`;
        const method = 'DELETE';
        const timestamp = Date.now();
        const body = JSON.stringify({
            item,
            type
        });
        fetchAPI(secretKey, method, url, timestamp, body)
        .then((json) => {
            if (json.success) {
                if (type === 'artifact') {
                    dispatch(removedArtifact(uuid));
                } else if (type === 'visualization') {
                    dispatch(removedVisualization(uuid));
                }
            }
        })
        .then(() => dispatch(actions.refreshValidation()));
    };
};


export const refreshArtifacts = () => {
    return (dispatch, getState) => {
        dispatch(clearArtifacts());
        const { artifacts, connection: { uri, secretKey }, currentDirectory } = getState();
        const path = encodeURIComponent(currentDirectory);
        const url = `http://${uri}/workspace/api/artifacts`;
        const method = 'GET';
        const timestamp = Date.now();
        fetchAPI(secretKey, method, url, timestamp, undefined)
        .then((json) => {
            json.artifacts.map(a0 => {
                for (const artifact of artifacts.artifacts) {
                    if (artifact.uuid === a0.uuid) {
                        return false;
                    }
                }
                dispatch(newArtifact(a0));
                return true;
            });
            json.visualizations.map(v0 => {
                for (const artifact of artifacts.visualizations) {
                    if (artifact.uuid === v0.uuid) {
                        return false;
                    }
                }
                dispatch(newVisualization(v0));
                return true;
            });
        })
        .then(() => dispatch(actions.refreshValidation()));
    };
};
