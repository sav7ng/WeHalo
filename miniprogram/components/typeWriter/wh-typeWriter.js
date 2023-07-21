// components/typeWriter/wh-typeWriter.js
Component({
    properties: {
        whContent: {
            type: String,
            default: ' '
        },
    },
    data: {
    },
    methods: {
    },
    lifetimes: {
        attached: function () {},
        detached: function () {},
        ready: function () {
            var that = this
            var story = this.data.whContent;
            var i = 0;
            var time = setInterval(function () {
                var text = story.substring(0, i);
                i++;
                that.setData({
                    whContent: text
                });
                if (text.length == story.length) {
                    //   console.log("定时器结束！");
                    clearInterval(time);
                }
            }, 200)
        },
    },
})
