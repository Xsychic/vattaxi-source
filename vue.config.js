const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            preload: 'dist_electron/src/preload.js',
            builderOptions: {
                extraFiles: {
                    from: 'SimConnectServer/',
                    to: 'SimConnectServer/'
                }
            }
        }
    }
})
