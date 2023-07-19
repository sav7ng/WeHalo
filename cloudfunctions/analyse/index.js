// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
var req = require("request-promise");

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.url);
  const url = event.url;
  var options = {
    method: 'GET',
    uri: url,
    json: true // Automatically stringifies the body to JSON
  };
  return req(options).then(function (parsedBody) {
    console.log(parsedBody.message);
    return parsedBody;
  }).catch(function (err) {
    return err;
  });
}