# mip-sj-selectdown

mip-sj-selectdown 点击栏目显示隐藏 div 内容，可做nav导航功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sj-selectdown/mip-sj-selectdown.js

## 示例

### 基本用法
```html
<section class="mip-sj-selectdown">
	<mip-sj-selectdown>
	    <ul id="selectdown-item">
	    	<li>综合</li>
	    	<li>品类</li>
	    	<li>价格</li>
	    </ul>
	    <div id="selectdown-cont">
	        <div class="hidde">综合内容</div>
		    <div class="hidde">品类内容</div>
		    <div class="hidde">价格内容</div>
	    </div>
	</mip-sj-selectdown>
</section>
```

## 属性



说明：点击 li 元素；显示隐藏 div 内容
必选项：否
类型：字符串
取值范围：selectdown-item 内容
默认值：无


