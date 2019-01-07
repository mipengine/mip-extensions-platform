# mip-jm-rem

mip-jm-rem 组件说明
移动版rem相对屏幕适配,通过设置设备dpr进行计算，iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案，并根据已有的meta标签来设置缩放比例。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v2/mip-jm-rem/mip-jm-rem.js

## 示例

### 基本用法
```html
    <mip-jm-rem base-width="750" scale-320="0.99" scale-362="1" scale-375="1" scale-414="0.97"></mip-jm-rem>
```

## 属性
base-width

说明：设计稿大小 必填：否
格式：数字
scale-320/362/375/414/414plus

说明：根据不同尺寸屏幕微调基础fontSize 必填：否
格式：数字
### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

