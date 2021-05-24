const app = getApp()
const request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    selected: '',
    basicsList: [{
      icon: 'radioboxfill',
      name: '下载中'
    }, {
      icon: 'roundcheckfill',
      name: '下载完成'
    }, ],
    basics: 0,
    isDownload: false,
    TabCur: 0,
    scrollLeft: 0,
    Tab: ['全部'],
    isCard: false,
    roleFlag: false,
    isImageShow: false,
    grouping: '',
    customGrouping: '',
    isUpload: false,
    isImageIcon: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //管理员才能上传
    if (app.globalData.adminOpenid == wx.getStorageSync('openid')) {
      this.setData({
        isImageIcon: true
      })
    }
    this.imageInit()
  },
  imageInit() {
    let that = this;
    var url = app.globalData.url + '/api/content/photos/latest';
    request.requestGetApi(url, app.globalData.token, null, this, function (res) {
        let i = 1;
        res.data.forEach(element => {
          if (that.data.Tab.indexOf(element.team) == -1 && "" != element.team) {
            var tab = 'Tab[' + i++ + ']';
            that.setData({
              [tab]: element.team
            });
          }
        });
        that.setData({
          roleFlag: app.globalData.roleFlag,
          items: res.data
        })
      },
      function (res) {
        console.error(res)
      });
  },
  onlongclick: function (e) {
    this.setData({
      isShow: true,
      selected: e.currentTarget.dataset.url,
      isDownload: false
    })
  },
  hideModal() {
    this.setData({
      isShow: false
    })
  },
  saveImage() {
    let that = this
    that.setData({
      isDownload: true,
      basics: 0
    })
    wx.getImageInfo({
      src: that.data.selected,
      success: function (res) {
        var path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: function (res) {
            that.setData({
              basics: 1
            })
          },
          fail: function (res) {}
        })
      }
    });
  },
  tabSelect(e) {
    let that = this;
    let team = e.currentTarget.dataset.item;
    var url = app.globalData.url + '/api/content/photos/latest';
    var params = null;
    if (team != '全部') {
      url = app.globalData.url + '/api/content/photos';
      params = {
        team: team
      };
    }
    request.requestGetApi(url, app.globalData.token, params, this, function (res) {
        let data = res.data.content
        if (team == '全部') {
          data = res.data
        }
        that.setData({
          items: data,
          TabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
      },
      function (res) {
        console.error(res)
      });
  },
  ChooseImage() {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var imgNum = res.tempFilePaths.length; //图片数量
        var i = 1;
        that.setData({
          isUpload: true
        })
        res.tempFilePaths.forEach(element => {
          wx.uploadFile({
            url: app.globalData.url+'/api/admin/attachments/upload',
            filePath: element,
            name: 'file',
            header: {
              'content-type': 'multipart/form-data',
              'ADMIN-Authorization': app.globalData.adminToken,
              'API-Authorization': app.globalData.adminToken,
            },
            success: function (res) {
              var imageData = JSON.parse(res.data)
              var urlCounts = app.globalData.url + '/api/admin/photos';
              var paramCounts = {
                name: imageData.data.name,
                team: that.data.grouping,
                thumbnail: imageData.data.path,
                url: imageData.data.path,
              };
              request.requestPostApi(urlCounts, app.globalData.adminToken, paramCounts, this, function (res) {
                if (imgNum == i++) {
                  that.imageInit()
                  that.setData({
                    isUpload: false,
                    isImageShow: false
                  })
                }
              }, function (res) {
                console.error(res)
              });
            },
            fail: function (res) {
              console.error(res)
            }
          })
        });
      },
      fail: (res) => {
        console.error(res)
      }
    });
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  imageShow(e) {
    this.setData({
      isImageShow: true
    })
  },
  checkedGroup(e) {
    this.setData({
      grouping: e.currentTarget.dataset.group
    })
  },
  groudBindblur(e) {
    this.setData({
      customGrouping: e.detail.value
    })
  },
  hideImageModal(e) {
    this.setData({
      isImageShow: false
    })
  }
})