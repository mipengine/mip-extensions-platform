# mip-xuexb-like

前端小武博客通用喜欢、阅读数、点赞，可包含登录逻辑。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xuexb-like/mip-xuexb-like.js

## 示例

### 登录点赞
```html
<mip-xuexb-like
    data-login-url="login.html"
    data-get-url="https://static.xuexb.com/mip-login-app/api/get.like.json?id=1"
    data-set-url="https://static.xuexb.com/mip-login-app/api/set.like.json?id=1">
    <span>赞</span>
    <span show-count>loading...</span>
</mip-xuexb-like>
```

返回值：
```js
{
    "status": 0,
    "data": {
        "like": 1,
        "isLogin": false,
        "isLike": false
    }
}
```

### 点赞（不登录）
```html
<mip-xuexb-like
    data-get-url="https://static.xuexb.com/mip-login-app/api/get.like.json?id=1"
    data-set-url="https://static.xuexb.com/mip-login-app/api/set.like.json?id=1">
    <span>赞</span>
    <span show-count>loading...</span>
</mip-xuexb-like>
```

返回值：
```js
{
    "status": 0,
    "data": {
        "like": 1,
        "isLike": false
    }
}
```

### 喜欢
```html
<mip-xuexb-like
    data-login-url="login.html"
    data-get-url="https://static.xuexb.com/mip-login-app/api/get.like.json?id=1"
    data-set-url="https://static.xuexb.com/mip-login-app/api/set.like.json?id=1">
    <span>喜欢</span>
    <span>已喜欢</span>
</mip-xuexb-like>
```

返回值：
```js
{
    "status": 0,
    "data": {
        "isLike": true
    }
}
```

### 阅读数
```html
<mip-xuexb-like data-get-url="https://static.xuexb.com/mip-login-app/api/get.like.json?id=1">
    <span>当前阅读数</span>
    <span show-count>loading...</span>
</mip-xuexb-like>
```

返回值：
```js
{
    "status": 0,
    "data": {
        "like": 1
    }
}
```

## 属性

### data-get-url

说明：获取数据数接口  
必选项：是  
类型：字符串  
接口返回值：

```js
{
    "status": 0,
    "data": {
        "like": 1,// 显示文本
        "isLogin": false,// 是否登录
        "isLike": false// 是否点赞（操作记录）
    }
}
```

### data-type

说明：异步提交类型
选项：`cors`（使用 [CORS 域方案](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)）、`jsonp`（使用 `JSONP` 跨域）  
必选项：否  
类型：字符串  
默认值：`jsonp`

## 子元素

### [show-count]

说明：显示接口数据节点，一般是计数节点  
必选项：否  
类型：元素节点  
示例：`<div show-count></div>`

## 注意事项

1. 登录配套组件使用 [mip-xuexb-login 组件](https://github.com/mipengine/mip-extensions-platform/blob/master/mip-xuexb-login)
2. 是否已经操作过记录、操作的数据、是否登录全由后端接口处理
3. CORS 跨域后端配置 `response.header` ：
```
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: request.header.origin || '*'
```