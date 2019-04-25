# mip-hs313-gochapter

根据输入的章节ID，快速跳转到指定ID的页面进行阅读。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs313-gochapter/mip-hs313-gochapter.js


## 示例

### 基本用法
```html
<mip-hs313-gochapter novelid="11234">
    <input type="text" id="chapterid">
	<button type="button">GO</button>
</mip-hs313-gochapter>
```

## 属性

### novelid

说明：当前页面ID
必选项：是
类型：数字
默认值：无
