# mip-close-dom

mip-close-dom 关闭组件,点击关闭外层dom

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-close-dom/mip-close-dom.js

## 示例

### 基本用法
```html
<style>
    body{
        padding: 20px;
    }
    .close-section{
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        position: relative;
    }
</style>
<section class="close-section">
    <mip-close-dom class="close-btn" target="outer"></mip-close-dom>
</section>
```

## 属性

### target
说明：指向需要被关闭的dom
必选项：否
类型：{类型}
取值范围：outer, querySelector 内容
单位：{单位}
默认值：outer

## 注意事项


