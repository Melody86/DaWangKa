// 本地环境配置
module.exports = {
  title: '大王卡',
  baseUrl: 'http://localhost:9018', // 项目地址
  baseApi: '/api/', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  APPID: process.env.VUE_APP_APPID,
  APPSECRET: 'xxx',
  $cdn: 'https://www.sunniejs.cn/static'
}
