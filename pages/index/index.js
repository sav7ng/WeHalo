//index.js
//获取应用实例
const app = getApp()
const jinrishici = require('../../utils/jinrishici.js')

Page({
    data: {
        spinShow: true,
        Author: "Halo · Aquan",
        pageNum: 0,
    },
    //下拉刷新
    onPullDownRefresh() {

        // wx.showNavigationBarLoading() //在标题栏中显示加载
        var that = this //不要漏了这句，很重要
        var url = app.globalData.URL + '/api/archives/year'
        var userAvatarUrl = app.globalData.URL

        //微信自带Loading效果
        // wx.showLoading({
        //   title: '加载中',
        // })
        wx.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
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
    onLoad: function() {
        var that = this //不要漏了这句，很重要
        var url = app.globalData.URL + '/api/archives/year'
        var userAvatarUrl = app.globalData.URL

        //微信自带Loading效果
        // wx.showLoading({
        //   title: '加载中',
        // })
        wx.request({
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                //将获取到的json数据，存在名字叫zhihu的这个数组中
                console.log(res.data.result[0].posts)
                var posts_list = [];
                for (var i = 0; i < 5; i++) {
                    posts_list.push(res.data.result[0].posts[i]);
                }
                that.setData({

                    spinShow: false,
                    //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
                    userName: res.data.result[0].posts[0].user.userDisplayName,
                    userDesc: res.data.result[0].posts[0].user.userDesc,
                    userAvatar: userAvatarUrl + res.data.result[0].posts[0].user.userAvatar,
                    title: res.data.result[0].posts[0].postTitle,
                    content: res.data.result[0].posts[0].postContent,
                    posts: posts_list,
                    posts_list: res.data.result[0].posts,
                    imageUrl: app.globalData.URL
                })
                //取消Loading效果
                // wx.hideLoading()
            },
            fail: function() {
                console.log('接口调用失败');
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
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return{
            title: "AquanBlog",
            imageUrl: "https://blog.eunji.cn/upload/2018/10/maximilian-weisbecker-544039-unsplash20181109154144125.jpg"
        }
    },
    //加载更多
    onReachBottom: function () {
        
        var that = this;
        var pageNums = that.data.pageNum + 1;
        console.log('加载更多' + pageNums);
        var posts_list = [];
        console.log(posts_list);
        for (var i = 0; i < 5; i++) {
            posts_list.push(that.data.posts_list[i+5]);
        }

        // 设置数据
        that.setData({
            pageNum: pageNums,
            posts: that.data.posts.concat(posts_list),
        });
    },
})