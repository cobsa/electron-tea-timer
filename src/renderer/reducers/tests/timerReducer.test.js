import timer from '../timerReducer'
import * as actions from '../../actions/timerActions'

describe('Timer Reducer', () => {
    it('Should return Initial state', () => {
        expect(timer(undefined, {})).toEqual({
            timeLeft: 0,
            timerRunning: false,
            timerExpired: false
        })
    })
    it('Should start and stop timer', () => {
        const runningState = {
            timeLeft: 0,
            timerRunning: true,
            timerExpired: false
        }
        expect(timer(undefined, actions.startTimer())).toEqual(runningState)
        expect(timer(runningState, actions.stopTimer())).toEqual({
            timeLeft: 0,
            timerRunning: false,
            timerExpired: false
        })
    })
    it('Should set timer', () => {
        const timeLeft = 1233
        expect(timer(undefined, actions.setTimer(timeLeft))).toEqual({
            timeLeft,
            timerRunning: false,
            timerExpired: false
        })
    })
    it('Should set timerExpired to true', () => {
        expect(timer(undefined, actions.timerExpired())).toEqual({
            timeLeft: 0,
            timerRunning: false,
            timerExpired: true
        })
    })
    it('Should reset timer', () => {
        const runningState = {
            timeLeft: 23,
            timerRunning: true,
            timerExpired: true
        }
        expect(timer(runningState, actions.resetTimer())).toEqual({
            timeLeft: 23,
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