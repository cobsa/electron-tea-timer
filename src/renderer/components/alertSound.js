import dataurl from 'dataurl'
import Config from 'electron-config'
// Import constants
import { userAlarmFile, userAlarmVolume } from '../settings/timerSettings.js'
// Import default audio file
const defaultAudio = require('../static/sounds/default_alarm.wav')

let audioAlertIntervalID
let audioFile
let config = new Config()

export const setAudioAlert = () => {
  // Set alert sound and play it. Custom if set by user, otherwise default.
  let audioFile
  let volume
  volume = config.get(userAlarmVolume, [50]) / 100
  if (config.has(userAlarmFile)) {
    let userAudioFile = config.get(userAlarmFile, [undefined]).toString()
    convertSong(userAudioFile).then(data => {
      audioFile = new Audio(data)
      playAudioAlert(audioFile, volume)
    })
  } else {
    audioFile = new Audio(defaultAudio)
    playAudioAlert(audioFile, volume)
  }
}

export const playAudioAlert = (audio, volume) => {
  // Stop audio if playing
  if (audioFile != undefined) {
    audioFile.pause()
  }
  // Play audio with desired volume
  audioFile = audio
  audioFile.volume = volume
  audioFile.currentTime = 0
  audioFile.play()
}

export const stopAudioAlert = () => {
  // Stop audio from playing if it is playing
  if (audioFile != undefined) {
    audioFile.pause()
  }
}

export const convertSong = fileName => {
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
