import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {setTimer } from '../actions/timerActions'

@connect( (store) => {
    return {

    }
})
export default class SetTimerPage extends React.Component {
    constructor() {
        super()
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            done: false,
            error: false
        }
        this.addTime = this.addTime.bind(this)
        this.displayTime = this.displayTime.bind(this)
        this.confirm = this.confirm.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    addTime(amount,type, event) {
        switch(type) {
            case 'hour': {
                let hour = this.state.hours+amount
                if(hour < 0 ) {
                    hour = 99+hour
                }
                if(hour > 99) {
                    hour = hour-100
                }
                this.setState({
                    hours: hour
                })
                break
            }
            case 'minute': {
                let minute = this.state.minutes+amount
                if(minute < 0) {
                    minute = 60+minute
                }
                if(minute > 59) {
                    minute = minute-60
                }
                this.setState({
                    minutes: minute
                })
                break
            }
            case 'second': {
                let second = this.state.seconds+amount
                if( second < 0 ) {
                    second = 60+second
                }
                if(second > 59) {
                    second = second-60
                }
                this.setState({
                    seconds: second
                })
                break
            }
            default: {
                break
            }
        }
    }

    displayTime() {
        let hours = '00' + this.state.hours
        let minutes = '00' + this.state.minutes
        let seconds = '00' + this.state.seconds
        return( hours.slice(-2) + ':' +  minutes.slice(-2) + ':' + seconds.slice(-2) )
    }
    confirm(e) {
        e.preventDefault()
        let timeInSeconds = this.state.hours*3600 + this.state.minutes*60 + this.state.seconds
        this.props.dispatch(setTimer(timeInSeconds))
        this.setState({
            done: true
        })
    }
    cancel(e) {
        e.preventDefault()
        this.setState({
            done: true
        })
    }
    render() {
        if (this.state.done) {
            return (
                <Redirect to='/'/>
            )
        }
        const setTime  = this.displayTime()
        return(
            <div className='container'>
                <form>
                    <div className='upButton'>
                        <div className='firstRow btn-group btn-group-sm ' role='group'>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(5,'hour',e)}>+5</button>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(5,'minute',e)}>+5</button>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(5,'second',e)}>+5</button>
                        </div>
                        <div className='secondRow btn-group  btn-group-sm' role='group'>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(1,'hour',e)}>+1</button>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(1,'minute',e)}>+1</button>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(1,'second',e)}>+1</button>
                        </div>
                    </div>
                    <div className='timer'>
                        <div id='timer' className={'timer ' + this.state.alertClass}>{setTime}</div>
                    </div>
                    <div className='downButton'>
                        <div className='thirdRow btn-group  btn-group-sm' role='group'>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(-1,'hour',e)}>-1</button>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(-1,'minute',e)}>-1</button>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(-1,'second',e)}>-1</button>
                        </div>
                        <div className='fourthRow btn-group  btn-group-sm' role='group'>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(-5,'hour',e)}>-5</button>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(-5,'minute',e)}>-5</button>
                            <button type='button' className='btn btn-change' onClick={(e) => this.addTime(-5,'second',e)}>-5</button>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='btn btn-success' onClick={this.confirm}>Set</button>
                        <button type='button' className='btn btn-danger' onClick={this.cancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}