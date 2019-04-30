// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 根据文章Id集合批量查询统计数据
// 云函数的传入参数有两个，一个是 event 对象，一个是 context 对象。event 指的是触发云函数的事件，当小程序端调用云函数时，event 就是小程序端调用云函数时传入的参数，外加后端自动注入的小程序用户的 openid 和小程序的 appid。context 对象包含了此处调用的调用信息和运行状态，可以用它来了解服务运行的情况。
exports.main = async (event, context) => {
    // try {
    //     var result = await db.collection('count').where({
    //         post_id: _.in(event.post_id)
    //     }).get();
    //     return result.data
    // }
    // catch (e) {
    //     console.error(e)
    //     return []
    // }
    // db.collection('count').where({
    //     post_id: _.eq(event.post_id)
    // }).get({
    //     success(res) {
    //         console.log(res.data);
    //         return res.data;
    //     }
    // })


    db.collection('count').where({
        post_id: _.eq(event.post_id) // 填入当前用户 openid，或者其他条件
    }).get().then(res => {
        console.log('select')
        console.log(res)
        console.log(res.data.length)
        console.log(res.data.length > 0 ? res.data : '无数据')
    }).catch(err => {
        console.error(err)
    });

}
