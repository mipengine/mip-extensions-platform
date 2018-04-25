# mip-fy-yuyue

mip-fy-yuyue 当无下载地址的时候，增加预约功能，通过jsonp发送预约手机号码。

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
<mip-fy-yuyue data-nodownurl="https://m.cr173.com" data-color="#66d105" data-id="208071" data-yuyueurl="https://www.cr173.com">1
<div class="g-box m-down-msg f-yydiv" id="m-down-msg">
    <header class="info">
        <div class="pic">
            <div class="ico-wrap middle f-game-img">
                <mip-img class="ico" src="http://pic1.qqtn.com/qqtn/mb/up/2018-1/2018124950533050_120_120.jpg"  ></mip-img>
            </div>
            <ul>
                <li class="cpname"><h1 class="f-game-h1">trapadventure 2游戏安卓版下载</h1></li><li class="type"><b>大小：0KB</b><b>语言：中文</b></li><li class="ver" >v1.0 手机版</li><li class="type"><b>类别：<a href="http://m.qqtn.com/q/CatalogID/202/2/0/">动作冒险</a></b><b class="f-tags-system">系统：Android</b></li>
            </ul>
        </div>
        <div id="downAddress">
            <ul class="m-down-ul f-downbtn-url">
                <li class="m-down-last"><a href="https://m.cr173.com" lowerOk="yes1" class="span9 m-game-down down f-eject-btn" data-flag="downbtn" id="address">点击下载</a></li>
            </ul>
        </div>        
    </header>22213
</div>
</mip-fy-yuyue>
<div class="f-information f-hide" data-id="304971" data-path="down" data-categroyId="202" data-rootid="16" data-commendid="0" data-system="Android" data-ppaddress="" data-ismoney="0" data-CommentTpye="0" data-Username="hjw" data-Type="0" data-DateTime="2018/1/24" data-phpurl="2"></div>
</mip-ychlyxgs-adddata>
</mip-ychlyxgs-data>

<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-adddata/mip-ychlyxgs-adddata.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-data/mip-ychlyxgs-data.js"></script>
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