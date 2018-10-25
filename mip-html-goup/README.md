# mip-html-goup

mip-html-goup 判断当前页面地址与URL一致附加样式

标题|内容
----|----
类型|通用
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-ad/mip-html-goup.js

## 示例

### 基本用法
```html


<!DOCTYPE HTML>
<html mip>
<head>
<meta charset="utf-8">
<meta name="applicable-device" content="mobile" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1, user-scalable=no"/>
<meta http-equiv="Cache-Control" content="no-transform" /><meta http-equiv="Cache-Control" content="no-siteapp" />
<title>免费的个性网站_QQ个性素材分享_腾牛个性网</title>
<meta name="keywords" content="QQ个性网,QQ个性,个性网"/>
<meta name="description" content="腾牛个性网专注于提供免费的QQ个性素材,每日精选最新最热门的QQ签名,QQ头像,QQ网名,图片素材,QQ说说,QQ表情,QQ皮肤内容,旨在打造一个实用的免费个性站."/>
<link rel="canonical" href="https://m.qqtn.com/gx.html">
<link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css" >
<style mip-custom>
html {  font-family: sans-serif; /* 1 */  -ms-text-size-adjust: 100%; /* 2 */  -webkit-text-size-adjust: 100%; /* 2 */-webkit-tap-highlight-color: rgba(0, 0, 0, 0);/* 消除移动浏览器点击蓝色背景 */}
body {  margin: 0;}
article,aside,details, /* 1 */figcaption,figure,footer,header,main, /* 2 */menu,nav,section,summary { /* 1 */  display: block;}
audio,canvas,progress,video {  display: inline-block;}
audio:not([controls]) {  display: none;  height: 0;}
progress {  vertical-align: baseline;}
template, /* 1 */[hidden] {  display: none;}
a {  background-color: transparent; /* 1 */  -webkit-text-decoration-skip: objects; /* 2 */}
a:active,a:hover {  outline-width: 0;}
abbr[title] {  border-bottom: none; /* 1 */  text-decoration: underline; /* 2 */  text-decoration: underline dotted; /* 2 */}
b,strong {  font-weight: inherit;}
b,strong {  font-weight: bolder;}
dfn {  font-style: italic;}
h1 {  font-size: 2em;  margin: 0.67em 0;}
mark {  background-color: #ff0;  color: #000;}
small {  font-size: 80%;}
sub,sup {  font-size: 75%;  line-height: 0;  position: relative;  vertical-align: baseline;}
sub {  bottom: -0.25em;}
sup {  top: -0.5em;}
img {  border-style: none;}
svg:not(:root) {  overflow: hidden;}
code,kbd,pre,samp {  font-family: monospace, monospace; /* 1 */  font-size: 1em; /* 2 */}
figure {  margin: 1em 40px;}
hr {  box-sizing: content-box; /* 1 */  height: 0; /* 1 */  overflow: visible; /* 2 */}
button,input,select,textarea {  font: inherit; /* 1 */  margin: 0; /* 2 */}
optgroup {  font-weight: bold;}
button,input { /* 1 */  overflow: visible;}
button,select { /* 1 */  text-transform: none;}
button,html [type="button"], /* 1 */[type="reset"],[type="submit"] {  -webkit-appearance: button; /* 2 */}
button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner {  border-style: none;  padding: 0;}
button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring {  outline: 1px dotted ButtonText;}
fieldset {  border: 0;  margin: 0 2px;  padding: 0.35em 0.625em 0.75em;}
legend {  box-sizing: border-box; /* 1 */  color: inherit; /* 2 */  display: table; /* 1 */  max-width: 100%; /* 1 */  padding: 0; /* 3 */  white-space: normal; /* 1 */}
textarea {  overflow: auto;}
[type="checkbox"],[type="radio"] {  box-sizing: border-box; /* 1 */  padding: 0; /* 2 */}
[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button {  height: auto;}
[type="search"] {  -webkit-appearance: textfield; /* 1 */  outline-offset: -2px; /* 2 */}
[type="search"]::-webkit-search-cancel-button,[type="search"]::-webkit-search-decoration {  -webkit-appearance: none;}
::-webkit-input-placeholder {  color: inherit;  opacity: 0.54;}
::-webkit-file-upload-button {  -webkit-appearance: button; /* 1 */  font: inherit; /* 2 */}
/* normalize.css结束 */
.clearfix { *zoom:1}
.clearfix:before,.clearfix:after {  display:table;  line-height:0;  content:""}
.clearfix:after {clear:both}
p{margin: 0;}
img {   width:auto\9;   height:auto;    max-width:100%; vertical-align:middle;  border:0;   -ms-interpolation-mode:bicubic}
ul,ol,dl,h1,h2,h3,h4,h5,h6,dt,dd{margin:0;padding:0}
ul li,ol li{list-style:none}
.f-fl,.f-lifl li{float:left;display:inline}
.f-fr{float:right;display:inline}
/* 全站全局CSS部分结束 */
button, input, select, textarea, a{outline:none;}
a:link{ text-decoration:none} i{font-style: normal;}
body{text-align:left;font-size: 12px;padding:0 0 0 0; font-family:"microsoft yahei";  background:none; background:#f0f0f0;margin: 0px auto;}
.margin10{ margin-top:10px;  }
.clearfix:after {content: "";display: block;height: 0;visibility: hidden;clear: both;}
/*头部*/
.g-hide-nav h4{    width: 36px;    height: 45px;    position: absolute;    right: 0;    top: 0;    display: block;    overflow: hidden;}
.g-top-full .m-navshow-btn{ width:36px; height:45px; font-size:0; text-indent:-9999;float:left; margin:0; background:url(https://m.qqtn.com/img/custom-icon.png) no-repeat -166px 14px; background-size:400px; display:inline; overflow:hidden}
.g-top-full .m-black{ width:100%; height:100%; background:#000; opacity:0.7; position:fixed; left:0; top:45px; display:none; overflow:hidden; z-index:90;}
.g-top-full .m-hover{ background:url(https://m.qqtn.com/img/custom-icon.png) no-repeat -166px -37px #fff;background-size:400px;}
.g-top-full .m-navshow-ul{ width:100%; height:auto; position:absolute; right:0; top:45px; background:#f8f8f8; z-index:999; display:none;overflow:hidden; padding:0 0 10px 10px; box-sizing:border-box;box-shadow: 0px 2px 1px #dcdcdc;}
.g-top-full .m-navshow-ul > strong{ width:33.33%; height:auto; padding:10px 10px 0 0; box-sizing:border-box; float:left; display:inline; overflow:hidden; position:relative;zoom:1}
.g-top-full .m-navshow-ul strong a{ width:100%; height:40px; margin:0;background: #fff;padding:0 0 0 25px;border-radius: 6px;box-sizing:border-box; text-align:center; display:block;overflow:hidden;white-space:nowrap; position:relative; zoom:1}
.g-top-full .m-navshow-ul strong a b{width:20px;height:40px;background: url(https://m.qqtn.com/skin/new2018/images/custom-icon.png) no-repeat -85px -355px;background-size:400px;margin:0;display:inline-block;overflow:hidden;position:absolute;left: 8px;top: 1px;}
.g-top-full .m-navshow-ul strong a strong{width:auto;height: 40px;line-height: 40px; padding:0;font-size:16px;font-weight:normal;color:#333; text-align:center;display:block;overflow:hidden;}
.g-top-full .m-navshow-ul strong:nth-child(1) b{ background-position:0 -41px;}
.g-top-full .m-navshow-ul strong:nth-child(2) b{ background-position:0 -82px;}
.g-top-full .m-navshow-ul strong:nth-child(3) b{ background-position:0 -127px;}
.g-top-full .m-navshow-ul strong:nth-child(4) b{ background-position:0 -171px;}
.g-top-full .m-navshow-ul strong:nth-child(5) b{ background-position:-86px -308px;}
.g-top-full .m-navshow-ul strong:nth-child(6) b{ background-position:0 -216px;}
.g-top-full .m-navshow-ul strong:nth-child(7) b{ background-position:0 -263px;}
.g-top-full .m-navshow-ul strong:nth-child(8) b{ background-position:0 -308px;}
.g-top-full .m-navshow-ul strong:nth-child(9) b{ background-position:-86px -263px;}
.g-top-full .m-navshow-ul strong:nth-child(10) b{ background-position:0 -355px;}
.g-top-full .m-navshow-ul strong:nth-child(11) b{ background-position:0 -403px;}
.m-float{ position:fixed; left:0; top:0; z-index:999}
.g-ad-focus{ width:auto; height:auto; margin:4px 5px; display:block; overflow:hidden;}
.m-class-nav mip-accordion section { position: relative; }
.g-headimg {overflow: hidden;background: #fff;padding: 12px 0px;font-size: 0;overflow-x: scroll;white-space: nowrap;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;}
.scroll-module span {width: 15px;height: 120px;display: inline-block;vertical-align: top;}
.g-headimg a {width: 175px;-moz-box-sizing: border-box;box-sizing: border-box;margin-right: 10px;display: inline-block;padding: 7.5px;border: 1px solid #f3f3f3;border-radius: 4px;position: relative;}
.g-headimg a img {width: 158px;height: 158px;}
.g-headimg a p {width: 158px;overflow: hidden;font-weight: 400;white-space: initial;position: absolute;background: rgba(0,0,0,0.6);bottom: 7.5px;left: 7.5px;}
.g-headimg a p strong {font-size: 16px;padding: 3px 6px;display: block;height: 22px;line-height: 22px;font-weight: normal;color: #fff;overflow: hidden;text-align: center;}
.g-headimg a:last-of-type {margin-right: 0;}
.gototop{ position: fixed; right: 10px !important; bottom: 100px !important; width: 40px; height: 40px; }
.mip-gototop-show{width: 40px;height: 40px;background: url(https://m.qqtn.com/skin/new2018/images/index-icon.png) no-repeat 0 -143px;background-size: 600px;display: none;overflow: hidden;z-index: 500;border: 0px;}
.g-top-full{ width:100%; height:45px; line-height:45px; background:#19b5fe; padding:0 10px; font-size:20px; font-weight:bold;color:#fff; text-align:center; display:block; box-sizing:border-box;  position:relative; zoom:1; z-index:999}
.g-top-full .g-back-home{ width:40px; height:45px; position:absolute; left:0; top:0; background:url(https://m.qqtn.com/skin/new2018/images/custom-icon.png) no-repeat 14px 12px; background-size:400px; display:block; overflow:hidden; z-index: 999}
.g-top-full h1{ font-size: 22px;overflow: hidden;}
.g-top-full .g-list-back{ width:136px;height:21px; position:relative; zoom:1; background:none; left:4px;top:12px; display:block; overflow:hidden;}
.g-top-full .g-list-back b{width:12px; height:21px; position:absolute; left:14px; top:12px; background:url(https://m.qqtn.com/skin/new2018/images/custom-icon.png) no-repeat 0 0; background-size:400px; display:block; overflow:hidden; left:0; top:0;}
.g-top-full .g-list-back h1{ font-size:18px; font-weight:bold; color:#fff; text-indent:20px; height:20px; line-height:20px; text-align:left}
.g-top-full p{ width:67px; height:45px; position:absolute; right:0; top:0; display:block; overflow:hidden;}
.g-top-full p a{ width:21px; height:21px; float:left; margin:14px 0 0 0; background:url(https://m.qqtn.com/skin/new2018/images/custom-icon.png) no-repeat -86px 0; background-size:400px;display:inline; overflow:hidden}
.g-top-full .m-navshow-btn{ width:36px; height:45px; font-size:0; text-indent:-9999;float:left;background:url(https://m.qqtn.com/skin/new2018/images/custom-icon.png) no-repeat -166px 14px; background-size:400px; display:inline; overflow:hidden}
.g-top-full div {width: 100%;height: 45px;position: absolute;right: 0;top: 0;display: block;}
.g-top-full div a {width: 21px;height: 21px;float: right;margin: 14px 46px 0 0;background: url(https://m.qqtn.com/img/custom-icon.png) no-repeat -86px 0;background-size: 400px;display: inline;overflow: hidden;}
.g-top-full .m-hover {background: url(https://m.qqtn.com/img/custom-icon.png) no-repeat -166px -37px #fff;background-size: 400px;}
/*头部 end*/
.g-title{ overflow: hidden; height:44px; padding: 0px 15px;background: #fff; border-bottom:1px solid #eee; }
.g-title strong{font-size:20px; font-style: normal;color: #333;display: inline-block;font-weight: normal; border-left:8px solid #19b5fe; text-indent:12px; height: 25px; line-height: 25px; font-weight: bold; margin-top:9px; }
.g-hot-cont{ overflow: hidden; background: #fff;margin: 10px 0;}
.g-hot-zxtj {background: #fff;overflow: hidden;}
.g-hot-img {font-size: 0;overflow-x: scroll;white-space: nowrap;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;margin: 10px 0 12px 0;}
.g-hot-img a {width:182px;-moz-box-sizing:border-box;box-sizing: border-box;margin-right:10px;display: inline-block;padding: 7.5px;margin-top: 2px; border: 1px solid #f3f3f3; border-radius: 4px;position: relative;}
.scroll-module span {width:15px;height: 120px;display: inline-block;vertical-align: top;}
.g-hot-img a i{width:165px;height:130px;overflow: hidden; display: block;}
.g-hot-img a i img{width:165px;height:130px;}
.g-hot-img a p{white-space: initial;overflow: hidden;position: absolute;left: 7.5px;bottom: 7.5px;width: 165px;background: rgba(0,0,0,0.6);}
.g-hot-img a p strong {font-size: 16px;padding: 3px 6px;display: block;height: 22px;line-height: 22px;font-weight: normal;color: #fff;overflow: hidden;text-align: center;}
.g-hot-img a:last-of-type {margin-right: 0;}
.g-hot-font{overflow: hidden; padding: 0px 15px;  }
.g-hot-font li {width: 100%;height: auto;padding: 12px 0;border-top: 1px dotted #f3f3f3;box-sizing: border-box;display: block;overflow: hidden;}
.g-hot-font li:first-child {border-top: 0px;}
.g-hot-font li a {width: 100%;height: auto;display: -webkit-box;overflow: hidden;}
.g-hot-font li a img {width: 110px;height: 110px;overflow: hidden;}
.g-hot-font li a strong {width: auto;height: auto;padding: 0 0px 0 10px;box-sizing: border-box;display: block;overflow: hidden;-webkit-box-flex: 1;}
.g-hot-font li a strong b {width: 100%;height:28px;line-height: 28px;font-size:16px;font-weight: bold;color: #555;display: block;overflow: hidden;margin: 2px 0 0;}
.g-hot-font li a strong p {width: 100%;height:48px;line-height: 24px;font-size: 14px;font-weight: normal;color: #999;display: block;overflow: hidden;margin:4px 0 0 0;}
.g-hot-font li a strong span{ display: block; height: 22px; line-height: 22px; color: #c5c5c5; font-weight: normal; margin-top:4px;  font-size: 14px; }
.g-headimg-cont{ margin-top:10px;overflow: hidden;}
.g-headimg{ overflow: hidden; background:#fff; padding: 12px 0px;font-size: 0;overflow-x: scroll;white-space: nowrap;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;}
.g-headimg a{width:175px;-moz-box-sizing:border-box;box-sizing:border-box;margin-right:10px;display: inline-block;padding: 7.5px;border: 1px solid #f3f3f3; border-radius: 4px; position:relative;}
.g-headimg a p{width: 158px;overflow: hidden;font-weight: 400;white-space:initial; position: absolute;background: rgba(0,0,0,0.6); bottom:7.5px; left: 7.5px; }
.g-headimg a img{ width: 158px; height: 158px;}
.g-headimg-cont .g-headimg-pf a img{width: 158px; height:230px;border-radius: 4px;}
.g-headimg a p strong{font-size: 16px; padding:3px 6px; display: block; height:22px; line-height:22px; font-weight: normal;color: #fff; overflow: hidden;text-align: center;}
.g-headimg a:last-of-type {margin-right: 0;}
.g-dome{ overflow: hidden; margin-top:10px; background:#fff;}
.g-dome-title {overflow: hidden;height: 45px;    margin-bottom: 15px;}
.g-dome-title li {float: left;display: block;width: 33.333%;text-align: center;height: 43px;line-height: 43px;border-bottom: 2px solid #EDEDED;color: #333;font-size: 16px;font-weight: bold;}
.g-dome-title li.m-hover {border-bottom: 2px solid #0fafff;color: #0fafff;}
.g-boy-top{ width:100%; height:auto; background:#fff; padding:0px 15px 10px 15px; box-sizing:border-box; display:-webkit-box; overflow:hidden}
.g-boy-top img{ width:110px; height:110px; overflow:hidden}
.g-boy-top strong{ width:auto; height:auto; padding:0 0 0 12px; box-sizing:border-box; display:block; overflow:hidden; -webkit-box-flex:1;}
.g-boy-top strong b {width: 100%;height: 28px;line-height: 28px;font-size: 16px;font-weight: bold;color: #555;display: block;overflow: hidden;margin: 2px 0 0;}
.g-boy-top strong p {width: 100%;height: 48px;line-height: 24px;font-size: 14px;font-weight: normal;color: #999;display: block;overflow: hidden;margin: 4px 0 0 0;}
.g-boy-top strong span {display: block;height: 22px;line-height: 22px;color: #c5c5c5;font-weight: normal;margin-top: 4px;font-size: 14px;}
.g-dome-list{display: none; position: relative;}
.g-dome-list a.u-more{position: absolute;top: -97px;right: 15px;display: block;height: 45px;line-height: 45px; margin-top:0px; }
.g-dome .g-dome-list ul{ overflow: hidden; margin:0px 15px 0px 15px; }
.g-dome .g-dome-list ul li {width: 100%;height: auto;height:38px; line-height: 38px; overflow: hidden; border-bottom: 1px solid #f3f3f3;display: block;zoom: 1;background: url(https://m.qqtn.com/skin/new2018/images/m-qqtn-more.png) no-repeat left center;background-size:6px;text-overflow: ellipsis; white-space: nowrap;margin-bottom: 4px;}
.g-dome .g-dome-list ul li a{ font-size: 16px; color: #666;padding: 0px 0px 0px 12px;}
.g-dome .g-dome-list ul li:last-of-type { border-bottom: 0px;}
.g-dome .m-hover{ display: block; }
.g-dome-cout .m-hover{ display: block; }
a.u-more{font-size: 16px;color: #808080;float: right;background: url(https://m.qqtn.com/skin/new2018/images/m-qqtn-more.png) no-repeat right center;background-size:7px;padding-right: 10px;margin-top: 12px;}
.g-pf-cont{ margin-top:10px; overflow: hidden;  }
.g-pf-img{ overflow: hidden; background:#fff; padding: 12px 0px;font-size: 0;overflow-x: scroll;white-space: nowrap;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;}
.g-pf-img a{width:180px;-moz-box-sizing:border-box;box-sizing: border-box;margin-right:10px;display: inline-block;padding: 7.5px;border: 1px solid #f3f3f3; border-radius: 4px; position:relative;}
.g-pf-img a p{width: 163px;overflow: hidden;font-weight: 400;white-space:initial; position: absolute;background: rgba(0,0,0,0.4); bottom:7.5px; left: 7.5px; }
.g-pf-img a img{ width: 163px; height:238px;border-radius: 4px;}
.g-pf-img a p strong{font-size:16px; padding:3px 6px; display: block; height:44px; line-height:22px; font-weight: normal;color: #fff;}
.g-pf-img a:last-of-type {margin-right: 0;}
.scroll-ban{ margin: 10px auto; overflow: hidden; }
.mip-carousle-subtitle{position: absolute;bottom: 0px;left: 0px;background: url(https://m.qqtn.com/skin/new2018/images/rgba50.png);height:41px;right: 0px;z-index: 1;text-align: center;padding: 0px 85px 0px 15px;overflow: hidden;font-size: 16px; line-height: 41px;}
.mip-carousel-indicatorbox{ bottom: 8px; }
footer{width: 100%;height: 45px;line-height: 45px;background: #dedede;font-size:16px;border-top: 1px solid #d2d2d2;font-weight: normal;color: #333;text-align: center;margin: 10px 0 0 0;display: block;overflow: hidden;}
footer a {padding: 0 10px;text-decoration: none;color: #333;font-size:16px;}
.gototop{ position: fixed; right: 10px !important; bottom: 100px !important; width: 40px; height: 40px; }
.mip-gototop-show{width: 40px;height: 40px;background: url(https://m.qqtn.com/skin/new2018/images/index-icon.png) no-repeat 0 -143px;background-size: 600px;display: none;overflow: hidden;z-index: 500;border: 0px;}
.f-hide,.f-hide{ display:none}
.mip-img-loaded{ width: auto !important; }
.g-mygy-cont{ overflow: hidden; background: #fff;margin-top:10px;  }
.g-mygy-cont ul {overflow: hidden;margin: 0px 15px 0px 15px;}
.g-mygy-cont ul li {width: 100%;height: 38px;line-height: 38px;overflow: hidden;border-bottom: 1px solid #f3f3f3;display: block;zoom: 1;    background: url(https://m.qqtn.com/skin/new2018/images/m-qqtn-more.png) no-repeat left center;background-size: 6px;text-overflow: ellipsis;white-space: nowrap;margin-bottom: 4px;}
.g-mygy-cont ul li a {font-size: 16px;color: #666;padding: 0px 0px 0px 12px;}
.g-mygy-cont ul li:last-of-type { border-bottom: 0px; }
</style>
</head>
<body>
<header class="g-top-full">
<div>
<mip-html-goup>
  <span class="g-back-home"></span>
</mip-html-goup>
</div>
  <h1 class="m-name">腾牛个性网</h1>
  <div>
      <a href="https://m.qqtn.com/websousuo.html"></a>
    <mip-accordion sessions-key="mip_2" type="manual">
            <section class="g-hide-nav">
                <h4>
                    <span class="m-navshow-btn show-more">显示更多</span>
                    <span class="m-navshow-btn m-hover show-less">收起</span>
                </h4>
                <p class="m-navshow-ul">
                    <!--INCLUDE:/skin/guide/shownav-mip-index-2018.html-->
                </p>
            </section>
        </mip-accordion>
  </div>
</header>

<section>
     <div class="g-hot-cont clearfix">
     	<div class="g-title"><strong>今日更新</strong></div>
        <div class="g-hot-img scroll-module clearfix">
            <span></span>
            <!--showCmsRes:catalogid in (9,18,20,23,28,72,74) and ishot = 1 and ISNULL(datalength (previewimg),0) >0|dateandtime desc|10|60|
            <a data-type="mip" href="/mipc/{id}.html"><i>{cmsimg n=1}<mip-img src="{cmsimgurl}" alt="{title}"></mip-img>{/cmsimg}</i><p><strong>{title}</strong></p></a>
            ||120-->
            <span></span>
        </div>
    </div>
</section>
<section>
	<div class="g-hot-zxtj clearfix">
		<div class="g-title"><strong>最新推荐</strong></div>
		<ul class="g-hot-font clearfix">
       		<!--showCmsRes:catalogid in (9,18,20,23,28,72,74) and ishot = 1|dateandtime desc|4|60|
        	<li><a href="/c/{id}"><mip-img src="{img}" alt="{title}"></mip-img><strong><b>{title}</b><p>{stitle}</p><span>发布时间：{DateAndTime}</span></strong></a></li>
       	 |{m}-{d}|120-->
    	</ul>
    </div>
</section>
<section>
<div class="g-headimg-cont clearfix">
        <div class="g-title"><strong>精选头像</strong><a class="u-more" data-type="mip" href="https://m.qqtn.com/thememip/tx.html">查看更多</a></div>
        <div class="g-headimg scroll-module clearfix">
            <span></span>
            <!--showCmsRes:catalogid=20 and MaxCharPerPage=7|dateandtime desc|10|60|
            <a data-type="mip" href="/mipc/{id}.html"><mip-img src="{img}" alt="{title}"></mip-img><p><strong>{title}</strong></p></a>
            ||-->
            <span></span>
        </div>
    </div>
</section>
<section>
    <mip-click-dome>
    <div class="g-dome clearfix">
        <ul class="g-dome-title"><li>QQ签名</li><li>QQ网名</li><li>QQ说说</li></ul>
        <div class="g-dome-list clearfix">
           <!--showCmsRes:catalogID=23 and MaxCharPerPage=7|dateandtime desc|1|60|
           <a data-type="mip" href="/mipc/{id}.html" class="g-boy-top"><mip-img src="{img}" alt="{title}"></mip-img><strong><b>{title}</b><p>{stitle}</p><span>发布时间：{date}</span></strong></a>
            |{m}-{d}|120-->
           <ul>
            <!--showCmsRes:catalogID=23|dateandtime desc|5#1|60|
           <li><b></b><a data-type="mip" href="/mipc/{id}.html">{title}</a></li>
            ||-->
           </ul>
        </div>
         <div class="g-dome-list clearfix">
           <!--showCmsRes:catalogID=28 and MaxCharPerPage=7|dateandtime desc|1|60|
         <a data-type="mip" href="/mipc/{id}.html" class="g-boy-top"><mip-img src="{img}" alt="{title}"></mip-img><strong><b>{title}</b><p>{stitle}</p><span>发布时间：{date}</span></strong></a>
            |{m}-{d}|120-->
           <ul>
            <!--showCmsRes:catalogID=28|dateandtime desc|5#1|60|
           <li><b></b><a data-type="mip" href="/mipc/{id}.html">{title}</a></li>
            ||-->
           </ul>
        </div>
         <div class="g-dome-list clearfix">
           <!--showCmsRes:catalogID=18 and MaxCharPerPage=7|dateandtime desc|1|60|
            <a data-type="mip" href="/mipc/{id}.html" class="g-boy-top"><mip-img src="{img}" alt="{title}"></mip-img><strong><b>{title}</b><p>{stitle}</p><span>发布时间：{date}</span></strong></a>
            |{m}-{d}|120-->
           <ul>
              <!--showCmsRes:catalogID=18|dateandtime desc|5#1|60|
           <li><b></b><a data-type="mip" href="/mipc/{id}.html">{title}</a></li>
            ||-->
           </ul>
        </div>
    </div>
</mip-click-dome>
</section>
<section>
    <div class="g-headimg-cont clearfix">
        <div class="g-title"><strong>图片素材</strong><a class="u-more" data-type="mip" href="https://m.qqtn.com/thememip/tp.html">查看更多</a></div>
        <div class="g-headimg scroll-module clearfix">
            <span></span>
            <!--showCmsRes:catalogid=72 and MaxCharPerPage=7|dateandtime desc|10|60|
             <a data-type="mip" href="/mipc/{id}.html"><mip-img src="{img}" alt="{title}"></mip-img><p><strong>{title}</strong></p></a>
             ||--> 
            <span></span>
        </div>
    </div>
</section>
<section>
    <mip-click-dome>
    <div class="g-dome clearfix">
        <ul class="g-dome-title"><li>QQ句子</li><li>QQ语录</li><li>QQ祝福语</li></ul>
        <div class="g-dome-list clearfix">
           <!--showCmsRes:catalogID=17 and MaxCharPerPage=7|dateandtime desc|1|60|
           <a data-type="mip" href="/mipc/{id}.html" class="g-boy-top"><mip-img src="{img}" alt="{title}"></mip-img><strong><b>{title}</b><p>{stitle}</p><span>发布时间：{date}</span></strong></a>
            |{m}-{d}|120-->
           <ul>
            <!--showCmsRes:catalogID=17|dateandtime desc|5#1|60|
           <li><b></b><a data-type="mip" href="/mipc/{id}.html">{title}</a></li>
            ||-->
           </ul>
        </div>
         <div class="g-dome-list clearfix">
           <!--showCmsRes:catalogID=16 and MaxCharPerPage=7|dateandtime desc|1|60|
         <a data-type="mip" href="/mipc/{id}.html" class="g-boy-top"><mip-img src="{img}" alt="{title}"></mip-img><strong><b>{title}</b><p>{stitle}</p><span>发布时间：{date}</span></strong></a>
            |{m}-{d}|120-->
           <ul>
            <!--showCmsRes:catalogID=16|dateandtime desc|5#1|60|
           <li><b></b><a data-type="mip" href="/mipc/{id}.html">{title}</a></li>
            ||-->
           </ul>
        </div>
         <div class="g-dome-list clearfix">
           <!--showCmsRes:catalogID=15 and MaxCharPerPage=7|dateandtime desc|1|60|
            <a data-type="mip" href="/mipc/{id}.html" class="g-boy-top"><mip-img src="{img}" alt="{title}"></mip-img><strong><b>{title}</b><p>{stitle}</p><span>发布时间：{date}</span></strong></a>
            |{m}-{d}|120-->
           <ul>
              <!--showCmsRes:catalogID=15|dateandtime desc|5#1|60|
           <li><b></b><a data-type="mip" href="/mipc/{id}.html">{title}</a></li>
            ||-->
           </ul>
        </div>
    </div>
</mip-click-dome>
</section>
<section>
    <div class="g-pf-cont clearfix">
        <div class="g-title"><strong>精选皮肤</strong><a class="u-more" data-type="mip" href="https://m.qqtn.com/thememip/pf.html">查看更多</a></div>
        <div class="g-pf-img scroll-module clearfix">
            <span></span>
            <!--showCmsRes: catalogid = 74 and MaxCharPerPage=7|dateandtime desc|15|99|
            <a data-type="mip" href="/mipc/{id}.html"><mip-img src="{img}" alt="{title}"></mip-img><p><strong>{title}</strong></p></a>
            ||--> 
            <span></span>
        </div>
    </div>
</section>
<section>
<div class="g-mygy-cont clearfix">
  <div class="g-title"><strong>名言感言</strong></div>
    <ul>
      <!--showCmsRes:catalogid in (38,39)|hits desc|10|99| <li><a href="/mipc/{id}.html" title="{title}">{btitle}</a></li> ||-->
    </ul>
</div>
</section>
<footer>
    <a href="https://www.qqtn.com/?m">访问电脑版</a> | <a href="https://m.qqtn.com/">返回首页</a>
</footer>
<mip-fixed type="gototop" class="gototop">
    <mip-gototop threshold='300'></mip-gototop>
</mip-fixed>
<div class="f-gx-name-20 f-hide">个性首页</div>
<script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-ad/mip-ad.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-stats-baidu/mip-stats-baidu.js" ></script>
<mip-stats-baidu token="36603a3ac67228cfc7686cc8754897ab"></mip-stats-baidu>
<script src="https://mipcache.bdstatic.com/static/v1/mip-accordion/mip-accordion.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-fixed/mip-fixed.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-gototop/mip-gototop.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-click-dome/mip-click-dome.js"></script>
</body>
</html>