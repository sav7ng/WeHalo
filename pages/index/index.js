//index.js
//获取应用实例
const app = getApp()
const jinrishici = require('../../utils/jinrishici.js')

Page({
    data: {
        spinShow: true,
        Author: "Aquan · Halo",
        Num: 5,
        pageNum: 0,
        Flag: 0,
        loadMore: false,
        loadMores: true,
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
                    //加载更多数据归零
                    pageNum: 0,
                    Flag: 0,
                    loadMores: true,

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
                    imageUrl: app.globalData.URL,
                    total: res.data.result[0].count,
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
        var total = that.data.total;
        var a = total % 5;
        // var b = (total / 5).toFixed(0);
        var b = Math.floor(total / 5);
        console.log(a + "|" + b);
        var Num = 5;
        var flag = 0;
        if(flag == 0) {
            if (that.data.pageNum < b-1) {

                console.log(that.data.pageNum)
                for (var i = 0; i < 5; i++) {
                    posts_list.push(that.data.posts_list[i + (Num * pageNums)]);
                }
            } else{
                for (var i = 0; i < b; i++) {
                    posts_list.push(that.data.posts_list[i + (Num * pageNums)]);
                }
                flag = 1;
            }
        }
        console.log(posts_list);

        that.setData({
            loadMore: true,
        });

        if (that.data.Flag == 0) {
            setTimeout(function () {
                that.setData({
                    pageNum: pageNums,
                    posts: that.data.posts.concat(posts_list),
                    Flag: flag,
                    loadMore: false,
                });
            }, 500)
        } else {
            that.setData({
                loadMore: false,
                loadMores: false,
            });
        }
        
    },
})