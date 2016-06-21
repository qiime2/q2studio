/* eslint-disable no-unused-expressions*/
/* global describe it */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../app/js/reducers';
import actions from '../app/js/actions';

const doNothingAction = {
    type: 'DO_NOTHING'
};

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

    it('handles CLEAR_ARTIFACTS', () => {
        const state = {
            artifacts: [{ name: 'Fake Artifact' }]
        };
        const nextState = reducer(state, actions.clearArtifacts());
        expect(nextState.artifacts).to.be.empty;
    });

    it('handles ESTABLISH_CONNECTION', () => {
        const uri = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        const secretKey = 'abc123';
        const action = {
            type: 'ESTABLISH_CONNECTION',
            uri,
            secretKey
        };
        const nextState = reducer(undefined, action);
        expect(nextState.connection.uri).to.equal(uri);
        expect(nextState.connection.secretKey).to.equal(secretKey);
    });

    it('handles SUCCESFULLY_CONNECTED', () => {
        const state = reducer(undefined, doNothingAction);
        expect(state.connection.connected).to.be.false;
        const nextState = reducer(state, actions.successfullyConnected(true));
        expect(nextState.connection.connected).to.be.true;
    });

    it('handles UPDATE_STATUS', () => {
        const nextState = reducer(undefined, actions.updateConnectionStatus('Test message'));
        expect(nextState.connection.message).to.equal('Test message');
    });

    it('handles NEW_ACTIVE_JOB', () => {
        const job = { id: 12345 };
        const state = reducer(undefined, actions.newActiveJob(job));
        expect(state.jobs.activeJobs).to.not.be.empty;
        expect(state.jobs.activeJobs).to.include.something.that.eql(job);
    });

    it('handles JOB_COMPLETED', () => {
        const job = { uuid: 12345 };
        const state = {
            jobs: {
                activeJobs: [
                    job
                ],
                failedJobs: [],
                completedJobs: []
            }
        };
        const nextState = reducer(state, actions.jobCompleted({
            job: { job: { ...job }, error: false },
            uuid: job.uuid
        }));
        expect(nextState.jobs.activeJobs).to.not.include.something.eql(job);
    });

    it('handles CLEAR_JOB_STATE', () => {
        const state = {
            jobs: {
                activeJobs: [],
                failedJobs: [],
                inputArtifacts: { table: [{ name: 'test' }] }
            }
        };
        const nextState = reducer(state, actions.clearJobState());
        expect(nextState.jobs).to.eql({
            activeJobs: [],
            failedJobs: [],
            inputArtifacts: {}
        });
    });

    it('handles LINK_INPUT_ARTIFACT', () => {
        const input = { name: 'table' };
        const artifacts = [{ name: 'fake artifact' }];
        const state = reducer(undefined, actions.linkInputArtifact(input, artifacts));
        expect(state.jobs.inputArtifacts).to.include.key('table');
        expect(state.jobs.inputArtifacts.table).to.eql(artifacts);
    });

    it('handles FOUND_PLUGIN', () => {
        const plugin = {
            name: 'Test Plugin',
            workflows: [],
            workflowsURI: undefined
        };
        const action = {
            type: 'FOUND_PLUGIN',
            plugin
        };
        const state = reducer(undefined, action);
        expect(state.plugins).to.not.be.empty;
        expect(state.plugins).to.include.something.eql(plugin);
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
                description: 'Produces: DistanceMatrix'
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

    it('handles VALIDATE_ARTIFACT', () => {
        const workflow = { name: 'test', requires: ['table'] };
        const plugin = {
            name: 'test',
            workflows: [
                workflow
            ]
        };
        const state = {
            plugins: [
                plugin
            ]
        };
        const action = {
            type: 'VALIDATE_ARTIFACT',
            plugin,
            workflow,
            input: 'table'
        };
        const nextState = reducer(state, action);
        expect(nextState.plugins[0].workflows[0].requires).to.be.empty;
    });

    it('handles MISSING_ARTIFACT', () => {
        const workflow = { name: 'test', requires: [] };
        const plugin = {
            name: 'test',
            workflows: [
                workflow
            ]
        };
        const state = {
            plugins: [
                plugin
            ]
        };
        const action = {
            type: 'MISSING_ARTIFACT',
            plugin,
            workflow,
            input: 'table'
        };
        const nextState = reducer(state, action);
        expect(nextState.plugins[0].workflows[0].requires).to.not.be.empty;
        expect(nextState.plugins[0].workflows[0].requires).to.include.something
            .that.equals('table');
    });
});
