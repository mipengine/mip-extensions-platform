# mip-st-invoke-im

mip-st-invoke-im 组件说明
用来在手百下唤起IM

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-st-invoke-im/mip-st-invoke-im.js

## 示例

### 基本用法
```html
<mip-st-invoke-im data-query-id="id">
    <button >联系客服</button>
</mip-st-invoke-im>
```

## 属性

### data-query-id

说明：从当前页面url中获取熊掌号id的查询字段名称
必选项：否
类型：string
默认值：'id'
