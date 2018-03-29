# mip-cehome-sellso

mip-cehome-sellso 二手机交易板块下的出售帖子列表

标题|内容
----|----
类型|不通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cehome-sellso/mip-cehome-sellso.js

## 示例

### 基本用法
```html
<mip-cehome-sellso>
        <div class="listCon">
            <div id="group" class="group">
				<div class="single">
					<div class="userBox">
						<a href="https://m.cehome.com/bbs/user/other/Fk0FLHdcw3Xsi45umjvkZQ/"><mip-img class="userImg" src="https://cas.cehome.com/ucenter/data/avatar/000/13/29/32_avatar_middle.jpg"></mip-img></a>
						<div class="userInfo">
							<div class="user">
								<h3 class="username"><a href="https://m.cehome.com/bbs/user/other/Fk0FLHdcw3Xsi45umjvkZQ/">老刘123</a></h3>
								<em class="level">LV1</em>
								<mip-img class="medal" src="http://tmp-img.b0.upaiyun.com/static/medal/hyv1.png" alt="" ></mip-img>
								<em class="views"><i class="eye"></i>781</em>
							</div>
							<p class="time">05-03</p>
						</div>
					</div>
					<h2 class="postTitle"><a href="https://m.cehome.com/bbs/mip/thread/info/784378/">加藤 HD823MR 二手挖掘机价格 39万 8000小时</a></h2>
					<p class="postCon"><a href="https://m.cehome.com/bbs/mip/thread/info/784378/"></a></p>

						<ul class="imgBox">
							<li class="col3" ><a href="https://m.cehome.com/bbs/mip/thread/info/784378/"><mip-img  src="https://upbbsimg.cehome.com/forum/201704/30/1936455cmzem4cn2848252.jpg"></mip-img></a></li>
							<li class="col3" ><a href="https://m.cehome.com/bbs/mip/thread/info/784378/"><mip-img  src="https://upbbsimg.cehome.com/forum/201704/30/1936258f7b8h9h80bfsc7w.jpg"></mip-img></a></li>
							<li class="col3" ><a href="https://m.cehome.com/bbs/mip/thread/info/784378/"><mip-img  src="https://upbbsimg.cehome.com/forum/201704/30/193614n7o2a80n7nnc236o.jpg"></mip-img></a></li>
						</ul>
					
					<div class="numBox">
						<div tid="784378" rel="tid" class="num"><i class="zan"></i><em> 赞 </em></div>
						<div tid="784378" rel="tid" class="num"><i class="msg"></i><em> 7  </em></div>
						<div class="num"><i class="share"></i><em> 转发  </em></div>
					</div>
				</div>
			</div>
		</div>	
</mip-cehome-sellso>
```
```style
<style mip-custom>
	.loading img {
		width: 0.4rem;
		min-width: 0px;
		display: inline-block;
		margin-right: 0.1rem;
		vertical-align: -0.1rem;
	}
	.listCon .group .single .userBox img {
		width: 0.8rem;
		height: 0.8rem;
		margin-right: 0.2rem;
		border-radius: 100%;
		display: block;
	}
	.listCon .group .single .imgBox li > a mip-img {
		max-width: 150%;
		min-width: 100%;
		min-height: 100%;
		border-radius: 0.08rem;
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	.listCon .group .single .imgBox li > a img {
		max-width: 150%;
		min-width: 100%;
		min-height: 100%;
		border-radius: 0.08rem;
		position: absolute;
		left: 50%;
		top: 50%;
		width:auto;
		height:auto;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	.listCon .group .single .userBox .userInfo .user img {
		width: 0.28rem;
		height: 0.26rem;
		float: left;
	}

	.mip-smile {
		width:1.2em;
		height:1.2em;
		display:inline-block;
		min-width:unset;
		max-width:unset;
	}
</style>
```
