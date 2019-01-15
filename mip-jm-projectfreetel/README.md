# mip-jm-projectfreetel

mip-jm-projectfreetel 组件说明
此组件用于品牌详情页免费电话数据提交组件。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jm-projectfreetel/mip-jm-projectfreetel.js

## 示例

### 基本用法
```html
<mip-jm-projectfreetel data-phonecateid="1" data-phonearticleid="1" data-phoneurl="xxx/Article/consult" data-phoneremark="新闻资讯免费电话">
    <div class="freePhone">
		<h1>我对xx感兴趣，马上免费通话或留言</h1>
		<div class="phone-content">
			<div class="left fl"><img src="__MOBILE__/img/community.png" alt=""></div>
			<div class="right fl">
				<mip-form url=''>
					<input type="text" class="call_foot_phone" placeholder="请输入您的手机号">
					<input type="text" class="call_foot_btn" value="免费电话" readonly>
				</mip-form>
				<p>温馨提示:此次通话不会产生任何费用,请放心使用</p>
			</div>
		</div>
	</div>
</mip-jm-projectfreetel>
```

## 属性

### {属性名}
data-phonecateid：当前页面传过来的cateid参数，必选必填；
data-phonearticleid：当前页面传过来的articleid参数，必选必填；
data-phoneurl：当前所要请求的url参数，必选必填；
data-phoneremark：当前页面所要关联的关键词，必选必填；
说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

