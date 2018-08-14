# mip-zol-m-article-content

mip-zol-m-article-content ZOLM站私有业务组件，详情页查看全文功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zol-m-article-content/mip-zol-m-article-content.js

## 示例

### 基本用法
```html
<mip-zol-m-article-content data-article-id="666666" data-now-page="7">
    <div data-role="article-content"></div>
    <div data-role="show-whole-article">点击展示更多内容</div>
</mip-zol-m-article-content>
```

## 属性

### data-article-id
说明：文章id
必选项：是
类型：number

### data-now-page
说明：当前文章页码
必选项：否
类型：number