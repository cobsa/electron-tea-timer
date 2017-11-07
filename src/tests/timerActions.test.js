import * as actions from '../renderer/actions/timerActions.js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// Mock electron-config
jest.mock('electron-config')
const Config = require('electron-config')
const mMock = jest.fn()
Config.mockImplementation(() => {
  return {
    m: mMock
  }
})
// Mock redux store
const middleWares = [thunk]
const mockStore = configureMockStore(middleWares)

describe('Timer actions', () => {
  it('Should create action to start timer with zero time remaining', () => {
    // Time left is 0s
    const expectedActionsTimeZero = [
      {
        type: 'ERROR',
        payload: {
          error: 'TIME_ZERO'
        }
      }
    ]
    const store = mockStore({
      timer: {
        timeLeft: 0
      }
    })
    store.dispatch(actions.startTimer())
    expect(store.getActions()).toEqual(expectedActionsTimeZero)
  })
  it('Should create action to start timer with time left', () => {
    const expectedActionsTimeOne = [
      {
        type: 'START_TIMER'
      }
    ]
    const store = mockStore({
      timer: {
        timeLeft: 1
      }
    })
    store.dispatch(actions.startTimer())
    expect(store.getActions()).toEqual(expectedActionsTimeOne)
    // Since timer is async only 'START_TIMER' is emitted
  })
  it('Should create action to stop timer', () => {
    expect(actions.stopTimer()).toEqual({
      type: 'STOP_TIMER'
    })
  })
  it('Should create action to alert that timer has run out', () => {
    expect(actions.timerExpired()).toEqual({
      type: 'TIMER_EXPIRED'
    })
  })
  it('Should create action to set timer', () => {
    const timeLeft = 1234
    expect(actions.setTimer(timeLeft)).toEqual({
      type: 'SET_TIMER',
      payload: {
        timeLeft
      }
    })
  })
  it('Should create action to reset timer', () => {
    const expectedActions = [{ type: 'RESET_TIMER' }, { type: 'STOP_TIMER' }]
    const store = mockStore({})
    store.dispatch(actions.resetTimer())
    expect(store.getActions()).toEqual(expectedActions)
  })
  it('Should create action for tick', () => {
    expect(actions.tick()).toEqual({
      type: 'TICK'
    })
  })
})
