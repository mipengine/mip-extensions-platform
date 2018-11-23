# mip-cy-event-analyse

mip-cy-event-analyse 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-cy-event-analyse/mip-cy-event-analyse.js

## 示例

### 基本用法
```html
<mip-cy-event-analyse type="click" href="" key="" segmentation="">
    自定义内容，可以嵌套其他组件
</mip-cy-event-analyse>
```


## type

说明：上传类型
必选项：否
类型：String
取值范围：click、load
默认值：click

## href

说明：跳转地址,当type类型是click时才会跳转
必选项：否
类型：String
默认值：无

### key

说明：打点的名称
必选项：是
类型：String
默认值：无

### segmentation

说明：打点的字段
必选项：否
类型：String 字符串对象
默认值：无

