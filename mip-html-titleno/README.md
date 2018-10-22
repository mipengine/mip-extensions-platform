# mip-html-titleno

mip-html-titleno 根据设备判断指定ul li下面有无内容隐藏title

标题|内容
----|----
类型|通用
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-html-titleno/mip-html-titleno.js

## 示例

### 基本用法
```html



<mip-ychlyxgs-data>
	<mip-ychlyxgs-adddata>

	<mip-fy-yuyue data-nodownurl="https://m.qqtn.com" data-color="#19b5fe" data-id="{$id}" data-yuyueurl="https://www.qqtn.com">
		<mip-html-titleno>
		<mip-qqtn-shield data-shield="qqtn">
		<div class="g-box m-down-msg f-yydiv" id="m-down-msg">
		<header class="info">
		<div class="pic">

		<ul>
		<li class="cpname"><h1 class="f-game-h1">{$softname}</h1></li><li class="type"><b>大小：{$softsize}</b><b>语言：{$softlanguage}</b></li><li class="ver" >{$softver}</li><li class="type"><b>类别：<a href="https://m.qqtn.com/q/CatalogID/{$catalogid}/2/0/">{$catalogname}</a></b><b class="f-tags-system">系统：{$system}</b></li>
		</ul>
		</div>
		<div id="downAddress">
		<ul class="m-down-ul f-downbtn-url">
		<li class="m-down-last"><a href="{$downaddress2}" class="span9 m-game-down down f-eject-btn" data-flag="downbtn" id="address">点击下载</a></li>
		</ul>
		</div>        
		</header>
		</div>
		<div class="g-previmg-box">
		<div class="g-previmg plist" id="g-previmg">
		<ul class="g-previmg-show f-previmg-cont">

		</ul>
		</div>
		</div>
		<mip-html-hide>
	<section class="g-down-information">
	<strong><em>版本：{$softver}</em><em>时间：{$updatetime}</em></strong>
	<p><span>标签：</span>{ShowThemeClass tab="0" Where="id in({$themeclass})" OrderBy="id desc" Size="6" ResSize="6" Number="0" downOrder="" cmsOrder="" DateMb="" }<a href="{ThemeUrl}">{ThemescTitle}</a>{Loop}{/Loop}{/ShowThemeClass}</p>
	</section>
	</mip-html-hide>
	<section class="g-down-introd g-game-msg f-tags-position" id="screen">
	<dl class="g-title">
	<dt>软件介绍</dt>
	<dd></dd>
	</dl>
	<mip-showmore maxheight='180' animatetime='.5' id="showmore01">
	<div id="details" class="f-maincms-cont">{$mipcontent}</div>
	</mip-showmore>
	<div class="f-admorediv f-hide-box">
	<div on="tap:showmore01.toggle" data-closetext="点击收起内容" class="mip-showmore-btn">加载全部内容>>></div>
	<mip-ad type="baidu-wm-ext" domain="a1.qqtn.com" token="rmeeubnlu">
	<div id="rmeeubnlu"></div>
	</mip-ad>
	</div>
	<dl class="g-title f-xgbb">
	<dt>相关版本</dt>
	<dd></dd>
	</dl>
	</section> 

	<section class="g-cms-relatedcms">
	<dl class="g-title">
	<dt>相关教程</dt>
	<dd></dd>
	</dl>
	<ul class="g-cmslist">
	<!--showCmsRes: id in({$mutualitycms})|dateandtime desc|6|99|       <li><b></b><a href="https://m.qqtn.com/c/{id}" title="{title}">{title}</a></li>        ||-->
	</ul>
	</section>  
	<div class="g-box f-num" id="g-keyword">
	<div class="g-game-recomd m-tab-box">
	<dl class="g-title">
	<dt>猜你喜欢</dt>
	<dd></dd>
	</dl>
	<mip-html-tabs tabs-type="Qi_4" tabs-nav="#tab-nav  li" tabs-key="#tab-div div" nav-cur="m-hover">
	<ul class="g-keyword-btn m-tab-btn" id="tab-nav">{ShowThemeClass tab="0" Where="id in({$themeclass})" OrderBy="id desc" Size="4" ResSize="8" Number="156" downOrder="HitsMonth desc" cmsOrder="" downWhere="id <> {$id}" DateMb="" }{Loop}<li class=""><b>{ThemescTitle}</b><i></i></li>{/Loop}{/ShowThemeClass}</ul>        <!--相关分组-->  
	<div id="tab-div">
	{ShowThemeClass tab="0" Where="id in({$themeclass})" OrderBy="id desc" Size="3" ResSize="8" Number="156" downOrder="ResRank desc,updatetime desc" cmsOrder="" downWhere="id <> {$id}" DateMb="" }{Loop}
	<div class="g-keyword-cont m-tab-cont">
	<dl>
	<dt>{ThemescTitle}</dt>
	<p>{ThemeName}</p>
	<dd>{ThemesReamark}...</dd>
	<dd class="g-keyword-info"><a href="https://m.qqtn.com{ThemeUrl}">进入专区>></a></dd>
	</dl>
	<ul>
	{down}
	<li><a href="https://m.qqtn.com/q/{id}"><mip-img src="{smallimg}!100_100"></mip-img><strong>{softname}</strong></a></li>
	{/down}
	</ul>
	</div>
	{/Loop}{/ShowThemeClass}   <!--/相关分组-->  
	</div>
	</mip-html-tabs>
	</div>
	</div>
	<section class="g-key-ohter f-num">
	<dl class="g-title">
	<dt>相关合集</dt>
	<dd></dd>
	</dl>
	<section class="g-recomd plist" id="g-recomd-game">
	<ul class="g-recomd-ul">
	{ShowAbout Where="id in({$LinkId})" Size="8" textNum="200"}<li><a href="https://m.qqtn.com/k/{sname}" title="{title}"><mip-img src="{img}!200_100" alt="{title}"></mip-img><span>{title}</span></a></li>{Loop}{/Loop}{/ShowAbout}
	</ul>
	</section>
	</section>
		<section id="tonglei">
		<div class="g-game-recomd g-relate-cms">
		<dl class="g-title">
		<dt>本类排行</dt>
		<dd></dd>
		</dl>
		<ul class="g-rank-ul g-scoll-ul" > 
		<!--showDownRes: ResSize>0 and catalogID={$catalogid}|ResRank desc,updatetime desc|10|10|            <li class="m-rank-{i}"><a href="/q/{id}" class="g-a-left"><img src="{smallimg}!66_66" /><p><strong>{softname}</strong><b><span>{softsize}</span><span><em>{hitstotal}</em>人在玩</span></b><b>{excerpt}</b></p></a><a href="/q/{id}" class="g-a-right">下载</a></li>            |{y}-{m}-{d}|180-->
		</ul>
		</div>
		</section>	
	</mip-qqtn-shield>



	<div class="f-tags-box f-hide-box f-hide">
		<strong>其它版本</strong>    
		
		<ul class="m-tags-ios f-tags-ios">      
		<li data-system="IOS" data-id="33550"><a href="https://m.qqtn.com/q/33550" ><i></i><p>微信iphone/ipad版v6.7.2 官方免费下载</p><b>下载</b></a></li>
		<li data-system="IOS" data-id="75634"><a href="https://m.qqtn.com/q/75634" ><i></i><p>微信Apple Watch版v6.5.22 最新版</p><b>下载</b></a></li>
		<li data-system="IOS" data-id="86537"><a href="https://m.qqtn.com/q/86537" ><i></i><p>微信ios共存版v6.0.2 最新下载</p><b>下载</b></a></li>
		</ul>
	</div>

			     <div class="f-information f-hide" data-id="{$id}" data-path="down" data-categroyId="{$catalogid}" data-rootid="{$rootid}" data-commendid="{$commendid}" data-system="{$system}" data-ppaddress="{$newurl}" data-ismoney="{$ismoney}" data-CommentTpye="0" data-Username="{$username}" data-Type="0" data-DateTime="{$dateandtime}" data-phpurl="2"></div>
			</mip-html-titleno>
		</mip-fy-yuyue>
	</mip-ychlyxgs-adddata>
</mip-ychlyxgs-data>


<mip-fixed type="gototop" class="gototop">
    <mip-gototop threshold='300'></mip-gototop>
</mip-fixed>
<script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-showmore/mip-showmore.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-fixed/mip-fixed.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-adddata/mip-ychlyxgs-adddata.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-data/mip-ychlyxgs-data.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-accordion/mip-accordion.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-stats-baidu/mip-stats-baidu.js" ></script>
<mip-stats-baidu token="36603a3ac67228cfc7686cc8754897ab"></mip-stats-baidu>
<mip-stats-baidu token="{$userbaidutoken}"></mip-stats-baidu>
<script src="https://mipcache.bdstatic.com/static/v1/mip-html-tabs/mip-html-tabs.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-cambrian/mip-cambrian.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-num0/mip-qqtn-num0.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-fy-yuyue/mip-fy-yuyue.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-shield/mip-qqtn-shield.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-ad/mip-ad.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-html-addtitle/mip-html-addtitle.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-html-clickid/mip-html-clickid.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-gototop/mip-gototop.js"></script>

<script src="https://mipcache.bdstatic.com/static/v1/mip-html-hide/mip-html-hide.js"></script>
