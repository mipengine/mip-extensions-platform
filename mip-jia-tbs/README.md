# mip-jia-tbs

mip-jia-tbs 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-jia-tbs/mip-jia-tbs.js

## 示例

### 基本用法
```html
<mip-jia-tbs data-stick="top">
	<div class="mip-tab-nav">
		<ul class="tab-head">
			<li class="cur init"><span>一</span></li>
			<li><span>二</span></li>
			<li><span>三</span></li>
		</ul>
	</div>
	<div class="mip-tab-content">
		<div class="tab-wrapper">
			<div class="item-box">1</div>
			<div class="item-box hide">2</div>
			<div class="item-box hide">3</div>
		</div>
	</div>
</mip-jia-tbs>
```

## 属性

### data-stick

说明：导航是否置顶  
必选项：否    
类型：字符串


## 注意事项
