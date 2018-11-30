// pages/post/post.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollTop: 0,
        linenums: false,
        spinShow: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            postId: options.postId,
        })

        // wx.showNavigationBarLoading() //在标题栏中显示加载
        var that = this//不要漏了这句，很重要
        var postId = options.postId
        var url = 'https://blog.eunji.cn/api/posts/' + postId
        var userAvatarUrl = 'https://blog.eunji.cn'

        //微信自带Loading效果
        // wx.showLoading({
        //   title: '加载中',
        // })
        wx.request({
            url: url,
            headers: {
            'Content-Type': 'application/json'
            },
            success: function (res) {
            //将获取到的json数据，存在名字叫zhihu的这个数组中
            console.log(res.data.result)
            that.setData({
                post: res.data.result,
            })
            //取消Loading效果
            // wx.hideLoading()
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setData({
            spinShow: false,
        })
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
    
    /**
     * Sticky 吸顶容器
     */
    onChange(event) {
        console.log(event.detail, 'click right menu callback data')
    },
    //页面滚动执行方式
    onPageScroll(event) {
        this.setData({
            scrollTop: 1
        })
    }
})