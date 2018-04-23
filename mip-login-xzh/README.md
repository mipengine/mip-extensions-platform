# mip-login-xzh

MIP 网站中熊掌号登录

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js <br> https://c.mipcdn.com/static/v1/mip-login-xzh/mip-login-xzh.js

注意：使用该组件必须在引用本组件链接前引用 `<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>` 。

## 流程图

![mip-login-xzh 登录组件流程图](https://user-images.githubusercontent.com/3872051/38136969-6a2639b4-3454-11e8-8761-dd551d3b4692.png)

## 示例

### 基本用法
```html
<mip-my-comment id="comment">
    <h2>评论-自定义组件</h2>
    <p>
        评论组件默认认为未登录，向熊掌号登录组件添加 <code>login</code> 事件时触发评论组件的 <code>check</code> 方法。
    </p>
    <ul>
        <li>第一条评论</li>
        <li>第两条评论</li>
        <li>第三条评论</li>
    </ul>

    <div class="my-comment-editor">
        当前没有登录，<button on="tap:user.login">登录</button>。
    </div>
</mip-my-comment>

<mip-login-xzh
    id="user"
    data-endpoint="https://www.example.com/api/userinfo.php"
    data-client-id="testid"
    on="login:comment.login logout:comment.exit"
>
    <template type="mip-mustache">
        {{#name}}hi，{{name}}，欢迎回来。{{/name}}
        {{^name}}你没有<button on="tap:user.login">登录</button>哦。{{/name}}
    </template>

    <h3>上面只是一个登录状态的渲染片段</h3>
    <template type="mip-mustache">
        {{#name}}hi，{{name}}，个人中心。可以是多个 template 标签{{/name}}
    </template>
</mip-login-xzh>


<button on="tap:user.login">登录</button>
<button on="tap:user.logout">退出</button>
```

`<mip-my-comment>` 组件部分 JS 代码：
```js
/**
 * @file mip-my-comment 组件
 * @author MIP
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    customElement.prototype.build = function () {
        // 绑定评论登录
        this.addEventAction('login', function (event) {
            // 这里可以输出登录之后的数据

            // 获取用户信息
            event.userinfo;

            // 后端交互会话标识
            event.sessionId;
        });
    };

    return customElement;
});
```

### 实现购买按钮逻辑
```html
<mip-login-xzh
    id="userlogin"
    ...>
    ...
    <template type="mip-mustache">
        {{#demoname}}
            <a href="/order/1.html" data-type="mip">购买</a>
        {{/demoname}}

        {{^demoname}}
            <a href="#" on="tap:userlogin.login">请先登录</a>
        {{/demoname}}
    </template>
    ...
</mip-login-xzh>
```

### 实现个人中心
```html
<mip-login-xzh
    id="userlogin"
    data-autologin="true"
    ...>
    ...
    <template type="mip-mustache">
        <ul>
            <li>
                hi，{{demoname}}，你上次登录时间为 {{lasttime}} 。
            </li>
            <li>
                <a href="/order/list.html" data-type="mip">订单中心</a>
            </li>
            <li>
                <a href="#" on="tap:userlogin.logout">退出</a>
            </li>
        </ul>
    </template>
    ...
</mip-login-xzh>
```

## 属性

### id

说明：页面全局唯一 ID ，用来在其他元素中使用登录组件功能的入口  
必选项：否  
类型：`string`  
示例：`id="userlogin"`  

### data-client-id

说明：熊掌号后端申请的 `client_id`  
必选项：是  
类型：`string`  
示例：`data-client-id="testid"`  

### data-autologin

说明：页面打开后未登录状态下自动跳转登录，常用于必须登录状态下才可以访问的页面  
必选项：否  
类型：`boolean`  
示例：`data-autologin="true"`  
默认值：`false`  

### data-endpoint

说明：后端源站数据接口链接，需要使用 `https://` 或者 `//` 开头的源站地址，需要接口支持 HTTPS ，使用 POST 形式发送数据  
必选项：是  
类型：`string`  
示例：`data-endpoint="https://api.example.com/user/info.php"`  
说明：[后端跨域说明](#cors) 、[后端数据说明](#data) 、[会话凭证 sessionId](#sessionId)

## 组件方法和事件

#### 登录方法 - `<div on="tap:登录组件id.login">`

在其他元素中绑定点击时跳转登录页面。

注意：该方法会重新打开一个熊掌号登录页面，在登录成功后会透传 `code` 返回到当前页面，组件重新使用 `code` 参数去请求后端接口，这将导致当前页面未存储的数据丢失，如：表单用户填写内容。

#### 退出方法 - `<div on="tap:登录组件id.logout">`
在其他元素中绑定点击时请求退出接口。

注意：该方法不会跳转页面，异步的调用 `data-endpoint` 接口去退出，并触发登录组件元素中的 `logout:其他组件id.其他组件行为` 事件。

#### 登录成功事件 - `<mip-login-xzh on="login:其他组件id.其他组件行为">`
在登录成功时调用其他组件的组件行为。

#### 登录失败事件 - `<mip-login-xzh on="error:其他组件id.其他组件行为">`
在登录请求后端返回值错误时触发。

#### 退出成功事件 - `<mip-login-xzh on="logout:其他组件id.其他组件行为">`
在退出登录时（由 `on="tap:组件id.logout"` 调用触发）调用其他组件的组件行为。

## 注意事项

### 1. 配置百度熊掌号-网页授权域名

在[熊掌号运营管理平台](https://xiongzhang.baidu.com/mp/dashboard/devsetting)添加两个网页授权域名：

1. 网站主域名 - 需要在登录组件的域名
2. MIP-Cache 域名，规则：`域名（.换成-）.mipcdn.com`，如：
    - `www.mipengine.org` -> `www-mipengine-org.mipcdn.com`
    - `demo.www.mipengine.org` -> `demo-www-mipengine-org.mipcdn.com`

<a id="cors" name="cors" href="#cors"></a>
### 2. 后端需要支持 CORS + `withCredentials`

- [CORS 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [`withCredentials` 附带身份凭证的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)

登录组件（mip-login-xzh）已经在前端发送请求时处理了 `withCredentials` ，需要对应的接口服务响应头设置：

- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Origin: 对应请求的 origin`

注意：出于安全考虑请对来源的 `origin` 进行判断，并正确的返回 `Access-Control-Allow-Origin` 字段，不能为 `*` 。

<a id="data" name="data" href="#data"></a>
### 3. 后端数据说明

#### 页面加载完成检查用户数据

请求：

名称 | 说明
--- | ---
请求链接 | `data-endpoint`
请求类型 | POST
请求参数 | `{type: 'check', sessionId: '会话凭证'}`

未登录返回值说明：

```json
{
    "status": 0,
    "sessionId": "会话凭证，必须返回",
    "data": null
}
```

已登录返回值，整个返回值的 `data` 字段将认为是用户数据，在模板渲染时使用该数据渲染：

```json
{
    "status": 0,
    "sessionId": "会话凭证，必须返回",
    "data": {
        "name": "mipengine"
    }
}
```

#### 熊掌号登录

请求：

名称 | 说明
--- | ---
请求链接 | `data-endpoint`
请求类型 | POST
请求参数 | `{type: 'login', code: '熊掌号授权code', redirect_uri: '回调链接'}`

源站后端服务需要使用 `code` 和 `redirect_uri` 参数去请求 [获取网页授权 access_token](http://xiongzhang.baidu.com/open/wiki/chapter2/section2.2.html?t=1522129995153) 、[获取授权用户信息](http://xiongzhang.baidu.com/open/wiki/chapter2/section2.4.html?t=1522129995153) 接口，并和源站的用户关联、记录用户登录状态。

处理成功，认为已登录，整个返回值的 `data` 字段将认为是用户数据，在模板渲染时使用该数据渲染：

```json
{
    "status": 0,
    "sessionId": "会话凭证，必须返回",
    "data": {
        "name": "mipengine"
    }
}
```

如果 `status` 不为 `0` 触发 `error` 事件，如：
```json
{
    "status": 403
}
```

#### 退出

请求：

名称 | 说明
--- | ---
请求链接 | `data-endpoint`
请求类型 | POST
请求参数 | `{type: 'logout'}`

返回值说明：

```json
{
    "status": 0,
    "data": {
        "url": "https://www.example.com 退出成功跳转的链接地址 可选",
        "title": "主页 自定义标题 可选"
    }
}
```

<a id="sessionId" name="sessionId" href="#sessionId"></a>
### 4. 会话凭证 sessionId

由于在 iOS 对跨域透传 `cooke` 的限制（<https://webkit.org/blog/7675/intelligent-tracking-prevention/>），在前端组件请求后端接口时（`type=check` 和 `type=login`），由后端生成当前会话唯一凭证并记录到服务端，把凭证返回前端 `response.sessionId`，前端组件将在 `localStorage` 中缓存下来，在下次发后端接口请求时携带该凭证，后端就当优先使用 `cookie/session` 验证，不存在时获取 `POST` 参数中的 `sessionId` 去校验。

注意：本地 `localStorage` 是以 `data-endpoint` 为粒度去缓存。

### 5. 组件内部模板 `<template>` 渲染和触发事件

组件内支持多个 `<template type="mip-mustache">` 模板标签，在渲染时会把渲染的结果输出到 `<div>` 元素中，并且插入到 `<template>` 元素下方，如：

![template 模板渲染逻辑](https://user-images.githubusercontent.com/3872051/38238838-b58ba310-375d-11e8-9946-b8be9c46ade9.png)

渲染和触发事件逻辑：

- 页面加载完成 - 因未登录，使用空数据（`{}`）渲染模板
- 页面请求用户信息
    - 有 `code` - 发送登录数据
        + 错误 - 触发 `error` 事件
        + 成功
            - 使用 `response.data` 重新渲染模板
            - 触发 `login` 事件
    - 无 `code`
        - 未登录 - 忽略
        - 已登录
            - 使用 `response.data` 重新渲染模板
            - 触发 `login` 事件
- 页面触发 `登录组件ID.login` 事件
    + 未登录 - 跳转熊掌号登录授权页面
    + 已登录 - 忽略
- 页面触发  `登录组件ID.logout` 事件
    - 未登录 - 忽略
    - 已登录
        - 后端返回 `response.data.url`
            * 跳转到 `response.data.url`
        - 后端没有返回 `response.data.url`
            - 触发 `logout` 事件
            - 使用空数据（`{}`）渲染模板
