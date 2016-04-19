export const createJob = (job) => ({
    type: 'CREATE_JOB',
    job
});

export const startJob = (job) => ({
    type: 'START_JOB',
    job
});
