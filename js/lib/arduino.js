'use strict'

const DIR_R = 7
const PWM_R = 9
const DIR_L = 8
const PWM_L = 10

function success (message) {
  return console.log.bind(console, message)
}

function error (message) {
  console.error(message)
}

class Arduino {
  constructor () {
    firmata.connect(function () {
      console.log('connected')
    }, function error () {
      console.error('unable to connect', arguments)
    })
  }

  setSpeed (dir, pwm, speed) {
    var reverse = false
    if (speed < 0) {
      speed = -speed
      reverse = true
    }
    if (speed > 255) {
      speed = 255
    }
    if (reverse) {
      speed = 255 - speed
    }
    firmata.pinMode(dir, firmata.OUTPUT, success('pinMode:' + dir), error)
    firmata.pinMode(pwm, firmata.OUTPUT, success('pinMode:' + pwm), error)
    firmata.digitalWrite(dir, reverse ? firmata.HIGH : firmata.LOW, success('digitalWrite:' + dir), error)
    firmata.analogWrite(pwm, speed, success('analogWrite:' + pwm), error)
  }

  setLeftSpeed (speed) {
    this.setSpeed(DIR_L, PWM_L, speed)
  }

  setRightSpeed (speed) {
    this.setSpeed(DIR_R, PWM_R, speed)
  }

  setSpeeds (leftSpeed, rightSpeed) {
    this.setLeftSpeed(leftSpeed)
    this.setRightSpeed(rightSpeed)

    if (this._safetyTimeout) {
      clearTimeout(this._safetyTimeout)
      this._safetyTimeout = null
    }
    this._safetyTimeout = setTimeout(function () {
      this._safetyTimeout = null
      this.setLeftSpeed(0)
      this.setRightSpeed(0)
    }.bind(this), 500)
  }
}

module.exports = Arduino
