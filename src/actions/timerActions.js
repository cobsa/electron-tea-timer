

let timerID = null

export const startTimer = () => {
    return (dispatch, getState) => {
        let { timer } = getState()
        if(timer.timeLeft > 0 ) {
            dispatch({
                type: 'START_TIMER'
            })
            timerID = setInterval( () => {
                dispatch(tick())
                let { timer } = getState()
                if(timer.timeLeft <= 0 ) {
                    dispatch(timerExpired())
                    dispatch(stopTimer())
                }
            }, 1000)
        } else {
            dispatch(error('TIME_ZERO'))
        }
    }
}

export const stopTimer = () => {
    clearInterval(timerID)
    timerID = null
    return{
        type: 'STOP_TIMER'
    }
}

export const timerExpired = () => {
    return{
        type: 'TIMER_EXPIRED'
    }
}

export const setTimer = (time) => {
    return {
        type: 'SET_TIMER',
        payload: {
            timeLeft: time
        }
    }
}

export const resetTimer = () => {
    return (dispatch) => {
        dispatch({type: 'RESET_TIMER'})
        dispatch(stopTimer())
    }
    
}

export const tick = () => {
    return {
        type: 'TICK'
    }
}

export const error = (error) => {
    return {
        type: 'ERROR',
        payload: {
            error
        }
    }
}