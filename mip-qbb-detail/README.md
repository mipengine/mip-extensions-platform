# mip-qbb-detail

mip-qbb-detail 页面滚动时，实现选项卡的固定，选项卡固定的位置，会根据不同的平台发生变化;点击选项时，相应内容内容会滚到最初始的位置

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qbb-detail/mip-qbb-detail.js

## 示例

```html
<mip-qbb-detail>
    <header>头部</header>
	<section class="list-wrap show-detail mgtop">
	    <ul class="list list1"><span class="downscroll">安装</span></ul>
        <ul class="list list2"><a href="" class="down" style="display: none;">安装222</a></ul>
         <input value="http://d.qbaobei.com/sipingmamawang.apk" type="hidden" id="android-down"/>
        <input value="https://itunes.apple.com/cn/app/id1202805652?mt=8" type="hidden" id="iphone-down"/>
	</section>
	<section class="navbar"></section>
	<section class="dtbox cur">
		<section class="list-wrap list-wrapt">
			<div class="swiper-container1 show-applys">
				<ul class="swiper-wrapper list-apply clear">
					<li class="swiper-slide fl"><a href="http://m.qbaobei.com/d/32161.html" target="_blank"><mip-img src="http://pic.qbaobei.com/thumb/Uploads/Picture/2016-08-16/57b272005ed93_90_90.png" alt="袋鼠跳跳童书"  class="pic"></mip-img><span class="name">袋鼠跳跳童书</span><span class="count">178次下载</span></a></li>
				</ul>
			</div>
	    </section>	
	</section>
	<section class="dtbox">
		<section class="list-wrap list-wrapt">
			<div class="swiper-container1 show-applys">
				<ul class="swiper-wrapper list-apply clear">
					<li class="swiper-slide fl"><a href="http://m.qbaobei.com/d/32161.html" target="_blank"><mip-img src="http://pic.qbaobei.com/thumb/Uploads/Picture/2016-08-16/57b272005ed93_90_90.png" alt="袋鼠跳跳童书"  class="pic"></mip-img><span class="name">袋鼠跳跳童书</span><span class="count">178次下载</span></a></li>
				</ul>
			</div>
	    </section>	
	</section>

	<section class="dtbox">
		<section class="list-wrap list-wrapt">
			<div class="swiper-container1 show-applys">
				<ul class="swiper-wrapper list-apply clear">
					<li class="swiper-slide fl"><a href="http://m.qbaobei.com/d/32161.html" target="_blank"><mip-img src="http://pic.qbaobei.com/thumb/Uploads/Picture/2016-08-16/57b272005ed93_90_90.png" alt="袋鼠跳跳童书"  class="pic"></mip-img><span class="name">袋鼠跳跳童书</span><span class="count">178次下载</span></a></li>
				</ul>
			</div>
	    </section>	
	</section>
</mip-qbb-detail>
```

