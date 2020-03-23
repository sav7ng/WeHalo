// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const { content } = event;//可以省略
    try {
        const res = await cloud.openapi.security.msgSecCheck({
            content: event.content
        })
        return res;
    } catch (err) {
        return err;
    }
}