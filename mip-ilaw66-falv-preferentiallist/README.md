# mip-ilaw66-falv-preferentiallist

mip-ilaw66-falv-preferentiallist 组件说明
通过templates去渲染接口数据列表，在模版中显示。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-falv-preferentiallist/mip-ilaw66-falv-preferentiallist.js

## 示例

### 基本用法
```html
<mip-ilaw66-falv-preferentiallist>
    <mip-form>
			<input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
			<input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
		</mip-form>
		<div class="header_block">
			<span class="glyphicon glyphicon-menu-left pull-left " style="left:5px;color: #fff"></span>超值优惠
		</div>
		<!--     <div class="top_bg"></div> -->
		<div class="top_bg"></div>
		<!--律师卡使用帮助-->
		<a data-type="mip" href="preferential_help" class="preferential_usehelp">不知怎么用卡,点击查看帮助</a>
		<ul id="preferentiallist_content" class="preferential-list preferentiallist_content">
			<template type="mip-mustache" id="mip-template-id">
				{{#list}}
				<li class="preferential-list__item">
					<div class="preferential-card preferential-card_{{type}}" id="preferential-card_{{type}}_{{id}}" data-cardtype="{{type}}" data-cardid="{{id}}">
						<mip-img src="{{imageUrl}}" class="preferential-card_bgimg" id="preferential-card_{{type}}_{{id}}_bgimg"></mip-img>
						<p class="card-list">{{name}}</p>
						<p class="card-context">{{description}}</p>
						<span class="card-price">￥ <i style="font-style: normal" id="card_price">{{price}}</i></span>
						<span class="card-Orig">￥ <i style="font-style: normal" id="card_Orig">{{originalPrice}}</i></span>
					</div>
				</li>
				{{/list}}
			</template>
		</ul>
</mip-ilaw66-falv-preferentiallist>
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

