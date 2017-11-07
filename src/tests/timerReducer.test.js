import timer from '../renderer/reducers/timerReducer'
import * as actions from '../renderer/actions/timerActions'

// Mock electron-config
jest.mock('electron-config')
const Config = require('electron-config')
const mMock = jest.fn()
Config.mockImplementation(() => {
  return {
    m: mMock
  }
})

describe('Timer Reducer', () => {
  it('Should return Initial state', () => {
    expect(timer(undefined, {})).toEqual({
      timeLeft: 60,
      initialTime: 60,
      timerRunning: false,
      timerExpired: false
    })
  })
  it('Should start and stop timer', () => {
    const runningState = {
      timeLeft: 60,
      initialTime: 60,
      timerRunning: true,
      timerExpired: false
    }
    expect(timer(undefined, { type: 'START_TIMER' })).toEqual(runningState)
    expect(timer(runningState, actions.stopTimer())).toEqual({
      timeLeft: 60,
      initialTime: 60,
      timerRunning: false,
      timerExpired: false
    })
  })
  it('Should set timer', () => {
    const timeLeft = 1233
    expect(timer(undefined, actions.setTimer(timeLeft))).toEqual({
      timeLeft,
      initialTime: timeLeft,
      timerRunning: false,
      timerExpired: false
    })
  })
  it('Should set timerExpired to true', () => {
    expect(timer(undefined, actions.timerExpired())).toEqual({
      timeLeft: 60,
      initialTime: 60,
      timerRunning: false,
      timerExpired: true
    })
  })
  it('Should reset timer', () => {
    const runningState = {
      timeLeft: 23,
      initialTime: 23,
      timerRunning: true,
      timerExpired: true
    }
    expect(timer(runningState, { type: 'RESET_TIMER' })).toEqual({
      timeLeft: 23,
      initialTime: 23,
      timerRunning: false,
      timerExpired: false
    })
  })
  it('Should reduce counter by 1s', () => {
    const someTimeLeft = {
      timeLeft: 123,
      timerRunning: true,
      timerExpired: false
    }
    expect(timer(someTimeLeft, actions.tick())).toEqual({
      timeLeft: 122,
      timerRunning: true,
      timerExpired: false
    })
  })
})
