//index.js
//获取应用实例
const app = getApp()
const mixins = require("../../utils/mixins.js")

Page(Object.assign({}, mixins, {
  shareData: {
    title: "首页"
  },
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs?name=log"
    })
  },
  onLoad() {
    console.log("当前页面URL:", this.getCurrentPageUrl())
    app.getUserInfo(0, () => {
      console.log("onLoad授权结果:", app.globalData.userInfo)

      if (app.globalData.userInfo) {
        this.setUserInfo()
      }
    })
  },
  setUserInfo() {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },
  //点击按钮授权
  getUserInfo() {
    app.getUserInfo(1, () => {
      console.log("点击按钮授权结果:", app.globalData.userInfo)

      if (app.globalData.userInfo) {
        this.setUserInfo()
      }
    })
  }
}))
