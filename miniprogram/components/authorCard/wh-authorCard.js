// components/authorCard/wh-authorCard.js
Component({
    properties: {
        isHidden: {
            type: [Boolean, String],
            default: true
        }
    },
    data: {

    },
    methods: {
        prevent() {
            console.log("防止冒泡");
            var self = this;
            wx.setClipboardData({
                data: "https://github.com/aquanlerou"
            });

        },
        showMask() {
            this.setData({
                isHidden: false,
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
                    isHidden: true,
                });
            }, 600);
        }
    },
    lifetimes: {
        attached: function () {
            this.setData({
                isHidden: true,
            });
        },
        detached: function () {},
    },
})
