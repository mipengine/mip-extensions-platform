# mip-zol-user

请求

标题|内容
----|----
类型|业务
支持布局|N,S|
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-zol-user/mip-zol-user.js

## 示例

### 基本用法
```html
<mip-zol-user class="user-box" data-role="useravatar">
    <mip-link href="http://service.zol.com.cn/user/mlogin.php?backurl=">登录</mip-link>
</mip-zol-user>
```

## 属性

### data-role

说明：表示插件的角色
必选项：否
类型：字符串

### data-url

说明：表示获取用户信息的接口
必选项：否
类型：字符串

## 开放方法

### gotzoluserinfo

说明：获取到用户信息后执行的自定义事件。（由于用户登录状态需要服务器端验证，所以获取信息会异步，所以用到用户信息的地方，最好用事件的形式来触发状态改变）
必选项：否
类型：自定义事件名称
