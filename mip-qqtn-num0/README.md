# mip-qqtn-num0

mip-qqtn-num0 判断假如没有li则将外层隐藏

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-qqtn-num0/mip-qqtn-num0.js

## 示例

```html
<mip-qqtn-num0>
<h3>有内容</h3>
<div class="f-num">
	<ul>
		<li>1</li>
	</ul>	
</div>

<div class="f-num"><h4>没内容</h4>
	<ul>	
	</ul>222
</div>

<div class="f-num"><h4>没内容</h4>
	<ul>	
	</ul>333
</div>
<h4>有内容</h4>
<div class="f-num">
	<ul><li></li>	
	</ul>444
</div>
</mip-qqtn-num0>
```




