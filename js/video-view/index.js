var Peer = require('peerjs')
var fs = require('fs')

var arduino = require('../lib/arduino')()
var tmpl = fs.readFileSync(__dirname + '/index.html', 'utf-8')

function VideoView () {
  if (!(this instanceof VideoView)) {
    return new VideoView()
  }

  var self = this
  self.el = document.createElement('div')
  self.el.innerHTML = tmpl
}

VideoView.prototype.connect = function () {
  window.peer = this._peer = new Peer('robot1', {key: process.env.PEERJS_KEY, debug: 3})

  this._peer.on('open', function () {
    document.getElementById('my-id').innerHTML = this._peer.id
  })

  this._peer.on('call', function (call) {
    call.answer(window.localStream)

    // Hang up on an existing call if present
    if (window.existingCall) {
      window.existingCall.close()
    }

    // Wait for stream on the call, then set peer video display
    call.on('stream', function (stream) {
      document.getElementById('their-video')
        .setAttribute('src', window.URL.createObjectURL(stream))
    })

    window.existingCall = call
  })

  this._peer.on('connection', function (connection) {
    connection.on('data', function (data) {
      arduino.setSpeeds(data[0], data[1])
    })
  })

  this._peer.on('error', function () {
    this.connect()
  }.bind(this))
}

VideoView.prototype.disconnect = function () {
  if (this._peer) this._peer.disconnect()
}

VideoView.prototype.reconnect = function () {
  if (this._peer) this._peer.reconnect()
}

VideoView.prototype.ready = function () {
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia

  this.connect()

  setTimeout(function () {
    document.getElementById('forward').addEventListener('click', function () {
      console.log('forward')
      arduino.setSpeeds(255, 255)
    })
  }, 1000)

  navigator.getUserMedia({audio: true, video: true}, function (stream) {
    window.localStream = stream
  }, function (err) {
    console.error(JSON.stringify(err))
  })
}

VideoView.prototype.pause = function () {
  this.disconnect()
}

VideoView.prototype.resume = function () {
  this.reconnect()
}

module.exports = VideoView
