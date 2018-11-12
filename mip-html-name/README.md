# mip-html-name

mip-html-name 获取标签值然后判断

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-html-name/mip-html-name.js

## 示例

### 基本用法
```html

  <!DOCTYPE HTML>
<html mip>
<head>
<meta charset="utf-8">
<title>{$title}_腾牛个性网</title>
<meta name="applicable-device" content="mobile" />
<link rel="dns-prefetch" href="//m.qqtn.com" />
<link rel="dns-prefetch" href="//pic.qqtn.com" />
<link rel="dns-prefetch" href="//pic1.qqtn.com" />
<meta http-equiv="Cache-Control" content="no-transform" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="keywords" content="{$keys}" />
<meta name="description" content="{$stitle}" />
<link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v2/mip.css">
<link rel="canonical" href="https://m.qqtn.com/c/{$id}">
<style mip-custom>
/* 基于normalize bootstrap 的全局重置CSS文件部分1.2版本 */
/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */
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
.clearfix {	*zoom:1}
.clearfix:before,.clearfix:after {	display:table;	line-height:0;	content:""}
.clearfix:after {	clear:both}
p{margin: 0;}
img {	width:auto\9;	height:auto;	max-width:100%;	vertical-align:middle;	border:0;	-ms-interpolation-mode:bicubic}
ul,ol,dl,h1,h2,h3,h4,h5,h6,dt,dd{margin:0;padding:0}
ul li,ol li{list-style:none}
.f-fl,.f-lifl li{float:left;display:inline}
.f-fr{float:right;display:inline}
/* 全站全局CSS部分结束 */

a:link{ text-decoration:none}
body{text-align:left;font-size: 12px;padding:0 0 0 0; font-family:"微软雅黑";  background:none; background:#f0f0f0}

.g-top-full{ width:100%; height:45px; line-height:45px; background:#19b5fe; padding:0 10px; font-size:22px; font-weight:bold;color:#fff; text-align:center; display:block; box-sizing:border-box;  position:relative; zoom:1; z-index:999}
.g-top-full .g-back-home{ width:40px; height:45px; position:absolute; left:0; top:0; background:url(/img/custom-icon.png) no-repeat 14px 12px; background-size:400px; display:block; overflow:hidden; z-index:999}
.g-top-full .g-list-back{ width:136px;height:21px; position:relative; zoom:1; background:none; left:4px;top:12px; display:block; overflow:hidden;}
.g-top-full .g-list-back b{width:12px; height:21px; position:absolute; left:14px; top:12px; background:url(/img/custom-icon.png) no-repeat 0 0; background-size:400px; display:block; overflow:hidden; left:0; top:0;}
.g-top-full .g-list-back h1{ font-size:18px; font-weight:bold; color:#fff; text-indent:20px; height:20px; line-height:20px; text-align:left}
.g-top-full div{ width:100%; height:45px; position:absolute; right:0; top:0; display:block;}
.g-top-full div a{ width:21px; height:21px; float:right; margin:14px 46px 0 0; background:url(/img/custom-icon.png) no-repeat -86px 0; background-size:400px;display:inline; overflow:hidden}
.g-top-full .m-navshow-btn{ width:36px; height:45px; font-size:0; text-indent:-9999;float:left; margin:0 0 0 10px; background:url(/img/custom-icon.png) no-repeat -166px 14px; background-size:400px; display:inline; overflow:hidden}
.g-top-full .m-black{ width:100%; height:100%; background:#000; opacity:0.7; position:fixed; left:0; top:45px; display:none; overflow:hidden; z-index:90;}
.g-top-full .m-hover{ background:url(/img/custom-icon.png) no-repeat -166px -37px #fff;background-size:400px;}
.g-top-full .m-navshow-ul{ width:100%; height:auto; position:absolute; right:0; top:45px; background:#EDEDED; z-index:999; display:none;overflow:hidden; padding:0 0 10px 0px; box-sizing:border-box;box-shadow: 1px 1px 4px #ABABAB;}
.g-top-full .m-navshow-ul li{ width:33.33%; height:auto; padding:10px 10px 0 0; box-sizing:border-box; float:left; display:inline; overflow:hidden; position:relative;zoom:1}
.g-top-full .m-navshow-ul li a{width:100%;he;height: 40px;background: #fff;padding:0 0 0 25px;border-radius: 6px;box-sizing:border-box; text-align:center; display:block;overflow:hidden;white-space:nowrap; position:relative; zoom:1}
.g-top-full .m-navshow-ul li a b{width:20px;height:40px;background: url(/img/custom-icon.png) no-repeat -85px -355px;background-size:400px;margin:0;display:inline-block;overflow:hidden;position:absolute;left: 8px;top: 1px;}
.g-top-full .m-navshow-ul li a strong{width:auto;height: 40px;line-height: 40px;font-size:14px;font-weight:normal;color:#333; text-align:center;display:block;overflow:hidden;}
.g-top-full .m-navshow-ul li:nth-child(1) b{ background-position:0 -41px;}
.g-top-full .m-navshow-ul li:nth-child(2) b{ background-position:0 -82px;}
.g-top-full .m-navshow-ul li:nth-child(3) b{ background-position:0 -127px;}
.g-top-full .m-navshow-ul li:nth-child(4) b{ background-position:0 -171px;}
.g-top-full .m-navshow-ul li:nth-child(5) b{ background-position:-86px -308px;}
.g-top-full .m-navshow-ul li:nth-child(6) b{ background-position:0 -216px;}
.g-top-full .m-navshow-ul li:nth-child(7) b{ background-position:0 -263px;}
.g-top-full .m-navshow-ul li:nth-child(8) b{ background-position:0 -308px;}
.g-top-full .m-navshow-ul li:nth-child(9) b{ background-position:-86px -263px;}
.g-top-full .m-navshow-ul li:nth-child(10) b{ background-position:0 -355px;}
.g-top-full .m-navshow-ul li:nth-child(11) b{ background-position:0 -403px;}

.m-float{ position:fixed; left:0; top:0; z-index:999}

/*首页头部*/
.g-top-full .g-logo{ width:75px; height:28px; background:url(/img/class-icon.png) no-repeat -330px 0; background-size:600px; display:block; overflow:hidden; position:absolute; left:10px; top:12px;}
.g-top-full .g-index-search{ width:225px; height:45px; position:absolute; right:0; top:0; display:block; overflow:hidden; -webkit-box-flex:1}
.g-top-full .g-index-search form{ width:179px; height:28px; margin:9px 0 0 0; float:left; display:inline; overflow:hidden;}
.g-top-full .g-index-search form .search-input{ width:143px; height:28px; line-height:28px; font-size:14px; font-weight:normal; color:#999; text-indent:10px; background:#fff; margin:0; padding:0; border:0; border-radius:4px 0 0 4px; float:left; display:inline; overflow:hidden;}
.g-top-full .g-index-search form .search-button{ width:36px; height:28px; background:url(/img/class-icon.png) no-repeat -322px -78px #fff; background-size:600px; border-radius:0 4px 4px 0; border:0; float:left; margin:0; display:inline; overflow:hidden}


/*底部*/
footer{ width:100%; height:45px; line-height:45px; background:#dedede; border-top:1px solid #d2d2d2; font-size:16px; font-weight:normal; color:#333; text-align:center; margin:10px 0 0 0; display:block; overflow:hidden;}
footer a{ padding:0 10px; text-decoration:none; color:#333}

.m-rootid{ display:none;}

.m-backTop{ width:40px; height:40px; background:url(/img/index-icon.png) no-repeat 0 -143px; background-size:600px; display:none; overflow:hidden; position:fixed; right:10px; bottom:100px; z-index:500}

.m-catalogid{ display:none}

.showad{  margin: 4px 2px;  background-color: #ffffff; overflow:hidden}
body #icon_0,html #icon_0 { z-index: 9999}

@charset "gb2312";
body,p,ul,dl,h1,h2,h3,h4,h5,h6{margin:0;padding:0;font-weight:normal;}
body{text-align:left;font-size: 12px;padding:0 0 0 0; font-family:"微软雅黑";  background:none; background:#f0f0f0}
li{list-style:none}
input {-webkit-appearance:none;}
a:link{ text-decoration:none}
a,a:visited{text-decoration:none;color:#333;}
.clearfix:after{clear:both;height:0;overflow:hidden;display:block;visibility:hidden;content:"."}
em{ font-style:normal;}
* {	-moz-box-sizing: border-box;-webkit-box-sizing: border-box;	box-sizing: border-box;	-webkit-tap-highlight-color: rgba(0,0,0,0);	-webkit-text-size-adjust: none;}

.g-title{ width:100%; height:44px;border-bottom:1px solid #e5e5e5; display:-webkit-box; overflow:hidden; padding:0 10px; box-sizing:border-box;}
.g-title dt{ width:auto; height:26px; line-height:24px; font-size:20px; font-weight:bold; color:#333;border-left:8px solid #19b5fe; margin:9px 0 0; padding:0 10px; display:block; overflow:hidden}
.g-title dd{ -webkit-box-flex:1; margin:0; text-align:right; display:block; overflow:hidden;}
.g-title dd a{ height:39px; line-height:39px; font-size:14px; font-weight:normal; color:#19b5fe;}


.g-cms-content{ width:100%; background:#fff; padding:15px 15px 0px 15px; overflow:hidden; position: relative;}
.g-cms-content h1{ width:100%; height:auto; line-height:26px; font-size:22px; font-weight:bold; color:#333; text-align:center; display:block; overflow:hidden;margin-bottom:15px; }
.g-cms-content em{ width:100%; height:auto; font-size:14px; font-weight:normal; color:#999; margin:-4px 0px 14px 0; text-align:center; display:block; overflow:hidden}
.g-cms-content .g-cont{ width:100%; height:auto; margin:14px 0 0 0; padding:6px 3px 0 3px; display:block; overflow:hidden;}
.g-cms-content .g-cont p{ width:100%; height:auto; line-height:26px; font-size:16px; font-weight:normal; color:#666; margin:0 0 12px 0; display:block; overflow:hidden}
.g-cms-content .g-cont p img{max-width: 90%;height: auto;margin: 10px auto;display: block;overflow: hidden;border: 1px solid #eee !important;padding: 7px !important;border-radius: 4px; position:inherit }
.g-cms-content .g-cont h3{ width:100%; height:auto; line-height:24px; font-size:16px; font-weight:bold; color:#333; margin:5px 0 0 0; display:block; overflow:hidden}
.g-cms-content .g-cont h4{ width:100%; height:auto; line-height:24px; font-size:14px; font-weight:bold; color:#f00; margin:5px 0 0 0; display:block; overflow:hidden}

.g-cms-content .g-cms-relatedcms{ margin:10px 0 0; padding: 10px;  background: #EFEFEF;  color: #727479; font-size:14px; line-height: 26px; border-radius: 4px;}

.g-cms-content .g-cms-relatedcms .g-cms-game .g-down-information{ background:#efefef}

.g-cms-content .m-hide-cont{ width:100%; height:34px; line-height:34px; border:1px solid #19b5fe; border-radius:4px; font-size:14px; font-weight:bold; color:#19b5fe; text-align:center; display:block; overflow:hidden; margin:5px 0 0 0;}

.g-cms-relatedcms{ width:100%; height:auto; background:#fff;display:block; overflow:hidden; box-sizing:border-box; margin:10px 0 0 0;}
.g-cms-relatedcms .g-cmslist{ width:100%; height:auto; box-sizing:border-box; display:block; overflow:hidden}
.g-cms-relatedcms .g-cmslist li{ width:100%; height:auto; font-size:16px; font-weight:normal; color:#333; padding:10px 10px; border-bottom:1px solid #eaeaea; text-indent:14px; display:block; overflow:hidden; position:relative; zoom:1}
.g-cms-relatedcms .g-cmslist li a{ height:20px; line-height:20px; display:block; overflow:hidden}
.g-cms-relatedcms .g-cmslist li b{ width:4px; height:4px; background:#d2d2d2; display:block; overflow:hidden; position:absolute; left:12px; top:17px;}

/*2016-07-16*/
.g-box{ width:100%; height:auto; background:none; padding:0; display:block; overflow:hidden; box-sizing:border-box;}

.g-cms-down{ margin:0;}
.g-cms-down .m-bgcolor-gray{ background:#efefef;}
.g-cms-down .m-bgcolor-gray:active{ background:#efefef}

.g-cms-game{ width:100%; height:auto; padding:12px; background:#f2f2f2; border-radius:8px;  display:block; overflow:hidden; box-sizing:border-box; position:relative; zoom:1}
.g-cms-game a{ width:100%; height:auto; padding:0 30px 0 0; box-sizing:border-box; display:block; overflow:hidden; text-decoration:none}
.g-cms-game a dl{ width:100%; height:auto; display:-webkit-box; overflow:hidden}
.g-cms-game a dl dt{ width:60px; height:60px; display:block; overflow:hidden}
.g-cms-game a dl dt img{ width:100%; height:60px; border-radius:16px; display:block; overflow:hidden;}
.g-cms-game a dl dd{ width:auto; height:auto; display:block; overflow:hidden; -webkit-box-flex:1; margin:0; padding:0 0 0 10px; box-sizing:border-box;}
.g-cms-game a dl dd strong{ width:100%; height:21px; font-size:16px; font-weight:normal; color:#333; margin:4px 0 0 0; display:block; overflow:hidden; text-decoration:none}
.g-cms-game a dl dd strong span{ color:#999; font-size:12px; font-weight:normal; padding:0 0 0 6px; box-sizing:border-box;}
.g-cms-game a dl dd b{ width:100%; height:auto; font-size:12px; font-weight:normal; color:#999; margin:2px 0 0 0; display:block; overflow:hidden; text-decoration:none}
.g-cms-game a dl dd b img{ height:12px; display:block; overflow:hidden}
.g-cms-game em{ width: 46px; height: 46px; line-height: 36px; font-size: 16px; font-weight:normal; color:#66d105; text-indent: 38px;  background-size: 496px; display:block; overflow:hidden; position:absolute; right:10px; top:25px;}

.g-box{ width:100%; height:auto; background:none; padding:0; display:block; overflow:hidden; box-sizing:border-box;}

.g-game-recomd{ width:100%; height:auto; margin:10px 0 0  0; box-sizing:border-box; display:block; overflow:hidden; background:#fff;}
.g-game-recomd strong{ width:100%; height:auto; font-size:16px; font-weight:normal; color:#333; text-indent:14px; border-bottom:2px solid #eee; padding:10px 0 8px; box-sizing:border-box; display:block; overflow:hidden;}

.g-keyword-btn{ width:100%; height:46px; border-bottom:1px solid #eee; display:-webkit-box; overflow:hidden;}
.g-keyword-btn li{ width:auto; height:46px; padding:0 14px; box-sizing:border-box; display:block; overflow:hidden; position:relative; zoom:1; -webkit-box-flex:1}
.g-keyword-btn li b{ width:100%; height:45px; line-height:45px; font-size:14px; font-weight:normal; color:#333; text-align:center;  box-sizing:border-box; display:block; overflow:hidden;}
.g-keyword-btn .m-hover b{border-bottom:2px solid #19B5FE; color:#19B5FE}
.g-keyword-btn li i{ width:1px; height:16px; background:#ccc; display:block; overflow:hidden; position:absolute; right:0; top:10px;}

.g-keyword-cont{ width:100%; height:auto; display:block; overflow:hidden;}
.g-keyword-cont dl{ width:100%; height:auto; padding: 10px 14px 10px; box-sizing:border-box; display:block; overflow:hidden; position:relative; zoom:1}
.g-keyword-cont dl dt{ width:100%; height:auto; font-size:14px; font-weight:normal; color:#333; display:none; overflow:hidden;}
.g-keyword-cont dl dd{ width:100%; height: 60px; line-height:20px; font-size:12px; font-weight:normal; color:#999; margin:4px 0 0 0; display:block; overflow:hidden}
.g-keyword-cont dl .g-keyword-info{ width:auto; height:auto; margin:0; padding:0; display:block; overflow:hidden; position:absolute; bottom: 0; right: 11px; padding: 5px 6px 6px 69px; background: #fff;}
.g-keyword-cont dl .g-keyword-info a{ width:auto; height:auto; padding: 2px 6px; background:#ffa351; font-size: 12px; font-weight:normal; color:#fff; border-radius:6px; display:block; overflow:hidden; text-decoration:none}
.g-keyword-cont dl .g-keyword-info a:active{ background:#ff5182}
.g-keyword-cont ul{ width:100%; height:auto; padding:0 14px 12px 0; box-sizing:border-box; display:block; overflow:hidden}
.g-keyword-cont ul li{ width:25%; height:auto; padding:14px 0 0 14px; float:left; box-sizing:border-box; display:inline; overflow:hidden;}
.g-keyword-cont ul li a{ width:100%; height:auto; display:block; overflow:hidden}
.g-keyword-cont ul li a img{ width:66px; height:66px; border-radius:16px; margin:auto; display:block; overflow:hidden}
.g-keyword-cont ul li a strong{ width:100%; height:20px; line-height:20px; font-size:14px; font-weight:normal; color:#333; text-align:center; margin:6px 0 0 0; display:block; overflow:hidden; text-indent:0; padding:0; border:0;}

/*影藏导航*/
.g-hide-nav h4{    width: 36px;    height: 45px;    position: absolute;    right: 0;    top: 0;    display: block;    overflow: hidden;}
.g-top-full .m-navshow-btn{ width:36px; height:45px; font-size:0; text-indent:-9999;float:left; margin:0; background:url(/img/custom-icon.png) no-repeat -166px 14px; background-size:400px; display:inline; overflow:hidden}
.g-top-full .m-black{ width:100%; height:100%; background:#000; opacity:0.7; position:fixed; left:0; top:45px; display:none; overflow:hidden; z-index:90;}
.g-top-full .m-hover{ background:url(/img/custom-icon.png) no-repeat -166px -37px #fff;background-size:400px;}
.g-top-full .m-navshow-ul{ width:100%; height:auto; position:absolute; right:0; top:45px; background:#EDEDED; z-index:999; display:none;overflow:hidden; padding:0 0 10px 10px; box-sizing:border-box}
.g-top-full .m-navshow-ul > strong{ width:33.33%; height:auto; padding:10px 10px 0 0; box-sizing:border-box; float:left; display:inline; overflow:hidden; position:relative;zoom:1}
.g-top-full .m-navshow-ul strong a{ width:100%; height:40px; margin:0;background: #fff;padding:0 0 0 25px;border-radius: 6px;box-sizing:border-box; text-align:center; display:block;overflow:hidden;white-space:nowrap; position:relative; zoom:1}
.g-top-full .m-navshow-ul strong a b{width:20px;height:40px;background: url(/img/custom-icon.png) no-repeat 0 -41px;background-size:400px;margin:0;display:inline-block;overflow:hidden;position:absolute;left: 8px;top: 1px;}
.g-top-full .m-navshow-ul strong a strong{width:auto;height: 40px;line-height: 40px; padding:0;font-size:16px;font-weight:normal;color:#333; text-align:center;display:block;overflow:hidden;}
.g-top-full .m-navshow-ul strong nth-child(1) b{ background-position:0 -41px;}
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
.g-top-full .m-navshow-ul strong:nth-child(12) b{ background-position:-85px -355px;}

.m-float{ position:fixed; left:0; top:0; z-index:999}

.g-ad-focus{ width:auto; height:auto; margin:4px 5px; display:block; overflow:hidden;}

mip-fixed mip-gototop{width:40px; height:40px; background:url(https://m.qqtn.com/img/index-icon.png) no-repeat 0 -143px; background-size:600px; border:0; display:block; overflow:hidden; position:fixed; right:-50%; z-index:500}

/*推荐导航*/
.m-class-nav{ padding:0 0 14px 0; margin:0 10px 0 0; box-sizing:border-box; display:none; overflow:hidden;}
.m-class-nav .g-gxhot-nav li { width:20%; height:auto; float:left; padding:10px 0 0 10px; box-sizing:border-box; display:inline; overflow:hidden}
.m-class-nav .g-gxhot-nav li a{ width:100%; height:30px; line-height:30px; font-size:16px; font-weight:normal; color:#555452; text-align:center; background:#d8d8d8; display:block; overflow:hidden; border-radius:6px;}
.m-class-nav .g-gxhot-nav li a:active{ color:#fff; background:#0fafff;}

.m-class-hide{ padding:0 0 12px 0; margin:0 12px 0 0; box-sizing:border-box; display:block; position:relative; zoom:1; z-index:999}
.m-class-hide h4{width:20%; height:auto; padding:0 0 0 12px; box-sizing:border-box;display:block; overflow:hidden; position:absolute; right:0; top:-37px; z-index:999}
.m-class-hide h4 span{ width:100%; height:25px; line-height:25px; font-size:14px; font-weight:normal; color:#555; text-align:center; background:#d8d8d8;  border-radius:4px;}
.m-class-nav .m-classnav-hide{ display:none; overflow:hidden}
.m-class-nav .m-classnav-hide h3{padding-bottom: 0px; padding-top: 10px; color: #999; font-size: 18px; text-align: center; line-height: 40px;  font-weight: bolder;}
.m-class-nav .m-classnav-hide ul{display:block; overflow:hidden}
.m-class-nav .m-classnav-hide ul li { width:25%; height:auto; float:left; padding:10px 0 0 10px; box-sizing:border-box; display:inline; overflow:hidden}
.m-class-nav .m-classnav-hide ul li a{ width:100%; height:30px; line-height:30px; font-size:16px; font-weight:normal; color:#555; text-align:center; background:#d8d8d8; display:block; overflow:hidden; border-radius:6px;}
.m-class-nav .m-classnav-hide ul li a:ctive{ color:#fff; background:#0fafff;}
.f-hide{ display:none}
/* 滑动 */
.g-previmg-box{ width:100%; height:auto; margin-top:10px; box-sizing:border-box; background:#fff; display:block; overflow:hidden}
.g-previmg{     overflow-x: auto;    overflow-y: hidden;    white-space: nowrap;}
.g-previmg .g-previmg-show{ padding-top: 10px;  margin-left:10px; padding-bottom: 10px;}
.g-previmg .g-previmg-show li{     display: inline-block; width: 128px;     margin: 0 10px 0 0px;    white-space: nowrap;    position: relative;    zoom: 1;}
.g-previmg .g-previmg-show li img{ max-width:170px; height:auto; border:1px solid #eee; display:block; overflow:hidden}
.g-previmg .g-previmg-show li a b {    width: 100%;    height: 26px;    background: #000;    opacity: 0.7;    display: block;    overflow: hidden;    position: absolute;    left: 0;    bottom: 0;    z-index: 5;}
.g-previmg .g-previmg-show li a span {    width: 120px;    height: 26px;    line-height: 26px;    font-size: 16px;    font-weight: normal;    color: #fff;    text-align: center;    margin: 0 0 0 4px;    display: block;    overflow: hidden;    position: absolute;    left: 0;    bottom: 0;    z-index: 10;    white-space: normal;}
.g-cms-game{width:100%;height:auto;background:#fff;display:block;overflow:hidden;/* margin: 0px 0 0px 0; */box-sizing:border-box;}
.g-cms-game .g-game{width:100%;height:auto;padding:10px;box-sizing:border-box;background:#FDF7E7;display:-webkit-box;overflow:hidden;}
.g-cms-game .g-game  mip-img { width: auto }
.g-cms-game .g-game img{ width:70px; height:70px; border-radius:16px;}
.g-cms-game .g-game .g-game-top{ width:auto; height:auto; display:block; overflow:hidden;-webkit-box-flex:1}
.g-cms-game .g-game .g-game-top .g-game-top-span{ width:auto; height:auto; display:block; overflow:hidden; -webkit-box-flex:1; padding:0 0 0 14px; margin:0; box-sizing:border-box;}
.g-cms-game .g-game .g-game-top .g-game-top-span strong{ width:100%; height:auto; max-height:40px; font-size:14px; font-weight:normal; color:#333; float:left; margin:4px 0 0; display:inline; overflow:hidden}
.g-cms-game .g-game .g-game-top .g-game-top-span b{ width:100%; height:20px; line-height:20px; float:left; font-size:12px; font-weight:normal; color:#999; box-sizing:border-box; margin:1px 0 0 0; display:inline; overflow:hidden}
.g-cms-game .g-game .m-game-down{width:65px;height:31px; line-height:31px; background:#13b2ff; text-align:center; font-size:12px; font-weight:normal; font-family:"微软雅黑"; color:#fff; display:block; border-radius:4px; overflow:hidden; margin:19px 4px 0 6px }

.g-cms-game .g-game:active{ background:#fdedc3}
.f-hide { display: none }


.m-apptx {	margin-top: 12px;	display: block;    position: relative;    background: url(https://pic1.qqtn.com/qqtn/mb/up/2016-9/20169281936395677_100_100.png) no-repeat 5% center;    background-size: 14% auto;    line-height: 30px;    padding: 15px 80px 15px 22%;    background-color: #fff}
.m-apptx b {    display: block;    color: #fb5161;    font-size: 16px;    font-family: "microsoft yahei";    height: 30px; line-height: 30px;    overflow:hidden;}
.m-apptx i {	display: block;	height: 22px;	line-height: 22px;	 overflow:hidden;	 color: #999;	 font-size: 14px;	 font-style: normal}
.m-apptx_b {    position: absolute;    right: 10px;    top: 24px;    color: #fb5161;    border: #fb5161 1px solid;    border-radius: 5px;    padding: 0 5px;    line-height: 28px;    transition: all .5s; font-size:14px; }

/* 下一页 */
.m-newsnext {width: 90px;border-radius: 30px;margin: 10px auto;text-align: center;font-size: 16px;line-height: 32px;border: #4996ff 1px solid;}
body .m-nexta {color: #4996ff;}
body .mip-showmore-btn {padding: 5px;    line-height: 2.4em;    margin: 5px auto;    width: 80%;    color: #333;    background: #fff;    text-align: center;    border: 1px solid #ccc;    border-radius: 3px; }
body .f-admorediv { background-color: #fff; text-align: center; }
body .mip-showmore-btn-hide{    display: none!important}
/* 放大 */
.mip-txalt-slide {    float: left;    text-align: center;    display: inline-block;    position: relative;}
#mip-txalt-download {    display: block;    color: #fff;    position: fixed;    border: 1px solid #fff;    border-radius: 4px;    text-align: center;    padding: 8px 10px;    z-index: 9999;    margin:auto;    left:0;    right:0;    bottom: 10%;    width: 90px;}
#mip-txalt-appdown {    display: block;    color: #fff;    position: fixed;    border: 1px solid #fff;    border-radius: 4px;    text-align: center;    padding: 8px 20px;    z-index: 9999;    margin:auto;    right:15%;    bottom: 10%;    width: 20%;}
#mip-txalt-close {    background-image: url(/skin/new2016/images/colse.png)!important;    width: 40px;    height: 40px;    background-repeat: no-repeat;    border: none !important;    text-decoration: none !important;    cursor: pointer;
    background-size: contain;    top: 10px;    right: 0;    position: absolute;    z-index: 999;    background-size: 30px 30px;}
#swipebox-download {    display: block;    color: #fff;    position: fixed;    bottom: 10%;    border: 1px solid #fff;    border-radius: 4px;    text-align: center;    padding: 8px 20px;    z-index: 9999;}
.g-nav-list{margin-bottom: 10px;display: block;width: 100%;height: auto;padding: 0 10px 10px 10px;box-sizing: border-box;overflow: hidden; background: #fff}
.g-nav-list li {display: inline;float: left;box-sizing: border-box;width:18%;height: 40px;padding: 10px 0 0 0px;overflow: hidden; margin: 0px 1%;}
.g-nav-list li a {display: block;width: 100%;height:30px;line-height: 30px;background:#f4f4f4;border-radius:4px;text-align: center;color: #333;font-size:16px;}
.g-nav-list li.m-hover a{ background: #19b5fe; color: #fff; }
.g-nav-list li a.hover{ background: #19b5fe; color: #fff;}
#idvmecvzcbox{margin-top:10px;background: #fff; }
.g-headimg{ overflow: hidden; background:#fff; padding: 12px 0px;font-size: 0;overflow-x: scroll;white-space: nowrap;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;}
.g-headimg a{width:175px;-moz-box-sizing: border-box;box-sizing: border-box;margin-right:10px;display: inline-block;padding: 7.5px;border: 1px solid #f3f3f3; border-radius: 4px; position:relative;}
.g-headimg a p{width: 158px;overflow: hidden;font-weight: 400;white-space:initial; position: absolute;background: rgba(0,0,0,0.6); bottom:7.5px; left: 7.5px; }
.g-headimg a img{width: 158px;height: auto;border-radius: 4px;}
.g-headimg-cont .g-headimg-pf a img{width: 158px; height:230px;border-radius: 4px;}
.g-headimg a p strong{font-size: 16px; padding:3px 6px; display: block; height:28px; line-height:22px; font-weight: normal;color: #fff; overflow: hidden;text-align: center;}
.g-headimg a:last-of-type {margin-right: 0;}
.scroll-module span {width:15px;height: 120px;display: inline-block;vertical-align: top;}
/*评论*/
#comment {margin-top: 10px;margin-bottom: 10px}
#view-comment header{background:#fff;}
#comment .fb {display: block; font-size:16px; -webkit-border-radius: 2px;border: 1px solid #ccc;color: #333;-webkit-box-sizing: border-box;line-height: 28px;padding: 10px 5px 10px 46px;position: relative;margin: 8px 10px 0 10px;background: url(/skin/new2016/images/pl.png) 6px 3px no-repeat;box-shadow: 0px 2px 1px #fff,inset 0px 1px 1px rgba(138, 138, 138, 0.2);}
#comment-list {margin: 10px;font-size: 12px;}
#comment-list li {padding: 10px 2px;border-bottom: 1px solid #e6e6e6;line-height: 24px;}
#comment-list li:first-child {border-top:0;}
#comment-list li:last-child {border-bottom: 0;}
#comment #submit {display: none;margin-bottom: 10px;}
.w-text textarea {color: #666;background: #fff;border: 1px solid #ccc;border-radius: 4px;width: 100%;font-size: 16px;-webkit-box-shadow: 0 1px 4px rgba(0,0,0,.1) inset;height: 80px;padding: 5px 10px;line-height: 32px;}
.w-text {margin:0 10px 8px;padding: 15px 0px 0 0;}
.w-button {}
#submit .button {width: 47%;margin-left: 2%;color: #555;height: 32px;border: 1px solid #ccc;-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .06);-moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .06);box-shadow: 0 1px 1px rgba(0, 0, 0, .06);float:left;}
#comment .button {background: #19b5fe;width: 95%;height: 34px;line-height: 34px;text-align: center;font-size: 15px;color: #fff;border-radius: 5px;display: block;margin-right: 1%;margin:12px auto;
font-weight: normal;}
#view-comment .button-status-complete {border-top: 1px solid #e6e6e6;overflow: hidden;text-align: center;position: relative;display: none;padding: 10px 0; background-color: #fff;padding: 0; height: auto;line-height: auto}
#view-comment .button {padding: 0 20px;}
#submit #verify {width: 67%;margin: 0px;background: #ff4d4e; border:0px; height: 30px; line-height: 30px;}
#submit #verify.disable {width: 67%;height: 30px;line-height: 30px;background: #ff4d4e;font-size: 15px;font-weight: normal;font-family: "microsoft yahei";text-align: center;color: #fff;padding: 0;margin: 0;border: 0;float: left;display: inline;overflow: hidden;border-radius: 4px;-webkit-box-flex: 1;}
#comment #cancel {width: 30%;height: 30px;line-height: 30px;background: #ccc;font-size: 14px;font-weight: normal;font-family: "microsoft yahei";text-align: center;color: #fff;padding: 0;margin: 0 0 0 3%;border: 0;float: left;display: inline-block;overflow: hidden;border-radius: 4px;}
#comment-list .user {color: #326eb4;padding-right: 100px;position: relative;margin-bottom: 2px;height: 24px;overflow: hidden; font-size: 15px;}
#comment-list .user time {color: #555;width:220px;height: 24px;overflow: hidden;font-size: 15px;padding-left:10px;}
#comment-list .user i{font-style:normal;position: absolute;right: 0; top: 0; color: #555; font-size: 15px;}
#view-comment footer span { font-size: 15px; }
#comment-list li blockquote{ font-size: 15px; color: #666; }
#comment-list li p{font-size: 15px;color: #666; }
#comment-list li span.u-click{display: block;height: 24px;font-size: 14px;color: #555;text-align: right;}
#comment-list li span.u-click a{margin-left:8px; }
#comment-list li span.u-click a:nth-child(1) {color: #28bd98;}
#comment-list li span.u-click a:nth-child(2) {color: #ff6f6f;}
body .mip-showmore-btn {width:100%;height: auto;line-height: 33px;padding: 5px;border-radius: 4px;font-size: 15px;color: #666;text-align: center;font-weight: normal;margin:0px auto 10px;background: #f6f6f6;border:0px;height: 44px;pointer-events:auto}
body .f-admorediv { background-color: #fff; text-align: center;z-index: 999;height: 53px; width: 100%;pointer-events:auto}
body .f-admorediv .mip-showmore-btn{display: block !important ; }
body .mip-showmore-btn:hover,body .mip-showmore-btn:active { background-color: #fff!important }
body .mip-img-popUp-wrapper img { background-color: #fff }
.f-admorediv .mip-showmore-btn{background: #f6f6f6 ; }
body .mip-showmore-btn:hover, body .mip-showmore-btn:active{background: #f6f6f6 !important ;}
body .g-load-btn .mip-showmore-btn-hide{ display: block !important ; }
body #mip-txalt-overlay{z-index: 99999 !important}
.detail-box{ overflow: hidden;min-height: 680px; }

</style>
</head>

<body>
<mip-cambrian site-id="1549416786514116"></mip-cambrian>
<header class="g-top-full">
	<mip-html-name>
	<a data-type="mip" href="/thememip/gx.html" class="g-back-home" ></a><span class="f-page-title"></span>
	</mip-html-name>
	<div>
    	<a href="https://m.qqtn.com/websousuo.html" ></a>
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
<!--INCLUDE:/skin/gexing/cms_main_gexing2018_mip_{$catalogid}.html-->
<div class="m-class-nav">
    <ul class="clearfix g-gxhot-nav">
        <template type="mip-mustache">
            {{#gxArrayHot}}
            <li><a href="{{url}}" >{{name}}</a></li>
            {{/gxArrayHot}}
        </template>        
    </ul>
    <div class="m-classnav-hide">
        <h3>全部标签</h3>
        <ul class="g-gxhide-nav" >
            <template type="mip-mustache">
                {{#gxArray}}
                <li><a href="{{url}}" >{{name}}</a></li>
                {{/gxArray}}
            </template>
        </ul>
    </div>
</div>

<article class="g-cms-content">
	<h1>{$title}</h1>
	<mip-fy-hits data-hitsurl="https://m.qqtn.com/ajax.asp?Action=4&id=" data-hitsid="{$id}">
    <em><time pubdate="pubdate">日期:{$dateandtime}</time> 作者:{$writer} 人气:<span id="hits">0</span></em>
    </mip-fy-hits>
    <div class="g-cms-relatedcms g-cms-down">
     	<strong>导读：</strong> {$stitle}
    </div>
    	<mip-showmore maxheight='680' animatetime='.5' id="showmore01" bottomshadow='1'>
			<div class="g-cont" id="content">{$mipcontent}</div>
		</mip-showmore>
	    <div class="f-admorediv f-hide-box">
			<div on="tap:showmore01.toggle" data-closetext="点击收起内容" class="mip-showmore-btn">加载全部内容>>><b></b></div>
		</div>
</article>
<mip-ad type="baidu-wm-ext" domain="a1.qqtn.com" token="idvmecvzc" id="idvmecvzcbox">
    <div id="idvmecvzc"></div>
</mip-ad>
<section class="g-cms-relatedcms">
	<dl class="g-title">
    	<dt>相关个性</dt>
        <dd></dd>
    </dl>
    <ul class="g-cmslist">
    	<!--showCmsRes: id in({$mutualitycms}) |id desc|6|99|    	<li><b></b><a data-type="mip" href="/mipc/{id}.html" title="{title}">{title}</a></li>        ||-->
    </ul>
</section>
<div class="g-previmg-box">
	<dl class="g-title">
            <dt>个性精选</dt>
            <dd></dd>
        </dl>  
        <div class="g-headimg g-headimg-pf scroll-module clearfix">
            <span></span>
            	<!--showCmsRes:catalogid = {$catalogid} and MaxCharPerPage=7|dateandtime desc|10|99|<a data-type="mip" href="/mipc/{id}.html" title="{title}" ><mip-img src="{img}"></mip-img><p><strong>{btitle}</strong></p></a>    ||-->
           <span></span>
        </div>
</div>
<mip-qqtn-msg>
<section class="cont g-game-recomd" id="comment">
<dl class="g-title">
        <dt>用户评论</dt>
        <dd></dd>
    </dl>
    <mip-form method="post" url="https://m.qqtn.com/" id="submit" class="post block-txt">
<fieldset class="w-text"><textarea></textarea></fieldset>
<fieldset class="w-button">
<input id="verify" class="button disable" type="submit" value="提交跟贴" hidefocus="true" />
<span id="cancel" class="button">取消</span>
</fieldset>
<input type="hidden" id="app-id" value="{$id}" />
</mip-form>
	<div id="view-comment" class="reviews">
		<div class="post">
			<header><span class="fb">跟帖评论</span></header>
			<ul id="comment-list"></ul>
			<footer class="button-status-complete"><span class="button">更多评论</span></footer>
		</div>
	</div>
</section>
</mip-qqtn-msg>

<div class="f-information" data-id="{$id}" data-path="cms" data-categroyId="{$catalogid}" data-rootid="{$rootid}" data-CommentTpye="1" data-Username="{$username}" data-Type="1" data-DateTime="{$dateandtime}"></div>
<footer>
	<a href="https://www.qqtn.com/?m" >访问电脑版</a> | <a href="https://m.qqtn.com/" >返回首页</a>
</footer>

<mip-fixed type="gototop" class="gototop">
    <mip-gototop threshold='300'></mip-gototop>
</mip-fixed>
<script src="https://mipcache.bdstatic.com/static/v2/mip.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-showmore/mip-showmore.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-accordion/mip-accordion.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-ad/mip-ad.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-stats-baidu/mip-stats-baidu.js" ></script>
<mip-stats-baidu token="36603a3ac67228cfc7686cc8754897ab"></mip-stats-baidu>
<mip-stats-baidu token="{$userbaidutoken}"></mip-stats-baidu>
<script src="https://mipcache.bdstatic.com/static/v1/mip-fixed/mip-fixed.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-fy-hits/mip-fy-hits.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-cambrian/mip-cambrian.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-qqtn-msg/mip-qqtn-msg.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-gototop/mip-gototop.js"></script>
<script src="https://c.mipcdn.com/static/v1/mip-html-name/mip-html-name.js"></script>
<script type="application/ld+json">
    {
        "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
        "@id": "https://m.qqtn.com/mipc/{$id}.html",
        "appid": "1549416786514116",
        "title": "{$title}",
        "images": [
        "{$img}"
       ],
        "pubDate": "{$updatetime}"
    }
</script>
</body>
</html>