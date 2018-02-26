//app.js
const extra = require("./utils/extra")

App({
    onLaunch() {
        // 展示本地存储能力
        let logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        this.getUserInfo()

    },
    globalData: {
        userInfo: null
    },
    getUserInfo(must = 0, cb) {
        // 获取用户信息
        extra.login(false, must, '为了能更好的使用该小程序，请先授权').then(res => {
            console.log(res)
            this.globalData.userInfo = res.userInfo
            if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
            }
            //发送 res.code 到后台换取 openId, sessionKey, unionId
        }).catch(err => {
            console.warn(err)
        })
    }
})