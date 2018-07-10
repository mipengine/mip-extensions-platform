# mip-ilaw66-inform

mip-ilaw66-inform 组件说明
根据所选的咨询内容类型，自动向匹配律师发送订单
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-inform/mip-ilaw66-inform.js

## 示例

### 基本用法
```html
<mip-ilaw66-inform>
    <input type="hidden" id="lawyerId" name="lawyerId" />
    <input type="hidden" id="requestId" name="requestId" />
    <input type="hidden" id="questionType" name="questionType" />
    <input type="hidden" id="askingType" name="askingType" />
    <input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
    <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
			<div class="header_block">
				<span class="glyphicon glyphicon-menu-left pull-left" onclick="gobackHandle();"></span>通知律师
			</div>
			<div class="content_block" style="display:none;" id="content_block"></div>
    <div class="main">
        <img src="images/bg_touxaingnan.png" class="end_avatar inform_top_img" />
        <div class="end_name">王律师</div>
        <div class="end_type field">擅长类型：<span></span></div>
        <div class="end_type end_type__commentFromUser">用户好评：<span class="goodCommentRate"></span></div>
    </div>
    <div class="inform_middle">
        <span class="inform_middle_con">正在通知王律师...</span>
        <div class="inform_time"></div>
    </div>
</mip-ilaw66-inform>
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

