# mip-hs-register

mip-hs-register 组件说明
此组件用于用户注册的组件，通过获取组件的属性data-url进行异步请求处理
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-register/mip-hs-register.js

## 示例

### 基本用法
```html
<mip-hs-register data-url='https://www.xxx.com/regster'>
    <div class="main">
		<mip-img class="main_logo" src="statics/images/thems/logo.png"></mip-img>
		<div class="main_tit">
			<a href="#">会员登录</a>
			<a href="#" class="active">会员注册</a>
			<p class="error"></p>
		</div>
		<form action="" method="post">
			<div class="input user">
				<input class="reg_mobile" type="text" name="" value="" placeholder="手机号/邮箱" />
			</div>
			<div class="input user telidf">
				<input type="text" class="reg_vcode" name="" value="" placeholder="请输入手机验证码" /><input class="get_code" type="button" value="获取短信验证码">
			</div>
			<div class="input user">
				<input class="reg_password" type="password" name="" value="" placeholder="请输入密码" />
			</div>
			<div class="input btn">
				<input class="register_go" type="button" name="" value="注册" />
			</div>
		</form>
		<div class="input other_form">
			<span class="next_auto">点击 “注册” 即表示您同意 用户协议 和 隐私政策 。</span>
		</div>
	</div>
</mip-hs-register>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

