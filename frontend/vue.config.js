module.exports = {
  "lintOnSave": false,
  "runtimeCompiler": true,
  "publicPath": "",
  "pluginOptions": {
    "cordovaPath": "src-cordova",
    "moment": {
      "locales": [
        ""
      ]
    }
  },
  "devServer": {
    "port": 9000,
    "open": true,
    "overlay": {
      "warnings": false,
      "errors": true
    },
    "proxy": {
      "/django": {
        "target": "http://localhost:9010",
        "secure": false
      },
      "/node": {
        "target": "http://localhost:9020",
        "secure": false
      }
    }
  },
  "configureWebpack": {
    "module": {
      "rules": []
    },
    "plugins": []
  },
  "transpileDependencies": [
    "vuetify"
  ]
}