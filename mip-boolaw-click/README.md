# mip-boolaw-click

mip-boolaw-click 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-boolaw-click/mip-boolaw-click.js

## 示例

### 基本用法
```html
<mip-boolaw-click id="orderHtml" data-autolaw="true" data-htmlurl="https://m.boolaw.com/zhuanjia/orderData">
    
</mip-boolaw-click>
<mip-login-xzh
	id="userlogin"
	data-autologin="true"
	on="login:orderHtml.login"
	data-client-id="N9U56uMzeA8nv5xrpdnK2cpybjxwSke1"
	data-endpoint="https://m.boolaw.com/zhuanjia/baiduLogin"
	>
</mip-login-xzh>
<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-login-xzh/mip-login-xzh.js"></script>
```

## 属性

### data-autolaw

说明：如果需要传值
必选项：否
类型：字符串
默认值：false

### data-htmlurl

说明：获取数据的url
必选项：是
类型：字符串
默认值：false

## 注意事项

