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