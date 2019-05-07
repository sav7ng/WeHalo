// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    // env: 'xlr-0053be'
    env: 'release-aquan'
})

const db = cloud.database()

// 更新文章统计数据，没有则默认初始化一笔
exports.main = async (event, context) => {
    try {
        var posts = await db.collection('count').where({
            post_id: event.post_id
        }).get()

        if (posts.data.length > 0) {
            await db.collection('count').doc(posts.data[0]['_id']).update({
                data: {
                    view_count: posts.data[0]['view_count'] + event.view_count,//浏览量
                    comment_count: posts.data[0]['comment_count'] + event.comment_count,//评论数
                    like_count: posts.data[0]['like_count'] + event.like_count//点赞数
                }
            })
        }
        else {
            //默认初始化一笔数据
            await db.collection('count').add({
                data: {
                    post_id: event.post_id,//文章id
                    view_count: 1,//浏览量
                    comment_count: 0,//评论数
                    like_count: 0 //点赞数
                }
            }).then(res => {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
            })
        }
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}