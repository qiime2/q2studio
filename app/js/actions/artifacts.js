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
        const { connection: { uri, secretKey } } = getState();
        const url = `http://${uri}/api/workspace/artifacts`;
        const method = 'GET';
        fetchAPI(secretKey, method, url)
        .then((json) => {
            json.artifacts.forEach(artifact => dispatch(newArtifact(artifact)));
        })
        .then(() => dispatch(actions.checkTypes()));
    };
};

export const refreshVisualizations = () => {
    return (dispatch, getState) => {
        dispatch(clearArtifacts());
        const { connection: { uri, secretKey } } = getState();
        const url = `http://${uri}/api/workspace/visualizations`;
        const method = 'GET';
        fetchAPI(secretKey, method, url)
        .then((json) => {
            json.visualizations.forEach(viz => dispatch(newVisualization(viz)));
        });
    };
};
