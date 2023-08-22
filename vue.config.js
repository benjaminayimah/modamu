const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
      proxy: 'https://api.modamuvillage.com'
  },
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