import { Map as ImmutableMap } from 'immutable';

const initialState = {
    0: {
        name: 'table',
        uuid: 'f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f',
        type: 'FeatureTable[Frequency]'
    },
    1: {
        name: 'phylogeny',
        uuid: '908dece5-db23-4562-ad03-876bb5750145',
        type: 'Phylogeny'
    }
};

const artifacts = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_ARTIFACT': {
        const nextState = ImmutableMap({
            name: action.artifact.name,
            uuid: action.artifact.uuid,
            type: action.artifact.type
        });
        return state.set(action.artifact.id, nextState);
    }
    case 'DELETE_ARTIFACT': {
        // TODO, make it actually do something
        const newState = ImmutableMap(state);
        return newState.delete(action.id).toJS();
    }
    default:
        break;
    }
    return state;
};

export default artifacts;
