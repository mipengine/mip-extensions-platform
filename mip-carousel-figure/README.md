# mip-carousel-figure

mip-carousel-figure 组件说明

### 一款轮播图的组件，主要优势在于可以自定义一次显示的图片数量，一次展示可以是一张，也可以是多张，使用方法也很简单，只需要引入脚本，直接试用下面的示例，很清楚的就能明白它的使用方法

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-carousel-figure/mip-carousel-figure.js

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
</head>
<body>
<!-- 正文 -->
<div style="width:730px;margin:0 auto">
    <mip-carousel-figure>
        <i class="mip-carousel-figure-left">←</i>
        <ul class="mip-carousel-figure-list">
            <li class="mip-carousel-figure-item">
                <span class="mip-carousel-figure-img">
                    <mip-img layout="responsive" width="768" height="512" src="./img/carouse_1.jpg"></mip-img>
                    <a href="#" "email me">Apple 百年城</a>
                </span>
                <span class="mip-carousel-figure-img">
                    <mip-img layout="responsive" width="768" height="512" src="./img/carouse_2.jpg"></mip-img>
                    <a href="#" "email me">Apple 百年城</a>
                </span>
                <span class="mip-carousel-figure-img">
                    <mip-img layout="responsive" width="768" height="512" src="./img/carouse_3.jpg"></mip-img>
                    <a href="#" "email me">Apple 百年城</a>
                </span>
            </li>
            <li class="mip-carousel-figure-item">
                <span class="mip-carousel-figure-img">
                    <mip-img layout="responsive" width="768" height="512" src="./img/carouse_4.jpg"></mip-img>
                    <a href="#" "email me">Apple 百年城</a>
                </span>
                <span class="mip-carousel-figure-img">
                    <mip-img layout="responsive" width="768" height="512" src="./img/carouse_5.jpg"></mip-img>
                    <a href="#" "email me">Apple 百年城</a>
                </span>
            </li>
            <li class="mip-carousel-figure-item">
                <span class="mip-carousel-figure-img">
                    <mip-img layout="responsive" width="768" height="512" src="./img/carouse_7.jpg"></mip-img>
                    <a href="#" "email me">Apple 百年城</a>
                </span>
            </li>
        </ul>
        <i class="mip-carousel-figure-right">→</i>
    </mip-carousel-figure>
</div>
    
<script src="https://c.mipcdn.com/static/v1/mip.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-carousel-figure/mip-carousel-figure.js"></script>
</body>
</html>
```

### 基本用法
```html
<mip-carousel-figure>
    <i class="mip-carousel-figure-left">←</i>
    <ul class="mip-carousel-figure-list">
        <li class="mip-carousel-figure-item">
            <span class="mip-carousel-figure-img">
                <mip-img layout="responsive" src=""></mip-img>
                <a href="#" "email me">xxxxxxxxxx</a>
            </span>
        </li>
        <li class="mip-carousel-figure-item">
            <span class="mip-carousel-figure-img">
                <mip-img layout="responsive" src=""></mip-img>
                <a href="#" "email me">xxxxxxxxxx</a>
            </span>
        </li>
        <li class="mip-carousel-figure-item">
            <span class="mip-carousel-figure-img">
                <mip-img layout="responsive" src=""></mip-img>
                <a href="#" "email me">xxxxxxxxxxx</a>
            </span>
        </li>
    </ul>
    <i class="mip-carousel-figure-right">→</i>
</mip-carousel-figure>
```

## 属性
    class
### mip-carousel-figure-left, mip-carousel-figure-list, mip-carousel-figure-item, mip-carousel-figure-img,mip-carousel-figure-right

说明：默认样式，当然如果想自定义样式，也可以自己再修改
必选项：class都是必选的，就是默认的样式，

## 标签
    
### a

说明：图片上面的说明或者标题，可选
必选项：可选

## 备注

### 一个页面轮播图的效果组件，左右按钮滑动切换，主要特色一次显示的图片可以是一张可以是多张，每个li是一组，li里面可以任意添加多张图片
