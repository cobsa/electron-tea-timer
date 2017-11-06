import React from 'react'
import { connect } from 'react-redux'
import Config from 'electron-config'
import fs from 'fs'
import dataurl from 'dataurl'

// Import actions
import { startTimer, stopTimer, resetTimer } from '../actions/timerActions'
// Import default audio file
const defaultAudio = require('../static/sounds/default_alarm.wav')
// Import storage constants
import { timerPlayAlert, userAlarmFile } from '../settings/timerSettings.js'

@connect(store => {
  return {
    timer: store.timer
  }
})
export default class TimerPage extends React.Component {
  constructor() {
    super()
    // Bindings
    this.toggleTimer = this.toggleTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.displayTime = this.displayTime.bind(this)
    this.alert = this.alert.bind(this)
    this.setAudioAlert = this.setAudioAlert.bind(this)
    this.convertSong = this.convertSong.bind(this)
    this.playAudioAlert = this.playAudioAlert.bind(this)
    // State and variables
    this.config = new Config()
    this.state = {
      startStop: 'Start',
      alertId: null,
      alertClass: null
    }
  }

  componentWillReceiveProps(nextProps) {
    // if state changes from timerExpired false => true
    if (this.props.timer.timerExpired === false && nextProps.timer.timerExpired === true) {
      this.alert()
    }
  }

  toggleTimer() {
    if (this.props.timer.timerRunning) {
      this.props.dispatch(stopTimer())
    } else {
      this.props.dispatch(startTimer())
    }
  }

  displayTime() {
    let { timeLeft } = this.props.timer
    let hours = '00' + Math.floor((timeLeft / 3600) % 24)
    let minutes = '00' + Math.floor((timeLeft / 60) % 60)
    let seconds = '00' + timeLeft % 60
    return hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2)
  }

  convertSong(fileName) {
    // Async load of audio file. Returns promise
    const songPromise = new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(dataurl.convert({ data, mimetype: 'audio/wav' }))
      })
    })
    return songPromise
  }

  alert() {
    /*
    Fired when timer expires
    */

    // Check if alert audio should be played
    let playAlertValue = this.config.get(timerPlayAlert, [undefined])
    if (playAlertValue !== undefined && playAlertValue == true) {
      this.setAudioAlert()
    }

    // Set visual effect when timer expires

    let intervalID = setInterval(() => {
      if (this.state.alertClass === null) {
        this.setState({
          alertClass: 'timer-run-out-alert'
        })
      } else {
        this.setState({
          alertClass: null
        })
      }

      // If timer is not expired clear alert
      if (!this.props.timer.timerExpired) {
        clearInterval(intervalID)
        intervalID = null
        this.setState({
          alertClass: null
        })
      }
    }, 500)

    // Set operating system notification
    new Notification('Timer run out', {
      body: 'Your tea is ready!'
    })
  }

  setAudioAlert() {
    // Play alert sound. Custom if set by user, otherwise default.
    let audioFile
    if (this.config.has(userAlarmFile)) {
      let userAudioFile = this.config.get(userAlarmFile, [undefined]).toString()
      this.convertSong(userAudioFile).then(data => {
        audioFile = new Audio(data)
        this.playAudioAlert(audioFile)
      })
    } else {
      audioFile = new Audio(defaultAudio)
      this.playAudioAlert(audioFile)
    }
  }

  playAudioAlert(audioFile) {
    audioFile.currentTime = 0
    audioFile.play()
    // Set listener to stop audio from playing when reset is pressed
    let audioAlertIntervalID = setInterval(() => {
      if (!this.props.timer.timerExpired) {
        clearInterval(audioAlertIntervalID)
        audioAlertIntervalID = null
        audioFile.pause()
      }
    }, 500)
  }

  resetTimer() {
    this.props.dispatch(resetTimer())
  }

  render() {
    const timeLeft = this.displayTime()
    return (
      <div className="container">
        <div id="timer" className={'timer push ' + this.state.alertClass}>
          {timeLeft}
        </div>
        <div className="buttons">
          <button
            id="startStopButton"
            type="button"
            className="btn btn-primary"
            onClick={this.toggleTimer}
          >
            {this.props.timer.timerRunning ? 'Stop' : 'Start'}
          </button>
          <button type="button" className="btn btn-default" onClick={this.resetTimer}>
            Reset
          </button>
        </div>
      </div>
    )
  }
}
