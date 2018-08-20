# mip-ajax-tgb

mip-ajax-tgb 自定义异步请求封装

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ajax-tgb/mip-ajax-tgb.js

## 示例

### 基本用法
```html
<div  id='aaaa'></div>
<mip-ajax-tgb  url='*******'  funId='aaaa'></mip-ajax-tgb>
</mip-ajax-tgb>
```

## 属性

### url
说明：请求路径，为get请求时，若有参数则跟在url后面，第一个参数用？相连，参数大于一个时，参数与参数之间用&相连
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无
### funId
说明：存回调函数数据的标签id
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无
### asyncType
说明：请求异步(true)或者同步(false)
必选项：否
类型：布尔类型
取值范围：false或true
单位：无
默认值：true

## 注意事项
无

