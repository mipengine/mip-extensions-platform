# mip-gallery

mip-gallery 康网图库链接

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-gallery/mip-gallery.js

## 示例

### 康网图库链接
```html
<mip-gallery>
    <ul class="detail03" id="detail03">
		<p><mip-img src="http://m.iy.com.cn/cnkfile1/M00/04/38/o4YBAFch8LWAXWo7AAIKqG3WeMY734.jpg"></p>
    </ul>
    <div class="data_page_prev hide">6431026_5.html</div>
    <div class="data_page_next hide">6431026_7.html</div>
    <div class="data_article_prev_url hide">/pic/view/6430943.html</div>
    <div class="data_article_next_url hide">/pic/view/6431111.html</div>
    <div class="HOST_SITE_AIYUE hide">/pic</div>
    <div class="HOST_SITE_TUKU_MIP hide">https://m.cnkang.com</div>
</mip-gallery>
``` 
```style 
<style mip-custom>
	.detail03 {clear: both;line-height: 24px;margin: 0px 14px 14px;overflow: hidden;zoom: 1;position: relative;}
	.detail03 img {display: block;text-align: center;margin: 0 auto 14px;width: 100%;}
	.detail03 .jump {position: absolute;top: 0;width: 100%;height: 100%;z-index: 999999;}
	.detail03 .left {right: 50%;}
	.detail03 .right {left: 50%;}
	.detail03 a {text-decoration: none;color: #2d3e50;}
	.detail03 .jump a {display: block;width: 100%;height: 100%;}
	.detail03 .jump.left a {background: url(//static.iy.com.cn/images/aiyue/qh_01.png) 60% 50%/35px 35px no-repeat;}
	.detail03 .jump.right a {background: url(//static.iy.com.cn/images/aiyue/qh_03.png) 40% 50%/35px 35px no-repeat;}
	.hide{ display:none;}
</style>
``` 

