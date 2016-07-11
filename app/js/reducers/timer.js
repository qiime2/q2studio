const initialState = {
    timers: []
    runtimes: []
}

const timerReducer = (state=initialState, action) => {
    switch(action.type) {
    case 'NEW_TIMER': {
        const { timer } = action;
        const newState = {
            ...state,
            timers: [
                ...state.timers,
                timer        
            ]
        };
        return newState;
    }
    case 'TIMER_FINISHED': {
        const { runtime } = action;
        const newState = {
            ...state,
            timers: [
                ...state.timers.filter(t => t.uuid !== action.uuid)
            ]
            runtime: [
                ...state.runtimes,
                runtime
            ]
        };
        return newState;
    }
    default:
        return state;
    }
};

export default timerReducer;