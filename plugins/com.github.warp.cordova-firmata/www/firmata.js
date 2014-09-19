var exec = require('cordova/exec');

exports.INPUT  = 0;
exports.OUTPUT = 1;
exports.ANALOG = 2;
exports.PWM    = 3;
exports.SERVO  = 4;
exports.SHIFT  = 5;
exports.I2C    = 6;
exports.LOW    = false;
exports.HIGH   = true;

exports.getBoardVersion = function(success, error) {
    exec(success, error, "Firmata", "getBoardVersion", []);
};

exports.connect = function(success, error) {
    exec(success, error, "Firmata", "connect", []);
};

exports.isOpen = function(success, error) {
    exec(success, error, "Firmata", "isOpen", []);
};

exports.close = function(success, error) {
    exec(success, error, "Firmata", "close", []);
};

exports.reset = function(success, error) {
    exec(success, error, "Firmata", "reset", []);
};

exports.digitalRead = function(pin, success, error) {
    exec(success, error, "Firmata", "digitalRead", [pin]);
};

exports.analogRead = function(pin, success, error) {
    exec(success, error, "Firmata", "analogRead", [pin]);
};

exports.pinMode = function(pin, mode, success, error) {
    exec(success, error, "Firmata", "pinMode", [pin, mode]);
};

exports.digitalWrite = function(pin, value, success, error) {
    exec(success, error, "Firmata", "digitalWrite", [pin, value]);
};

exports.analogWrite = function(pin, value, success, error) {
    exec(success, error, "Firmata", "analogWrite", [pin, value]);
};

exports.servoWrite = function(pin, angle, success, error) {
    exec(success, error, "Firmata", "servoWrite", [pin, angle]);
};
