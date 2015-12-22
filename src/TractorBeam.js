'use strict'

const TIMEOUT = 500 // ms

// Tractor Beam / Zumo
const DIR_R = 7
const DIR_L = 8
const PWM_R = 9
const PWM_L = 10

function success (message) {
  console.log(message)
}

function error (message) {
  console.error(message)
}

module.exports = class TractorBeam {
  connect () {
    firmata.connect(function () {
      console.log('connected')
    }, error)
  }

  setSpeed (dir, pwm, speed) {
    const FORWARD = firmata.LOW
    const REVERSE = firmata.HIGH

    let direction = FORWARD
    if (speed < 0) {
      speed = 255 + speed
      direction = REVERSE
    }
    firmata.digitalWrite(dir, direction, success, error)
    firmata.analogWrite(pwm, speed, success, error)
  }

  setLeftSpeed (speed) {
    this.setSpeed(DIR_L, PWM_L, speed)
  }

  setRightSpeed (speed) {
    this.setSpeed(DIR_R, PWM_R, speed)
  }

  setSpeeds (speeds) {
    this.setLeftSpeed(speeds[0])
    this.setRightSpeed(speeds[1])

    if (this._safetyTimeout) clearTimeout(this._safetyTimeout)
    this._safetyTimeout = setTimeout(function () {
      this.setLeftSpeed(0)
      this.setRightSpeed(0)
    }.bind(this), TIMEOUT)
  }
}
