# mip-apple-nav

mip-apple-nav 组件说明

### 苹果导航栏，pc端默认样式，移动端菜单显示内容样式自定义

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-apple-nav/mip-apple-nav.js

## 示例
<mip-apple-nav>
    <ul class="pcNav">
		<li><mip-img class="logo" src="https://m.pgwxd.com/main/lnruLOW01sgir2e.png"></mip-img></li>
		<li><a href="" title="">iPhone</a></li>
		<li><a href="" title="">iPad</a></li>
		<li><a href="" title="">Mac</a></li>
		<li><a href="" title="">Watch</a></li>
		<li class="regist"><a href="" title="">快速注册</a></li>
		<li class="login"><a href="" title="">请登录</a></li>
	</ul>
	<ul class="mobileNav">
		<div class="navbar-toggle">
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</div>
		<li><mip-img class="logo" src="https://m.pgwxd.com/main/lnruLOW01sgir2e.png"></mip-img></li>
		<li class=""><a href="" title="">Apple授权苹果维修点</a></li>
	</ul>
	<div id="mobileNavList">
	</div>
</mip-apple-nav>
### 基本用法
```html
<mip-apple-nav>
    <ul class="pcNav">
		<li><a href="" title="">iPhone</a></li>
		<li><a href="" title="">iPad</a></li>
		<li><a href="" title="">Mac</a></li>
		<li><a href="" title="">Watch</a></li>
		<li class="regist"><a href="" title="">快速注册</a></li>
		<li class="login"><a href="" title="">请登录</a></li>
	</ul>
	<ul class="mobileNav">
		<div class="navbar-toggle">
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</div>
		<li class=""><a href="" title="">Apple授权苹果维修点</a></li>
	</ul>
	<div id="mobileNavList">
	</div>
</mip-apple-nav>
```

## 属性
	class
### pcNav
说明：pc端显示的导航 dom与样式
必选项：必须

## 属性
	class
### regist，login
说明：pc端导航登录与注册样式
必选项：非必须

## 属性
	class
### mobileNav
说明：移动端显示的导航 dom与样式
必选项：必须

## 属性
	class
### navbar-toggle，icon-bar 
说明：移动端导航左侧按钮样式，点击显示移动导航内容，内容自定义
必选项：必须

## 注意事项
	无
