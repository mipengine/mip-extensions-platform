# mip-qqtn-dnumber

mip-qqtn-dnumber 给下载按钮添加onclick并记录点击下载次数

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-qqtn-dnumber/mip-qqtn-dnumber.js

## 示例

### 基本用法
```html
<style mip-custom>
.m-down-ul li a {
    width: 275px;
    height: 38px;
    margin: 0 auto;
    line-height: 38px;
    border-radius: 18.5px;
    font-size: 16px;
    font-weight: normal;
    color: #fff;
    text-align: center;
    display: block;
    overflow: hidden;
    text-decoration: none;
    background: -webkit-linear-gradient(left, #fcc030 , #ff971c);
    background: -o-linear-gradient(right, #fcc030, #ff971c);
    background: -moz-linear-gradient(right, #fcc030, #ff971c);
    background: linear-gradient(to right, #fcc030 , #ff971c);
}
</style mip-custom>

<mip-ychlyxgs-data>
<mip-ychlyxgs-adddata>
<mip-fy-yuyue data-nodownurl="https://m.qqtn.com" data-color="#19b5fe" data-id="{$id}" data-yuyueurl="https://www.qqtn.com">
<mip-qqtn-shield data-shield="qqtn">

    <mip-qqtn-dnumber>
<div id="downAddress">
    <ul class="m-down-ul f-downbtn-url">

<li class="m-down-last"><a href="http://dx11.dkgcw.com/qq500.apk" class="down" id="address" issw="true">点击下载</a></li> 

    </ul>
</div>   


<div class="f-information f-hide" data-id="416154" data-path="down" data-categroyId="200" data-rootid="16" data-commendid="0" data-system="Android" data-ppaddress="" data-ismoney="0" data-CommentTpye="0" data-Username="ywl" data-Type="0" data-DateTime="2019/4/8" data-attr="免费" data-phpurl="2"></div>
</mip-qqtn-dnumber>
</mip-fy-yuyue>

<script src="https://mipcache.bdstatic.com/static/v2/mip.js"></script>

<mip-stats-baidu token="36603a3ac67228cfc7686cc8754897ab"></mip-stats-baidu>
<mip-stats-baidu token="{$userbaidutoken}"></mip-stats-baidu>
<script src="https://mipcache.bdstatic.com/static/v1/mip-html-tabs/mip-html-tabs.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-cambrian/mip-cambrian.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-num0/mip-qqtn-num0.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-fy-yuyue/mip-fy-yuyue.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-shield/mip-qqtn-shield.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-ad/mip-ad.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-html-clickid/mip-html-clickid.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-html-hide/mip-html-hide.js"></script>
<script src="https://c.mipcdn.com/extensions/platform/v2/mobile.com/mip-mobile-download/mip-mobile-download.js"></script>

</body>
</html>
