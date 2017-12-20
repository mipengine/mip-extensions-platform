
# mip-365xiazai-header

判断手机系统，搜索关键词后，跳转对应的下载页面

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-365xiazai-btn/mip-365xiazai-header.js


## 示例

```
<mip-365xiazai-header>
				<div class="header">
		      <div class="headerbtn">
		        <a href="<?=$public_r['main_url']?>" class="home iconfont">&#xe61a;</a>
		        <a href="<?=$public_r['main_url']?>" class="logo"><img src="<?=$public_r['main_url']?>/src/images/logo.png" alt="天游网"></a>
		        <div class="searchbtn iconfont" id="h-searchbtn">&#xe601;</div>
		        <div class="listbtn iconfont" id="h-listbtn">&#xe627;</div>
		      </div>
		      <div class="headerlist" id="h-headerlist">
		      </div>
		    </div>
		    <div class="searchbox " id="h-searchbox">
		        <div class="search-software">
		            <form url="http://zhannei.baidu.com/cse/search" method="post"  >
		                    <div class="content-input">
		                        <input type="text" id="bdcsMain" placeholder="请输入搜索关键词" name="q">
		                    </div>
		                    <div class="content-button">
		                        <input type="submit" value="搜索">
		                    </div>
		                    <input type="hidden" name="s" value="4258108146839234296"><input type="hidden" name="entry" value="1">
		              </form>
		        </div>
		    </div>
</mip-365xiazai-header>
