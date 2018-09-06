# mip-fetch-comment

mip-fetch-comment 根据点击的年份异步加载酒款的评价信息

标题|内容
----|----
类型|通用
支持布局|container
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-fetch-comment/mip-fetch-comment.js

## 示例

```html
<mip-fetch-comment>
	<div class="pingjia">
	<!--评价中的年份-->
	<input type="hidden" value="53563719-5bd7-4f82-b842-0060f7318701" id="wineId">
	<div id="wine-assess">
		<div class="goodsblock">
			<div class="wtit"><p>年份</p><span class="rgt-data more-vt" on="tap:year-lightbox.open">全部年份<i class="iconfont icon-arrow-right"></i></span></div>
			<div class="vtwrap">
				<div class="vintage swiper-container">
					<div class="swiper-wrapper divItems">
						<mip-scrollbox class="demo1" layout="fixed-height">
							<div data-wrapper>
								<div data-inner>
									<div data-scroller>
                                         <div class="vtcell swiper-slide"><a class="nianfen currVintage" data-vintage="" data-wineId='53563719-5bd7-4f82-b842-0060f7318701' data-yvalue=''>概览</a></div>
										 <div class="vtcell swiper-slide"><a class="nianfen" data-vintage="ed42228a-961c-4fd1-a8bc-339d70cd0540" data-wineId="53563719-5bd7-4f82-b842-0060f7318701" data-yvalue='2016'>2016</a></div>
										 <div class="vtcell swiper-slide"><a class="nianfen" data-vintage="b5b4ae54-313b-488a-8f5f-b5482cab4846" data-wineId="53563719-5bd7-4f82-b842-0060f7318701" data-yvalue='2015'>2015</a></div>
										 <div class="vtcell swiper-slide"><a class="nianfen" data-vintage="13cf2141-8996-49a8-83f6-727e71dd7959" data-wineId="53563719-5bd7-4f82-b842-0060f7318701" data-yvalue='2014'>2014</a></div>
										 <div class="vtcell swiper-slide"><a class="nianfen" data-vintage="748f238e-9f88-4d59-90d3-a9c2f553716d" data-wineId="53563719-5bd7-4f82-b842-0060f7318701" data-yvalue='2013'>2013</a></div>
										 <div class="vtcell swiper-slide"><a class="nianfen" data-vintage="775E3C22-6B1B-4A29-888B-F1F34273F4E5" data-wineId="53563719-5bd7-4f82-b842-0060f7318701" data-yvalue='2012'>2012</a></div>
									</div>
								</div>
							</div>
						</mip-scrollbox>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="goodsblock gradeContent" id="gradeContent">
		<div class="wtit">评分</div>
		<div class="grade" id="pjgrade">
		</div>
	</div>

	<div class="goodsblock awardsContent" id="awardsContent">
		<div class="wtit">获奖</div>
		<div class="awards" id="pjawards">

		</div>
	</div>

	<div class="goodsblock wineContent" id="wineContent">
		<div class="wtit">酒评</div>
		<ul class="jiuping wineComment" id="pjjiuping"></ul>
	</div>
</div>
<div id='pjpfLightbox'> 

</div>
<div id='pjhjLightbox'> 

</div>

</mip-fetch-comment>
<script src="https://c.mipcdn.com/static/v1/mip-lightbox/mip-lightbox.js"></script>
```


