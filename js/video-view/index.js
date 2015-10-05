'use strict'

const Peer = require('peerjs')
const fs = require('fs')

const Arduino = require('../lib/arduino')
const tmpl = fs.readFileSync(__dirname + '/index.html', 'utf-8')

class VideoView {
  constructor () {
    this.el = document.createElement('div')
    this.el.innerHTML = tmpl
  }

  connect () {
    window.peer = this._peer = new Peer('robot1', { key: process.env.PEERJS_KEY, debug: 3 })

    this._peer.on('open', function () {
      document.getElementById('my-id').innerHTML = this._peer.id
    })

    this._peer.on('call', function (call) {
      call.answer(window.localStream)

      // Hang up on an existing call if present
      if (window.existingCall) window.existingCall.close()

      // Wait for stream on the call, then set peer video display
      call.on('stream', function (stream) {
        document.getElementById('their-video')
          .setAttribute('src', window.URL.createObjectURL(stream))
      })

      window.existingCall = call
    })

    this._peer.on('connection', function (connection) {
      connection.on('data', function (data) {
        this.arduino.setSpeeds(data[0], data[1])
      })
    })

    this._peer.on('error', function () {
      this.connect()
    }.bind(this))
  }

  disconnect () {
    if (this._peer) this._peer.disconnect()
  }

  reconnect () {
    if (this._peer) this._peer.reconnect()
  }

  ready () {
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia

    this.arduino = new Arduino()

    this.connect()

    setTimeout(function () {
      document.getElementById('forward').addEventListener('click', function () {
        console.log('forward')
        this.arduino.setSpeeds(255, 255)
      })
    }, 1000)

    navigator.getUserMedia({audio: true, video: true}, function (stream) {
      window.localStream = stream
    }, function (err) {
      console.error(JSON.stringify(err))
    })
  }

  pause () {
    this.disconnect()
  }

  resume () {
    this.reconnect()
  }
}

module.exports = VideoView
