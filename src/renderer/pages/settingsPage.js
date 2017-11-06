import React from 'react'
import Config from 'electron-config'
import { Redirect } from 'react-router-dom'
import electron from 'electron'

import { timerPlayAlert, userAlarmFile } from '../settings/timerSettings'

export default class SettingsPage extends React.Component {
  constructor() {
    super()
    // Bindings
    this.togglePlayAlert = this.togglePlayAlert.bind(this)
    this.goBack = this.goBack.bind(this)
    this.openFilePrompt = this.openFilePrompt.bind(this)
    this.useDefault = this.useDefault.bind(this)
    // Variables
    this.config = new Config()
    this.state = {
      playAlert: this.config.get(timerPlayAlert),
      done: false
    }
  }

  togglePlayAlert(event) {
    let playAlert = event.target.checked
    this.setState({
      playAlert
    })
    // Save value to settings
    this.config.set(timerPlayAlert, playAlert)
  }

  goBack() {
    this.setState({
      done: true
    })
  }

  useDefault() {
    // Set settings value for timerPlayAlert to undefined, so default audio gets played
    this.config.delete(userAlarmFile)
    this.forceUpdate()
  }

  openFilePrompt() {
    electron.remote.dialog.showOpenDialog(
      { properties: ['openFile'], filters: [{ name: 'Audio', extensions: ['wav'] }] },
      filePath => {
        // Save selected file to settings
        this.config.set(userAlarmFile, filePath)
        this.forceUpdate()
      }
    )
  }
  render() {
    if (this.state.done) {
      return <Redirect to="/" />
    }
    let userAudio
    if (this.config.has(userAlarmFile)) {
      userAudio = this.config.get(userAlarmFile)
    } else {
      userAudio = 'Default'
    }
    return (
      <div className="container">
        <div className="timer">Settings</div>
        <div className="settingsList">
          <ul>
            <li>
              <label>Play alarm sound</label>
              <input
                type="checkbox"
                checked={this.state.playAlert}
                onChange={this.togglePlayAlert}
              />
            </li>
            <li>
              <label>Choose alarm sound</label>
              <button onClick={this.openFilePrompt}>Choose file</button>
              <button onClick={this.useDefault}>Default</button>
            </li>
            <li>
              <label>Current alert</label>
              <small>{userAudio}</small>
            </li>
          </ul>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-danger" onClick={this.goBack}>
            Back
          </button>
        </div>
      </div>
    )
  }
}
