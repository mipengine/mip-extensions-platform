# mip-wps-login

mip-wps-login **账号密码**登录组件，服务于open-api登录页。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-wps-login/mip-wps-login.js

## 示例

### 基本用法
```html
<mip-wps-login data-problem="problem" data-sms="smsLogin" data-con="login">
    自定义内容，可以嵌套其他组件
</mip-wps-login>
```


## 属性

### data-con

说明：登录UI所需的父容器id
必选项：是
类型：string
默认值：无

### data-problem

说明：[登录遇到问题]跳转链接 的 dom id
必选项：是
类型：string
默认值：无

### data-sms

说明：[短信验证登录]跳转链接 的 dom id
必选项：是
类型：string
默认值：无

## 注意事项

mip-wps-login是业务组件，只服务于open-api的登录页。
