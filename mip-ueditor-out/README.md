# mip-ueditor-out

mip-ueditor-out 将富文本的style以mip-data-style代替，然后将该属性值转化为css样式。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-ueditor-out/mip-ueditor-out.js

## 示例

### 基本用法
```html
<mip-ueditor-out propertyname="mip-data-style">
	
  	<p mip-data-style="display:block;font-size:16px;color:red;">
  		分三步走，<br >
  		第1步：把mip-data-style的内容转化为style,这是每一步，
  		第2步：如果后台不能处理传给我的值是一个纯标签的值，那就把mip-data-style转化成class，比如说font-size:16px成class="fz16" ，这需要在css里提前定义，工程浩大。
  		第3步：如果后台最终不能解决，由前端开发一套富文本的编辑器，提供给客户使用。
  	</p>
  	
  	
  	<p mip-data-style="background:#000;color:red">
  		测试 有mip-data-style
  	</p>
 
	
  
  	<div mip-data-style="">
  		测试 无标记标签
  		<span mip-data-style="background:#000;color:red;">
	  		测试 有mip-data-style
	  	</span>
  	</div>
  	<p mip-data-style>测试 有</p>
  	<script src="https://c.mipcdn.com/static/v1/mip.js"></script>
</mip-ueditor-out>
```

## 属性

### propertyname

说明：允许开发人员自定义一个属性，用以替代style，可以是mip-data-style,这里的默认值也是这个。当然，也可以是别的名称。
必选项：否
类型：string
默认值：mip-data-style

## 注意事项
这个组件，是为了解决由织梦或者帝国文章编辑器内自带style样式问题。这是一种无奈的选择，如果后台能够解决编辑器自带style问题，最好不要使用此组件，渲染太慢。需要操作太多的dom元素。

