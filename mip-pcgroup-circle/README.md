# mip-pcgroup-circle

mip-pcgroup-circle 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-pcgroup-circle/mip-pcgroup-circle.js

## 示例

### 基本用法
```html
<div class="circle">
    <mip-pcgroup-circle size="60" value="88.0" border="3" bgColor="#eee" color="#1f89e3"></mip-pcgroup-circle>
</div>
```

## 属性

### size

说明：圆环宽高
必选项：否
类型：数值
取值范围：无
单位：无
默认值：根据html的fontSize来定

### value

说明：圆环进度
必选项：是
类型：数值
取值范围：0-100
单位：无
默认值：0

### border

说明：圆环厚度
必选项：是
类型：数值
取值范围：无
单位：无
默认值：3

### bgColor

说明：圆环底色
必选项：否
类型：string
取值范围：无
单位：无
默认值：#eee

### color

说明：圆环颜色
必选项：否
类型：string
取值范围：无
单位：无
默认值：#1f89e3

## 注意事项
由于无法页面上直接用js创建canvas百分比圆环图，只能通过组件来动态写入，目前只针对现有的样式调整颜色跟大小，满足现有的需求
