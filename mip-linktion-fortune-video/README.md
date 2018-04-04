# mip-linktion-fortune-video

mip-linktion-fortune-video 控制弹框视频在第一次点击全屏播放，第二次点击时正常大小播放

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-linktion-fortune-video/mip-linktion-fortune-video.js<br>https://c.mipcdn.com/static/v1/mip-lightbox/mip-lightbox.js

## 示例


```html
<mip-linktion-fortune-video id="video">
	<a href="javascrpt:;" on="tap:modal-video.toggle tap:video.open" id="btn-open" role="button" tabindex="0" class="slick-video-img">
	push it
	</a>
	<mip-lightbox id="modal-video" layout="nodisplay" class="mip-hidden">
  	<div class="modal-dialog modal-video" role="document">
    	<div class="modal-content">
      	<div class="modal-header">
        	<button type="button" class="close video-close" on="tap:modal-video.close  tap:video.close"><span aria-hidden="true">╳</span></button>
      	</div>
				<div class="modal-video-box">
					<mip-video src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4" controls></mip-video>
					<div class="borderbox"></div>
				</div>
			</div>
  	</div>
	</mip-lightbox>
</mip-linktion-fortune-video>
```
