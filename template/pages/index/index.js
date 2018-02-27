//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs"
    })
  },
  onLoad() {
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
})
