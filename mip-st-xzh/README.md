# mip-st-xzh

mip-st-xzh组件用于mip1下引入熊掌号JS-SDK(onlineJS)，该组件通过异步引入c.js的方式引入JS-SDK，引入前的准备工作可参考[JS-SDK使用步骤](https://xiongzhang.baidu.com/open/wiki/chapter6/section6.2.html?t=1533001904425)，引入后能力的使用说明可参考[JS-SDK概述](https://xiongzhang.baidu.com/open/wiki/chapter6/section6.1.html?t=1533001904425)。

通过触发组件的load事件通知组件开始载入熊掌号JS-SDK，通过auth事件传入的数据格式示例如下：
**不需要鉴权**:
```
{
    appid: xxxx
}
```
**需要鉴权**:
```
{
    appid: xxxx,
    timestamp: xxxx,
    nonce_str: xxxx,
    signature: xxxx,
    url: xxxx
}
```
**注意**：是否需要鉴权请参考所用的熊掌号能力是否依赖鉴权。

组件在c.js文件load完成后会触发自身的`loaded`，load失败时则会触发自身的`loaderr`事件。

### 鉴权数据说明

* appid 
说明：熊掌号id，熊掌号的唯一标识，[查看](https://xiongzhang.baidu.com/site/setting)
是否必填：是
类型：`string`

* nonce_str
说明：生成签名的随机串
是否必填：是
类型：`string`

* signature
说明：签名，[查看签名算法的说明](https://xiongzhang.baidu.com/open/wiki/chapter6/section6.8.html?t=1530768936446)
是否必填：是
类型：`string`

* timestamp
说明：生成签名的时间戳
是否必填：是
类型：`string`

* url
说明：当前网页的URL，不包含#及其后面部分，需要进行Urlencode
是否必填：是
类型：`string`


标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-st-xzh/mip-st-xzh.js

## 示例

### 基本用法
```html
<mip-st-auth 
    id="auth"
    on="authed:xzh.load"
    data-need-auth="true"
    data-appid="xxxx"
    data-url="xxxx">
</mip-st-auth>
<mip-st-xzh 
    id="xzh" 
    on="loaded:others.loaded">
</mip-st-xzh>
/* 第三方实现的需要调用熊掌号能力的组件 */
<mip-st-others 
    id="others">
</mip-st-xzh>
```

## 注意事项

该组件与mip-st-auth一同使用时，第三方仅需要实现一个获取鉴权数据的接口便可以引入熊掌号JS-SDK。
