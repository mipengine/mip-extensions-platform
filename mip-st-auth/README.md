# mip-st-auth

用于从第三方的鉴权数据接口异步获取鉴权数据的组件，主要用于辅助mip-st-xzh的使用。组件支持**需要鉴权**与**不需要鉴权**两种模式，模式的选用请参考所用的熊掌号能力是否依赖鉴权。
**需要鉴权**模式下，组件在获取到鉴权数据时，会触发自身的`authed`事件，事件数据的格式如下：
```
{
    appid: xxxx,
    timestamp: xxxx,
    nonce_str: xxxx,
    signature: xxxx,
    url: xxxx
}
```
**不需要鉴权**模式下，组件会直接触发自身的`authed`事件，事件数据的格式如下：
```
{
    appid: xxxx
}
```
该组件对第三方的鉴权数据接口的数据返回格式有明确要求，示例如下：
```
{
    appid: xxxx,
    timestamp: xxxx,
    nonce_str: xxxx,
    signature: xxxx,
    url: xxxx
}
```

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

**注意**: 组件的错误会通过触发自身的`fail`事件通知使用方；

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-st-auth/mip-st-auth.js

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

## 属性

### appid

说明：熊掌号id
必选项：是
类型：string
取值范围：无
单位：无
默认值：无

### needAuth

说明：是否需要鉴权，组件模式的切换开关
必选项：是
类型：string
取值范围：true|false
单位：无
默认值：无

### url

说明：第三方的鉴权数据接口地址
必选项：否（needAuth为true）
类型：string
取值范围：无
单位：无
默认值：无

## 注意事项

使用mip-st-xzh时不一定要使用mip-st-auth

