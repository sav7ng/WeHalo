//index.js
//获取应用实例
const app = getApp();
const jinrishici = require('../../utils/jinrishici.js');
const { $Message } = require('../../dist/base/index');
const request = require('../../utils/request.js');


Page({
    /**
     * 页面的初始数据
     */
    data: {
        spinShow: true,
        Author: "WeHalo",
        Num: 5,
        pageNum: 0,
        Flag: 0,
        loadMore: false,
        loadMores: true,
        blogName: app.globalData.blogName,
        aflag: true,
        scrollTop: 0,
        nav: false,
        showMessage: false,
    },

    /**
     * 接口调用成功处理
     */
    successFun: function (res, selfObj) {
        selfObj.setData({
            resultData: res.result[0].posts,
        })
    },

    /**
     * 接口调用失败处理
     */
    failFun: function (res, selfObj) {
        console.log('failFun', res)
    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {

        // wx.showNavigationBarLoading() //在标题栏中显示加载
        var that = this; //不要漏了这句，很重要
        var url = app.globalData.URL + '/api/archives/year';
        var userAvatarUrl = app.globalData.URL;
        var token = app.globalData.TOKEN;

        console.log(token);
        //微信自带Loading效果
        // wx.showLoading({
        //   title: '加载中',
        // })
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': token
            },
            success: function(res) {
                console.log(res.data.result[0].posts[0]);
                var posts_list = [];
                var count = res.data.result[0].count;
                console.log(count);
                if (count < 5) {
                    for (var i = 0; i < count; i++) {
                        posts_list.push(res.data.result[0].posts[i]);
                    }
                } else {
                    for (var i = 0; i < 5; i++) {
                        posts_list.push(res.data.result[0].posts[i]);
                    }
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
                // wx.hideLoading();
            }
        })
        jinrishici.load(result => {
            // 下面是处理逻辑示例
            console.log(result);
            this.setData({
                "jinrishici": result.data.content,
                shici: result.data.origin.content,
            })
            //关闭下拉刷新
            wx.stopPullDownRefresh();
        })

    },

    /**
     * 事件处理函数
     */
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        this.app = getApp();
        var that = this; //不要漏了这句，很重要
        var url = app.globalData.URL + '/api/archives/year';
        var userAvatarUrl = app.globalData.URL;
        var token = app.globalData.TOKEN;




        var params = {};

        console.log("11");
        //@todo 网络请求API数据
        request.requestGetApi(url, token, params, this, this.successFun, this.failFun);
        console.log("22");

        //微信自带Loading效果
        // wx.showLoading({
        //   title: '加载中',
        // })

        wx.request({
            url: url,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'token': token
            },
            success: function(res) {
                console.log(res.data.result[0].posts);
                var posts_list = [];
                var count = res.data.result[0].count;
                console.log(count);
                if (count < 5) {
                    for (var i = 0; i < count; i++) {
                        posts_list.push(res.data.result[0].posts[i]);
                    }
                } else {
                    for (var i = 0; i < 5; i++) {
                        posts_list.push(res.data.result[0].posts[i]);
                    }
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
                // wx.hideLoading();

                //淡入动画效果
                that.showPost();
            },
            fail: function() {
                console.log('接口调用失败');
            }
        });


        jinrishici.load(result => {
            // 下面是处理逻辑示例
            console.log(result);
            this.setData({
                "jinrishici": result.data.content,
                shici: result.data.origin.content,
            })
        });

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
            title: app.globalData.blogName,
            // imageUrl: "https://blog.eunji.cn/upload/2018/10/maximilian-weisbecker-544039-unsplash20181109154144125.jpg"
        }
    },

    /**
     * 加载更多
     */
    onReachBottom: function () {
        
        var that = this;
        var pageNums = that.data.pageNum + 1;
        console.log('加载更多' + pageNums);
        var posts_list = [];
        var total = that.data.total;
        var a = total % 5;
        // var b = (total / 5).toFixed(0);
        var b = Math.floor(total / 5);
        var c = parseInt(total / 5);
        console.log(a + "|" + b + "|" + c);
        var Num = 5;
        var flag = 0;
        var flag1 = 0;
        var count = that.data.total;
        if (count < 5) {
            flag1 = 1;
        }
        if (that.data.Flag == 0) {
            if (that.data.pageNum < (b-1) || a == 0 ) {
                if (a == 0 && pageNums == (c-1)) {
                    flag = 1;
                }
                for (var i = 0; i < 5; i++) {
                    posts_list.push(that.data.posts_list[i + (Num * pageNums)]);
                }
                
            } else{
                for (var i = 0; i < a; i++) {
                    posts_list.push(that.data.posts_list[i + (Num * pageNums)]);
                }
                flag = 1;
            }
        }
        console.log(posts_list);

        that.setData({
            loadMore: true,
        });

        console.log(that.data.Flag);
        if (that.data.Flag == 0) {
            if (flag1 == 1) {
                setTimeout(function () {
                    that.setData({
                        loadMore: false,
                        loadMores: false,
                        showMessage: !that.data.spinShow,
                    });
                    $Message({
                        content: '博主已经努力了，会坚持每周一更。',
                        duration: 2
                    });
                    setTimeout(function () {
                        that.setData({
                            showMessage: false,
                        });
                    }, 1800);
                }, 200);
            } else {
                setTimeout(function () {
                    that.setData({
                        pageNum: pageNums,
                        posts: that.data.posts.concat(posts_list),
                        Flag: flag,
                        loadMore: false,
                    });
                }, 200);
            }
        } else {
            setTimeout(function () {
                that.setData({
                    loadMore: false,
                    loadMores: false,
                    showMessage: !that.data.spinShow,
                });
                $Message({
                    content: '博主已经努力了，会坚持每周一更。',
                    duration: 2
                });
                setTimeout(function () {
                    that.setData({
                        showMessage: false,
                    });
                }, 1800);
            }, 200);
        }
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () { 
        // this.showPost();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // this.closePost();
    },

    handleQrcode() {
        wx.previewImage({
            urls: ['https://blog.eunji.cn/upload/2018/11/wx20181208174737572.png']
        })
    },

    /**
     * 防止冒泡
     */
    prevent() {
        console.log("防止冒泡");
    },

    showMask() {
        this.setData({
            aflag: false,
        });
        var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
            delay: 0
        });
        animation.opacity(1).translate(wx.getSystemInfoSync().windowWidth, 0).step()
        this.setData({
            ani: animation.export()
        })
    },

    closeMask() {

        var that = this;
        var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
            delay: 0
        });
        animation.opacity(0).translate(-wx.getSystemInfoSync().windowWidth, 0).step()
        that.setData({
            ani: animation.export()
        });
        
        setTimeout(function () {
            that.setData({
                aflag: true,
            });
        }, 600);
    },

    /**
     * Post淡入效果
     */
    showPost() {
        console.log("showPost");
        var animation = wx.createAnimation({
            duration: 2000,
            timingFunction: 'ease',
            delay: 0
        });
        animation.opacity(1).step();
        this.setData({
            anp: animation.export()
        })
    },

    /**
     * Post淡出效果
     */
    closePost() {
        console.log("closePost");
        var animation = wx.createAnimation({
            duration: 2000,
            timingFunction: 'ease',
            delay: 0
        });
        animation.opacity(0).step();
        this.setData({
            anp: animation.export()
        })
    },

    clickAnimation(event) {
        consloe.log("滴滴~");
    },


    /**
     * 监听屏幕滚动 判断上下滚动
     */
    onPageScroll: function (event) {
        var that = this;
        // if (event.scrollTop > this.data.scrollTop || event.scrollTop == wx.getSystemInfoSync().windowHeight) {
        //     //向下滚动
        //     console.log("向下滚动");
        // } else {
        //     //向上滚动
        //     console.log("向上滚动");
        // }
        if (event.scrollTop >= 130) {
            that.setData({
                nav: true
            })
        } else {
            that.setData({
                nav: false
            })
        }

        //给scrollTop重新赋值
        // setTimeout(function () {
        //     _this.setData({
        //         scrollTop: event.scrollTop
        //     })
        // }, 0);
    }

})