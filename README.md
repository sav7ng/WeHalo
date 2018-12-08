<h1>
    <a href="#" target="_blank">WeHalo</a>
</h1>

> WeHalo **简约风** 的微信小程序版博客

[![Github](https://img.shields.io/badge/Author-Aquan-FF4500.svg)](https://github.com/aquanlerou)
[![GitHub release](	https://img.shields.io/github/release/aquanlerou/WeHalo.svg)](https://github.com/aquanlerou/WeHalo/releases)
![](https://img.shields.io/github/languages/code-size/aquanlerou/WeHalo.svg)
[![GitHub LICENSE](https://img.shields.io/github/license/aquanlerou/WeHalo.svg)](https://github.com/aquanlerou/WeHalo/blob/master/LICENSE)
![](https://img.shields.io/github/stars/aquanlerou/WeHalo.svg?label=Stars&style=social)

------------------------------

<details><summary>目录</summary>

- [简介](#简介)
- [快速开始](#快速开始)
- [文档](#文档)
- [演示](#演示)
- [许可证](#许可证)
- [后续功能](#后续功能)
- [感谢](#感谢)
- [捐赠](#捐赠)

</details>

## 简介

**WeHalo** [wiˈheɪloʊ]，意为我们的光环，嘻嘻。

配合 [**Halo**](https://github.com/ruibaby/halo) 轻快，简洁，功能强大的博客系统而开发出来的 **简约风** 微信小程序版博客

<img src="https://blog.eunji.cn/upload/2018/11/12018120900303582.jpg" width="30%" height="30%">
<img src="https://blog.eunji.cn/upload/2018/11/220181209003036364.jpg" width="30%" height="30%">
<img src="https://blog.eunji.cn/upload/2018/11/3201812090030354.jpg" width="30%" height="30%">

> QQ交流群: 162747721，Telegram交流群：[https://t.me/HaloBlog](https://t.me/HaloBlog)

## 快速开始

**注：开源不易请留 WeHlo 底部署名不要删除**

```bash
git clone https://github.com/aquanlerou/WeHalo.git
```

代码下载后，用小程序 IDE 打开后即可使用。

**注：请选择小程序项目，非小游戏，例子中无 appid，所以无法在手机上运行，如果需要真机调试，请在打开例子时，填上自己的小程序 id**


## 文档

修改``app.js``文件的全局变量，改为你的 **Halo** 博客的地址 

**注：必须是HTTPS的因为，微信官方规定**

```
globalData: { //全局变量
    URL: "https://blog.eunji.cn",   //你的地址
    blogName: "AquanBlog"   //博客名字
}
```

修改``app.json``文件更改小程序导航栏标题，改为你的博客名字


```
"navigationBarTitleText": "AquanBlog",  //你的博客名字
```


修改``index.wxss``文件更改首页封面背景图片,找到``.aquanblog``

```
.aquanblog {
    //填上你想要的封面图片链接
    background-image: url("https://blog.eunji.cn/upload/2018/10/maximilian-weisbecker-544039-unsplash20181109154144125.jpg");
}
```

修改``poster.js``文件更改 **生成海报** 功能附带你小程序宣传图片（图片可以在微信公众平台下载宣传物料获取放到你的服务器获取图片链接）


```
{
    type: 'image',
    //改为你的小程序宣传图片链接
    url: 'https://blog.eunji.cn/upload/2018/11/wx20181208174737572.png',
    css: {
        width: '600rpx',
        height: '167rpx',
        mode: 'scaleToFill',
        top: '433rpx',
    }
},
```


> 文档正在不断完善中，遇到问题请加群提问或者 [**Issues**](https://github.com/aquanlerou/WeHalo/issues) 等你吐槽...


## 演示

![](https://blog.eunji.cn/upload/2018/11/wx20181208174737572.png)


## 许可证

[![license](https://img.shields.io/github/license/ruibaby/halo.svg)](https://github.com/ruibaby/halo/blob/master/LICENSE)

> WeHalo使用GPL-v3.0协议开源，请尽量遵守开源协议，即便是在中国。

## 后续功能

- [x] 生成海报（微信朋友圈装X）
- [ ] 想到就写...

## 感谢

WeHalo的诞生离不开下面这些项目：

- **[Halo](https://github.com/ruibaby/halo)：轻快，简洁，功能强大，使用Java开发的博客系统**
- **[iView Weapp](https://github.com/TalkingData/iview-weapp)：一套高质量的微信小程序 UI 组件库**
- **[Painter](https://github.com/TalkingData/iview-weapp)：微信小程序生成图片库，绘制一张可以发到朋友圈的图片**

## 捐赠

> 如果 **WeHalo** 帮到你在微信装 **X** ，可以众筹作者买秋裤冬天来了。

| 支付宝  | 微信  |
| :------------: | :------------: |
| <img src="https://blog.eunji.cn/upload/2018/11/alipay20181208235545431.png" width="150"/>  | <img src="https://blog.eunji.cn/upload/2018/11/wechat20181208235544504.png" width="150" />  |


