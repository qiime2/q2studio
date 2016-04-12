import { expect } from 'chai';
import { List as ImmutableList, Map as ImmutableMap, fromJS } from 'immutable';

import reducer from '../app/js/reducers';
import artifactreducer from '../app/js/reducers/artifacts';

describe('combined reducer', () => {
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

});

describe('artifacts reducer', () => {
    it('handles ADD_ARTIFACT', () => {
        const initialState = ImmutableMap();
        const action = {
            type: 'ADD_ARTIFACT',
            artifact: {
                id: '0',
                name: 'table',
                uuid: 'f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f',
                type: 'FeatureTable[Frequency]'
            }
        };

        const nextState = artifactreducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            '0': {
                name: 'table',
                uuid: 'f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f',
                type: 'FeatureTable[Frequency]'
            }
        }));
    });

    it('handles multiple ADD_ARTIFACT calls', () => {
        const initialState = ImmutableMap();
        const action_one = {
            type: 'ADD_ARTIFACT',
            artifact: {
                id: '0',
                name: 'table',
                uuid: 'f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f',
                type: 'FeatureTable[Frequency]'
            }
        };
        const secondState = artifactreducer(initialState, action_one);
        const action_two = {
            type: 'ADD_ARTIFACT',
            artifact: {
                id: '1',
                name: 'phylogeny',
                uuid: '908dece5-db23-4562-ad03-876bb5750145',
                type: 'Phylogeny'
            }
        };
        const thirdState = artifactreducer(secondState, action_two);
        expect(thirdState).to.equal(fromJS({
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
        }));
    });

    it('handles DELETE_ARTIFACT', () => {
        const initialState = ImmutableMap({
            0: {
                name: 'table',
                uuid: 'f16ca3d0-fe83-4b1e-8eea-7e35db3f6b0f',
                type: 'FeatureTable[Frequency]'
            }
        });
        const action = {
            type: 'DELETE_ARTIFACT',
            id: '0' //Hmm, keys are auto-strings, so we have to send in ints as strings, must be another way
        };

        const nextState = artifactreducer(initialState, action);
        expect(nextState).to.be.empty;
    });
});
