# mip-xxd-vertical-carousel

简单垂直轮播组件

标题|内容
----|----
类型|通用
支持布局|responsive
所需脚本|https://c.mipcdn.com/static/v1/mip-xxd-vertical-carousel/mip-xxd-vertical-carousel.js

## 示例

### 基本用法
```html
<mip-xxd-vertical-carousel interval="2500">
    <div class="slider-item">1</div>
    <div class="slider-item">2</div>
    <div class="slider-item">3</div>
    <div class="slider-item">4</div>
    <div class="slider-item">5</div>
</mip-xxd-vertical-carousel>
```

## 属性

### interval
轮播时间间隔，单位是`ms`

## 注意事项
使用时传入各列表元素，该组件会自动进行垂直轮播，轮播动画事件为`0.3`秒。
