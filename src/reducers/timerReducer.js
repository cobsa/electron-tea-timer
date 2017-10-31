const initialState = {
    timeLeft: 0,
    timerRunning: false, 
    timerExpired: false
}
const timer = (state=initialState, action) => {
    switch(action.type) {
        case 'START_TIMER': {
            return {
                ...state,
                timerRunning: true
            }
        }
        case 'STOP_TIMER': {
            return{
                ...state,
                timerRunning: false
            }
        }
        case 'SET_TIMER': {
            return {
                ...state,
                timeLeft: action.payload.timeLeft
            }
        }
        case 'TIMER_EXPIRED': {
            return {
                ...state,
                timerExpired: true
            }
        }
        case 'RESET_TIMER' : {
            return {
                ...state,
                timerRunning: false,
                timerExpired: false
            }
        }
        case 'TICK' : {
            return {
                ...state,
                timeLeft: state.timeLeft -1
            }
        }

        default: {
            return state
        }
    }
}


export default timer