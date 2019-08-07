// miniprogram/pages/halo/halo.js
const app = getApp();
const request = require('../../utils/request.js');
let util = require('../../utils/util.js');
let delay;//延时器
let i = 0;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        adminOpenid: app.globalData.adminOpenid,
        roleFlag: app.globalData.roleFlag,
        replyValue: null,
        commentList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var urlCounts = app.globalData.url + '/api/admin/counts';
        var paramCounts = {};
        // @todo 后台总览数据网络请求API数据
        request.requestGetApi(urlCounts, app.globalData.adminToken, paramCounts, this, this.successCounts, this.failCounts);
        var urlLatestComments = app.globalData.url + '/api/admin/posts/comments/latest';
        var paramLatestComments = {
            top: 5,
        };
        // @todo 后台总览数据网络请求API数据
        request.requestGetApi(urlLatestComments, app.globalData.adminToken, paramLatestComments, this, this.successLatestComments, this.failLatestComments);
        
        console.warn(app.globalData.userInfo);

        this.numDH();
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
        this.setData({
            roleFlag: app.globalData.roleFlag,
            adminOpenid: app.globalData.adminOpenid,
        })
        var that = this;
        // 云函数调用
        wx.cloud.callFunction({
            // 云函数名称
            name: 'get_wx_context',
            // 传给云函数的参数
            data: {
            },
            success(res) {
                // console.log("CloudResult:", res);
                // console.log("openidCloudResult:", res.result.openid);
                that.setData({
                    openid: res.result.openid
                });
                if (res.result.openid == that.data.adminOpenid) {
                    app.globalData.roleFlag = true;
                    that.setData({
                        roleFlag: true,
                    });
                    // console.warn("你是管理员！");
                } else {
                    app.globalData.roleFlag = false;
                    that.setData({
                        roleFlag: false,
                    });
                    // console.warn("你不是管理员！");
                };
            },
            fail: err => {
            },
        })
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
        i = 0;
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
    numDH: function() {
        var that = this;
        if(i < 30) {
            setTimeout(function () {
                that.setData({
                    post: i,
                    comment: i,
                    visit: i,
                    day: i,
                })
                i++
                that.numDH();
            }, 100)
        } else {
            that.setData({
                post: that.coutNum(that.data.postCount),
                comment: that.coutNum(that.data.commentCount),
                visit: that.coutNum(that.data.visitCount),
                day: that.coutNum(that.data.birthday),
            })
        }
    },
    coutNum: function(e) {
        if (e > 1000 && e < 10000) {
            e = (e / 1000).toFixed(1) + 'k'
        }
        if (e > 10000) {
            e = (e / 10000).toFixed(1) + 'W'
        }
        return e
    },
    
    // ListTouch触摸开始
    ListTouchStart(e) {
        this.setData({
            ListTouchStart: e.touches[0].pageX
        })
    },

    // ListTouch计算方向
    ListTouchMove(e) {
        this.setData({
            ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
        if (this.data.ListTouchDirection == 'left') {
            this.setData({
                modalName: e.currentTarget.dataset.target
            })
        } else {
            this.setData({
                modalName: null
            })
        }
        this.setData({
            ListTouchDirection: null
        })
    },

    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target,
            commentid: e.currentTarget.dataset.commentid,
            postid: e.currentTarget.dataset.postid,
            postTitle: e.currentTarget.dataset.posttitle,
            textareaFlag: true,
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null,
            textareaFlag: false,
        })
    },

    textareaAInput(e) {
        this.setData({
            textareaAValue: e.detail.value
        })
    },

    /**
     * 回复文本框获取值
     */
    replyValue: function(e) {
        this.setData({
            replyValue: e.detail.value
        })
        console.warn(e.detail.value)
    },

    reply: function() {

        var that = this;

        setTimeout(function () {
            if(that.data.replyValue != null && that.data.replyValue != '') {

                that.setData({
                    modalName: null,
                    textareaFlag: false,
                })

                var urlReply = app.globalData.url + '/api/admin/posts/comments';
                var paramReply = {
                    author: app.globalData.userInfo.nickName,
                    authorUrl: app.globalData.userInfo.avatarUrl,
                    content: that.data.replyValue,
                    email: "853029827@qq.com",
                    parentId: that.data.commentid,
                    postId: that.data.postid,
                };
                // @todo 后台总览数据网络请求API数据
            request.requestPostApi(urlReply, app.globalData.adminToken, paramReply, that, that.successReply, that.failReply);

                console.warn("reply" + that.data.replyValue)

            }else {
                wx.showToast({
                    title: '内容不能为空',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                })
            }   

        }, 100)


        
    },


    /**
     * 后台数据请求--接口调用成功处理
     */
    successCounts: function(res, selfObj) {
        var that = this;
        var time1 = Date.parse(new Date());
        var time2 = res.data.birthday;
        var runTime = parseInt((time1 - time2) / 1000);
        var day = Math.floor(runTime / 86400);
        that.setData({
            postCount: res.data.postCount,
            commentCount: res.data.commentCount,
            visitCount: res.data.visitCount,
            birthday: day,
        })
    },
    /**
     * 后台数据请求--接口调用失败处理
     */
    failCounts: function (res, selfObj) {
        console.error('failAdminLogin', res)
    },


    /**
     * 最新评论请求--接口调用成功处理
     */
    successLatestComments: function(res, selfObj) {
        var that = this;
        console.warn(res)
        var list = res.data;
        for (let i = 0; i < list.length; ++i) {
            list[i].createTime = util.customFormatTime(list[i].createTime, 'Y-M-D  h:m:s');
            if (list[i].isAdmin) {
                list[i].email = '';
                list[i].authorUrl = app.globalData.userInfo.avatarUrl;
            }
        }
        that.setData({
            commentList: res.data,
        })
        console.warn(that.data.commentList)
    },
    /**
     * 最新评论请求--接口调用失败处理
     */
    failLatestComments: function (res, selfObj) {
        console.error('failLatestComments', res)
    },

    
    /**
     * 回复评论请求--接口调用成功处理
     */
    successReply: function (res, selfObj) {
        var that = this;
        // console.warn(res);
        wx.showToast({
            title: '成功回复评论',
            icon: 'none',
            duration: 2000,
            mask: true
        })
        var newComment = [{
            author: res.data.author,
            authorUrl: app.globalData.userInfo.avatarUrl,
            content: res.data.content,
            createTime: util.customFormatTime(res.data.createTime, 'Y-M-D  h:m:s'),
            email: '',
            id: res.data.id,
            isAdmin: true,
            post: {
                id: that.data.postid,
                title: that.data.postTitle,
            }
        }];
        that.setData({
            replyValue: null,
            commentList: newComment.concat(that.data.commentList),
        });
    },
    /**
     * 回复评论请求--接口调用失败处理
     */
    failReply: function (res, selfObj) {
        console.error('failReply', res)
    },

})