# mip-jia-tbs

mip-jia-tbs 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-jia-tbs/mip-jia-tbs.js

## 示例

### 基本用法
```html
<mip-jia-tbs data-nav=".nav1 li" data-con=".tab1 .item-box" data-cur="cur">
		<ul class="nav1">
			<li class="cur"><span>一</span></li>
			<li><span>二</span></li>
			<li><span>三</span></li>
		</ul>
		<div class="tab1">
			<div class="item-box cur">1</div>
			<div class="item-box">2</div>
			<div class="item-box">3</div>
		</div>
</mip-jia-tbs>
```

## 属性

### data-nav

说明：指定TAB按钮元素
必选项：是
类型：元素选择器

### data-con

说明：指定TAB内容元素
必选项：是
类型：元素选择器

### data-cur

说明：当前TAB按钮添加class
必选项：是
类型：class类名称


## 注意事项
