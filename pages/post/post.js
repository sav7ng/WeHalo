// pages/post/post.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
const request = require('../../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollTop: 0,
        linenums: false,
        spinShow: true,
        Author: "WeHalo",
        spinShows: '',
        style: app.globalData.highlightStyle,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            postId: options.postId,
        })
        // wx.showNavigationBarLoading() //在标题栏中显示加载
        var that = this; //不要漏了这句，很重要
        var postId = options.postId;
        var url = app.globalData.URL + '/api/posts/' + postId;
        var userAvatarUrl = app.globalData.URL;
        var token = app.globalData.TOKEN;
        var params = {};
        //@todo 网络请求API数据
        request.requestGetApi(url, token, params, this, this.successFunPost, this.failFunPost);

        spinShows: setTimeout(function() {
            that.setData({
                spinShow: !that.data.spinShow,
            });
            // console.log("spinShow");
        }, 2000)

    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        let spinShows = this.data.spinShows;
        let that = this;
        clearInterval(spinShows);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this;
        $Message({
            content: '请听博主下回分解( • ̀ω•́ )✧',
            duration: 2
        });
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    

    /**
     * return返回上一页
     */
    returnPage() {
        console.log("return返回上一页");
        wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
        })
    },

    /**
     * 文章详情请求--接口调用成功处理
     */
    successFunPost: function (res, selfObj) {
        var that = this;

        that.setData({
            post: res.result,
            postDate: res.result.postDate,
            postTitle: res.result.postTitle,
        })
        //动态设置当前页面的标题
        wx.setNavigationBarTitle({
            title: res.result.postTitle,
        })
    },

    /**
     * 文章详情请求--接口调用失败处理
     */
    failFunPost: function (res, selfObj) {
        console.log('failFunPosts', res)
    },

})
