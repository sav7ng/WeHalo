// miniprogram/pages/post/post.js
const app = getApp()
const request = require('../../utils/request.js');
let time = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        skin: app.globalData.skin,
        style: app.globalData.highlightStyle,
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {



        // 在页面中定义插屏广告
        let interstitialAd = null

        // 在页面onLoad回调事件中创建插屏广告实例
        if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
            adUnitId: 'adunit-296c920c08da636d'
        })
        interstitialAd.onLoad(() => { })
        interstitialAd.onError((err) => { })
        interstitialAd.onClose(() => { })
        }

        // 在适合的场景显示插屏广告
        if (interstitialAd) {
        interstitialAd.show().catch((err) => {
            console.error(err)
        })
        }


        var postId = options.postId;
        // console.log(postId);
        this.setData({
            postId: postId
        })


        var urlContent = app.globalData.url + '/api/content/posts/' + postId;
        var token = app.globalData.token;
        var params = {};
        //@todo 文章内容网络请求API数据
        request.requestGetApi(urlContent, token, params, this, this.successFunPost, this.failFunPost);

        var urlComments = urlContent + '/comments/list_view';
        //@todo 评论列表网络请求API数据
        request.requestGetApi(urlComments, token, params, this, this.successComment, this.failComment);


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getUserInfo: function (e) {
        // console.log(e)
        app.globalData.userInfo = e.detail.userInfo;
        // app.globalData.nickName = e.detail.userInfo.nickName;
        // app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },

    /**
     * 文章详情请求--接口调用成功处理
     */
    successFunPost: function (res, selfObj) {
        var that = this;

        // console.warn(res.data);
        var createTime = res.data.createTime;
        // time.customFormatTime(createTime, 'Y-M-D h:m:s');
        // 当前时间的日期格式
        // var date = new Date();
        // console.log(time.formatTime(date+"123"));

        that.setData({
            postTitle: res.data.title,
            postVisits: res.data.visits,
            postLikes: res.data.likes,
            postContent: res.data.originalContent,
            postDate: time.customFormatTime(createTime, 'Y-M-D'),
            postTags: res.data.tags
        })
        // console.warn(postTags);

    },
    /**
     * 文章详情请求--接口调用失败处理
     */
    failFunPost: function (res, selfObj) {
        console.error('failFunPosts', res)
    },


    /**
     * 评论列表请求--接口调用成功处理
     */
    successComment: function (res, selfObj) {
        var that = this;
        console.warn(res.data);
        var list = res.data.content;
        for (let i = 0; i < list.length; ++i) {
            list[i].createTime = time.customFormatTime(list[i].createTime, 'Y-M-D  h:m:s');
            list[i].falg = true;
            if (list[i].isAdmin) {
                list[i].email = '';
                list[i].authorUrl = 'https://cn.gravatar.com/avatar/3958035fa354403fa9ca3fca36b08068?s=256&d=mm';
            }
        }

        list[list.length - 1].falg = false;
        that.setData({
            commentList: res.data.content,
        })
    },
    /**
     * 评论列表请求--接口调用失败处理
     */
    failComment: function (res, selfObj) {
        console.error('failComment', res)
    },
})