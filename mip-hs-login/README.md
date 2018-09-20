# mip-hs-login

mip-hs-login 组件说明
用于网站登录实现，通过传过去url请求实现登录
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-login/mip-hs-login.js

## 示例

### 基本用法
```html
<mip-hs-login data-url="http://www.xxx.com/login">
	<mip-form method="get" url="https://www.mipengine.org?we=123">
		<input type="text" name="username" validatetarget="username" validatetype="must" placeholder="手机号/用户名/邮箱" class="fill telphone">
		<input type="text" name="username" validatetarget="username" validatetype="must" placeholder="请输入账户名/密码" class="fill passText">
		<input type="text" name="username" validatetarget="username" validatetype="must" placeholder="请输入验证码" class="code input_idf">
		<!--<input type="text" name="username" validatetarget="username" validatetype="must" class="test">-->
		<p class="codeBg"><mip-img id="change" src="images/images/1.png"></mip-img></p>
	</mip-form>
	<div class="loginBtn">
		<a class="login" href="javascript:;">登录</a>
	</div>
	<p class="error"></p>
</mip-hs-login>
```

## 属性

### {data-url}

说明：{触发请求接口并返回数据}
必选项：{是}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

