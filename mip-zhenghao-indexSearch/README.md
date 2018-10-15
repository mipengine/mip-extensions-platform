# mip-zhenghao-indexSearch

整好mip站 首页搜索 自用组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zhenghao-indexSearch/mip-zhenghao-indexSearch.js

## 示例

### 基本用法
```html
<mip-zhenghao-indexSearch>
	<div class="zh_sou_1" id="index_search_box">
	    <input name="" placeholder="夏天马上到了，瘦身来找我们" class="wenben" type="text"  />
	</div>
</mip-zhenghao-indexSearch>

<section id="index_search_page">
    <header class="header">
    	<mip-form onsubmit="return false;">
        		<input name="" placeholder="水光针" class="wenben" type="text" id='index_search_input' >
        </mip-form>
        <div class="a2" id='index_search_page_hide_btn'>取消</a>
    </header>

    <div id="historical"></div>
    <div id="index_search_clear">清空历史记录</div>
</section>
```
