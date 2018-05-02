# mip-linkeddb-lightbox

mip-linkeddb-lightbox 弹出层 有过渡时间

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkeddb-lightbox/mip-linkeddb-lightbox.js

## 示例

### 基本用法
```html
<div>
	<a href="javascript:;" class="menu">弹出层</a>
</div>
<mip-linkeddb-lightbox>
	<div class="mip-lightbox">
		<h1>Hello world</h1>
	</div>
</mip-linkeddb-lightbox>
<div class="mip-opacity"></div>
```

## 属性

### transition

说明：弹出的时间;
必选项：否

## 注意事项
transform:translateY(-200%); 点击改变 transform:translateY(0); 期间会有过渡时间。
