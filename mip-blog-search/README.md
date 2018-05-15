# mip-blog-search

mip-blog-search 用来支持hexo博客站内搜索功能，私有个性搜索组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-blog-search/mip-blog-search.js

## 示例

### 基本用法
```html
<style>
	 * {
	 	margin: 0;
	 	padding: 0;
	 	list-style: none;
	 }
</style>
<mip-blog-search>
	<span id="back">back</span>
	<span id="search">search</span>
	<input id="key" type="text" autocomplete="off" placeholder="输入感兴趣的关键字" class="search-input st-default-search-input" />
	<div id="search-panel"></div>
	<div id="search-result"></div>
	<div id="search-panel-layer"></div>
	
	<template type="mip-mustache">
	{{#data}}
		<li class="item">
			<a href="/{{path}}" class="waves-block waves-effect">
				<div title="{{resTitle}}" class="title ellipsis">{{&sTitle}}</div>
				<div class="flex-row flex-middle">
					<div class="tags ellipsis">
					{{#tags}}
					<span>#{{name}}</span>
					{{/tags}}
					</div>
					<time class="flex-col time">{{sDate}}</time>
				</div>
			</a>
		</li>
	{{/data}}
	</template>
</mip-blog-search>
<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
```
