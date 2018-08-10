# mip-carousel-figure-2

mip-carousel-figure-2 组件说明

### 一款自动轮播得组件，优势是轮播内容自定义

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-carousel-figure-2/mip-carousel-figure-2.js

## 示例
```html
<!DOCTYPE html>
<html mip>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <title>轮播</title>
    <link rel="stylesheet" type="text/css" href="https://c.mipcdn.com/static/v1/mip.css">
    <link rel="canonical" href="对应的原页面地址">
    <style mip-custom>
    /* 自定义样式 */
    </style>
</head>
<body>
<!-- 正文 -->
<div>
    <mip-carousel-figure-2 delay-time="3000">
        <ul class="mip-carousel-figure-2-list">
            <li class="mip-carousel-figure-2-item">
                1
            </li>
            <li class="mip-carousel-figure-2-item">
                2
            </li>
            <li class="mip-carousel-figure-2-item">
                3
            </li>
            <li class="mip-carousel-figure-2-item">
                4
            </li>
            <li class="mip-carousel-figure-2-item">
                5
            </li>
        </ul>
    </mip-carousel-figure-2>
</div>
<script src="https://c.mipcdn.com/static/v1/mip.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-carousel-figure-2/mip-carousel-figure-2.js"></script>
</body>
</html>
```

### 基本用法
```html
<mip-carousel-figure-2 delay-time="3000">
        <ul class="mip-carousel-figure-2-list">
            <li class="mip-carousel-figure-2-item">
                1
            </li>
            <li class="mip-carousel-figure-2-item">
                2
            </li>
            <li class="mip-carousel-figure-2-item">
                3
            </li>
            <li class="mip-carousel-figure-2-item">
                4
            </li>
            <li class="mip-carousel-figure-2-item">
                5
            </li>
        </ul>
    </mip-carousel-figure-2>
```

## 属性
    class
### mip-carousel-figure-2-list, mip-carousel-figure-2-item
    
说明：默认样式
必选项：是

## 属性
    delay-time
### 数值
    
说明：毫秒，轮播的间隔时间
必选项：否
默认值：1500ms


## 注意事项

###    delay-time 只能填写数字，或者不添