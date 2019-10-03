// miniprogram/pages/wehalo/wehalo.js
//获取应用实例
const app = getApp();
const request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        skin: app.globalData.skin,
        loading: true,
        animationTime: 1,
        LinksList: '',
        colourList: [{
            colour: 'bg-red'
        }, {
            colour: 'bg-orange'
        }, {
            colour: 'bg-yellow'
        }, {
            colour: 'bg-olive'
        }, {
            colour: 'bg-green'
        }, {
            colour: 'bg-cyan'
        }, {
            colour: 'bg-blue'
        }, {
            colour: 'bg-purple'
        }, {
            colour: 'bg-mauve'
        }, {
            colour: 'bg-pink'
        }, {
            colour: 'bg-lightBlue'
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.randomNum();
        var urlLinks = app.globalData.url + '/api/content/links';
        var token = app.globalData.token;
        var params = {
            sort: 'id,asc'
        };
        //@todo Links网络请求API数据
        request.requestGetApi(urlLinks, token, params, this, this.successLinks, this.failLinks);
        
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

    successLinks: function (res, selfObj) {
        var that = this;
        console.warn(res.data);
        that.setData({
            LinksList: res.data,
        });
    },

    failLinks: function (res, selfObj) {
        console.error('failLinks', res)
    },

    //获取随机数
    randomNum: function () {
        var num = Math.floor(Math.random() * 10);
        this.setData({
            randomNum: num
        });
    },

    prevent(event) {
        // console.log(event.currentTarget.dataset.url);
        var self = this;
        wx.setClipboardData({
            data: event.currentTarget.dataset.url,
        });

    },
})