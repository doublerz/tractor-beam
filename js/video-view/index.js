var debug = require('debug')('app:video-view');

var fs = require("fs");
var tmpl = fs.readFileSync(__dirname + "/index.html", "utf-8");

function VideoView() {
  if (!(this instanceof VideoView)) {
    return new VideoView();
  }

  var self = this;
  self.el = document.createElement('div');
  self.el.innerHTML = tmpl;
};

VideoView.prototype.ready = function() {
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  var peer = new Peer('robot', {key: process.env.PEERJS_KEY, debug: 3}),
      arduino = require('../lib/arduino')(),
      watchdog = null,
      watchdogTime = 500; // ms

  peer.on('open', function() {
    document.getElementById('my-id').innerHTML = peer.id;
  });

  peer.on('call', function(call) {
    call.answer(window.localStream);

    // Hang up on an existing call if present
    if (window.existingCall) {
      window.existingCall.close();
    }

    // Wait for stream on the call, then set peer video display
    call.on('stream', function(stream) {
      document.getElementById('their-video')
        .setAttribute('src', URL.createObjectURL(stream));
    });

    window.existingCall = call;
  });

  peer.on('connection', function(connection) {
    connection.on('data', function(data) {
      arduino.setSpeeds(data[0], data[1]);
    })
  });

  peer.on('error', function(err){
    alert(err.message);
  });

  setTimeout(function () {
    document.getElementById('forward').addEventListener('click', function () {
      console.log('forward');
      arduino.setSpeeds(255, 255);
    });
  }, 1000);

  navigator.getUserMedia({audio: true, video: true}, function(stream) {
    window.localStream = stream;
  }, function() {});
};

module.exports = VideoView;
