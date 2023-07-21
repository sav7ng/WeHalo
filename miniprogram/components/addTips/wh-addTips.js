Component({
    properties: {
        text: {
            type: String,
            value: '点击「添加到我的小程序」'
        },
        duration: {
            type: Number,
            value: 5
        }
    },
    data: {
        SHOW_TOP: false,
        SHOW_MODAL: false
    },
    ready: function () {
        this.setData({
            SHOW_TOP: true
        });
        setTimeout(() => {
            this.setData({
                SHOW_TOP: false
            })
        }, this.data.duration * 1000);
    },
    methods: {}
})