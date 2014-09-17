var firmata = cordova.plugins.firmata,
    DIR_R = 2,
    PWM_R = 3,
    DIR_L = 4,
    PWM_L = 5;

var success = function (message) {
  return console.log.bind(console, message);
};

var error = function (message) {
  console.error(message);
};

function Arduino () {
  if (!(this instanceof Arduino)) {
    return new Arduino();
  }
  var self = this;
};

Arduino.prototype.setSpeed = function(dir, pwm, speed) {
  var reverse = 0;
  if (speed < 0) {
    speed = -speed;
    reverse = 1;
  }
  if (speed > 255) {
    speed = 255;
  }
  firmata.connect(function () {
    console.log('connect');
    firmata.pinMode(dir, firmata.OUTPUT, success('pinMode:' + dir), error);
    firmata.pinMode(pwm, firmata.OUTPUT, success('pinMode:' + pwm), error);
    firmata.digitalWrite(dir, reverse ? firmata.HIGH : firmata.LOW, success('digitalWrite:' + dir), error);
    firmata.analogWrite(pwm, speed, success('analogWrite:' + pwm), error);
  }, error);
};

Arduino.prototype.setLeftSpeed = function(speed) {
  this.setSpeed(DIR_L, PWM_L, speed);
};

Arduino.prototype.setRightSpeed = function(speed) {
  this.setSpeed(DIR_R, PWM_R, speed);
};

Arduino.prototype.setSpeeds = function(leftSpeed, rightSpeed) {
  this.setLeftSpeed(leftSpeed);
  this.setRightSpeed(rightSpeed);
};

module.exports = Arduino;
