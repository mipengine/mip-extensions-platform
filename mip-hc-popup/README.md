# mip-hc-popup

mip-hc-popup 弹出框提示组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hc-popup/mip-hc-popup.js

## 示例

### 基本用法
```html
<style>
</style>
<section class="hc-popup">
  <mip-hc-popup target="hc-alert">
    <div class="hc-title">
      beisir提示您
    </div>
    <div class="hc-text">
      请正确打开页面的姿势请正确打开页面的姿势请正确打开页面的姿势
    </div>
  </mip-hc-popup>
</section>
```

## 属性

### target

说明：点击弹框元素的id
必选项：是
类型：字符串
取值范围：id选择器
默认值：hc-alert
