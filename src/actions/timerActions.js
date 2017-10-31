

let timer = null

export const startTimer = () => {
    return (dispatch) => {
        dispatch({
            type: 'START_TIMER'
        })
        timer = setInterval( () => {
            dispatch(tick())
        }, 1000)
    }
}

export const stopTimer = () => {
    clearInterval(timer)
    timer = null
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