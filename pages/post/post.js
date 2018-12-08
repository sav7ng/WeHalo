// pages/post/post.js
const app = getApp();
const { $Message } = require('../../dist/base/index');

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
        visible: false,
        actions: [
            {
                name: '保存图片',
                color: '#2d8cf0',
            },
            {
                name: '取消'
            }
        ],
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
                console.log(res.data.result)
                that.setData({
                    post: res.data.result,
                    imageUrl: app.globalData.URL + res.data.result.postThumbnail,
                    postAuthor: res.data.result.user.userDisplayName,
                    userDesc: res.data.result.user.userDesc,
                    postDate: res.data.result.postDate,
                    postTitle: res.data.result.postTitle,
                    postSummary: res.data.result.postSummary
                })
                //取消Loading效果
                // wx.hideLoading()

                //动态设置当前页面的标题
                wx.setNavigationBarTitle({
                    title: res.data.result.postTitle,
                })
            }
        })

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
})
