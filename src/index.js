'use strict'

const TractorBeam = require('./TractorBeam')
const SimpleWebRTC = require('simplewebrtc')

document.addEventListener('deviceready', function () {
  const tractorBeam = new TractorBeam()

  const webrtc = new SimpleWebRTC({
    remoteVideosEl: 'remotesVideos',
    socketio: { transports: ['websocket'] },
    debug: true
  })

  webrtc.connection.on('connect_error', function (error) {
    console.log(error)
  })

  webrtc.on('readyToCall', function () {
    webrtc.joinRoom('tractor-beam')

    webrtc.on('createdPeer', function (peer) {
      peer.on('channelMessage', function (peer, label, message) {
        if (message.type === 'speeds') tractorBeam.setSpeeds(message.payload)
      })
    })
  })

  webrtc.startLocalVideo()
  tractorBeam.connect()
})
