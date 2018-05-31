# mip-linkeddb-floating

mip-linkeddb-floating 当标题滑动到顶端时，会浮动在顶端 mip自身组件 由于浮动不占位 会覆盖下面的内容。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkeddb-floating/mip-linkeddb-floating.js

## 示例

### 基本用法
```html
<mip-linkeddb-floating>
    <div class="car1"></div>
    <div id="topNavList">
        <p>hello world</p>
    </div>
    <div class="car2"></div>
</mip-linkeddb-floating>
```

## 注意事项
滑动到顶端时,会向div添加 class  fixed ,自行设置fixed 调节悬浮位置