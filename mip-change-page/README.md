# mip-change-page

mip-change-page 左右翻页，实现自动分页功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-change-page/mip-change-page.js

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
<mip-change-page class="change-page" data-number="9">
    <section id="box">
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    	<div class="boxboxs">
    		<a href="">
	    		<mip-img layout="responsive" src="https://www.mipengine.org/static/img/sample_01.jpg" alt=""></mip-img>
	    		<p class="mip-change-page-title">蘭公子卤肉饭</p>
	    		<div class="mip-change-page-info">
	    			<p class="mip-change-page-jiage">￥1-5万</p>
	    			<p class="mip-change-page-liaojie">查看加盟费</p>
	    		</div>
    		</a>
    	</div>
    </section>
    <div id="page">
        <a href="javascript:;" id="pre"><</a>
        <div class="list"></div>
        <a href="javascript:;" id="next">></a>
    </div>
</mip-change-page>
```

## 属性

### {data-number}

说明：{每一页的个数}
必选项：{否}
类型：{整型}
取值范围：{正整数}
默认值：{9}

## 注意事项 
操作的数据是每页数量的整数倍
