# mip-close

mip-close 关闭弹窗

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-close/mip-close.js

## 示例
```html
<style mip-custom>
.close-section{width:200px; height:100px; margin:30px auto; border:1px solid #000; position: relative;}
</style>
<section class="close-section">如果要是点击x，就没了
    <mip-close class="close-btn" target="outer">X</mip-close>
</section>
```

## 属性

### target

说明：指向需要关闭的dom，还支持queryselector
必选项：否
类型：字符串
默认值："outer",queryslector的内容



