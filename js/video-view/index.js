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
    this.peer = new Peer('robot1', { key: process.env.PEERJS_KEY, debug: 3 })

    this.peer.on('open', () => {
      document.getElementById('my-id').innerHTML = this.peer.id
    })

    this.peer.on('call', (call) => {
      call.answer(this.localStream)

      // Hang up on an existing call if present
      if (this.call) this.call.close()

      // Wait for stream on the call, then set peer video display
      call.on('stream', (stream) => {
        document.getElementById('their-video')
          .setAttribute('src', window.URL.createObjectURL(stream))
      })

      this.call = call
    })

    this.peer.on('connection', (connection) => {
      connection.on('data', (data) => {
        this.arduino.setSpeeds(data[0], data[1])
      })
    })

    this.peer.on('error', this.connect.bind(this))
  }

  disconnect () {
    if (this.peer) this.peer.disconnect()
  }

  reconnect () {
    if (this.peer) this.peer.reconnect()
  }

  ready () {
    this.arduino = new Arduino()

    this.connect()

    setTimeout(() => {
      document.getElementById('forward').addEventListener('click', () => {
        console.log('forward')
        this.arduino.setSpeeds(255, 255)
      })
    }, 1000)

    if (!navigator.getUserMedia) {
      navigator.getUserMedia = navigator.webkitGetUserMedia
    }

    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      this.localStream = stream
    }, (err) => {
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
