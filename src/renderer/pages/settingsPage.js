import React from 'react'

export default class SettingsPage extends React.Component {
    render() {
        return(
            <div className='container'>
                <div className='timer'>
                    Settings
                </div>
                <div className='buttons'>
                    <button type='button' className='btn btn-success' onClick={this.confirm}>Set</button>
                    <button type='button' className='btn btn-danger' onClick={this.cancel}>Cancel</button>
                </div>
            </div>
        )
    }
}