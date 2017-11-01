// node packages
import ReactDom from 'react-dom'
import React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createHashHistory } from 'history'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

// Own packages, pages, components  etc
import TimerPage from './pages/timerPage'
import SetTimerPage from './pages/setTimerPage'
import SettingsPage from './pages/settingsPage'
import rootReducer from './reducers/rootReducer'

// Define routes etc

const history = createHashHistory()
const middleware = routerMiddleware(history)

let store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        logger
    )
)
@connect ( (store) => {
    return {
        timeLeft: 12
    }

})
class MainApp extends React.Component {
    constructor() {
        super()
        this.closeWindow = this.closeWindow.bind(this)
    }
    closeWindow(){
        window.close()
    }
    render() {
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Route exact path="/" component={TimerPage}/>
                    <Route path="/setTimer" component={SetTimerPage}/>
                    <Route path="/settings" component={SettingsPage}/>
                    <div className="application-menus">
                        <div className="set-timer">
                            <Link to="/setTimer">Set timer</Link>
                        </div>
                        <div className="settings">
                            <Link to="/settings"><img src="./src/static/images/svg/si-glyph-gear.svg"/></Link>
                        </div>
                        <div className="close">
                            <a onClick={this.closeWindow}><img src="./src/static/images/svg/si-glyph-button-error.svg"/></a>
                        </div>
                    </div>
                </div>
            </ConnectedRouter>
        )
    }
}

var app = document.getElementById('app')
ReactDom.render(
    <Provider store={store}>
        <MainApp/>
    </Provider>
    , app)