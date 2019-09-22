/**
 * 今日诗词V2 Mini-Program-SDK 1.0
 * https://www.jinrishici.com
 */
let waitingQueue = []
let lock = false
const load = callback => {
  getTokenAndDo(token => {
    wx.request({
      url: 'https://v2.jinrishici.com/one.json?client=mini-progrram-sdk/1.0',
      header: {
        'X-User-Token': token
      },
      success: res => {
        if (res.data.status === "success") {
          callback(res.data)
        } else {
          console.error("今日诗词API 获取古诗词 失败，错误原因：" + res.data.errMessage)
        }
      },
      fail: () => {
        console.error("今日诗词-小程序SDK 获取古诗词失败，可能是网络问题或者您没有添加到域名白名单")
      }
    })
  })
}

const getTokenAndDo = callback => {
  let token = wx.getStorageSync("jinrishici-token")
  if (token) {
    callback(token)
  } else {
    waitingQueue.push(callback)
    if (lock) {
      return;
    }
    lock = true
    wx.request({
      url: 'https://v2.jinrishici.com/token?client=mini-progrram-sdk/1.0',
      success: res => {
        if (res.data.status === "success") {
          wx.setStorageSync("jinrishici-token", res.data.data)
          lock = false
          while (waitingQueue.length > 0) {
            waitingQueue.pop()(res.data.data)
          }
        } else {
          console.error("今日诗词API获取 Token 失败，错误原因：" + res.data.errMessage)
          lock = false
        }
      },
      fail: () => {
        console.error("今日诗词-小程序SDK 获取 Token 失败，可能是网络问题或者您没有添加到域名白名单")
      }
    })
  }
}

module.exports = {
  load: load
}