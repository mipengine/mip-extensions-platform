# mip-jm-telphone

mip-jm-telphone 组件说明
此组件用于配合mip-form组件全站通用记录电话号码验证，publiccall类是触发的按钮，publicphone类是获取输入框的值。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jm-telphone/mip-jm-telphone.js

## 示例

### 基本用法
```html
<mip-jm-telphone>
    <div class="freePhone">
		<h1>我对xxx感兴趣，马上免费通话或留言</h1>
		<div class="phone-content">
			<div class="left fl"><img src="__MOBILE__/img/community.png" alt=""></div>
			<div class="right fl">
				<mip-form url='xxx'>
					<input type="text" class="publicphone" placeholder="请输入您的手机号">
					<input type="text" class="publiccall" value="免费电话" readonly>
				</mip-form>
			</div>
		</div>
	</div>
</mip-jm-telphone>
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

