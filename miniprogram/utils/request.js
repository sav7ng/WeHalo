/**
 * @desc    API请求接口类封装
 * @author  Aquan
 * @date    2019年7月29日17:38:06
 */
const app = getApp();

/**
 * POST请求API
 * @param  {String}   url         接口地址
 * @param  {String}   token       请求接口时的Token
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestPostApi(url, token, params, sourceObj, successFun, failFun, completeFun) {
    requestApi(url, token, params, 'POST', sourceObj, successFun, failFun, completeFun)
}

/**
 * GET请求API
 * @param  {String}   url         接口地址
 * @param  {String}   token       请求接口时的Token
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestGetApi(url, token, params, sourceObj, successFun, failFun, completeFun) {
    requestApi(url, token, params, 'GET', sourceObj, successFun, failFun, completeFun)
}

/**
 * 请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApi(url, token, params, method, sourceObj, successFun, failFun, completeFun) {
    // console.log(token);
    if (method == 'POST') {
        // var contentType = 'application/x-www-form-urlencoded'
        var contentType = 'application/json'
    } else {
        var contentType = 'application/json'
    }
    wx.request({
        url: url,
        method: method,
        data: params,
        header: { 
            'Content-Type': contentType,
            'API-Authorization': token,
            'ADMIN-Authorization': token,
        },
        success: function (res) {
            typeof successFun == 'function' && successFun(res.data, sourceObj);
        },
        fail: function (res) {
            typeof failFun == 'function' && failFun(res.data, sourceObj)
        },
        complete: function (res) {
            typeof completeFun == 'function' && completeFun(res.data, sourceObj)
        }
    })
}

module.exports = {
    requestPostApi,
    requestGetApi
}
