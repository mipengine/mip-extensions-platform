# mip-tabs-lf

mip-tabs-lf 左右切换和分页结合
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-tabs-lf/mip-tabs-lf.js

## 示例

### 基本用法
```html
<style>
	body, div, section, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, hr, pre, code, form, input, button, fieldset, textarea, p, blockquote, th, td, span{
		 margin: 0;
		 padding: 0 ;
		 box-sizing: border-box;
		 font-family:"Microsoft YaHei",STXihei,STHeiti;
	}
</style>
<mip-tabs-lf class="mip-tabs-lf">
	<div class="mip-tabs-lf-top">
		<span class="mip-tabs-lf-top-span act" data-number="0" >tab1</span>
		<span class="mip-tabs-lf-top-span" data-number="1" >tab2</span>
		<span class="mip-tabs-lf-top-span" data-number="2" >tab3</span>
	</div>
	<div class="mip-tabs-lf-wrap">
		<div class="mip-tabs-lf-boxs act">
			内容1
		</div>
		<div class="mip-tabs-lf-boxs">
			内容2
		</div>
		<div class="mip-tabs-lf-boxs">
			内容3
		</div>
	</div>
</mip-tabs-lf>
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
