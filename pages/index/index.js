//index.js
//获取应用实例
const app = getApp()
const jinrishici = require('../../utils/jinrishici.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    spinShow: true,
    imgUrl: "https://blog.eunji.cn/upload/2018/10/maximilian-weisbecker-544039-unsplash20181109154144125.jpg",
  },
  //下拉刷新
  onPullDownRefresh() {

    // wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this//不要漏了这句，很重要
    var url = 'https://blog.eunji.cn/api/archives/year'
    var userAvatarUrl = 'https://blog.eunji.cn'

    //微信自带Loading效果
    // wx.showLoading({
    //   title: '加载中',
    // })
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        console.log(res.data.result[0].posts[0])
        that.setData({

          spinShow: false,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
          userName: res.data.result[0].posts[0].user.userDisplayName,
          userDesc: res.data.result[0].posts[0].user.userDesc,
          userAvatar: userAvatarUrl + res.data.result[0].posts[0].user.userAvatar,
          title: res.data.result[0].posts[0].postTitle,
          content: res.data.result[0].posts[0].postContent,
          posts: res.data.result[0].posts,
        })
        //取消Loading效果
        // wx.hideLoading()
      }
    })
    jinrishici.load(result => {
      // 下面是处理逻辑示例
      console.log(result)
      this.setData({
        "jinrishici": result.data.content,
        shici: result.data.origin.content,
      })
      //关闭下拉刷新
      wx.stopPullDownRefresh()
    })

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onSwitchChange({ detail }) {
    const value = detail.value;
    this.setData({
      switch: value,
      spinShow: !value
    });
  },
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    var url = 'https://blog.eunji.cn/api/archives/year'
    var userAvatarUrl = 'https://blog.eunji.cn'

    //微信自带Loading效果
    // wx.showLoading({
    //   title: '加载中',
    // })
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        console.log(res.data.result[0].posts[0])
        that.setData({

          spinShow: false,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
          userName: res.data.result[0].posts[0].user.userDisplayName,
          userDesc: res.data.result[0].posts[0].user.userDesc,
          userAvatar: userAvatarUrl + res.data.result[0].posts[0].user.userAvatar,
          title: res.data.result[0].posts[0].postTitle,
          content: res.data.result[0].posts[0].postContent,
          posts: res.data.result[0].posts,
        })
        //取消Loading效果
        // wx.hideLoading()
      }
    })
    jinrishici.load(result => {
      // 下面是处理逻辑示例
      console.log(result)
      this.setData({
        "jinrishici": result.data.content,
        shici: result.data.origin.content,
      })
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
