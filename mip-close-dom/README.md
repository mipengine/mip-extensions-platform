# mip-close-dom

mip-close-dom 关闭组件点击关闭外层dom

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-close-dom/mip-close-dom.js

## 示例

### 基本用法
```html
<section class="close-section">
<mip-close-dom class="close-btn" target="outer">
</mip-close-dom>
</section>
```

## 属性

### target

说明：指向需要关闭的dom,支持queryselector
必选项：否
类型：字符串
取值范围：'outer',queryselectorry 内容
默认值：outer


