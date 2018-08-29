# mip-qqy-list

mip-qqy-list 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qqy-list/mip-qqy-list.js

## 示例
<mip-qqy-list mip-dropload-params="{'url':'url?classid=150&tempid=1&line=30&orderby=', 'isclick':'iscroll', 'count':'2'}">
<ul id="applist"></ul>
<div class="appmore" id="more"><span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新...</span></div>
</mip-qqy-list>
### 基本用法
```html
<mip-qqy-list>
    自定义内容，可以嵌套其他组件
</mip-qqy-list>
```

## 属性

### {属性名}

说明：色下载列表数据组件, mip-dropload-params get链接 isclick 为 iscroll 为下拉刷新 count 为页面总数 
必选项：是
类型：数字

