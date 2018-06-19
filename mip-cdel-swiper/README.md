# mip-cdel-swiper

mip-cdel-swiper swiper插件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cdel-swiper/mip-cdel-swiper.js

## 示例

### 基本用法
```html
<mip-cdel-swiper container=".swiper-container">
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
</mip-cdel-swiper>
```

## 属性

container

说明：swiper容器选择器 必选项：是 类型：字符串 默认值：".swiper-container"

pag

说明：自定义分页容器的选择器 必选项：否 类型：字符串 默认值：""

pager

说明：分页单点选择器 必选项：否 类型：字符串 默认值：".swiper-pagination-bullet"

pageron

说明：当前页分页点样式class 必选项：否 类型：字符串 默认值："swiper-pagination-bullet-active"

## 注意事项

