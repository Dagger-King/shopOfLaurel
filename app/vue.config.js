module.exports = {
    // 关闭exlint
    lintOnSave:false,
    devServer: {
        proxy: {
          '/api': {
            target: 'http://39.98.123.211',
            target: 'http://gmall-h5-api.atguigu.cn',

            pathRewrite: { '^/api': '' },
          },
        },
      },
}