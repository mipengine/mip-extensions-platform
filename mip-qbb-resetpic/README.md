# mip-qbb-resetpic

mip-qbb-resetpic 根据原始图片的宽高，计算图片是横向图片，还是竖向图片，重置图片大小

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-qbb-resetpic/mip-qbb-resetpic.js

## 示例
```html
<mip-qbb-resetpic>
	<section class="show-imgs" id="gamePic'">
        <div class="swiper-container1">
            <ul class="swiper-wrapper">
                <li class="swiper-slide"><mip-img src="http://pic.7y7.com/Uploads/Picture/2016-08-05/57a3ec39d1ff9.jpg" alt=""></mip-img></li>
                <li class="swiper-slide"><mip-img src="http://pic.7y7.com/Uploads/Picture/2016-08-05/57a3ec39d1ff9.jpg" alt=""></mip-img></li>
                <li class="swiper-slide"><mip-img src="http://pic.7y7.com/Uploads/Picture/2016-08-05/57a3ec39d1ff9.jpg" alt=""></mip-img></li>
            </ul>
        </div>
    </section>
</mip-qbb-resetpic>
```