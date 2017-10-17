# mip-cehome-threadlist

mip-cehome-threadlist 帖子列表

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-cehome-threadlist/mip-cehome-threadlist.js

## 示例

### 基本用法
```html
<mip-cehome-threadlist>
	<div class="listCon">
		<div id="group" class="group">
			<div class="single">
				<div class="userBox">
					<a href="https://m.cehome.com/bbs/user/other/yvIzYBJgMYWJTZlzBkNx6g/"><mip-img class="userImg" src="https://cas.cehome.com/ucenter/data/avatar/000/54/09/56_avatar_middle.jpg"></mip-img></a>
					<div class="userInfo">
						<div class="user">
							<h3 class="username"><a href="https://m.cehome.com/bbs/user/other/yvIzYBJgMYWJTZlzBkNx6g/">手机用户cgmnq16</a></h3>
							<em class="level">LV1</em>
							<em class="views"><i class="eye"></i>1</em>
						</div>
						<p class="time">10-10</p>
					</div>
				</div>
				<h2 class="postTitle"><a href="https://m.cehome.com/bbs/mip/thread/info/788743/">haha</a></h2>
				<p class="postCon"><a href="https://m.cehome.com/bbs/mip/thread/info/788743/"><mip-img class="mip-smile" layout="fixed" flag="smile" src="https://www.cehome.com/static/image/smiley/new/tiejia1.gif" smilieid="{:tiejia1:}" border="0" alt="" /></mip-img></a></p>

				<div class="numBox">
					<div tid="788743" rel="tid" class="num"><i class="zan"></i><em> 赞 </em></div>
					<div tid="788743" rel="tid" class="num"><i class="msg"></i><em> 回帖  </em></div>
					<div class="num"><i class="share"></i><em> 转发  </em></div>
				</div>
			</div>
		</div>
	</div>	
</mip-cehome-threadlist>
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
