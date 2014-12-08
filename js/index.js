require('fastclick');

var debug = require('debug')('app');

// require the video view so we can instantiate it
var VideoView = require('./video-view');

// make a view
var view = VideoView();

// add it to the page
var container = document.querySelector('.app');
container.appendChild(view.el);

document.addEventListener('deviceready', view.ready.bind(view), false);
document.addEventListener('pause', view.pause.bind(view), false);
document.addEventListener('resume', view.resume.bind(view), false);
