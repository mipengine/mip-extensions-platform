# mip-sy-close-dom

mip-sy-close-dom 关闭组件，点击关闭外层dom

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sy-close-dom/mip-sy-close-dom.js

## 示例

### 基本用法：点击关闭
```html
<style type="text/css">
    body {
	    padding: 20px;
    }
    .close-section {
	    padding: 20px;
	    background-color: #fff;
	    box-shadow: 0px 5px 20px rgba(0,0,0,0.3);
	    position: relative;
    }
</style>
<section class="close-section">
    <mip-sy-close-dom class="close-btn" target="outer">
    </mip-sy-close-dom>
</section>
```

## 属性

### target

说明：指向需要被关闭的dom，支持queryselector
必选项：否
类型：字符串
取值范围：'outer', queryselector内容
默认值：outer

