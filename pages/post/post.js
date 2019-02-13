// pages/post/post.js
const app = getApp();
const { $Message } = require('../../dist/base/index');
const request = require('../../utils/request.js');
var page = undefined;

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
        commentsFlag: false,
        style: app.globalData.highlightStyle,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userAgent: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {


        /**
         * 获取用户信息
         */
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
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.UserInfo,
                        hasUserInfo: true
                    })
                }
            })
        }


        page = this;
        this.setData({
            postId: options.postId,
        })
        // wx.showNavigationBarLoading() //在标题栏中显示加载
        var that = this; //不要漏了这句，很重要
        var postId = options.postId;
        var url = app.globalData.URL + '/api/posts/' + postId;
        var token = app.globalData.TOKEN;
        var params = {};

        //@todo commentFlag网络请求API数据
        var commentUrl = app.globalData.URL + '/api/options/one?optionName=comment_api_switch';
        request.requestGetApi(commentUrl, token, params, this, this.successComment, this.failComment);

        //@todo 文章内容网络请求API数据
        request.requestGetApi(url, token, params, this, this.successFunPost, this.failFunPost);

        spinShows: setTimeout(function() {
            that.setData({
                spinShow: !that.data.spinShow,
            });
            // console.log("spinShow");

            that.bindbt();
        }, 2000)

        // intervalBarrage: setInterval(function () {
        //     setTimeout(function () {
        //         that.bindbt();
        //     }, 200);
        // }, 2000);

        wx.getSystemInfo({
            success(res) {
                var agentInfo = res.platform + '|' + res.brand + '|' + res.model + '|' + res.system + '|' + res.language;
                that.setData({
                    userAgent: agentInfo,
                })
            }
        });

    },

    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo;
        // app.globalData.nickName = e.detail.userInfo.nickName;
        // app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
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
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        let spinShows = this.data.spinShows;
        var that = this;
        clearInterval(spinShows);
        that.setData({
            barrages: [],
        });
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
        wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
        })
    },

    /**
     * 文章详情请求--接口调用成功处理
     */
    successFunPost: function (res, selfObj) {
        var that = this;
        var barrages = [];

        that.setData({
            post: res.result,
            postDate: res.result.postDate,
            postTitle: res.result.postTitle,
            comments: res.result.comments,
            commentsCount: res.result.comments.length,
        })

        for (i = 0; i < that.data.comments.length; i++) {
            var temp = that.data.comments[i].commentContent;
            //js正则过滤HTML标签
            let reg = new RegExp(/<[^<>]+>/g);
            let temps = temp.replace(reg, '');
            barrages[i] = that.data.comments[i].commentAuthor + "：" + temps;
        };

        that.setData({
            barrages: barrages,
        })


        console.log(that.data.commentsCount);

        console.log(that.data.barrages);
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

    /**
     * 评论开启请求--接口调用成功处理
     */
    successComment: function (res, selfObj) {
        var that = this;
        if (res.result == 'true') {
            that.setData({
                commentsFlag: true,
            });
        }
    },

    /**
     * 评论开启请求--接口调用失败处理
     */
    failComment: function (res, selfObj) {
        console.log('failFunComment', res)
    },

    /**
     * 弹幕评论
     */
    bindbt: function () {
        var that = this;
        var i = 0;
        for (i; i < that.data.commentsCount; i++) {
            doommList.push(new Doomm(that.data.barrages[i], Math.ceil(Math.random() * 100), 2 + Math.ceil(Math.random() * 10), getRandomColor()));
            that.setData({
                doommData: doommList
            })
        }
    },

    /**
     * 评论文本框获取值
     */
    bindKeyInput(e) {
        this.setData({
            inputValue: e.detail.value,
        })
    },

    /**
     * 发送评论
     */
    sendComment() {
        var that = this;
        var postId = that.data.postId;
        var url = app.globalData.URL + '/api/comments/save';
        var token = app.globalData.TOKEN;
        var params = {
            postId: postId,
            commentContent: that.data.inputValue,
            commentAuthor: app.globalData.userInfo.nickName,
            commentAuthorEmail: '',
            commentAuthorUrl: app.globalData.userInfo.avatarUrl,
            commentAgent: that.data.userAgent,
            commentParent: '0',
        };


        if (that.data.inputValue != null && that.data.inputValue != '') {
            doommList.push(new Doomm(that.data.inputValue, Math.ceil(Math.random() * 100), 2 + Math.ceil(Math.random() * 10), getRandomColor()));
            that.setData({
                doommData: doommList,
                inputValue: '',
            });

            //@todo 文章内容网络请求API数据
            request.requestPostApi(url, token, params, this, this.successSend, this.failSend);
        } else {
            $Message({
                content: '请输入吐槽内容',
                duration: 2
            });
        }
    },

    /**
     * 发送评论请求--接口调用成功处理
     */
    successSend: function (res, selfObj) {
        var that = this;
        console.log(res.msg);
    },
    
    /**
     * 发送评论请求--接口调用失败处理
     */
    failSend: function (res, selfObj) {
        console.log('failSend', res)
    },

    /**
     * 生成海报跳转
     */
    createPoster() {
        console.log("createPoster生成海报");
        wx.navigateTo({
            url: '../poster/poster?postId=' + this.data.postId,
        })
    },



})

/**
 * 弹幕评论
 */
var doommList = [];
var i = 0;
class Doomm {
    constructor(text, top, time, color) {
        // var index = Math.floor((Math.random() * text.length)); 
        // this.text = text[index];
        this.text = text;
        this.top = top;
        this.time = time;
        this.color = color;
        this.display = true;
        let that = this;
        this.id = i++;
        setTimeout(function () {
            doommList.splice(doommList.indexOf(that), 1);
            page.setData({
                doommData: doommList
            })
        }, this.time * 1000)
    }
}
function getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}