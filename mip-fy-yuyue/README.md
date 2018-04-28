# mip-fy-yuyue
功能介绍：1.无下载资源的情况，同平台显示预约，非同平台显示暂无对应平台。2.针对PC端的资源(下载资源是.exe和.zip)。判断分类，有对应安卓和苹果资源下载的时候，给出对应的提示，没有对应安卓苹果资源的时候给出没有对应资源的提示


标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-fy-yuyue/mip-fy-yuyue.js
## 示例

### 基本用法
```html



<mip-ychlyxgs-data>
<mip-ychlyxgs-adddata>
<mip-fy-yuyue data-nodownurl="https://m.cr173.com" data-color="#66d105" data-id="208071" data-yuyueurl="https://www.cr173.com">

 <div class="g-box m-down-msg f-yydiv" id="m-down-msg">
    <header class="info">
        <div class="pic">
            <div class="ico-wrap middle">
                <mip-img class="ico f-game-img" src="https://pic.cr173.com/up/2012-4/201245161434.jpg!100_100" alt="湘财金穗金融终端"></mip-img>
            </div>
            <ul>
                <li class="cpname"><h1 class="f-game-h1">湘财金穗金融终端<span>V8.18.0.16912 官方最新版</span></h1></li><li class="type"><b>大小：<span class="f-game-size">70.0M</span></b><b>更新：2018-04-24</b></li><li class="ver" >V8.18.0.16912 官方最新版</li><li class="type"><b>类别：<a href="https://m.cr173.com/x/catalogid/52/0/0/">股票证券</a></b><b class="f-tags-system">系统：WinAll, WinXP, Win7</b></li>
            </ul>
        </div>
        <div id="downAddress">
            <ul class="m-down-ul f-downbtn-url">
                <li class="m-down-last"><a href="" class="span9 m-game-down down f-eject-btn" data-flag="downbtn" id="address">点击下载</a></li>
            </ul>
        </div>
    </header>
</div>


<section id="screen" class="g-game-msg f-tags-position">
    <div class="g-previmg-box">
        <div class="g-previmg plist" id="g-previmg">
            <ul class="g-previmg-show f-previmg-cont">
                <li><mip-img src="https://pic.cr173.com/up/2012-4/201245161042.jpg!320_500" popup></mip-img></li><li><mip-img src="https://pic.cr173.com/up/2012-4/201245161034.jpg!320_500" popup></mip-img></li><li><mip-img src="https://pic.cr173.com/up/2012-4/201245161025.jpg!320_500" popup></mip-img></li><li><mip-img src="https://pic.cr173.com/up/2012-4/201245161010.jpg!320_500" popup></mip-img></li><li><mip-img src="https://pic.cr173.com/up/2012-4/201245161153.jpg!320_500" popup></mip-img></li>
            </ul>
        </div>
    </div>
    <ul class="g-theme-ul">
    
    </ul>

</section>
<!-- 库分离 tmp mipdown -->

<div class="f-tags-box">
    <strong>其它版本</strong>    
    <ul class="m-tags-android f-tags-android">                           <li data-system="Android" data-id="212066" data-size="2.4M"><a href="https://m.cr173.com/x/212066"><i></i><p>湘财股掌乐客户端V6.10 官方安卓版</p><b>下载</b></a></li>                <li data-system="Android" data-id="219784" data-size="23.8M"><a href="https://m.cr173.com/x/219784"><i></i><p>湘财手机自助开户3.4.5 官方安卓版</p><b>下载</b></a></li>                <li data-system="Android" data-id="40668" data-size="26.4M"><a href="https://m.cr173.com/x/40668"><i></i><p>湘财证券手机版V1.4.0 安卓手机版</p><b>下载</b></a></li>                <li data-system="Android" data-id="96300" data-size="2.5M"><a href="https://m.cr173.com/x/96300"><i></i><p>湘财证券掌股乐6.15 官方安卓版</p><b>下载</b></a></li>                    </ul>
    <ul class="m-tags-ios f-tags-ios"><li data-system="苹果iOS" data-id="212046" data-size="35.8M"><a href="https://m.cr173.com/x/212046"><i></i><p>湘财股掌乐手机版V2.74 官方ios版</p><b>下载</b></a></li><li data-system="苹果iOS" data-id="328011" data-size="113M"><a href="https://m.cr173.com/x/328011"><i></i><p>湘财证券ios官方版v1.2.1 iphone最新版</p><b>下载</b></a></li><li data-system="苹果iOS" data-id="328050" data-size="13.3M"><a href="https://m.cr173.com/x/328050"><i></i><p>湘财自助开户ios版v3.5iphone最新版</p><b>下载</b></a></li>     </ul>
</div>


<div class="f-information f-hide" data-id="40662" data-path="down" data-categroyId="52" data-rootid="8" data-commendid="0" data-system="WinAll, WinXP, Win7" data-ppaddress="" data-ismoney="0" data-CommentTpye="0" data-Username="cr_wh" data-Type="0" data-DateTime="2012/4/5" data-comid="0" data-phpurl="1"></div>

</mip-fy-yuyue>
</mip-ychlyxgs-adddata>
</mip-ychlyxgs-data>


<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-data/mip-ychlyxgs-data.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-adddata/mip-ychlyxgs-adddata.js"></script>

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