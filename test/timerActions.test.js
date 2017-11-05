import * as actions from '../timerActions.js'

describe('Timer actions', () => {
  it('Should create action to start timer', () => {
    expect(actions.startTimer()).toEqual({
      type: 'START_TIMER'
    })
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
    expect(actions.resetTimer()).toEqual({
      type: 'RESET_TIMER'
    })
  })
  it('Should create action for tick', () => {
    expect(actions.tick()).toEqual({
      type: 'TICK'
    })
  })
})
