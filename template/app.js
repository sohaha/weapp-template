//app.js
const extra = require('./utils/extra')
App({
  onLaunch() {
    // 展示本地存储能力
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
    runInit: extra.runInit(),
    loginState: false
  },
  // 获取用户信息
  getUserInfo(cb) {
    if (this.globalData.userInfo) {
      this.globalData.runInit(cb, this.globalData.userInfo)
    } else {
      if (!this.globalData.loginState) {
        console.log('开始授权')
        this.globalData.loginState = true
        extra.login((e, v) => {
          console.log(e)
          this.globalData.loginState = false
          this.globalData.userInfo = e.userInfo
          cb && this.globalData.runInit(cb, true)
          //可以发送 v.code 到后台换取 openId, sessionKey, unionId
        }, err => {
          this.globalData.loginState = false
          console.warn(err)
          // this.globalData.runInit(cb, true)
          console.log('没有授权,跳转到授权页面')
          wx.navigateTo({
            url: '/pages/login/index'
          })
        })
      } else {
        console.log('等待授权')
        cb && this.globalData.runInit(cb, this.globalData.userInfo)
      }
    }
  }
})
