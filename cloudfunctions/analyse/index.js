const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
var req = require("request-promise");

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