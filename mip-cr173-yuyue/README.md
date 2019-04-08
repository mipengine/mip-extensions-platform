# mip-cr173-yuyue
功能介绍：1.0 实现功能：根据页面属性，对已经下架和无地址的资源判断，是软件提示“下架”，是游戏提示“预约”。 对有关联的当前设备访问的资源，根据百度手机助手 百度-黄奥 的需求，进行对应下载的提示。


标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-cr173-yuyue/mip-cr173-yuyue.js
## 示例

### 基本用法
```html

<mip-ychlyxgs-data>
<mip-ychlyxgs-adddata>
<mip-cr173-yuyue data-nodownurl="https://m.qqtn.com" data-color="#66d105" data-id="173398" data-yuyueurl="https://www.qqtn.com">
<div class="g-box m-down-msg f-yydiv" id="m-down-msg">
    <header class="info">
        <div class="pic">
            <div class="ico-wrap middle f-game-img">
                <mip-img class="ico" src="https://pic.qqtn.com/up/2017-3/20173299568854.png!100_100"></mip-img>
            </div>
            <ul>
                <li class="cpname"><h1 class="f-game-h1">比艺直播iOS版下载</h1></li><li class="type"><b>大小：120M</b><b>语言：中文</b></li><li class="ver" >v1.0.1 iPhone版</li><li class="type"><b>类别：<a href="https://m.qqtn.com/q/CatalogID/294/2/0/">IOS娱乐软件</a></b><b class="f-tags-system">系统：IOS</b></li>
            </ul>
        </div>
        <div id="downAddress">
            <ul class="m-down-ul f-downbtn-url">
                <li class="m-down-last"><a href="https://m.qqtn.com" class="span9 m-game-down down f-eject-btn" data-flag="downbtn" id="address">点击下载</a></li>
            </ul>
        </div>        
    </header>
</div>
</mip-qqtn-downts>
<div class="g-previmg-box">
        <div class="g-previmg plist" id="g-previmg">
            <ul class="g-previmg-show f-previmg-cont">
                <li><mip-img src="https://pic.qqtn.com/up/2017-3/20173291012653750.png!400_720" popup></mip-img></li><li><mip-img src="https://pic.qqtn.com/up/2017-3/20173291020764860.png!400_720" popup></mip-img></li><li><mip-img src="https://pic.qqtn.com/up/2017-3/20173291029653750.png!400_720" popup></mip-img></li><li><mip-img src="https://pic.qqtn.com/up/2017-3/20173291035542640.png!400_720" popup></mip-img></li>
            </ul>
        </div>
    </div>
<section class="g-down-information">
    <strong><em>版本：v1.0.1 iPhone版</em><em>时间：2017-02-24</em></strong>
    <ul class="f-num"><span>标签：</span></ul>
</section>
<section class="g-down-introd g-game-msg f-tags-position" id="screen">
    <dl class="g-title">
        <dt>软件介绍</dt>
        <dd></dd>
    </dl>
    <mip-showmore maxheight='180' animatetime='.5' id="showmore01">
    <div id="details" class="f-maincms-cont"><p>比艺直播iOS版是一款专为广大喜欢玩直播的用户量身打造的手机直播软件，在这里用户可以看到主播与主播之间的激烈的才艺比拼，为你打造一个艺术的殿堂，让你怎样都看不完，快来下载体验吧。</p><h3>软件特色:</h3><p>【在线直播】观看劲歌热舞、聊天游戏互动、点歌送礼还能浪漫告白</p><p>【美颜大法】对自己没信心？没问题美颜神功助你走天下！</p><p>【美女如云】小清新、萌妹纸、性感女神、御姐女王，总有一款让你心动。</p><p>【花样百出】K歌、热舞、喊麦、说唱、cosplay、乐器弹奏，想要什么！就！有！什！么！</p><h3>软件功能:</h3><p><strong>【公正榜单】</strong>关注支持喜欢的主播登上明星榜/魅力榜/周星宝座，人人都有机会登上富豪榜。</p><p><strong>【才貌双全】</strong>每一个主播都将自己独特的才艺与文艺表演展现给用户观看；</p><p><strong>【直播秀】</strong>最好听的歌声、潮人、舞蹈、脱口秀;民族，潮流，时尚，hiphop等等，全天24小时不间断!</p><p><strong>【直播贴纸】</strong>各种贴纸表情包，表达心情、搞怪遮脸，原来还可以这样玩！</p><h3>更新日志:</h3><p>1.增加众多礼物效果</p><p>2.更有活动屏幕玩法</p><p>3.添加了主播屏幕特效</p><p>4、修复众多历史bug</p></div>
    </mip-showmore>
    <div class="f-admorediv f-hide-box">
        <div on="tap:showmore01.toggle" data-closetext="点击收起内容" class="mip-showmore-btn">加载全部内容>>></div>
    </div>
</section> 
<div class="g-box" id="g-keyword">
    <div class="g-game-recomd">
    <dl class="g-title">
        <dt>热门推荐</dt>
        <dd></dd>
    </dl>
        <div class="g-keyword-cont">
            <ul>
                            <li><a href="https://m.qqtn.com/q/332519"><mip-img src="https://pic.qqtn.com/up/2018-4/2018042407493872375.jpg!100_100"></mip-img><strong>侦探大师app苹果版</strong></a></li>                          <li><a href="https://m.qqtn.com/q/37667"><mip-img src="https://pic.qqtn.com/up/2018-4/201842382565427.jpg!100_100"></mip-img><strong>驾考宝典2018手机版IOS下载</strong></a></li>                         <li><a href="https://m.qqtn.com/q/35266"><mip-img src="https://pic.qqtn.com/up/2018-3/20183211338546072.jpg!100_100"></mip-img><strong>百度地图iPhone版下载</strong></a></li>                          <li><a href="https://m.qqtn.com/q/96753"><mip-img src="https://pic.qqtn.com/up/2018-3/20183171132135741.jpg!100_100"></mip-img><strong>拼多多iPhone版</strong></a></li>                         <li><a href="https://m.qqtn.com/q/33953"><mip-img src="https://pic.qqtn.com/up/2018-3/2018317103908183.png!100_100"></mip-img><strong>QQ同步助手IOS版</strong></a></li>                          <li><a href="https://m.qqtn.com/q/42524"><mip-img src="https://pic.qqtn.com/up/2018-3/2018311356383602.jpg!100_100"></mip-img><strong>wps office ios版</strong></a></li>                         <li><a href="https://m.qqtn.com/q/34861"><mip-img src="https://pic.qqtn.com/up/2016-9/2016092214142626108.png!100_100"></mip-img><strong>百度贴吧iOS版下载</strong></a></li>                           <li><a href="https://m.qqtn.com/q/38702"><mip-img src="https://pic.qqtn.com/up/2018-2/201825846503294.jpg!100_100"></mip-img><strong>快手下载苹果版</strong></a></li>            
            </ul>
        </div>
    </div>
</div>
<section class="g-cms-relatedcms">
    <dl class="g-title">
        <dt>相关教程</dt>
        <dd></dd>
    </dl>
    <ul class="g-cmslist">
                <li><b></b><a href="https://m.qqtn.com/c/40059" title="12月炫联赛圣诞决赛视频直播地址和比赛时间">12月炫联赛圣诞决赛视频直播地址和比赛时间</a></li>                <li><b></b><a href="https://m.qqtn.com/c/38737" title="关注QQ炫舞炫联赛决赛直播 赢取10000点券以及非卖品奖励">关注QQ炫舞炫联赛决赛直播 赢取10000点券以及非卖品奖励</a></li>              <li><b></b><a href="https://m.qqtn.com/c/35032" title="轩辕传奇据点战怎么打？参与微博直播赢大奖">轩辕传奇据点战怎么打？参与微博直播赢大奖</a></li>              <li><b></b><a href="https://m.qqtn.com/c/29974" title="PPS网络电视（2.7.0.1248）发布 改进直播体验">PPS网络电视（2.7.0.1248）发布 改进直播体验</a></li>              <li><b></b><a href="https://m.qqtn.com/c/24705" title="看直播聊比赛 QQ群新增QQ群直播功能">看直播聊比赛 QQ群新增QQ群直播功能</a></li>                <li><b></b><a href="https://m.qqtn.com/c/24455" title="腾讯QQLive购得NBA直播权 NBA直播将落户腾讯">腾讯QQLive购得NBA直播权 NBA直播将落户腾讯</a></li>        
    </ul>
</section>  
<div class="g-box f-num" id="g-keyword">
    <div class="g-game-recomd m-tab-box">
        <dl class="g-title">
            <dt>猜你喜欢</dt>
            <dd></dd>
        </dl>
       <mip-html-tabs tabs-type="Qi_4" tabs-nav="#tab-nav  li" tabs-key="#tab-div div" nav-cur="m-hover">
      <ul class="g-keyword-btn m-tab-btn" id="tab-nav"></ul>        <!--相关分组-->  
        <div id="tab-div">
           <!--/相关分组-->  
        </div>
    </div>
</div>
<section class="g-key-ohter f-num">
    <dl class="g-title">
        <dt>相关合集</dt>
        <dd></dd>
    </dl>
<section class="g-recomd plist" id="g-recomd-game">
    <ul class="g-recomd-ul">
        <li><a href="https://m.qqtn.com/k/pgzbptxz" title="苹果直播平台"><mip-img src="https://pic.qqtn.com/up/2016-10/20161081639533079.jpg!200_100" alt="苹果直播平台"></mip-img><span>苹果直播平台</span></a></li>
    </ul>
</section>
</section>
</mip-qqtn-shield>
<footer>
    <a href="https://www.qqtn.com/?m">访问电脑版</a> | <a href="https://m.qqtn.com/">返回首页</a>
</footer>
<mip-fixed type="top" class="lightbox m-click-show f-eject-cont" id="customid">
    <div class="m-show-cont">        
        <strong class="g-show-title">
            <p>大家<span>还下载了</span>这些：</p>
        </strong>        
        <b class="m-close-btn">+</b>
        <ul class="m-hideshow-top f-tkul"></ul>
    </div>    
    <b class="m-black-bg"></b>    
</mip-fixed>
<div class="f-tags-box f-hide-box f-hide">
    <strong>其它版本</strong>    
    <ul class="m-tags-android f-tags-android"> 
        <li data-system="Android" data-id="173385"><a href="https://m.qqtn.com/q/173385" ><i></i><p>比艺直播vip破解版下载v1.0.1 安卓版</p><b>下载</b></a></li>       
                
        <li data-system="Android" data-id="173377"><a href="https://m.qqtn.com/q/173377" ><i></i><p>比艺直播apk官方版下载v1.0.0 安卓版</p><b>下载</b></a></li>       
                
        <li data-system="Android" data-id="173370"><a href="https://m.qqtn.com/q/173370" ><i></i><p>比艺直播app下载v1.0.0 安卓版</p><b>下载</b></a></li>       
                
        <li data-system="Android" data-id="188764"><a href="https://m.qqtn.com/q/188764" ><i></i><p>比艺直播官方app下载v1.0.1 最新版</p><b>下载</b></a></li>       
        
        
    </ul>
    <ul class="m-tags-ios f-tags-ios">  
    </ul>
</div>
<div class="f-information f-hide" data-id="173398" data-path="down" data-categroyId="294" data-rootid="15" data-commendid="0" data-system="IOS" data-ppaddress="" data-ismoney="0" data-CommentTpye="0" data-Username="chenggang" data-Type="0" data-DateTime="2017/2/24" data-attr="下1架" data-downurl="" data-phpurl="2"></div>


</mip-cr173-yuyue>
</mip-ychlyxgs-adddata>
</mip-ychlyxgs-data>
<mip-qqtn-num0></mip-qqtn-num0>

<script src="https://c.mipcdn.com/static/v1/mip-showmore/mip-showmore.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-fixed/mip-fixed.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-adddata/mip-ychlyxgs-adddata.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-data/mip-ychlyxgs-data.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-accordion/mip-accordion.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-html-tabs/mip-html-tabs.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-cambrian/mip-cambrian.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-num0/mip-qqtn-num0.js"></script>

<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-shield/mip-qqtn-shield.js"></script>


```
## 用法
- 用来判断的相关`href`的`ID`必须命名为`address`，假如为空或者为指定地址，则更改按钮为预约。


## 属性

###  data-nodownurl
- 说明：用来跟address的heaf比对，当值一样时才会执行。
- 取值：没有下载地址的。
- 必选项：是
- 类型：指定字符串

## 注意事项

- 下载地址的a标签id必须为 `address` 。

###  data-color
- 说明：配置预约按钮背景颜色，提供不同风格网站需要。
- 取值：rgb色值。
- 必选项：是

###  data-id
- 说明：预约的ID号，会以jsonp的方式传送。
- 取值：ID。
- 必选项：是

###  data-yuyueurl
- 说明：接口地址，用于不同网站定义。
- 取值：URL。
- 必选项：是

## 注意事项

- 地址必须为 `https` 。