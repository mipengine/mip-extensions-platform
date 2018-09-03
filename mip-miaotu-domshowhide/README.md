# mip-miaotu-domshowhide

mip-miaotu-domshowhide 点击按钮隐藏和显示DOM

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-miaotu-domshowhide/mip-miaotu-domshowhide.js

## 示例

### 基本用法
```html
<mip-miaotu-domshowhide>
    <div class="displaynone">这是点击后会隐藏的</div>
    <div class="displaynone">这是点击后会隐藏的</div>
    <div class="displayblock">这是点击后会显示的</div>
    <div class="displayblock">这是点击后会显示的</div>
    <input type="button" class="clickme-hide-show" value="点击此处">
</mip-miaotu-domshowhide>
```

## 属性

### class

说明：当前被点击的按钮元素
必选项：是
类型：字符串
默认值：无

