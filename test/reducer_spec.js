import { expect } from 'chai';
import reducer from '../app/js/reducers';

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
            artifacts: {
                '0' : {
                    name: 'table',
                    uuid: 'f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f',
                    type: 'FeatureTable[Frequency]'
                }
            }
        };
        const action = {
            type: 'DELETE_ARTIFACT',
            id: '0' // Hmm, keys are auto-strings, so we have to send in ints as strings, must be another way
        };

        const nextState = reducer(initialState, action);
        expect(nextState.artifacts).to.be.empty;
    });

});
