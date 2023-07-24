// miniprogram/pages/halo/halo.js
const app = getApp();
const request = require('../../utils/request.js');
let util = require('../../utils/util.js');
let delay;
let i = 0;
Page({

    data: {
        adminOpenid: app.globalData.adminOpenid,
        roleFlag: app.globalData.roleFlag,
        replyValue: null,
        commentList: [],
    },

    onLoad: function (options) {
        var urlCounts = app.globalData.url + '/api/admin/statistics';
        var paramCounts = {};
        request.requestGetApi(urlCounts, app.globalData.adminToken, paramCounts, this, this.successCounts, this.failCounts);
        var urlLatestComments = app.globalData.url + '/api/admin/posts/comments/latest';
        var paramLatestComments = {
            top: 5,
        };
        request.requestGetApi(urlLatestComments, app.globalData.adminToken, paramLatestComments, this, this.successLatestComments, this.failLatestComments);
        
        console.warn(app.globalData.userInfo);

        this.numDH();
    },

    onReady: function () {
    },

    onShow: function () {
        this.setData({
            roleFlag: app.globalData.roleFlag,
            adminOpenid: app.globalData.adminOpenid,
        })
        var that = this;
        wx.cloud.callFunction({
            name: 'get_wx_context',
            data: {
            },
            success(res) {
                that.setData({
                    openid: res.result.openid
                });
                if (res.result.openid == that.data.adminOpenid) {
                    app.globalData.roleFlag = true;
                    that.setData({
                        roleFlag: true,
                    });
                } else {
                    app.globalData.roleFlag = false;
                    that.setData({
                        roleFlag: false,
                    });
                };
            },
            fail: err => {
            },
        })
    },

    onHide: function () {
    },

    onUnload: function () {
        i = 0;
    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },

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

    ListTouchStart(e) {
        this.setData({
            ListTouchStart: e.touches[0].pageX
        })
    },

    ListTouchMove(e) {
        this.setData({
            ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        })
    },

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

    failCounts: function (res, selfObj) {
        console.error('failAdminLogin', res)
    },

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
            let title=list[i].post.title;
            if(title.length>15){
                list[i].post.title=title.substring(0,15)+'...'
            }
        }
        that.setData({
            commentList: res.data,
        })
        console.warn(that.data.commentList)
    },

    failLatestComments: function (res, selfObj) {
        console.error('failLatestComments', res)
    },

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

    failReply: function (res, selfObj) {
        console.error('failReply', res)
    },

})