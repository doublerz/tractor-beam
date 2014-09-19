cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.github.warp.cordova-firmata/www/firmata.js",
        "id": "com.github.warp.cordova-firmata.Firmata",
        "clobbers": [
            "cordova.plugins.firmata"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.github.warp.cordova-firmata": "0.1.0"
}
// BOTTOM OF METADATA
});