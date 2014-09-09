require('fastclick');

var debug = require('debug')('app');

// require the video view so we can instantiate it
var VideoView = require('./video-view');

// make a view
var view = VideoView();

// add it to the page
var container = document.querySelector('.app');
container.appendChild(view.el);

// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
document.addEventListener('deviceready', deviceReady, false);

function deviceReady(ev) {
    debug('device ready');
    view.ready();
};
