Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 提示文字
        text: {
            type: String,
            value: '点击「添加到我的小程序」'
        },
        // 多少秒后关闭
        duration: {
            type: Number,
            value: 5
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        SHOW_TOP: false,
        SHOW_MODAL: false
    },

    ready: function () {
        this.setData({
            SHOW_TOP: true
        });
        // 关闭时间
        setTimeout(() => {
            this.setData({
                SHOW_TOP: false
            })
        }, this.data.duration * 1000);
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
    }
})