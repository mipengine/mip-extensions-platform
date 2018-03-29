# mip-shushi100-timeout

mip-shushi100-timeout 定时触发指定dom指定绑定事件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-shushi100-timeout/mip-shushi100-timeout.js

## 示例

### 基本用法
```html
<mip-shushi100-timeout ev="click" interval=3 target="timeout-target">
    <section class="timeout-target">定时触发一次绑定的事件</section>
</mip-shushi100-timeout>
```

## 属性

### target

说明：指定触发的dom
必选项：是
类型：字符串
取值范围：'timeout-target',queryselector内容
默认值：timeout-target

### ev

说明：指定定时所触发的事件
必选项：否
类型：字符串
取值范围：'click',queryselector鼠标事件
默认值：click

### interval

说明：指定时间间隔
必选项：否
类型：数值
取值范围：正数
单位：秒
默认值：3


##注意事项
这是一个辅助型组件，定时触发一次指定DOM绑定的事件。
为了防止示例添加事件与具体事件冲突，所以这里没有具体绑定事件示例。






