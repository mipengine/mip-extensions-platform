# mip-ilaw66-baidutwo-serviceFeedback

mip-ilaw66-baidutwo-serviceFeedback 组件说明
服务反馈页
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidutwo-serviceFeedback/mip-ilaw66-baidutwo-serviceFeedback.js

## 示例

### 基本用法
```html
<mip-ilaw66-baidutwo-serviceFeedback>
	<mip-sina-rem>
		<mip-stats-baidu>
			<script type="application/json">
				{
					"token": "d5a24ec2321d65ed4b781d2fce73c834"
				}
			</script>
		</mip-stats-baidu>
		<mip-form url='https://www.baidu.com'>
	<input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}"/>
		</mip-form>
	<div class="top_header">
		<span class="glyphicon glyphicon-menu-left pull-left"></span>
		<div class="div_header">反馈服务问题</div>
	</div>
    <p class="serviceFeedback_txt">感谢您的反馈<br/>我们将尽快与您联系、处理问题</p>
    <div class="wordCount" id="wordCount">
        <div style="border: 1px solid #707379"><textarea placeholder="（选填）请在此描述问题，我们将严肃核实并处理" class="wordType" rows="5"></textarea></div>
        <span class="wordwrap"><var class="word">0</var>/300</span>
    </div>
    <button class="serviceFeedback_topay serviceFeedback_btn">还是愿意付费</button>
    <button class="serviceFeedback_toindex serviceFeedback_btn">服务不好，不愿付费</button>
		</mip-sina-rem>
</mip-ilaw66-baidutwo-serviceFeedback>
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

