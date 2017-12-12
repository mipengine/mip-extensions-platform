# mip-cr173-key

mip-cr173-key 组件功能：滚动显示简介，点击显示简介。默认显示X条数据，点击显示更多数据。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-cr173-key/mip-cr173-key.js
## 示例

```html

<div class="g-top">
    <a href="http://m.cr173.com/" class="g-logo"><mip-img src="http://m.cr173.com/skin/new2015/images/home-logo.png" ></mip-img></a>    
        <section class="f-showhide-function">
            <h4>
              <span class="show-more f-hideshow-btn"></span>
            </h4>
            <div class="f-hideshow-cont">
                <mip-form class="m-soudiv" method="get" url="http://s.cr173.com/cse/search" accept-charset="utf-8">
                    <input class="search-input" type="text" name="q" placeholder="请输入关键字">
                    <input class="search-button" type="submit" value="">
                    <input type="hidden" name="nsid" id="headSearchType" value="1">
                    <input type="hidden" name="s" value="3444183932313973300">
                </mip-form>
            </div>
        </section>
    <b class="g-btn" data-num="0"></b>
</div><div class="g-nav">
    <ul>
        <li><a href="http://m.cr173.com/">首页</a></li>
        <li><a href="http://m.cr173.com/glist.html">游戏</a></li>
        <li><a href="http://m.cr173.com/nlist.html">软件</a></li>
        <li><a href="http://m.cr173.com/grankall.html">排行</a></li>
        <li><a href="http://m.cr173.com/znyj.html">智能</a></li>
        <li><a href="http://m.cr173.com/topic.html">专题</a></li>
        <li><a href="http://m.cr173.com/game_cms.html">资讯</a></li>
        <li><a href="http://m.cr173.com/complist.html">厂商</a></li>
    </ul>
</div>
<mip-cr173-key>
<section id="main" class="greelink"> 
    <!--head 图片-->
    <div id="head">
        <img src="http://pic.cr173.com/up/2017-12/201712992547974.jpg" alt="广场舞"/><h1>广场舞</h1>
        <div id="content"><div class="g-cont-scroll">广场舞是在手上播放的舞蹈视频教程，在广场舞中可以播放各种高清的广场舞蹈哦，包括2017最全的广场舞动作分解教程，以及适合老年人的广场舞推荐等等，想要跳最新广场舞的用户快来下载广场舞西西专区下载吧</div></div>        
        <b id="g-black-bg"></b>
        <strong id="g-look-desc">点击查看</strong>
        <b id="g-desc-bg"></b>
    </div>
</section>
<section id="g-other-class">
    <ul class="g-theme-other"> 
        <li>            
            <a href="/key/peiyin/" title="配音">配音</a>         
        </li>
        <li>            
            <a href="/key/chenzhihua/" title="看电影">看电影</a>
        </li>
        <li>            
            <a href="/key/kugou/" title="酷狗">酷狗</a>         
        </li>
    </ul>
</section>



<section class="g-coll-game m-tab-box" id="infocon">
    <ul id="tab-nav" class="g-coll-btn m-tab-btn">
        <li class="m-hover" data-sysName="0">安卓</li>
        <li data-sysName="1">IOS</li>
        <li data-sysName="2">其他</li>
    </ul>
    <div id="tab-div" class="m-tabdivtxt" data-shownum="5">
    <div class="m-tab-cont" id="m-android-theme" data-p="1">
           <div class="g-coll-gamedown">
            <a href="/x/187064" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2015-11/20151126152411_100_100.jpg" class="m-game-img" >
                <p>
                    <strong>广场舞视频大全app(广场舞视频教学)</strong>
                    <em>大小：11.4M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/187064" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>     
    </div>       
    <div class="m-tab-cont" id="m-ios-theme" data-p="1">   
    <div class="g-coll-gamedown">
            <a href="/x/190856" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2015-12/201512710655_100_100.png" class="m-game-img" >
                <p>
                    <strong>趣点广场舞(最热广场舞视频)</strong>
                    <em>大小：11.2M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/190856" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        <div class="g-coll-gamedown">
            <a href="/x/196276" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2015-12/2015122119432_100_100.jpg" class="m-game-img" >
                <p>
                    <strong>秀舞吧-广场舞视频</strong>
                    <em>大小：47.7M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/196276" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        <div class="g-coll-gamedown">
            <a href="/x/208588" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2016-1/2016121134754_100_100.jpg" class="m-game-img" >
                <p>
                    <strong>优酷广场舞小苹果</strong>
                    <em>大小：8.5M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/208588" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        <div class="g-coll-gamedown">
            <a href="/x/217932" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2016-2/20162191018151146_100_100.png" class="m-game-img" >
                <p>
                    <strong>红舞联盟广场舞</strong>
                    <em>大小：12.0M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/217932" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        <div class="g-coll-gamedown">
            <a href="/x/244614" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2016-4/20164111652474954_100_100.jpg" class="m-game-img" >
                <p>
                    <strong>美多多广场舞大全app</strong>
                    <em>大小：11.4M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/244614" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        <div class="g-coll-gamedown">
            <a href="/x/256791" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2016-5/201655173718825_100_100.png" class="m-game-img" >
                <p>
                    <strong>播视网广场舞app</strong>
                    <em>大小：4M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/256791" class="g-coll-gamedown-right"><b></b>下载</a>
        </div> 
            <div class="g-coll-gamedown">
                <a href="/x/273161" class="g-coll-gamedown-left">
                    <img src="http://pic1.cr173.com/cr173/mb/up/2017-12/20171291017201410_100_100.jpg" class="m-game-img" >
                    <p>
                        <strong>就爱广场舞iOS版</strong>
                        <em>大小：30.2M</em>            
                        <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                    </p>
                </a>
                <a href="/x/273161" class="g-coll-gamedown-right"><b></b>下载</a>
            </div>
            <div class="g-coll-gamedown">
                <a href="/x/274662" class="g-coll-gamedown-left">
                    <img src="http://pic1.cr173.com/cr173/mb/up/2016-6/2016613840288611_100_100.png" class="m-game-img" >
                    <p>
                        <strong>糖豆广场舞ipad版</strong>
                        <em>大小：58.2M</em>            
                        <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                    </p>
                </a>
                <a href="/x/274662" class="g-coll-gamedown-right"><b></b>下载</a>
            </div>
            <div class="g-coll-gamedown">
                <a href="/x/290205" class="g-coll-gamedown-left">
                    <img src="http://pic1.cr173.com/cr173/mb/up/2016-7/20167121455128411_100_100.png" class="m-game-img" >
                    <p>
                        <strong>广场舞教学大全ios版</strong>
                        <em>大小：26.1M</em>            
                        <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                    </p>
                </a>
                <a href="/x/290205" class="g-coll-gamedown-right"><b></b>下载</a>
            </div>
            <div class="g-coll-gamedown">
                <a href="/x/443422" class="g-coll-gamedown-left">
                    <img src="http://pic1.cr173.com/cr173/mb/up/2017-3/2017322105852323_100_100.jpg" class="m-game-img" >
                    <p>
                        <strong>99广场舞ios版</strong>
                        <em>大小：21.4M</em>            
                        <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                    </p>
                </a>
                <a href="/x/443422" class="g-coll-gamedown-right"><b></b>下载</a>
            </div>     
            <div class="g-coll-gamedown">
            <a href="/x/148144" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2015-7/2015728161040_100_100.jpg" class="m-game-img" >
                <p>
                    <strong>糖豆广场舞app</strong>
                    <em>大小：29.5M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x6.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/148144" class="g-coll-gamedown-right"><b></b>下载</a>
        </div> 
        <div class="g-coll-gamedown">
            <a href="/x/130827" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2017-8/2017822751171457_100_100.png" class="m-game-img" >
                <p>
                    <strong>就爱广场舞app</strong>
                    <em>大小：10.4M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x5.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/130827" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        <div class="g-coll-gamedown">
            <a href="/x/207391" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2017-5/20175251041494151_100_100.png" class="m-game-img" >
                <p>
                    <strong>99广场舞app</strong>
                    <em>大小：10.8M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x5.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/207391" class="g-coll-gamedown-right"><b></b>下载</a>
        </div> 
        <div class="g-coll-gamedown">
            <a href="/x/274607" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2016-6/20166121822575064_100_100.png" class="m-game-img" >
                <p>
                    <strong>糖豆广场舞课堂app</strong>
                    <em>大小：11.8M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x5.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/274607" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        <div class="g-coll-gamedown">
            <a href="/x/107366" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2015-1/201511317175_100_100.jpg" class="m-game-img" >
                <p>
                    <strong>蛙趣广场舞视频</strong>
                    <em>大小：11.3M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/107366" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        <div class="g-coll-gamedown">
            <a href="/x/150921" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2015-8/2015879256_100_100.png" class="m-game-img" >
                <p>
                    <strong>全民广场舞</strong>
                    <em>大小：27.9M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/150921" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        <div class="g-coll-gamedown">
            <a href="/x/153902" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2015-8/2015817153815_100_100.jpg" class="m-game-img" >
                <p>
                    <strong>中国广场舞app</strong>
                    <em>大小：21.2M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/153902" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>       
        </div>    
        <div class="m-tab-cont" id="m-pc-theme" data-p="1">
             <div class="g-coll-gamedown">
                <a href="/x/484231" class="g-coll-gamedown-left">
                    <img src="http://pic1.cr173.com/cr173/mb/up/2017-6/201767173834802_100_100.png" class="m-game-img" >
                    <p>
                        <strong>糖豆广场舞app</strong>
                        <em>大小：58M</em>            
                        <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                    </p>
                </a>
                <a href="/x/484231" class="g-coll-gamedown-right"><b></b>下载</a>
            </div>
             <div class="g-coll-gamedown">
            <a href="/x/180949" class="g-coll-gamedown-left">
                <img src="http://pic1.cr173.com/cr173/mb/up/2015-11/201511119582_100_100.jpg" class="m-game-img" >
                <p>
                    <strong>广场舞大师app手机版</strong>
                    <em>大小：3.7M</em>            
                    <img src="http://m.cr173.com/skin/new2015/images/x4.png" class="m-game-star">
                </p>
            </a>
            <a href="/x/180949" class="g-coll-gamedown-right"><b></b>下载</a>
        </div>
        </div>
    </div>
</section>

<b class="f-loading-font" data-clicknum="1">点击加载更多.....</b>
<div class="g-foot-nav">
    <ul class="g-foot-nav-ul">
        <li><a href="/topranknew.html">最新游戏</a></li>
        <li><a href="/ranknew.html">最新软件</a></li>        
        <li><a href="/topic.html">最新专题</a></li>
        <li><a href="/complist.html">最新厂商</a></li>
    </ul>
</div>
<footer>
    <a href="/webmap.html">网站地图</a> | <a href="http://www.cr173.com/?m">访问电脑版</a>
</footer>




<mip-fixed type="top" class="m-desc-div" id="customid">
<div class="m-desc-alert"><p></p><b id="m-close-desc" on="tap:customid.close">关闭</b></div><b id="m-alert-bg" class="m-black-bg" on="tap:customid.close"></b>  
</mip-fixed>
</mip-cr173-key>
<script src="https://mipcache.bdstatic.com/static/v1/mip-fixed/mip-fixed.js"></script>



```


