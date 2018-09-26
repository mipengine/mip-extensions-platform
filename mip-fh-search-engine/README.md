# mip-fh-search-engine

mip-fh-search-engine 根据页面的搜索引擎来源，跳转到指定的页面地址，针对性优化用户体验。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-fh-search-engine/mip-fh-search-engine.js

## 示例

### 基本用法
```html
<body>
<mip-fh-search-engine sn="sogou" converse href="https://m.fh21.com.cn/"></mip-fh-search-engine>
<div class="content"></div>
</body>
```

## 属性

### sn

说明：搜索引擎别称，多个搜索引擎用‘,’隔开
必选项：否
类型：字符串
取值范围："google", "yahoo", "msn", "baidu", "sogou", "sohu", "sina", "sn163", "lycos", "tom", "yisou", "iask", "soso", "gougou", "zhongsou", "bing"

### href

说明：指定的页面跳转地址，最好指定，否则默认由view跳转的hview
必选项：否
类型：字符串

### converse

说明：搜索引擎取反
必选项：否
类型：布尔值

## 注意事项

尽量将mip-fh-search-engine组件放置在body的第一个子元素
