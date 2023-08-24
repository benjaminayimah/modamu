const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //     proxy: 'http://127.0.0.1:8000'
  // },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/index.scss";
        `
      }
    }
  }
})