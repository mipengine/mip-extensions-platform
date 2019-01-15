# mip-jm-message

mip-jm-message 组件说明
此组件结合mip-form组件用于页面所有留言表单组件验证提交。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jm-message/mip-jm-message.js

## 示例

### 基本用法
```html
<mip-jm-message>
    <div class="submit-info">
		<div class="info-top">
			<div class="left fl">
				<p class="title">您可以根据下列 意向快捷留言</p>
				<ul id="question">
					<li>
						<span>想要合作,请尽快联系。</span>
					</li>
					<li>
						<span>能实地考察吗？</span>
					</li>
					<li>
						<span>合作流程怎么样的？</span>
					</li>
					<li>
						<span>合作费用是多少钱？</span>
					</li>
					<li>
						<span>有哪些扶持政策？</a>
					</li>
				</ul>
			</div>
			<div class="right fl">
			<mip-form url="xxx">
				<input type="text" class="name" id="formname" placeholder="姓名">
				<input type="text" class="tel" id="formphone" placeholder="联系方式">
				<textarea class="textarea" id="formcontent" cols="30" rows="10" placeholder="留言"></textarea>
				</mip-form>
			</div>
		</div>
		<!-- 提交按钮 -->
		<div class="info-down">
			<mip-form url="xxx">
				<input class="formbtn" id="formbtn" type="text" value="立即提交" readonly>
			</mip-form>
		</div>
	</div>
</mip-jm-message>
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

