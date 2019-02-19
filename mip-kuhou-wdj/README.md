# mip-kuhou-wdj

mip-kuhou-wdj 在静态页面上通过fetch来屏蔽某些地区

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-kuhou-wdj/mip-kuhou-wdj.js

## 示例

### 根据类型显示资源
```html
<mip-kuhou-wdj url="http://mip.05sun.com/ajax.asp?action=33" typeid="dd_btn" cpid="cpname"></mip-kuhou-wdj>
<div id="cpname"></div>
<dd class="dd_btn"><a href="http://www.one1.com">立即下载</a></dd>


```

## 属性

### url

说明：所调用资源的地址
必选项：是
类型：字符串

### typeid

说明：屏蔽元素的ID
必选项：是
类型：字符串

### cpid

说明：根据是否拥有这个元素 来判断页面是否要屏蔽
必选项：是
类型：字符串

