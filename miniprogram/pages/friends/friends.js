const app = getApp();
const request = require('../../utils/request.js');
Page({

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

    onReady: function () {

    },

    onShow: function () {

    },

    onHide: function () {

    },

    onUnload: function () {

    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },

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