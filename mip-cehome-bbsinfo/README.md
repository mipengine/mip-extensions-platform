# mip-cehome-bbsinfo

mip-cehome-bbsinfo 论坛M站帖子详情页需求

标题|内容
----|----
类型|不通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-cehome-bbsinfo/mip-cehome-bbsinfo.js

## 示例

### 基本用法
```html
<mip-cehome-bbsinfo>
    <div class="replyBox" id="replyList">
		<div class="item" >
			<div class="userBox">
				<a href="https://m.cehome.com/bbs/user/other/_H2jAIUSFyVhhdwhEiiTMg/"><mip-img  class="userImg" src="https://cas.cehome.com/ucenter/data/avatar/000/38/42/68_avatar_middle.jpg"></mip-img></a>
				<div class="userInfo">
					<div class="user">
						<a href="https://m.cehome.com/bbs/user/other/_H2jAIUSFyVhhdwhEiiTMg/"><h3 class="username">hhjhjjj</h3></a>
						<em class="level">LV6</em>
						<mip-img class="medal" src="http://tmp-img.b0.upaiyun.com/static/medal/zsv1.png" ></mip-img>
						<mip-img class="medal" src="http://tmp-img.b0.upaiyun.com/static/medal/hyv2.png" ></mip-img>
						<mip-img class="medal" src="http://tmp-img.b0.upaiyun.com/static/medal/zs.png" ></mip-img>
						<mip-img class="medal" src="http://tmp-img.b0.upaiyun.com/static/medal/hyv2.png" ></mip-img>
						<em class="host"></em>
						<em class="floor first">沙发</em>
					</div>
					<p class="time">08-31</p>
				</div>
			</div>
			<div class="postCon">
				默默
			</div>
			<div class="reply"><em tid="788516" class="replyBtn">回复</em></div>
		</div>
	</div>
</mip-cehome-bbsinfo>
```
```style
<style mip-custom>
	#articleContent .userBox img {
		width: 0.8rem;
		height: 0.8rem;
		margin-right: 0.2rem;
		border-radius: 100%;
		display: block;
	}
	.replyBox .item .userBox img {
		width: 0.8rem;
		height: 0.8rem;
		margin-right: 0.2rem;
		border-radius: 100%;
		display: block;
	}
	#articleContent .article .img  img {
		width: auto;
		min-width: 0px;
		max-width: 100%;
		max-height: 9rem;
		display: block;
		margin: 0 0;
		height:auto;
	}
	#articleContent .userBox .userInfo .user img {
		width: 0.28rem;
		height: 0.26rem;
		float: left;
	}
	.replyBox .item .userBox .userInfo .user img {
		width: 0.28rem;
		height: 0.26rem;
		float: left;
	}
	.loading img {
		width: 0.4rem;
		min-width: 0px;
		display: inline-block;
		margin-right: 0.1rem;
		vertical-align: -0.1rem;
	}
	.bbsAdBox .ad {
		width: 100%;
		padding: 0;
		margin-top: 0.2rem;
		display: block;
	}
	.mip-smile {
		width:1.2em;
		height:1.2em;
		display:inline-block;
		min-width:unset;
		max-width:unset;
	}
</style>
```style
