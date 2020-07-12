module.exports = {
  runtimeCompiler: true,
  publicPath: '',
  pluginOptions: {
    cordovaPath: 'src-cordova',
    moment: {
      locales: [
        ''
      ]
    }
  },
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    module: {
      rules: [
      ]
    },
    plugins: [
    ],
  }
}
