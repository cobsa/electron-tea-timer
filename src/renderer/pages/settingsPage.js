import React from 'react'
import Config from 'electron-config'

import { timerPlayAlert } from '../settings/timerSettings'

export default class SettingsPage extends React.Component {
  constructor() {
    super()
    this.togglePlayAlert = this.togglePlayAlert.bind(this)
    this.goBack = this.goBack.bind(this)
    let config = new Config()
    this.state = {
      playAlert: config.get(timerPlayAlert)
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
    window.history.back()
  }
  render() {
    return (
      <div className="container">
        <div className="timer">Settings</div>
        <div className="settingsList">
          <ul>
            <li>
              {' '}
              Play alarm sound{' '}
              <input
                type="checkbox"
                checked={this.state.playAlert}
                onChange={this.togglePlayAlert}
              />
            </li>
          </ul>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-danger" onClick={this.goBack}>
            Set
          </button>
        </div>
      </div>
    )
  }
}
