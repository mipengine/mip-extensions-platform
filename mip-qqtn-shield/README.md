# mip-qqtn-shield

mip-qqtn-shield 根据下载地址来进行判断，规则1：假如包含A类地址，更换页面内容。规则2：包含B地址，将该应用进行下架处理   1.1 :新增根据来路进行不同的提示

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-qqtn-shield/mip-qqtn-shield.js
## 示例

### 基本用法

```html
<mip-ychlyxgs-adddata>
<mip-qqtn-downts>
<mip-qqtn-shield data-shield="qqtn">
<title>阿斯顿</title>
<div class="g-box m-down-msg" id="m-down-msg">
    <header class="info">
        <div class="pic">
            <div class="ico-wrap middle f-game-img">
                <mip-img class="ico" src="http://pic1.qqtn.com/qqtn/mb/up/2017-9/20179301353416997_120_120.png"  ></mip-img>
            </div>
            <ul>
                <li class="cpname"><h1 class="f-game-h1">圣书阁17书友网手机版红杏直播</h1></li><li class="type"><b>大小：10.3M</b><b>语言：中文</b></li><li class="ver" >v1.2 安卓版</li><li class="type"><b>类别：<a href="http://m.qqtn.com/q/CatalogID/195/2/0/">浏览阅读</a></b><b class="f-tags-system">系统：Android</b></li>
            </ul>
        </div>
        <div id="downAddress">
            <ul class="m-down-ul f-downbtn-url">
                <li class="m-down-last"><a href="http://tj.qqtj99.com/0006/5084" class="span9 m-game-down down f-eject-btn" data-flag="downbtn" id="address">点击下载</a></li>
            </ul>
        </div>
        
    </header>
</div>
<div class="g-previmg-box">
        <div class="g-previmg plist" id="g-previmg">
            <ul class="g-previmg-show f-previmg-cont">
                <li><mip-img src="http://pic1.qqtn.com/qqtn/mb/up/2017-9/2017930135346986080_400_720.jpg" popup ></mip-img></li><li><mip-img src="http://pic1.qqtn.com/qqtn/mb/up/2017-9/2017930135347542640_400_720.jpg" popup ></mip-img></li><li><mip-img src="http://pic1.qqtn.com/qqtn/mb/up/2017-9/2017930135347441540_400_720.jpg" popup ></mip-img></li><li><mip-img src="http://pic1.qqtn.com/qqtn/mb/up/2017-9/2017930135347764760_400_720.jpg" popup ></mip-img></li>
            </ul>
        </div>
</div>
<section class="g-down-introd g-game-msg f-tags-position" id="screen">
    <dl class="g-title">
        <dt>软件介绍</dt>
        <dd></dd>
    </dl>
    <mip-showmore maxheight='160' animatetime='.5' id="showmore01">
    <div id="details" class="f-maincms-cont"><p>圣书阁17书友网，是一个免费小说阅读平台，大家即可在线观看小说，也能离线欣赏，你无需等待更新，这里的都是完本，而且还正版哦！</p><h3>圣书阁17书友网新版内容：</h3><p>1. 修复部分格式翻页效果设置</p><p>2. 优化基层结构，稳定阅读体验</p><p>3. 优化支付下载体验，不影响阅读展示下载进度</p><p>4. 新增影视出版频道</p><h3>圣书阁17书友网平台特色：</h3><p>【免费】</p><p>下载不收费，海量免费小说随便看；</p><p>【离线】</p><p>不用联网也能看，超省流量；</p><p>【完本】</p><p>无需坐等更新，一次看个够；</p><p>【正版】</p><p>誓死捍卫你阅读正版小说的权利；</p><h3>圣书阁17书友网小编点评：</h3><p>最火最热女性小说阅读客户端，海量原创正版小说，全新高颜值界面，舒心的看书体验，与作者面对面的心灵交流，尽在红袖添香书城。</p></div>
    </mip-showmore>
    <div class="f-admorediv f-hide-box">
        <div on="tap:showmore01.toggle" data-closetext="点击收起内容" class="mip-showmore-btn">加载全部内容>>></div>
    </div>
</section> 
<section class="g-key-ohter f-num">
    <dl class="g-title">
        <dt>相关合集</dt>
        <dd></dd>
    </dl>
    <section class="g-recomd plist" id="g-recomd-game">
        <ul class="g-recomd-ul">
            <li><a href="http://m.qqtn.com/k/ssg" title="圣书阁"><mip-img src="http://pic1.qqtn.com/qqtn/mb/up/2017-9/2017926941458593_200_100.jpg" alt="圣书阁" ></mip-img><span>圣书阁</span></a></li>
        </ul>
    </section>
</section>
<div class="f-information f-hide" data-id="304971" data-path="down" data-categroyId="187" data-rootid="16" data-commendid="0" data-system="Android" data-ppaddress="" data-ismoney="0" data-CommentTpye="0" data-Username="hjw" data-Type="0" data-DateTime="2018/1/24" data-phpurl="2"></div>
</mip-qqtn-shield>
</mip-qqtn-downts>
</mip-ychlyxgs-adddata>
<script src="https://c.mipcdn.com/static/v1/mip-showmore/mip-showmore.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-adddata/mip-ychlyxgs-adddata.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-downts/mip-qqtn-downts.js"></script>

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