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

![](https://raw.githubusercontent.com/aquanlerou/WeHalo/master/image/demo.jpg)

> QQ交流群: 260050047

## 快速开始

**注：开源不易请留 WeHalo 底部署名不要删除**

```bash
git clone https://github.com/aquanlerou/WeHalo.git
```

代码下载后，把 **image** 文件夹删除（放的是README中的图片与项目无关），用小程序 IDE 打开后即可使用。

**注：请选择小程序项目，非小游戏，例子中无 appid，所以无法在手机上运行，如果需要真机调试，请在打开例子时，填上自己的小程序 id**


## 文档

修改``app.js``文件的全局变量，改为你的 **Halo** 博客的地址 

**注：必须是HTTPS的因为，微信官方规定，还有把你的博客地址``如：https://blog.eunji.cn``和``https://v2.jinrishici.com``添加到微信公众平台的 ``request 合法域名``中**

```
globalData: { //全局变量
    URL: "https://blog.eunji.cn",   //你的地址
    blogName: "AquanBlog",   //博客名字
    TOKEN: "YouToken",   //Halo后台的Token
    highlightStyle: "dracula",  //代码高亮样式，可用值default,darcula,dracula,tomorrow
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


html2wxml插件版本准备

> 1. 添加插件
![添加小程序插件](https://www.qwqoffice.com/html2wxml/images/plugin-1.png "添加小程序插件")
> 2. 搜索 `html2wxml` ，选中并添加
![添加小程序插件](https://www.qwqoffice.com/html2wxml/images/plugin-2.png "添加小程序插件")
> 3. 添加成功
![添加小程序插件](https://www.qwqoffice.com/html2wxml/images/plugin-3.png "添加小程序插件")


> 文档正在不断完善中，遇到问题请加群提问或者 [**Issues**](https://github.com/aquanlerou/WeHalo/issues) 等你吐槽...


## 演示

![](https://raw.githubusercontent.com/aquanlerou/WeHalo/master/image/wx.png)


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
- **[Painter](https://github.com/Kujiale-Mobile/Painter)：微信小程序生成图片库，绘制一张可以发到朋友圈的图片**
- **[html2wxml](https://github.com/qwqoffice/html2wxml)：用于微信小程序的HTML和Markdown格式的富文本渲染组件，支持代码高亮**
- **[一言·古诗词](https://github.com/xenv/gushici)：Hitokoto API，随机返回一条古诗词名句。采用 Vert.x + Redis 全异步开发，毫秒级稳定响应。**

## 捐赠

> 如果 **WeHalo** 帮到你在微信装 **X** ，可以众筹作者买秋裤冬天来了。

| 支付宝  | 微信  |
| :------------: | :------------: |
| <img src="https://raw.githubusercontent.com/aquanlerou/WeHalo/master/image/alipay.png" width="150"/>  | <img src="https://raw.githubusercontent.com/aquanlerou/WeHalo/master/image/wechat.png" width="150" />  |


