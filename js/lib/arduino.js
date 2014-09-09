var firmata = cordova.plugins.firmata,
    DIR_L = 5,
    PWM_L = 6,
    DIR_R = 3,
    PWM_R = 4;

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
    firmata.pinMode(dir, firmata.MODES.OUTPUT);
    firmata.pinMode(pwm, firmata.MODES.OUTPUT);
    firmata.digitalWrite(dir, reverse ? firmata.HIGH : firmata.LOW);
    firmata.analogWrite(pwm, speed);
  });
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
