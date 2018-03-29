# mip-cehome-forumlist

mip-cehome-forumlist 板块列表

标题|内容
----|----
类型|不通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cehome-forumlist/mip-cehome-forumlist.js

## 示例

### 基本用法
```html
<mip-cehome-forumlist>
	<div id="banner">
		<div class="swiper-container swiper-container-horizontal">
			<div class="swiper-wrapper">
				<div class="swiper-slide"><a href="https://m.cehome.com/bbs/thread/info/785990"><mip-img  src="https://img3.cehome.com/appad/17050708325714492.jpg"></mip-img></a></div>
			</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>

	<section id="indexContent">
		<div class="indexNav">
			<div class="navItem"><em id="threadNewLink">最新帖子</em></div>
			<div class="navItem"><em id="threadTopLink">十大热帖</em></div>
			<div class="navItem cur"><em>论坛版块</em></div>
		</div>
		<ul class="sectionNav clearfix">
			<a href="https://m.cehome.com/bbs/mip/forum/threadlist/43/1/">
				<li>
					<mip-img class="navImg" src="https://img4.cehome.com/album/201706/29/143913n2blldho8bgblf22.png" alt="我爱我挖"></mip-img>
					<em class="navTxt">我爱我挖</em>
				</li>
			</a>
			<a href="https://m.cehome.com/bbs/mip/forum/threadlist/44/1/">
				<li>
					<mip-img class="navImg" src="https://img4.cehome.com/album/201706/29/1439090a4zutq43a6wn4wn.png" alt="杂谈图库"></mip-img>
					<em class="navTxt">杂谈图库</em>
				</li>
			</a>
			<a href="https://m.cehome.com/bbs/mip/forum/threadlist/53/1/">
				<li>
					<mip-img class="navImg" src="https://img4.cehome.com/album/201706/29/1439077mwwg17fvmhmmhzh.png" alt="选购询价"></mip-img>
					<em class="navTxt">选购询价</em>
				</li>
			</a>
			<a href="https://m.cehome.com/bbs/mip/forum/threadlist/28/1/">
				<li>
					<mip-img class="navImg" src="https://img4.cehome.com/album/201706/29/14390592d519gr5eek9ufe.png" alt="招聘求职"></mip-img>
					<em class="navTxt">招聘求职</em>
				</li>
			</a>
		</ul>
	</section>
</mip-cehome-forumlist>
```
```style 
<style mip-custom>
	#banner .swiper-slide mip-img img {
		width: 100%;
		min-height: 100%;
		display: block;
		height:100%;
	}
</style>
``` 