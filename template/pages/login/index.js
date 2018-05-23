//获取应用实例
const app = getApp()
const mixins = require('../../utils/mixins.js')
const extra = require('../../utils/extra.js')

Page(Object.assign({}, mixins, {
  shareData: {
    title: '首页'
  },
  data: {},
  onLoad() {

  },
  getUserInfo(e) {
    if (extra.emitLogin(e)) {
      console.log('授权成功.返回上一页吧')
      wx.navigateBack()
    }
  },
  onUnload() {
    //防止用户没有授权就返回上一页面
    extra.emitLogin(false)
  }
}))
