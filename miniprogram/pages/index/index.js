//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        TabCur: 1,
        scrollLeft: 0,
        motto: 'Hi 开发者！',
        userInfo: {},

        cardCur: 0,
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 1,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
            id: 3,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        }, {
            id: 4,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
        }, {
            id: 5,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
        }, {
            id: 6,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
            }],

            
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
        url: '../logs/logs'
        })
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
        this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
        })
        } else if (this.data.canIUse){
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
                userInfo: res.userInfo,
                hasUserInfo: true
            })
            }
        })
        }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    DotStyle(e) {
        this.setData({
            DotStyle: e.detail.value
        })
    },
    // cardSwiper
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
        let list = this.data[name];
        for (let i = 0; i < list.length; i++) {
            list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
            list[i].mLeft = i - parseInt(list.length / 2)
        }
        this.setData({
            swiperList: list
        })
    },
    // towerSwiper触摸开始
    towerStart(e) {
        this.setData({
            towerStart: e.touches[0].pageX
        })
    },
    // towerSwiper计算方向
    towerMove(e) {
        this.setData({
            direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
        })
    },
    // towerSwiper计算滚动
    towerEnd(e) {
        let direction = this.data.direction;
        let list = this.data.swiperList;
        if (direction == 'right') {
            let mLeft = list[0].mLeft;
            let zIndex = list[0].zIndex;
            for (let i = 1; i < list.length; i++) {
                list[i - 1].mLeft = list[i].mLeft
                list[i - 1].zIndex = list[i].zIndex
            }
            list[list.length - 1].mLeft = mLeft;
            list[list.length - 1].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
        } else {
            let mLeft = list[list.length - 1].mLeft;
            let zIndex = list[list.length - 1].zIndex;
            for (let i = list.length - 1; i > 0; i--) {
                list[i].mLeft = list[i - 1].mLeft
                list[i].zIndex = list[i - 1].zIndex
            }
            list[0].mLeft = mLeft;
            list[0].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
        }
    },
    showModal(e) {
        console.log("全屏抽屉")
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    tabSelect(e) {
        console.log(e);
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },
    switchSex: function (e) {
        this.setData({
            skin: e.detail.value
        });
    },
})
