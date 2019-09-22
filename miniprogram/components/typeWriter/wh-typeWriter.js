// components/typeWriter/wh-typeWriter.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        whContent: {
            type: String,
            default: ' '
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
    },

    /**
     * 通过组件的生命周期函数执行代码
     */
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
        ready: function () {
            // 在组件在视图层布局完成后执行
            var that = this
            //文字逐个显示
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
