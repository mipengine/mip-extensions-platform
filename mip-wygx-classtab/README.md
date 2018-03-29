# mip-wygx-classtab

mip-wygx-classtab 我要个性网 -- 内容页，多样式绑定切换

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-wygx-classtab/mip-wygx-classtab.js

## 示例

### 基本用法
```html
<mip-wygx-classtab bind-to=".box1" botton-class="grey" active-class="round"> 
    <span toggle-class="round">round</span>
    <span toggle-class="square">square</span>
</mip-wygx-classtab>
<mip-wygx-classtab bind-to=".box1" botton-class="grey" active-class="yellow">
 	<span toggle-class="yellow">yellow</span>
    <span toggle-class="green">green</span>
</mip-wygx-classtab>
<div class="box1"></div>
<div class="box1"></div>

<style mip-custom>
span{
	display: inline-block;
	padding: 8px 10px;
	border: 1px solid #ccc;
	color:#999;
}
.box1{
	width: 200px;
	height: 200px;
	border:1px solid #ccc;
	background-color:#ccc;
}
.round{
	border-radius: 50%;
}
.square{
	border-radius: 0;
}
.yellow{
	background-color:yellow;
}
.green{
	background-color:green;
}
.grey{
	background-color: #ccc;
	color:#fff;
}
</style>
```

## 属性

### bind-to
说明：绑定元素的选择器(css选择器)

必选项：是

类型：string

### toggle-class
说明： 需要指定切换的类名

必选项：是

### botton-class
说明： 按钮切换的类名

必选项：是

### active-class
说明： 按钮激活状态样式

必选项：是

类型：string

## 注意事项
1. 样例中的类名并非实际所需，只是方便测试添加
2. 绑定元素中不能含有和即将绑定的类名同名的class, 同名后者覆盖
3. 被绑定元素不宜过多，会影响性能
4. 注意css权重问题
