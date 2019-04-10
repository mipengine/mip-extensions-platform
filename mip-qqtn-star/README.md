# mip-qqtn-star

mip-qqtn-star 获取配置文件地区以及信息进行判断，覆盖原始内容

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-qqtn-star/mip-qqtn-star.js

## 示例

### 基本用法
```html


<style mip-custom>
a:link{ text-decoration:none}
body{text-align:left;font-size: 12px;padding:0 0 0 0; font-family:"微软雅黑";  background:none; background:#f0f0f0}
.g-top-full{ width:100%; height:45px; line-height:45px; background:#19b5fe; padding:0 10px; font-size:22px; font-weight:bold;color:#fff; text-align:center; display:block; box-sizing:border-box;  position:relative; zoom:1; z-index:99}
.g-top-full .g-back-home{ width:40px; height:45px; position:absolute; left:0; top:0; background:url(/img/custom-icon.png) no-repeat 14px 12px; background-size:400px; display:block; overflow:hidden; z-index:999}
.g-top-full .g-list-back{ width:136px;height:21px; position:relative; zoom:1; background:none; left:4px;top:12px; display:block; overflow:hidden;}
.g-top-full .g-list-back b{width:12px; height:21px; position:absolute; left:14px; top:12px; background:url(/img/custom-icon.png) no-repeat 0 0; background-size:400px; display:block; overflow:hidden; left:0; top:0;}
.g-top-full .g-list-back h1{ font-size:18px; font-weight:bold; color:#fff; text-indent:20px; height:20px; line-height:20px; text-align:left}
.g-top-full div{ width:100%; height:45px; position:absolute; right:0; top:0; display:block;}
.g-top-full div a{ width:21px; height:21px; float:right; margin:14px 46px 0 0; background:url(/img/custom-icon.png) no-repeat -86px 0; background-size:400px;display:inline; overflow:hidden}
.g-top-full .m-navshow-btn{ width:36px; height:45px; font-size:0; text-indent:-9999;float:left; margin:0 0 0 10px; background:url(/img/custom-icon.png) no-repeat -166px 14px; background-size:400px; display:inline; overflow:hidden}
.g-top-full .m-black{ width:100%; height:100%; background:#000; opacity:0.7; position:fixed; left:0; top:45px; display:none; overflow:hidden; z-index:90;}
/*首页头部*/
.g-top-full .g-logo{ width:75px; height:28px; background:url(/img/class-icon.png) no-repeat -330px 0; background-size:600px; display:block; overflow:hidden; position:absolute; left:10px; top:12px;}
.m-navshow-ul{display:none;}
/*2016-07-16*/
.g-box{ width:100%; height:auto; background:none; padding:0; display:block; overflow:hidden; box-sizing:border-box;margin-bottom: 12px;margin-top: 12px;}
.g-game-recomd{ width:100%; height:auto; margin:0px 0 0  0; box-sizing:border-box; display:block; overflow:hidden; background:#fff;}
.g-game-recomd strong{ width:100%; height:auto; font-size:16px; font-weight:normal; color:#333; text-indent:14px; border-bottom:2px solid #eee; padding:10px 0 8px; box-sizing:border-box; display:block; overflow:hidden;}
.g-keyword-btn{ width:100%; height:46px; border-bottom:1px solid #eee; display:-webkit-box; overflow:hidden;}
.g-keyword-btn li{ width:auto; height:46px; padding:0 12px; box-sizing:border-box; display:block; overflow:hidden; position:relative; zoom:1; -webkit-box-flex:1}
.g-keyword-btn li b{ width:100%; height:45px; line-height:45px; font-size:16px; font-weight:normal; color:#333; text-align:center;  box-sizing:border-box; display:block; overflow:hidden;}
.g-keyword-btn .m-hover b{border-bottom:2px solid #19B5FE; color:#19B5FE}
.g-keyword-btn li i{ width:1px; height:16px; background:#ccc; display:block; overflow:hidden; position:absolute; right:0; top:16px;}
.g-keyword-btn li:last-of-type  i{background: none}
.g-keyword-cont{ width:100%; height:auto; display:block; overflow:hidden;}
.g-keyword-cont dl{ width:100%; height:auto; padding: 10px 14px 0px; box-sizing:border-box; display:block; overflow:hidden; position:relative; zoom:1}
.g-keyword-cont dl dt{ width:100%; height:auto; font-size:14px; font-weight:normal; color:#333; display:none; overflow:hidden;}
.g-keyword-cont dl dd{ width:100%; height: 60px; line-height:28px; font-size:14px; font-weight:normal; color:#666; margin:6px 0 0 0; display:block; overflow:hidden}
.g-keyword-cont dl .g-keyword-info{ width: auto;height: auto;margin: 0;padding: 0;display: block;overflow: hidden;position: absolute;top: 10px;right: 10px;padding: 0px 10px 0px 69px;}
.g-keyword-cont dl .g-keyword-info a{ width: auto;height: 22px;line-height: 22px;padding: 0 6px;font-size: 14px;font-weight: normal;color: #f60;border-radius: 6px;display: block;overflow: hidden;text-decoration: none;}
.g-keyword-cont dl .g-keyword-info a:active{ background:#ff5182}
.g-keyword-cont ul{ width:100%; height:auto; padding:0 10px 2px 0; box-sizing:border-box; display:block; overflow:hidden}
.g-keyword-cont ul li{ width:20%; height:auto; padding:2px 0 12px 10px; float:left; box-sizing:border-box; display:inline; overflow:hidden;}
.g-keyword-cont ul li a{ width:100%; height:auto; display:block; overflow:hidden}
.g-keyword-cont ul li mip-img { width: 100%; margin:0 auto; }
.g-keyword-cont ul li a img{ width:100%; height:auto; border-radius:16px; margin:auto; display:block; overflow:hidden}
.g-keyword-cont ul li a strong{ width:100%; height:20px; line-height:20px; font-size:14px; font-weight:normal; color:#333; text-align:center; margin:6px 0 0 0; display:block; overflow:hidden; text-indent:0; padding:0; border:0;}
.g-key-ohter{width:100%; height:auto; display:block; overflow:hidden; background:#fff; margin:0px 0 12px 0; padding: 0 0 5px 0;}
.g-key-ohter .g-collection-img{ width:100%; height:auto; display:block; overflow:hidden; padding:0 10px; margin:16px 0 0 0; box-sizing:border-box;}
.g-key-ohter .g-collection-img a{ width:100%; height:auto; display:block; overflow:hidden; position:relative; zoom:1}
.g-key-ohter .g-collection-img a img{ width:100%; height:auto; display:block; overflow:hidden}
.g-key-ohter .g-collection-img a strong{ width:100%; height:30px; line-height:30px; font-size:14px; font-weight:normal; color:#fff; text-align:center; display:block; overflow:hidden; position:absolute; left:0; bottom:0; z-index:10; }
.g-key-ohter .g-collection-img a b{ width:100%; height:30px; background:#000; opacity:0.7; position:absolute; left:0; bottom:0; z-index:5;}
.g-cms-down{ margin:0;}
.g-cms-down .m-bgcolor-gray{ background:#efefef;}
.g-cms-down .m-bgcolor-gray:active{ background:#efefef}
.g-cms-nav{width:100%;height: 41px;padding:10px 0;box-sizing:border-box;background:#fff;display:block;overflow:hidden;position:relative;zoom:1;border-bottom: 1px solid #eee; z-index:500}
.g-cms-nav ul{ width:auto; height:41px; position:absolute; top:0; left:0; padding:0 40px 0 0; box-sizing:border-box; white-space:nowrap; overflow:visible; display:block; overflow:hidden}
.g-cms-nav ul li{ width:70px; height:auto; display:inline-block; margin:0 0 0 0; white-space:nowrap}
.g-cms-nav ul li a{ width:100%; height:41px; line-height:41px; font-size:16px; font-weight:normal; color:#333; text-align:center; display:block; overflow:hidden}
.g-cms-nav ul .m-hover a{ color:#19b5fe;}
.g-cms-nav .g-cms-alllink{width:40px;height:40px;line-height: 34px;font-size: 30px;font-weight:bold;color: #19B5FE;text-align:center;background:#fff;position:absolute;right:0;top:0;z-index:20;box-shadow: 0 -2px 3px #ccc;/* background: #19b5fe; *//* color: #fff; */font-weight: normal;}
.m-float-top1{ position:fixed; top:0; left:0; height:45px; display:block; z-index:999}
.m-float-top2{ position:fixed; top:45px; left:0; height:41px; display:block; overflow:hidden; z-index:500}
.content{ width:100%; height:auto; line-height:28px; padding:0 10px 5px; font: 14px "Helvetica Neue",HelveticaNeue,Helvetica-Neue,Helvetica,'\5fae\8f6f\96c5\9ed1'; color:#333; box-sizing:border-box; background:#fff; display:block; overflow:hidden ; text-transform:capitalize; }
.content p { text-indent: 24px; line-height: 26px; margin-top: 12px; width: 100%; height: auto; font-size: 16px; font-weight: normal; color: #666; display:block; overflow:hidden;}
.content p a{ color:#09F; text-decoration:underline}
.content h3{ font-size:16px; color:#f60; font-weight:bold; height:25px; line-height:30px;}
.content p img{ width:90%; height:auto; margin:0 0 0 -2em;}
#details p img{ width:auto; max-width:90%; min-width:auto; margin:auto; height:auto;position: inherit}
.details{ width:100%; height:auto; line-height:28px; padding:0 10px 5px; font: 14px "Helvetica Neue",HelveticaNeue,Helvetica-Neue,Helvetica,'\5fae\8f6f\96c5\9ed1'; color:#333; box-sizing:border-box; background:#fff;  overflow:hidden ; text-transform:capitalize; }
.details p { text-indent: 24px; line-height: 27px; margin-top: 12px; width: 100%; height: auto; font-size: 15px; font-weight: normal; color: #666; display:block; overflow:hidden;}
.details p a{ color:#ff9900; text-decoration:underline}
.details h3{ font-size:18px; color:#333; font-weight:bold; height:auto; line-height:24px; width:100%; margin:12px 0 0 0; display:block; overflow:hidden;}
.details p img{ width:auto; max-width:90%; min-width:auto; margin:auto; height:auto;position: inherit}
.g-previmg-box{ width:100%; height:auto; padding:0 8px 0 8px; margin-top:12px; box-sizing:border-box; background:#fff; display:block; overflow:hidden}
.g-previmg{     overflow-x: auto;    overflow-y: hidden;    white-space: nowrap;}
.g-previmg .g-previmg-show{ text-align: center; }
.g-previmg .g-previmg-show li{     display: inline-block;    margin: 10px 5px 10px 0;}
.g-previmg .g-previmg-show li img{ display: block;    overflow: hidden;    height: auto;    max-height: 220px; min-height: 220px;   width: auto;}
.g-show-cont{ width:auto; height:33px; line-height:33px;background:#fff; font-size:14px; font-weight:bold; text-align:center; color:#19b5fe; border:1px solid #19b5fe; border-radius:4px; margin:0 15px 10px; display:block; overflow:hidden; box-sizing:border-box; position:relative; zoom:1}
.g-updatetime{ width:100%; height:auto; line-height:20px; padding:10px 10px 0; background:#fff; font-size:12px; font-weight:normal; color:#999; display:block; overflow:hidden; box-sizing:border-box; position:relative; zoom:1}
.g-show-cont span{ color:#555;}
.g-cms-relatedcms{ width:100%; height:auto; background:#fff;display:block; overflow:hidden; box-sizing:border-box; margin:0 0 12px 0;}
.g-cms-relatedcms .g-cmslist{ width:100%; height:auto; box-sizing:border-box; display:block; overflow:hidden}
.g-cms-relatedcms .g-cmslist li{ width:100%; height:auto; font-size:15px; font-weight:normal; color:#333; padding:10px 10px; border-bottom:1px solid #eaeaea; text-indent:14px; display:block; overflow:hidden; position:relative; zoom:1}
.g-cms-relatedcms .g-cmslist li a{ height:20px; line-height:20px; display:block; overflow:hidden}
.g-cms-relatedcms .g-cmslist li b{ width:4px; height:4px; background:#d2d2d2; display:block; overflow:hidden; position:absolute; left:12px; top:17px;}
/*12-30*/
.g-box .info{ width:100%; height:auto;box-sizing:border-box; padding:10px; background:#fff; display:block; overflow:hidden; }
.g-box .info .pic{ width:100%; height:auto; margin:0; display:-webkit-box; overflow:hidden;}
.g-box .info .pic .ico-wrap{ width:70px; height:70px; display:block; overflow:hidden}
.g-box .info .pic .ico-wrap img{ width:100%; height:70px; border-radius:14px; display:block; overflow:hidden; margin:0; padding:0; max-width:none; max-height:none}
.g-box .info .pic ul{ width:auto; height:auto; margin:0; text-align:left; padding:0 0 0 14px; box-sizing:border-box; display:block; overflow:hidden; -webkit-box-flex:1}
.g-box .info .pic ul li{width:100%;}
.g-box .info .pic ul .ver{ display:none}
.g-box .info .pic ul .cpname h1{ width:100%; height:22px; line-height:22px; font-size:18px; font-weight:bold; color:#333; display:block; overflow:hidden; float:left; margin:2px 0 4px; display:inline; overflow:hidden;}
.g-box .info .pic ul .cpname h1 span{ font-size:14px;}
.g-box .info .pic ul li h1{ font-weight:normal;}
.g-box .info .pic ul li b{ width:50%; height:18px; line-height:18px; font-size:14px; font-weight:normal; color:#999; float:left; margin:3px 0 -2px 0; display:inline; overflow:hidden}
.g-box .info .pic ul li b a{ color:#1294E4; text-decoration:underline}
</style>
<mip-cambrian site-id="1549416786514116"></mip-cambrian>

<mip-qqtn-star data-shield="qqtn">
<header class="g-top-full">
  <a href="https://m.qqtn.com/" class="g-back-home" ></a>腾牛·下载
  <div>
      <a href="https://m.qqtn.com/websousuo.html" ></a>
    <mip-accordion sessions-key="mip_2" type="manual">
            <section class="g-hide-nav">
                <h4>
                    <span class="m-navshow-btn show-more">显示更多</span>
                    <span class="m-navshow-btn m-hover show-less">收起</span>
                </h4>
                <p class="m-navshow-ul">
                    <strong><a href="https://m.qqtn.com/"><b></b><strong>网站首页</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/ruanj.html"><b></b><strong>软件下载</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/youxi.html"><b></b><strong>游戏下载</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/news.html"><b></b><strong>文章资讯</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/xcx.html"><b></b><strong>小程序</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/qm.html"><b></b><strong>个性签名</strong></a></strong>      
                    <strong><a href="https://m.qqtn.com/wm.html"><b></b><strong>个性网名</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/tx.html"><b></b><strong>个性头像</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/tp.html"><b></b><strong>个性图片</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/ss.html"><b></b><strong>个性说说</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/bq.html"><b></b><strong>个性表情</strong></a></strong>
                    <strong><a href="https://m.qqtn.com/pf.html"><b></b><strong>个性皮肤</strong></a></strong>
                </p>
            </section>
        </mip-accordion>
  </div>
</header>
<mip-html-clickid>
<nav class="g-nav-full">
    <a href="https://m.qqtn.com/">首页</a>|
    <a href="https://m.qqtn.com/nlist.html">软件</a>|
    <a href="https://m.qqtn.com/glist.html">游戏</a>|
    <a href="https://m.qqtn.com/rank.html">排行</a>|
    <a href="https://m.qqtn.com/topic.html">专题</a>
</nav>
<div class="f-rootid f-hide" data-id="414733" data-categroyId="187" data-rootid="15" data-commendid="0"></div>
</mip-html-clickid>

<mip-fy-yuyue data-nodownurl="https://m.qqtn.com" data-color="#19b5fe" data-id="414733" data-yuyueurl="https://www.qqtn.com">
<mip-qqtn-shield data-shield="qqtn">
<div class="g-box m-down-msg f-yydiv" id="m-down-msg">
    <header class="info">
        <div class="pic">
            <div class="ico-wrap middle f-game-img">
                <mip-img class="ico" src="https://pic.qqtn.com/up/2019-4/2019431552481574.png!100_100"></mip-img>
            </div>
            <ul>
                <li class="cpname"><h1 class="f-game-h1">五分pk10彩票</h1></li><li class="type"><b>大小：11.2M</b><b>语言：中文</b></li><li class="ver" >v1.0 安卓版</li><li class="type"><b>类别：金融理财</b><b class="f-tags-system">系统：Android</b></li>
            </ul>
        </div>
        <div id="downAddress" class="downAddress">
            <ul class="m-down-ul f-downbtn-url">
                <li class="m-down-last"><a href="http://tj.qqtj99.com/496055163/5100006" class="span9 m-game-down down f-eject-btn" data-flag="downbtn" id="address">普通下载</a></li>
            </ul>
        </div>        
    </header>
</div>
<div class="g-previmg-box">
        <div class="g-previmg plist" id="g-previmg">
            <ul class="g-previmg-show f-previmg-cont">
                <li><mip-img src="https://pic.qqtn.com/up/2019-4/201943155256653750.jpg!400_720" popup></mip-img></li><li><mip-img src="https://pic.qqtn.com/up/2019-4/201943155258108200.jpg!400_720" popup></mip-img></li><li><mip-img src="https://pic.qqtn.com/up/2019-4/201943155259097190.jpg!400_720" popup></mip-img></li><li><mip-img src="https://pic.qqtn.com/up/2019-4/20194315530986080.jpg!400_720" popup></mip-img></li>
            </ul>
        </div>
    </div>
<mip-html-hide>
<section class="g-down-information">
  <strong><em>版本：v1.0 安卓版</em><em>时间：2019-04-03</em></strong>
</section>
</mip-html-hide>
<section class="g-down-introd g-game-msg f-tags-position" id="screen">
  <dl class="g-title">
      <dt>软件介绍</dt>
        <dd></dd>
    </dl>
    <mip-showmore maxheight='480' animatetime='.5' id="showmore01" bottomshadow='1'>
    <div id="details" class="f-maincms-cont details" ><p>五分pk10开奖记录app，五分pk10是正规的吗？五分pk10彩票是一款专为广大喜爱玩彩票竞猜的用户打造的万能购彩神器，这款软件安全可靠，功能强大，有着正规合法的官方背景，帮助您轻松中大奖！</p><p ><mip-img layout="responsive" popup  src="https://pic.qqtn.com/up/2019-4/15542780927825636.jpg" title="五分pk10彩票" alt="五分pk10彩票"></mip-img></p><h3>软件简介</h3><p>五分PK10app是一款提供多种实时开奖信息的APP。这里有着近期开奖查询、历史开奖查询、关注彩种、趋势分析、号码预测等功能。为用户提供新的实时开奖信息，方便用户及时查看开奖信息，操作简单，是广大彩民的好助手。</p><h3>软件特色</h3><p>1.登入界面：无需输入账号和密码就可以直接登入，证明是真正永久免费的。</p><p>2.北京赛车pk10计划追号：软件根据北京赛车pk10历史开奖记录生成规律公式直接给出计划追号分析统计预测结果。</p><p>3.北京赛车pk10公式规律搜索：设定搜索公式数量、数据期数、定码个数、计划周期、准确率百分比等参数，再点击“开始搜索”按钮，就可以搜索出最新的公式规律。</p><p>4.北京赛车pk10计划验证：这个功能相当于一个模拟投注平台，设定各玩法的奖金后，选择验证的玩法，再选填要验证的注单，点击提交验证，在弹出的对话框中，选择计划期数、修改计划倍数再点确定按钮，就可以对计划注单输赢进行验证。</p><p>5.北京赛车pk10缩水工具：除了基础条件设置外，还有特色功能：匹配条件设置、拼接条件设置、大底条件、分步大底、大底集合是功能最全、操作最简便的北京赛车pk10缩水软件。</p><p>6.实用工具《倍投计算器》设定计划追号期数、计划追号注数、单注成本、单注奖金等参数后，选择固定利润多少或回报率百分比，点击“计算”按钮，软件就会帮用户计算出当期应投资多少？累计投资多少？</p><h3>软件功能</h3><p>1.彩票走势图分析</p><p>2.彩票类别查询</p><p>3.彩票开奖结果查询</p></div>
    </mip-showmore>
    <div class="f-admorediv f-hide-box">
    <div on="tap:showmore01.toggle" data-closetext="点击收起内容" class="mip-showmore-btn">加载全部内容<b></b></div>
  </div>
</section> 

	
<div class="f-information f-hide" data-id="414733" data-path="down" data-categroyId="187" data-rootid="15" data-commendid="0" data-system="Android" data-ppaddress="" data-ismoney="0" data-CommentTpye="0" data-Username="jxf" data-Type="0" data-DateTime="2019/4/3" data-attr="免费" data-phpurl="2" data-star="1"></div>


</mip-qqtn-star>
