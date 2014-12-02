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
  firmata.connect(function(){
    console.log('connected')
  }, function error(){
    console.error('unable to connect', arguments)
  }
  );
};

Arduino.prototype.setSpeed = function(dir, pwm, speed) {
  var reverse = false;
  if (speed < 0) {
    speed = -speed;
    reverse = true;
  }
  if (speed > 255) {
    speed = 255;
  }
  if (reverse) {
    speed = 255 - speed
  }
  firmata.pinMode(dir, firmata.OUTPUT, success('pinMode:' + dir), error);
  firmata.pinMode(pwm, firmata.OUTPUT, success('pinMode:' + pwm), error);
  firmata.digitalWrite(dir, reverse ? firmata.HIGH : firmata.LOW, success('digitalWrite:' + dir), error);
  firmata.analogWrite(pwm, speed, success('analogWrite:' + pwm), error);
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

  if(this._safetyTimeout){
    clearTimeout(this._safetyTimeout);
    this._safetyTimeout = null
  }
  this._safetyTimeout = setTimeout(function(){
    this._safetyTimeout = null;
    this.setLeftSpeed(0);
    this.setRightSpeed(0);
  }.bind(this), 500);
};

module.exports = Arduino;
