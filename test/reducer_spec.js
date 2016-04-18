import { expect } from 'chai';
import reducer from '../app/js/reducers';

import * as actionCreators from '../app/js/actions';

describe('reducer', () => {
    it('contains a plugins reducer', () => {
        const action = {
            type: 'DO_NOTHING'
        };
        const nextState = reducer(undefined, action);
        expect(nextState).to.include.key('plugins');
    });

    it('contains an artifacts reducer', () => {
        const action = {
            type: 'DO_NOTHING'
        };
        const nextState = reducer(undefined, action);
        expect(nextState).to.include.key('artifacts');
    });

    it('handles DELETE_ARTIFACT', () => {
        const initialState = {
            plugins: undefined,
            artifacts: [
                {
                    name: 'table',
                    uuid: 'f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f',
                    type: 'FeatureTable[Frequency]'
                }
            ]
        };
        const action = actionCreators.deleteArtifact('f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f');

        const nextState = reducer(initialState, action);
        expect(nextState.artifacts).to.be.empty;
    });

});
