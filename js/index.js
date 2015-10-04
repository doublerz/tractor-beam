'use strict'

require('fastclick')

const VideoView = require('./video-view')
const view = new VideoView()

const container = document.querySelector('.app')
container.appendChild(view.el)

document.addEventListener('deviceready', view.ready.bind(view), false)
document.addEventListener('pause', view.pause.bind(view), false)
document.addEventListener('resume', view.resume.bind(view), false)
