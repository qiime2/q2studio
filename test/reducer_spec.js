import { expect } from 'chai';

import reducer from '../app/js/reducers';
import actions from '../app/js/actions';

describe('reducer', () => {
    it('contains a plugins reducer', () => {
        const action = {
            type: 'DO_NOTHING'
        };
        const state = reducer(undefined, action);
        expect(state).to.include.key('plugins');
    });

    it('contains an artifacts reducer', () => {
        const action = {
            type: 'DO_NOTHING'
        };
        const state = reducer(undefined, action);
        expect(state).to.include.key('artifacts');
    });

    it('contains a connection reducer', () => {
        const action = {
            type: 'DO_NOTHING'
        };
        const state = reducer(undefined, action);
        expect(state).to.include.key('connection');
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
        var action = actions.newArtifact(artifact);
        const state = reducer(initialState, action);
        action = actions.deleteArtifact(artifact.uuid);

        const nextState = reducer(state, action);
        expect(nextState.artifacts).to.not.include.something.that.eql(artifact);
        expect(nextState.artifacts).to.be.empty;
    });

});
