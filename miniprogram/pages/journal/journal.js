// miniprogram/pages/journal/journal.js
//获取应用实例
const app = getApp();
const request = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    skin: app.globalData.skin,
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var urlContent = app.globalData.url + '/api/content/journals';
    var token = app.globalData.token;
    var params = {};
    //@todo 日志内容网络请求API数据
    request.requestGetApi(urlContent, token, params, this, this.successJourPost, this.failJourPost);
  },

  /**
   * 成功获取日志内容的返回函数
   */
  successJourPost: function (res, selfObj) {
    var that = this;
    for (let i = 0; i < res.data.content.length; i++) {
      // 获取随机颜色
      let color = this.getRandomColor();
      res.data.content[i].textColor = "text-" + color;
      res.data.content[i].bgColor = "bg-" + color;
      // 将timestamp转换成年月日的形式
      res.data.content[i].createTime = util.customFormatTime(res.data.content[i].createTime, "Y.M.D");
      if (i > 0 && res.data.content[i].createTime === res.data.content[i - 1].createTime) {
        // 标志位，给html判断可以有时间title 的
        res.data.content[i].hasTime = false;
      }
      else res.data.content[i].hasTime = true;
    }

    that.setData({
      jourContent: res.data.content,
    })
  },

  /**
   * 获取日志失败的处理函数
   */
  failJourPost: function (res, selfObj) {
    console.error('failJourPost', res);
  },

  /**
   * @return: 颜色的字符串。例如：red；green；pink等
   */
  getRandomColor: function () {
    var colors = ["pink", "orange", "green", "red", "blue", "mauve", "purple", "olive"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

})