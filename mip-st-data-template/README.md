# mip-st-data-template

mip-st-data-template 组件说明
将当前网页url里的参数取出来，映射转换后发请到后端获取数据，然后渲染模板


标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-st-data-template/mip-st-data-template.js

## 示例

### 基本用法
```html
<mip-st-data-template>
    <template type="mip-xxx">
    </template>
</mip-st-data-template>
```

## 属性

### url

说明：请求数据的url
必选项：是
类型：string

### params

说明：参数名称映射, 格式为from:to
必选项：是
类型：string

