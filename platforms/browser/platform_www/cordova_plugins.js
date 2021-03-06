cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.github.warp.cordova-firmata/www/firmata.js",
        "id": "com.github.warp.cordova-firmata.Firmata",
        "pluginId": "com.github.warp.cordova-firmata",
        "clobbers": [
            "firmata"
        ]
    },
    {
        "file": "plugins/com.github.warp.cordova-firmata/src/browser/FirmataProxy.js",
        "id": "com.github.warp.cordova-firmata.FirmataProxy",
        "pluginId": "com.github.warp.cordova-firmata",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.github.warp.cordova-firmata": "0.1.0"
}
// BOTTOM OF METADATA
});