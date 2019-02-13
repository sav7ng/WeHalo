function _textDecoration(decoration, index, color) {
    return ({
        type: 'text',
        text: decoration,
        css: [{
            top: `${startTop + index * gapSize}rpx`,
            color: color,
            textDecoration: decoration,
        }, common],
    });
}
const app = getApp();
const { $Message } = require('../../dist/base/index');
const request = require('../../utils/request.js');

// pages/poster/poster.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        createPoster: {}
    },

    onImgOK(e) {
        this.imagePath = e.detail.path;
        console.log(e);
    },

    saveImage() {
        wx.saveImageToPhotosAlbum({
            filePath: this.imagePath,
        });
        $Message({
            content: '海报保存成功( • ̀ω•́ )✧',
            duration: 2
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        request.requestGetApi(url, token, params, this, this.successFunPoster, this.failFunPoster);

        //微信自带Loading效果
        wx.showLoading({
          title: '正在生成',
        });

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

    handleOpen() {
        var that = this;
        that.setData({
            visible: true,
            createPoster: {
                width: '600rpx',
                height: '600rpx',
                background: '#fff',
                borderRadius: '7px',
                views: [

                    {
                        type: 'image',
                        url: that.data.imageUrl,
                        css: {
                            width: '600rpx',
                            height: '450rpx',
                        }
                    },
                    {
                        type: 'image',
                        url: 'https://blog.eunji.cn/upload/2018/11/wx20181208174737572.png',
                        css: {
                            width: '600rpx',
                            height: '167rpx',
                            mode: 'scaleToFill',
                            top: '433rpx',
                        }
                    },
                    {
                        type: 'text',
                        text: that.data.postTitle,
                        css: {
                            top: `50rpx`,
                            fontSize: '45rpx',
                            color: '#fff',
                            fontWeight: 'bold',
                            align: 'center',
                            width: '600rpx',
                            left: '300rpx'
                        }
                    },
                    {
                        type: 'text',
                        text: that.data.postAuthor + " · " + that.data.postDate + " · " + "WeHalo",
                        css: {
                            left: '300rpx',
                            top: '380rpx',
                            fontSize: '20rpx',
                            color: '#fff',
                            width: '600rpx',
                            align: 'center',
                        }
                    },
                ]
            },
        });

    },

    handleClick({ detail }) {
        const index = detail.index;

        if (index === 0) {
            $Message({
                content: '保存图片'
            });
            wx.saveImageToPhotosAlbum({
                filePath: this.imagePath,
                createPoster: {},
            });

        }

        this.setData({
            visible: false,
            createPoster: {},
        });
    },

    /**
    * return返回上一页
    */
    returnPage() {
        wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
        })
    },

    /**
     * 生成海报请求--接口调用成功处理
     */
    successFunPoster: function (res, selfObj) {
        var that = this;
        that.setData({
            imageUrl: app.globalData.URL + res.result.postThumbnail,
            postAuthor: res.result.user.userDisplayName,
            postDate: res.result.postDate,
            postTitle: res.result.postTitle
        });
        that.setData({
            visible: true,
            createPoster: {
                width: '600rpx',
                height: '600rpx',
                background: '#fff',
                borderRadius: '7px',
                views: [

                    {
                        type: 'image',
                        url: that.data.imageUrl,
                        css: {
                            width: '600rpx',
                            height: '450rpx',
                        }
                    },
                    {
                        type: 'image',
                        url: 'https://blog.eunji.cn/upload/2018/11/wx20181208174737572.png',
                        css: {
                            width: '600rpx',
                            height: '167rpx',
                            mode: 'scaleToFill',
                            top: '433rpx',
                        }
                    },
                    {
                        type: 'text',
                        text: that.data.postTitle,
                        css: {
                            top: `50rpx`,
                            fontSize: '45rpx',
                            color: '#fff',
                            fontWeight: 'bold',
                            align: 'center',
                            width: '600rpx',
                            left: '300rpx'
                        }
                    },
                    {
                        type: 'text',
                        text: that.data.postAuthor + " · " + that.data.postDate + " · " + "WeHalo",
                        css: {
                            left: '300rpx',
                            top: '380rpx',
                            fontSize: '20rpx',
                            color: '#fff',
                            width: '600rpx',
                            align: 'center',
                        }
                    },
                ]
            },
        });


        //取消Loading效果
        wx.hideLoading();
    },

    /**
     * 生成海报请求--接口调用失败处理
     */
    failFunPoster: function (res, selfObj) {
        console.log('failFunPoster', res)
    },
    
})