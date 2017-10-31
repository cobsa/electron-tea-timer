import React from 'react'
import { connect } from 'react-redux'

// import actions
import { startTimer, stopTimer, resetTimer, setTimer } from '../actions/timerActions'


@connect( (store) => {
    return {
        timer: store.timer
    }
})
export default class TimerPage extends React.Component {
    constructor() {
        super()
        this.toggleTimer = this.toggleTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.displayTime = this.displayTime.bind(this)
        this.state = {
            startStop: 'Start'
        }
    }


    toggleTimer() {
        if(this.props.timer.timerRunning) {
            this.props.dispatch(stopTimer())
        } else {
            this.props.dispatch(startTimer())
        }
    }

    displayTime() {
        let { timeLeft } = this.props.timer
        let hours = '00' + Math.floor((timeLeft/3600) % 24)
        let minutes = '00' +  Math.floor((timeLeft/60) % 60)
        let seconds = '00' +  (timeLeft % 60)
        return( hours.slice(-2) + ':' +  minutes.slice(-2) + ':' + seconds.slice(-2) )
    }
    resetTimer() {
        this.props.dispatch(resetTimer())
        this.props.dispatch(setTimer(123))
    }
    render() {
        const timeLeft = this.displayTime()
        return(
            <div className='container'>
                <div id='timer' className='timer'>{timeLeft}</div>
                <div className='buttons'>
                    <button id='startStopButton' type='button' className='btn btn-primary' onClick={this.toggleTimer}>{this.props.timer.timerRunning ? 'Stop': 'Start'}</button>
                    <button type='button' className='btn btn-default' onClick={this.resetTimer}>Reset</button>
                </div>
            </div>
        )
    }
}