//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    var url = 'https://blog.eunji.cn/api/archives/year'
    var userAvatarUrl = 'https://blog.eunji.cn'
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        console.log(res.data.result[0].posts[0].user)
        that.setData({
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
          userName: res.data.result[0].posts[0].user.userDisplayName,
          userDesc: res.data.result[0].posts[0].user.userDesc,
          userAvatar: userAvatarUrl + res.data.result[0].posts[0].user.userAvatar,
          title: res.data.result[0].posts[0].postTitle,
          content: res.data.result[0].posts[0].postContent,
          posts: res.data.result[0].posts,
        })
      }
    })

    // https://blog.eunji.cn/api/archives/year
    // wx.request({
    //   url: 'https://blog.eunji.cn/api/archives/year', //仅为示例，并非真实的接口地址
    //   data: {},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
  }
})
