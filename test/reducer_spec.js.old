import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../app/js/reducers';
import actions from '../app/js/actions';

const doNothingAction = {
    type: 'DO_NOTHING'
}

describe('reducer', () => {
    it('contains a plugins reducer', () => {
        const state = reducer(undefined, doNothingAction);
        expect(state).to.include.key('plugins');
    });

    it('contains an artifacts reducer', () => {
        const state = reducer(undefined, doNothingAction);
        expect(state).to.include.key('artifacts');
    });

    it('contains a connection reducer', () => {
        const state = reducer(undefined, doNothingAction);
        expect(state).to.include.key('connection');
    });

    it('contains a jobs reducer', () => {
        const state = reducer(undefined, doNothingAction);
        expect(state).to.include.key('jobs');
    });

    it('handles NEW_ARTIFACT', () => {
        const artifact = {
            name: 'table',
            uuid: 'f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f',
            type: 'FeatureTable[Frequency]'
        };
        const action = actions.newArtifact(artifact);
        const state = reducer(undefined, action);

        expect(state.artifacts).to.not.be.empty;
        expect(state.artifacts).includes.something.that.eql(artifact);
    });

    it('handles DELETE_ARTIFACT', () => {
        const initialState = {
            artifacts: []
        };
        const artifact = {
            name: 'table',
            uuid: 'f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f',
            type: 'FeatureTable[Frequency]'
        };
        let action = actions.newArtifact(artifact);
        const state = reducer(initialState, action);
        action = actions.removedArtifact(artifact.uuid);

        deepFreeze(state);
        const nextState = reducer(state, action);
        expect(nextState.artifacts).to.not.include.something.that.eql(artifact);
        expect(nextState.artifacts).to.be.empty;
    });

    it('handles FOUND_WORKFLOW', () => {
        const initialState = {
            plugins: [{
                name: 'diversity',
                workflows: []
            }]
        };
        const expectedState = {
            name: 'diversity',
            workflows: [{
                name: 'beta_diversity',
                description: 'Produces: DistanceMatrix',
                disabled: false,
                requires: []
            }]
        };

        const state = reducer(initialState, doNothingAction);
        const action = {
            type: 'FOUND_WORKFLOW',
            plugin: 'diversity',
            workflow: {
                name: 'beta_diversity',
                description: 'Produces: DistanceMatrix'
            }
        };

        deepFreeze(state);
        const nextState = reducer(state, action);
        expect(nextState.plugins).to.include.something.that.eql(expectedState);
    });

});
