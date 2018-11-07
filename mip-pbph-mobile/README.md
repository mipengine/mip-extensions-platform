# mip-pbph-mobile

mip-pbph-mobile 移动端一键一屏，屏幕竖直翻页

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-pbph-mobile/mip-pbph-mobile.js

## 示例

### 基本用法
```html
<mip-pbph-mobile>
    <div class="Slide" id="Slide">
        <div class="Slide-container">
            <div class="display aaa1">

            </div>
        </div>
        <div class="Slide-container">
            <div class="display aaa2 opacit">

            </div>
        </div>
        <div class="Slide-container">
            <div class="display aaa3 opacit" id="broadcast2">

            </div>
        </div>
        <div class="Slide-container">
            <div class="display aaa4 opacit" id="broadcast">

        </div>
        <div class="Slide-container">

        </div>
    </div>
</mip-pbph-mobile>
```

## 属性

### id

说明：确定外层高度及内层显示区域
必选项：是
类型：字符串
取值范围：'Slide','Slide-container'
默认值：无