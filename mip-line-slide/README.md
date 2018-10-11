# mip-line-slide

mip-line-slide 垂直滚动-用于新闻垂直滚动，留言信息滚动

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-line-slide/mip-line-slide.js

## 示例

### 基本用法
```html
<style>
	body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, hr, pre, code, form, input, button, fieldset, textarea, p, blockquote, th, td, span{
		 margin: 0;
		 padding: 0 ;
		 box-sizing: border-box;
		 font-family:"Microsoft YaHei",STXihei,STHeiti;
	}	
	.toutiao-news{ padding: 0 13px 0 10px; width: 100%; height: 55px; background: #fff; }
</style>
<div class="toutiao-news">
	<mip-line-slide class="gdnewslist" data-time="">
		<ul>
			<li><a href="newspage.html"><span>热点</span>1子曰糊涂馄饨真是太还吃了，恭喜城阳区方总热烈加盟！</a></li>
			<li><a href="newspage.html"><span>热点</span>2子曰糊涂馄饨真是太还吃了，恭喜城阳区方总热烈加盟！</a></li>
			<li><a href="newspage.html"><span>热点</span>3子曰糊涂馄饨真是太还吃了，恭喜城阳区方总热烈加盟！</a></li>
			<li><a href="newspage.html"><span>热点</span>4子曰糊涂馄饨真是太还吃了，恭喜城阳区方总热烈加盟！</a></li>
			<li><a href="newspage.html"><span>热点</span>5子曰糊涂馄饨真是太还吃了，恭喜城阳区方总热烈加盟！</a></li>
			<li><a href="newspage.html"><span>热点</span>6子曰糊涂馄饨真是太还吃了，恭喜城阳区方总热烈加盟！</a></li>
			<li><a href="newspage.html"><span>热点</span>7子曰糊涂馄饨真是太还吃了，恭喜城阳区方总热烈加盟！</a></li>
		</ul>
	</mip-line-slide>
</div>
```

## 属性

### {data-time}

说明：{被操作的元素}
必选项：{否}
类型：{字符串}
默认值：{className}