function success (success, failure) {
  success()
}

module.exports = {
  getBoardVersion: success,
  connect: success,
  isOpen: success,
  close: success,
  reset: success,
  digitalRead: success,
  analogRead: success,
  pinMode: success,
  digitalWrite: success,
  analogWrite: success,
  servoWrite: success,
  cleanup: success
}

require('cordova/exec/proxy').add('Firmata', module.exports)
