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
        this.setAlert = this.setAlert.bind(this)
        this.state = {
            startStop: 'Start',
            alertId: null,
            alertClass: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.timer.timerExpired === false && nextProps.timer.timerExpired === true) {
            this.setAlert()
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

    setAlert() {
        // Set alert effect
        let intervalID = setInterval( () => {
            if(this.state.alertClass === null) {
                this.setState({
                    alertClass: 'timer-run-out-alert'
                })
            } else {
                this.setState({
                    alertClass: null
                })
            }
            // If timer is not expired clear alert
            if(!this.props.timer.timerExpired) {
                clearInterval(intervalID)
                intervalID = null
                this.setState({
                    alertClass: null
                })
            }
        }, 500)
    }
    
    resetTimer() {
        this.props.dispatch(resetTimer())
    }

    render() {
        const timeLeft = this.displayTime()
        return(
            <div className='container'>
                <div id='timer' className={'timer ' + this.state.alertClass}>{timeLeft}</div>
                <div className='buttons'>
                    <button id='startStopButton' type='button' className='btn btn-primary' onClick={this.toggleTimer}>{this.props.timer.timerRunning ? 'Stop': 'Start'}</button>
                    <button type='button' className='btn btn-default' onClick={this.resetTimer}>Reset</button>
                </div>
            </div>
        )
    }
}