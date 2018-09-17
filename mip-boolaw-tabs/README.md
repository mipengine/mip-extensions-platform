# mip-boolaw-tabs

mip-boolaw-tabs 组件说明

对mip-dongde-tabswitch进行定制自身需求，就是融合mip-fixed和mip-vd-tabs

标题|内容
----|----
类型|定制
支持布局|responsive,flex,container
所需脚本|https://c.mipcdn.com/static/v1/mip-boolaw-tabs/mip-boolaw-tabs.js

## 示例

### 基本用法
```html
<style>
.tab-content{
	height:800px
}
.tab-nav .activy {
    color: #38f;
    border-bottom: 1px solid #38f;
}
</style>
<mip-boolaw-tabs default-selected-id="0">
	<section>
		<div class="tab-nav">
		<li class="tab-nav-li activy" data-id="0">概览</li>
		<li class="tab-nav-li" data-id="1">问答</li>
		<li class="tab-nav-li" data-id="2">案例</li>
		<li class="tab-nav-li" data-id="3">评价</li>
		</div>
	</section>
	<div class="custom-content">不受tab切换影响的内容，可以一直显示</div>
	<div class="tab-content">概览</div>
	<div class="tab-content">问答</div>
	<div class="tab-content">案例</div>
	<div class="tab-content">评价</div>
</mip-boolaw-tabs>
```

## 属性

### default-selected-id

说明：默认选中  
必选项：否  
类型：整型 
默认值：0


### data-id

说明：控制<div class="tab-content"></div>显示，下标值0开始
必选项：是  
类型：整型

### class：tab-nav，tab-nav-li，tab-content

说明：必须元素 绑定点击事件
必选项：是  
类型：整型

## 注意事项
定制组件，当屏幕高度不够时无法滚动。
