# mip-zol-echart

mip-zol-echart 图表组件

标题|内容
----|----
类型|公司通用组件
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-zol-echart/mip-zol-echart.js

## 示例
### 1.0.1新增
图表最大值的取值部分处理

### 1.0.2新增
修正雷达图数据最大值，最小值展示错误bug

### 基本用法
```html
<mip-zol-echart type="radar" data-val="96.4,87.2,77,56,89">
    <div class="chart-con"></div>
</mip-zol-echart>
```

## 属性

### type

说明：图表类型
必选项：是
类型：字符串
取值范围：radar,line

### data-val

说明：图表参数
必选项：是
类型：字符串
取值范围：auto

## 注意事项
type,属性必须填写
data-val属性，如果type参数为radar时，传参的数字个数为5个
data-val属性，如果type参数为line时，传参的数字个数为8个

