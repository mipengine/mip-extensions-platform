# mip-wps-sms-login

mip-wps-sms-login  **短信验证码**登录组件，服务于open-api登录页。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-wps-sms-login/mip-wps-sms-login.js

## 示例

### 基本用法
```html
<mip-wps-sms-login data-agreement="agreement" data-login="login" data-con="smsLogin">
    自定义内容，可以嵌套其他组件
</mip-wps-sms-login>
```


## 属性

### data-con

说明：登录UI所需的父容器id
必选项：是
类型：string
默认值：无

### data-agreement

说明：[百度用户协议]跳转链接 的 dom id
必选项：是
类型：string
默认值：无

### data-login

说明：[账号/密码登录]跳转链接 的 dom id
必选项：是
类型：string
默认值：无

## 注意事项

mip-wps-sms-login是业务组件，只服务于open-api的登录页。

