# mip-shushi100-ajax

mip-shushi100-ajax 提交自定义json参数到指定服务地址

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-shushi100-ajax/mip-shushi100-ajax.js

## 示例

### 基本用法
```html
<mip-shushi100-ajax url="http://www.shushi100.com/site/ajax-good-thing-like" params="{'id':'123'}"></mip-shushi100-ajax>
<div>只是提交参数到指定服务地址，无其它样式</div>
```

## 属性

### url

说明：要提交的地址
必选项：是
类型：字符串
取值范围：http,https
默认值："http://www.shushi100.com/site/ajax-good-thing-like"

### params

说明：需要提交的参数
必选项：否
类型：字符串
取值范围：json结构
默认值："{'id':'123'}"



