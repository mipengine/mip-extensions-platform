# mip-url-search

mip-url-search 用来支持本站搜索的操作

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-url-search/mip-url-search.js

## 示例
<mip-url-search surla="http://m.pcsoft.com.cn/search/azsoft/" surlb=".html">
    <div class="input-group">
        <input type="search" class="form-control" placeholder="请输入关键字" id="keyword">
        <span class="input-group-addon" id="basic-addon">搜索</span>
    </div>
</mip-url-search>
### 基本用法
```html
<mip-url-search surla="afterurl" surlb="beffreurl">
    自定义内容，可以嵌套其他组件
</mip-url-search>
```

