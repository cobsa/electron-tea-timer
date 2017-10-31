import React from 'react'
import { Link } from 'react-router-dom'

export default class TimerPage extends React.Component {
    constructor() {
        super()
        this.state = {
            timeLeft: '11:00:00'
        }
    }

    componentWillMount() {
        this.setState({
            timeLeft:'12:00:00'
        })
    }
    render() {
        return(
            <div className="container">
                <div id="timer" className="timer">{this.state.timeLeft}</div>
                <div className="buttons">
                    <button id="startStopButton" type="button" className="btn btn-primary" onclick="toggleTimer()">Start</button>
                    <button type="button" className="btn btn-default" onclick="resetTimer()">Reset</button>
                </div>
            </div>
        )
    }
}