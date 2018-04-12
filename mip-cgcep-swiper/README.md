# mip-cgcep-swiper

引入swiper.jquery.min到mip页面中使之可以配置参数

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cgcep-swiper/mip-cgcep-swiper.js

## 示例

### 基本用法
```html
<mip-cgcep-swiper container=".swiper-container">
	<script type="application/json">
        {
        	"autoplay": 5000,
            "pagination": ".swiper-pagination",
            "paginationClickable": true
        }
    </script>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            <div class="swiper-slide">Slide 4</div>
            <div class="swiper-slide">Slide 5</div>
            <div class="swiper-slide">Slide 6</div>
            <div class="swiper-slide">Slide 7</div>
            <div class="swiper-slide">Slide 8</div>
            <div class="swiper-slide">Slide 9</div>
            <div class="swiper-slide">Slide 10</div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
</mip-cgcep-swiper>
```

## 属性

### container

说明：swiper容器选择器
必选项：是
类型：字符串
默认值：".swiper-container"

## 注意事项

