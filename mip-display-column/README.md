# mip-display-column

mip-display-column  点击显示栏目栏,再次点击任意处关闭栏目栏

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-display-column/mip-display-column.js

## 示例

### 基本用法
```html
<header id="header_fixed">
<div class="header">
	<em class=back></em>
	<span></span>
	<div class="head">天龙八部手游龙腾庆典奖励一览 签到即可得大奖详情</div>
	<mip-display-column class="mip_ser_btn mip_btn" target="mip_ser_form">
		
	</mip-display-column>
	<mip-display-column class="mip_bar_btn mip_btn" target="mip_bar_box,mask">
		
	</mip-display-column>
</div>

<div class="mip_bar_box mip_hide">
	<i></i>
	<ul class="clearfix">
        <li><a data-type="mip"  href="http://m.ququyou.com/">首页</a></li>
        <li><a data-type="mip"  href="http://m.ququyou.com/youxi/">游戏</a></li>
        <li><a data-type="mip"  href="http://m.ququyou.com/kf/">开服</a></li>
        <li><a data-type="mip"  href="http://m.ququyou.com/gonglue/">攻略</a></li>
        <li><a data-type="mip"  href="http://m.ququyou.com/xinwen/">新闻</a></li>
        <li><a data-type="mip"  href="http://m.ququyou.com/meinv/">图库</a></li>
        <li><a data-type="mip"  href="http://m.ququyou.com/sitemap.html">分类</a></li>
        <li><a data-type="mip"  href="http://m.ququyou.com/youxi/list-0-0-0-onclick-0.html">排行</a></li>
      </ul>
</div>
<div class="clearfix mip_hide mip_ser_form" id="seindex">
	<mip-form method="get" url="http://m.ququyou.com/e/search/" name="formsearch">
		<input type="text" name="q" class="searchText" id="sinput" value="" placeholder="搜索游戏">
		<input type="submit" class="searchBtn" value="">
		<input type="hidden" name="nsid" value="1">
	</mip-form>
</div>
</header>
<div class="mask mip_hide"></div>
```

## 属性

### target

说明：点击之后显示的div
必选项：是
类型：字符串
默认值：无默认
注意: 值可以是多个用英文','分隔

