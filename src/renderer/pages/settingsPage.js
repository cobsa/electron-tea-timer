import React from 'react'
import Config from 'electron-config'
import { Redirect } from 'react-router-dom'

import { timerPlayAlert } from '../settings/timerSettings'

export default class SettingsPage extends React.Component {
  constructor() {
    super()
    this.togglePlayAlert = this.togglePlayAlert.bind(this)
    this.goBack = this.goBack.bind(this)
    let config = new Config()
    this.state = {
      playAlert: config.get(timerPlayAlert),
      done: false
    }
  }

  togglePlayAlert(event) {
    let playAlert = event.target.checked
    this.setState({
      playAlert
    })
    // Save value to settings
    let config = new Config()
    config.set(timerPlayAlert, playAlert)
  }

  goBack() {
    this.setState({
      done: true
    })
  }
  render() {
    if (this.state.done) {
      return <Redirect to="/" />
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
              <input type="file" value="Choose" />
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
