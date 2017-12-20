# mip-cr173-downthe

mip-cr173-downthe .搜索框的跳转到站内搜索功能。没有下载地址改变样式。提取调用一次的效果

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-cr173-downthe/mip-cr173-downthe.js
## 示例

```html
<mip-cr173-downthe data-downurl="http://m.cr173.com" data-sourl="http://so.cr173.com">
<div class="g-top">
	<a href="http://m.cr173.com/" class="g-logo"><mip-img src="http://m.cr173.com/skin/new2015/images/home-logo.png" ></mip-img></a>
    <mip-accordion sessions-key="mip_2" type="manual">
    	<section class="f-showhide-function">
        	<h4>
              <span class="show-more f-hideshow-btn"></span>
           	</h4>
            <div class="f-hideshow-cont">
                <mip-form class="m-soudiv" url="http://so.cr173.com">
                    <input class="search-input" type="text" name="q" placeholder="请输入关键字">
                    <p class="search-button"></p>
                </mip-form>
            </div>
      	</section>
    </mip-accordion>
    <b class="g-btn" data-num="0"></b>
</div>
<div class="g-box m-down-msg" id="m-down-msg">
    <header class="info">
        <div class="pic">
            <div class="ico-wrap middle">
                <mip-img class="ico" src="http://pic1.cr173.com/cr173/mb/up/2017-12/2017124169384981_120_120.png"  ></mip-img>
            </div>
            <ul>
                <li class="cpname"><h1>新三生三世十里桃花官方版<span>v1.0最新版</span></h1></li><li class="type"><b>大小：<span class="f-game-size">0KB</span></b><b>更新：2017-12-04</b></li><li class="ver" >v1.0最新版</li><li class="type"><b>类别：<a href="http://m.cr173.com/x/catalogid/161/0/0/">角色扮演</a></b><b>系统：Android</b></li>
            </ul>
        </div> 
        <div id="downAddress">
            <ul class="m-down-ul">
            	<li class="m-down-last"><a href="http://m.cr173.com" class="span9 m-game-down down" id="address">点击下载</a></li>
            </ul>
        </div>
        <mip-cr173-popup></mip-cr173-popup>
    </header>    
      <ul class="g-keyword-btn m-tab-btn" id="tab-nav"><!-- <li class=""><b>回合网游排行榜</b><i></i></li><li class=""><b>修仙</b><i></i></li><li class=""><b>小说改编</b><i></i></li> --></ul>        <!--相关分组-->  
        <div id="tab-div">        
        <div class="g-keyword-cont m-tab-cont">
            <dl>
                <dt>回合网游排行榜</dt>
                <dd>西西安卓回合网游专区给广大手机网游爱好者提供了各种好玩有特色的手游，大家闲来没事可以到西西手机站回合</dd>
                <dd class="g-keyword-info"><a href="http://m.cr173.com/paihang/azhewyphb/">进入专区</a></dd>
            </dl>
            <ul>                
                <li><a href="http://m.cr173.com/x/67547"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2013-8/2013819144314_66_66.jpg"  ></mip-img><strong>植物大战僵尸西游版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/349762"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-7/2017712174618629_66_66.png"  ></mip-img><strong>数码宝贝tri手游中文版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/203964"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2016-11/20161141413568046_66_66.jpg"  ></mip-img><strong>梦幻西游手游新版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/137203"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2016-1/2016126144549_66_66.jpg"  ></mip-img><strong>大话西游手游安卓版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/64793"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2013-7/20137416339_66_66.jpg"  ></mip-img><strong>滑雪大冒险西游无限金币版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/207883"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2016-1/20161201140_66_66.png"  ></mip-img><strong>大话西游手游oppo版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/242752"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2016-4/2016471548362556_66_66.jpg"  ></mip-img><strong>造梦西游4手机版正版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/143377"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2015-7/201571392245_66_66.jpg"  ></mip-img><strong>乱斗西游2官方版</strong></a></li>                
            </ul>
        </div>             
        <div class="g-keyword-cont m-tab-cont">
            <dl>
                <dt>修仙</dt>
                <dd>西西修仙类手游专区为大家带来各种仙侠类手游下载，修仙之路或许电视上看看很简单，但是在游戏中玩家们想要</dd>
                <dd class="g-keyword-info"><a href="http://m.cr173.com/key/xiuxian/">进入专区</a></dd>
            </dl>
            <ul>                
                <li><a href="http://m.cr173.com/x/247634"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-4/201742011274448_66_66.jpg"  ></mip-img><strong>诛仙手游版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/367542"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-8/20178301730322236_66_66.png"  ></mip-img><strong>凡人修仙传手游</strong></a></li>                
                <li><a href="http://m.cr173.com/x/94760"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-7/20177121734586276_66_66.png"  ></mip-img><strong>新凡人修仙传手游版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/569074"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-8/2017821919288106_66_66.png"  ></mip-img><strong>仙王oppo版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/208397"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2016-11/20161124151578826_66_66.png"  ></mip-img><strong>青丘狐传说手游百度版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/589793"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-9/2017914842375630_66_66.jpg"  ></mip-img><strong>武道天下手游</strong></a></li>                
                <li><a href="http://m.cr173.com/x/122970"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2016-3/2016330184846555_66_66.png"  ></mip-img><strong>幻想飞仙手游</strong></a></li>                
                <li><a href="http://m.cr173.com/x/117249"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2015-3/2015326111727_66_66.jpg"  ></mip-img><strong>仙境奇缘手游</strong></a></li>                
            </ul>
        </div>             
        <div class="g-keyword-cont m-tab-cont">
            <dl>
                <dt>小说改编</dt>
                <dd>西西软件园为大家提供各种免费的小说改编手机游戏下载大全和安卓小说改编手游排行榜，无论是玄幻还是科幻系</dd>
                <dd class="g-keyword-info"><a href="http://m.cr173.com/key/xiaoshuogb/">进入专区</a></dd>
            </dl>
            <ul>                
                <li><a href="http://m.cr173.com/x/247634"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-4/201742011274448_66_66.jpg"  ></mip-img><strong>诛仙手游版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/83916"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2014-5/201451391853_66_66.jpg"  ></mip-img><strong>斗破苍穹安卓版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/367542"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-8/20178301730322236_66_66.png"  ></mip-img><strong>凡人修仙传手游</strong></a></li>                
                <li><a href="http://m.cr173.com/x/90318"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2016-10/20161030185524533_66_66.jpg"  ></mip-img><strong>校花的贴身高手手游</strong></a></li>                
                <li><a href="http://m.cr173.com/x/94760"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-7/20177121734586276_66_66.png"  ></mip-img><strong>新凡人修仙传手游版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/397838"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-8/20178301953474085_66_66.png"  ></mip-img><strong>射雕英雄传手游官方正版</strong></a></li>                
                <li><a href="http://m.cr173.com/x/532641"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-7/2017711154032278_66_66.png"  ></mip-img><strong>特工皇妃楚乔传</strong></a></li>                
                <li><a href="http://m.cr173.com/x/443368"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2017-3/2017322102252905_66_66.png"  ></mip-img><strong>全职高手官方手游</strong></a></li>                
            </ul>
        </div>
                <!--/相关分组-->  
        </div>
          

</mip-cr173-downthe>



```


