# mip-html-clickload

mip-html-clickload 获取标签值然后判断

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-html-clickload/mip-html-clickloade.js

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
<link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css">
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
.g-cms-content .g-cont p img{max-width: 90%;height: auto;margin: 10px auto;display: block;overflow: hidden;border: 1px solid #eee !important;padding: 7px !important;border-radius: 4px;}
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
body .mip-showmore-btn {width: 94%;height: auto;line-height: 33px;padding: 5px;border-radius: 4px;font-size: 15px;color: #666;text-align: center;font-weight: normal;margin:0px auto 10px;background: #f6f6f6;border:0px;height: 44px;pointer-events:auto}
body .f-admorediv { background-color: #fff; text-align: center;z-index: 999;height: 53px;position: absolute;    bottom: 0px;    left: 0px;    width: 100%;pointer-events:auto}
body .mip-showmore-btn:hover,body .mip-showmore-btn:active { background-color: #fff!important }
body .mip-img-popUp-wrapper img { background-color: #fff }
.f-admorediv .mip-showmore-btn{background: #f6f6f6 ; }
body .mip-showmore-btn:hover, body .mip-showmore-btn:active{background: #f6f6f6 !important ;}
body .g-load-btn .mip-showmore-btn-hide{ display: block !important ; }
body #mip-txalt-overlay{z-index: 99999 !important}
.detail-box{ overflow: hidden;min-height: 680px; }
.f-cont-bd{ overflow: hidden; }

.g-cms-content .m-show-content{ width:100%; height:auto; margin:0; display:block; overflow:hidden; box-sizing:border-box; position:relative; zoom:1; background:#fff}
.g-cms-content .m-show-content p{ width:94%; height:auto; line-height:33px;padding: 5px; border-radius:4px; font-size:15px;  color:#666; text-align:center; font-weight:normal; margin:5px auto 10px;background: #f6f6f6 ;}
.g-cms-content .g-down-content p img{ max-width:90%; margin:0 0 0 -24px;}
.g-cms-content .m-show-content b{ width:14px; height:14px; background:url(https://m.qqtn.com/img/class-icon2018.png) no-repeat 0 -700px; background-size:700px; display:block; overflow:hidden; position:absolute; left:50%; top:20px; margin:0 0 0 53px; }
.g-cms-content .m-show-content b.u-up{background:url(https://m.qqtn.com/img/class-icon2018.png) no-repeat 0 -728px; background-size:700px;}
.g-cms-content .m-show-content em{ width:14px; height:14px; background:url(https://m.qqtn.com/img/class-icon2018.png) no-repeat 0 -700px; background-size:700px; display:block; overflow:hidden; position:absolute; left:50%; top:20px; margin:0 0 0 53px;}
.g-cms-content .g-down-content a{color: #ff9900;text-decoration: underline;font: 16px "Helvetica Neue",HelveticaNeue,Helvetica-Neue,Helvetica;}
.g-cms-detail{ position:relative; overflow:hidden}
.on-hover::after {
content: "";
position: absolute;
bottom: 0;
display: block;
width: 100%;
height: 3rem;
background: -moz-linear-gradient(to bottom, rgba(255,255,255,0), #fff);
background: -webkit-linear-gradient(to bottom, rgba(255,255,255,0), #fff);
background: linear-gradient(to bottom, rgba(255,255,255,0), #fff);
}

</style>
</head>

<body>
<mip-cambrian site-id="1549416786514116"></mip-cambrian>
<header class="g-top-full">
	<a data-type="mip" href="/thememip/gx.html" class="g-back-home" ></a><span class="f-page-title">腾牛·个性</span>
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
    
    <div class="detail-box">
    	<mip-html-clickload>
	     <mip-qqtn-imgenlarge>
		   <div class="g-cont" id="content"><p>给陌生的你听.</p><p>见之不忘</p><p>未定义</p><p>知足常乐</p><p>不知所措</p><p>回忆 、回不去</p><p>又是一年春风吹</p><p>日落等你回来。</p><p>终于有人爱我了</p><p>别怕！我又不是好人</p><p>忘了有多久</p><p>心在旅途</p><p><span><strong>错把套路当深情</strong></span></p><p>空有执念了残生</p><p><mip-img src="https://pic.qqtn.com/up/2018-11/201811110926444952985.png!360_360" class="mip-element mip-layout-container mip-img-loaded" data-index="0" data-original="https://pic.qqtn.com/up/2018-11/201811110926444952985.png"><img class="mip-fill-content mip-replaced-content" src="https://pic.qqtn.com/up/2018-11/201811110926444952985.png!360_360"></mip-img></p><p>渔歌&nbsp;</p><p>冷訫</p><p>凉兮</p><p>[刺青]</p><p>过分喜欢</p><p>我的爱已过期</p><p>ヅ失溫℡</p><p>不供祖宗</p><p>繁华落幕</p><p>被偏爱的有恃无恐</p><p>等风也等你</p><p>哭瞎</p><p>我的温柔喂过狗</p><p>◇所谓的你</p><p><mip-img src="https://pic.qqtn.com/up/2018-11/201811110927058447874.png!360_360" class="mip-element mip-layout-container mip-img-loaded" data-index="1" data-original="https://pic.qqtn.com/up/2018-11/201811110927058447874.png"><img class="mip-fill-content mip-replaced-content" src="https://pic.qqtn.com/up/2018-11/201811110927058447874.png!360_360"></mip-img></p><p>光線暗的刺眼</p><p>深信不疑</p><p>淡网</p><p>放慢心跳。</p><p>弃忆投明。</p><p>真实的假面</p><p>风吹裤裆毛飞扬</p><p>情到深处人孤独</p><p>深情从来被辜负</p><p>情话太烫嘴</p><p>一生寥寥好幸运遇见你</p><p>柠蓝浅夏</p><p>温酒叙余生</p><p>攒了一身酷</p><p>侧耳听</p><p>女人是用来疼的</p><p>鹿胎、补血颗粒</p><p>心只是飘忽不定</p><p>假情假意假温柔.</p><p>蓝色天空</p><p>年少无知</p></div>
	     </mip-qqtn-imgenlarge>
	     <b class="m-show-content"><p>加载全部内容<b></b></p></b>
	   </mip-html-clickload>
	   
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
<div class="f-gx-data-23 f-hide">
[["https://m.qqtn.com/qm/gexingqm","个性"],["https://m.qqtn.com/qm/shangganqm","伤感"],["https://m.qqtn.com/qm/xingfuqm","幸福"],["https://m.qqtn.com/qm/baqiqm","霸气"],["https://m.qqtn.com/qm/weixinqm","微信"],["https://m.qqtn.com/qm/qinglvqm","情侣"],["https://m.qqtn.com/qm/chaozhuaiqm","超拽"],["https://m.qqtn.com/qm/nanshengqm","男生"],["https://m.qqtn.com/qm/nvshengqm","女生"],["javascript:;","更多"],["https://m.qqtn.com/qm/gexingqm","个性签名"],["https://m.qqtn.com/qm/shangganqm","伤感签名"],["https://m.qqtn.com/qm/chaozhuaiqm","超拽签名"],["https://m.qqtn.com/qm/qinglvqm","情侣签名"],["https://m.qqtn.com/qm/gaoxiaoqm","搞笑签名"],["https://m.qqtn.com/qm/zheliqm","哲理签名"],["https://m.qqtn.com/qm/lizhiqm","励志签名"],["https://m.qqtn.com/qm/aiqingqm","爱情签名"],["https://m.qqtn.com/qm/shilianqm","失恋签名"],["https://m.qqtn.com/qm/jingdianqm","经典签名"],["https://m.qqtn.com/qm/baqiqm","霸气签名"],["https://m.qqtn.com/qm/weimeiqm","唯美签名"],["https://m.qqtn.com/qm/nvshengqm","女生签名"],["https://m.qqtn.com/qm/nanshengqm","男生签名"],["https://m.qqtn.com/qm/koukouqm","扣扣签名"],["https://m.qqtn.com/qm/beishangqm","悲伤签名"],["https://m.qqtn.com/qm/jiemeiqm","姐妹签名"],["https://m.qqtn.com/qm/yingwenqm","英文签名"],["https://m.qqtn.com/qm/biyeqm","毕业签名"],["https://m.qqtn.com/qm/shangxinqm","伤心签名"],["https://m.qqtn.com/qm/haotingqm","好听的"],["https://m.qqtn.com/qm/gerenqm","个人签名"],["https://m.qqtn.com/qm/sinianqm","思念签名"],["https://m.qqtn.com/qm/wuliaoqm","无聊签名"],["https://m.qqtn.com/qm/ftzqm","繁体字"],["https://m.qqtn.com/qm/xinfanqm","心烦签名"],["https://m.qqtn.com/qm/weixinqm","微信签名"],["https://m.qqtn.com/qm/xqbhdqm","心情不好"],["https://m.qqtn.com/qm/fzlqm","非主流"],["https://m.qqtn.com/qm/fanzaoqm","烦躁签名"],["https://m.qqtn.com/qm/xingfuqm","幸福签名"],["https://m.qqtn.com/qm/shiwangqm","失望签名"],["https://m.qqtn.com/qm/qrjqm","情人节"],["https://m.qqtn.com/qm/kaixinqm","开心签名"],["https://m.qqtn.com/qm/wunaiqm","无奈签名"],["https://m.qqtn.com/qm/shiyiqm","诗意签名"],["https://m.qqtn.com/qm/anlianqm","暗恋签名"],["https://m.qqtn.com/qm/fengshouqm","分手签名"],["https://m.qqtn.com/qm/xinleiqm","心累签名"],["https://m.qqtn.com/qm/jianqqm","坚强签名"],["https://m.qqtn.com/qm/nanguoqm","难过签名"],["https://m.qqtn.com/qm/chengsqm","成熟签名"],["https://m.qqtn.com/qm/jiujieqm","纠结签名"],["https://m.qqtn.com/qm/shengqqm","生气签名"],["https://m.qqtn.com/qm/kongjianqm","空间签名"],["https://m.qqtn.com/qm/xuweiqm","虚伪签名"],["https://m.qqtn.com/qm/keaiqm","可爱签名"],["https://m.qqtn.com/qm/tuifeiqm","颓废签名"],["https://m.qqtn.com/qm/yumenqm","郁闷签名"],["https://m.qqtn.com/qm/gufengqm","古风签名"],["https://m.qqtn.com/qm/dengdaiqm","等待签名"],["https://m.qqtn.com/qm/marenqm","骂人签名"],["https://m.qqtn.com/qm/jieriqm","节日签名"],["https://m.qqtn.com/qm/geyanqm","格言签名"],["https://m.qqtn.com/qm/guimiqm","闺蜜签名"],["https://m.qqtn.com/qm/shijuqm","诗句签名"],["https://m.qqtn.com/qm/hxwqm","火星文"],["https://m.qqtn.com/qm/yingyuqm","英语签名"],["https://m.qqtn.com/qm/exoqm","EXO签名"],["https://m.qqtn.com/qm/mingxingqm","明星签名"],["https://m.qqtn.com/qm/chicuqm","吃醋签名"],["https://m.qqtn.com/qm/relianqm","热恋签名"],["https://m.qqtn.com/qm/yijuhuaqm","一句话"],["https://m.qqtn.com/qm/wswqm","无所谓"],["https://m.qqtn.com/qm/youyiqm","友谊签名"],["https://m.qqtn.com/qm/gaoaoqm","高傲签名"],["https://m.qqtn.com/qm/yyqm","YY签名"],["https://m.qqtn.com/qm/danranqm","淡然签名"],["https://m.qqtn.com/qm/guduqm","孤独签名"],["https://m.qqtn.com/qm/jiandanqm","简单签名"],["https://m.qqtn.com/qm/bpqm","被骗签名"],["https://m.qqtn.com/qm/oumeiqm","欧美签名"],["https://m.qqtn.com/qm/srqm","生日签名"],["https://m.qqtn.com/qm/ggjqm","光棍节"],["https://m.qqtn.com/qm/qgqm","情感签名"],["https://m.qqtn.com/qm/wangluoqm","网络签名"],["https://m.qqtn.com/qm/youxiqm","游戏签名"],["https://m.qqtn.com/qm/shuaiqiqm","帅气签名"],["https://m.qqtn.com/qm/weiboqm","微博签名"],["https://m.qqtn.com/qm/geciqm","歌词签名"],["https://m.qqtn.com/qm/xiaoyuanqm","校园签名"],["https://m.qqtn.com/qm/ycqm","原创签名"],["https://m.qqtn.com/qm/guliqm","鼓励签名"],["https://m.qqtn.com/qm/xinsuiqm","心碎签名"],["https://m.qqtn.com/qm/xhylqm","心灰意冷"],["https://m.qqtn.com/qm/xintongqm","心痛签名"],["https://m.qqtn.com/qm/fendouqm","奋斗签名"]]
</div>
<div class="f-gx-name-23 f-hide">腾牛·个性签名</div>
<div class="f-gx-data-9 f-hide">
[["https://m.qqtn.com/bq/weixinbq","微信"],["https://m.qqtn.com/bq/fuhaobq","符号"],["https://m.qqtn.com/bq/gaoxiaobq","搞笑"],["https://m.qqtn.com/bq/koubibq","抠鼻"],["https://m.qqtn.com/bq/baozoubq","暴走"],["https://m.qqtn.com/bq/jgzbq","金馆长"],["https://m.qqtn.com/bq/dtbq","动态"],["https://m.qqtn.com/bq/liaotianbq","聊天"],["https://m.qqtn.com/bq/dmbq","动漫"],["javascript:;","更多"],["https://m.qqtn.com/bq/fuhaobq","符号表情"],["https://m.qqtn.com/bq/weixinbq","微信表情"],["https://m.qqtn.com/bq/gaoxiaobq","搞笑表情"],["https://m.qqtn.com/bq/shbq","手绘表情"],["https://m.qqtn.com/bq/dtbq","动态表情"],["https://m.qqtn.com/bq/baozoubq","暴走表情"],["https://m.qqtn.com/bq/jgzbq","金馆长表情"], ["https://m.qqtn.com/bq/tiebabq","贴吧表情"],["https://m.qqtn.com/bq/dmbq","动漫表情"],["https://m.qqtn.com/bq/liaotianbq","聊天表情"],["https://m.qqtn.com/bq/keaibq","可爱表情"],["https://m.qqtn.com/bq/weisuobq","猥琐表情"],["https://m.qqtn.com/bq/wenzibq","文字表情"],["https://m.qqtn.com/bq/maimbq","卖萌表情"],["https://m.qqtn.com/bq/koubibq","抠鼻表情"],["https://m.qqtn.com/bq/tuxbq","吐血表情"],["https://m.qqtn.com/bq/tuzibq","兔子表情"],["https://m.qqtn.com/bq/gguaibq","搞怪表情"],["https://m.qqtn.com/bq/shengqbq","生气表情"],["https://m.qqtn.com/bq/jingdianbq","经典表情"],["https://m.qqtn.com/bq/yuancbq","原创表情"],["https://m.qqtn.com/bq/jieribq","节日表情"],["https://m.qqtn.com/bq/zhufubq","祝福表情"],["https://m.qqtn.com/bq/baozibq","包子表情"]]
</div>
<div class="f-gx-name-9 f-hide">腾牛·个性表情</div>
<div class="f-gx-data-74 f-hide">
[["https://m.qqtn.com/pf/qlpf","情侣"],["https://m.qqtn.com/pf/nvspf","女生"],["https://m.qqtn.com/pf/nspf","男生"],["https://m.qqtn.com/pf/tmpf","透明"],["https://m.qqtn.com/pf/ktpf","卡通"],["https://m.qqtn.com/pf/dzpf","带字"],["https://m.qqtn.com/pf/ompf","欧美"],["https://m.qqtn.com/pf/mxpf","明星"],["https://m.qqtn.com/pf/wxpf","微信"],["javascript:;","更多"],["https://m.qqtn.com/pf/qlpf","情侣皮肤"],["https://m.qqtn.com/pf/nvspf","女生皮肤"],["https://m.qqtn.com/pf/nspf","男生皮肤"],["https://m.qqtn.com/pf/ktpf","卡通皮肤"],["https://m.qqtn.com/pf/lolpf","LOL皮肤"],["https://m.qqtn.com/pf/tmpf","透明皮肤"],["https://m.qqtn.com/pf/mxpf","明星皮肤"],["https://m.qqtn.com/pf/dzpf","带字皮肤"],["https://m.qqtn.com/pf/gxpf","个性皮肤"],["https://m.qqtn.com/pf/wmpf","唯美皮肤"],["https://m.qqtn.com/pf/fjpf","风景皮肤"],["https://m.qqtn.com/pf/bjpf","背景皮肤"],["https://m.qqtn.com/pf/ompf","欧美皮肤"],["https://m.qqtn.com/pf/wxpf","微信皮肤"],["https://m.qqtn.com/pf/lzpf","励志皮肤"],["https://m.qqtn.com/pf/hspf","婚纱皮肤"],["https://m.qqtn.com/pf/hbpf","黑白皮肤"],["https://m.qqtn.com/pf/xgpf","性感皮肤"]]
</div>
<div class="f-gx-name-74 f-hide">腾牛·个性皮肤</div>
<div class="f-gx-data-18 f-hide">
[["https://m.qqtn.com/ss/sgss","伤感"],["https://m.qqtn.com/ss/xqss","心情"],["https://m.qqtn.com/ss/gxss","搞笑"],["https://m.qqtn.com/ss/jdss","经典"],["https://m.qqtn.com/ss/kjss","空间"],["https://m.qqtn.com/ss/gexingss","个性"],["https://m.qqtn.com/ss/aqss","爱情"],["https://m.qqtn.com/ss/xdss","兄弟"],["https://m.qqtn.com/ss/jrss","节日"],["javascript:;","更多"],["https://m.qqtn.com/ss/tpss","图片说说"],["https://m.qqtn.com/ss/sgss","伤感说说"],["https://m.qqtn.com/ss/xqss","心情说说"],["https://m.qqtn.com/ss/gxss","搞笑说说"],["https://m.qqtn.com/ss/jdss","经典说说"],["https://m.qqtn.com/ss/kjss","空间说说"],["https://m.qqtn.com/ss/gexingss","个性说说"],["https://m.qqtn.com/ss/aqss","爱情说说"],["https://m.qqtn.com/ss/xdss","兄弟说说"],["https://m.qqtn.com/ss/jrss","节日说说"],["https://m.qqtn.com/ss/520ss","520说说"],["https://m.qqtn.com/ss/biyess","毕业说说"],["https://m.qqtn.com/ss/xingfuss","幸福说说"],["https://m.qqtn.com/ss/lizhiss","励志说说"],["https://m.qqtn.com/ss/baqiss","霸气说说"],["https://m.qqtn.com/ss/kaoshiss","考试说说"],["https://m.qqtn.com/ss/zzjdss","致自己说说"],["https://m.qqtn.com/ss/qinglvss","情侣说说"],["https://m.qqtn.com/ss/weixinss","微信说说"],["https://m.qqtn.com/ss/yingwenss","英文说说"],["https://m.qqtn.com/ss/yijuhuass","一句话说说"],["https://m.qqtn.com/ss/fenshouss","分手说说"],["https://m.qqtn.com/ss/xytss","下雨天说说"]]
</div>
<div class="f-gx-name-18 f-hide">腾牛·个性说说</div>
<div class="f-gx-data-20 f-hide">
[["https://m.qqtn.com/tx/qinglvtx","情侣"],["https://m.qqtn.com/tx/nvshengtx","女生"],["https://m.qqtn.com/tx/nanshengtx","男生"],["https://m.qqtn.com/tx/weixintx","微信"],["https://m.qqtn.com/tx/katongtx","卡通"],["https://m.qqtn.com/tx/oumeitx","欧美"],["https://m.qqtn.com/tx/daizitx","带字"],["https://m.qqtn.com/tx/weimeitx","唯美"],["https://m.qqtn.com/tx/baqitx","霸气"],["javascript:;","更多"],["https://m.qqtn.com/tx/qinglvtx","情侣头像"],["https://m.qqtn.com/tx/nvshengtx","女生头像"],["https://m.qqtn.com/tx/nanshengtx","男生头像"],["https://m.qqtn.com/tx/oumeitx","欧美头像"],["https://m.qqtn.com/tx/katongtx","卡通头像"],["https://m.qqtn.com/tx/dongmantx","动漫头像"],["https://m.qqtn.com/tx/weixintx","微信头像"],["https://m.qqtn.com/tx/daizitx","带字头像"],["https://m.qqtn.com/tx/shuaigetx","帅哥头像"],["https://m.qqtn.com/tx/gexingtx","个性头像"],["https://m.qqtn.com/tx/jiemeitx","姐妹头像"],["https://m.qqtn.com/tx/meinvtx","美女头像"],["https://m.qqtn.com/tx/keaitx","可爱头像"],["https://m.qqtn.com/tx/weimeitx","唯美头像"],["https://m.qqtn.com/tx/guimitx","闺蜜头像"],["https://m.qqtn.com/tx/heibaitx","黑白头像"],["https://m.qqtn.com/tx/baqitx","霸气头像"],["https://m.qqtn.com/tx/shanggantx","伤感头像"],["https://m.qqtn.com/tx/wenzitx","文字头像"],["https://m.qqtn.com/tx/gaoxiaotx","搞笑头像"],["https://m.qqtn.com/tx/shuaiqitx","帅气头像"],["https://m.qqtn.com/tx/chaozhuaitx","超拽头像"],["https://m.qqtn.com/tx/changfatx","长发头像"],["https://m.qqtn.com/tx/yijingtx","意境头像"],["https://m.qqtn.com/tx/mingxingtx","明星头像"],["https://m.qqtn.com/tx/koukoutx","扣扣头像"],["https://m.qqtn.com/tx/haokantx","好看的"],["https://m.qqtn.com/tx/fzltx","非主流"],["https://m.qqtn.com/tx/xqxtx","小清新"],["https://m.qqtn.com/tx/zkwtx","重口味"],["https://m.qqtn.com/tx/momotx","陌陌头像"],["https://m.qqtn.com/tx/kongjiantx","空间头像"],["https://m.qqtn.com/tx/lianmengtx","脸萌头像"],["https://m.qqtn.com/tx/quntx","QQ群头像"],["https://m.qqtn.com/tx/sumiaotx","素描头像"],["https://m.qqtn.com/tx/xinggantx","性感头像"],["https://m.qqtn.com/tx/xiongditx","兄弟头像"],["https://m.qqtn.com/tx/dongtaitx","动态头像"],["https://m.qqtn.com/tx/gaoqingtx","高清头像"],["https://m.qqtn.com/tx/exotx","EXO头像"],["https://m.qqtn.com/tx/xiaohaitx","小孩头像"],["https://m.qqtn.com/tx/tiebatx","贴吧头像"],["https://m.qqtn.com/tx/beiyingtx","背影头像"],["https://m.qqtn.com/tx/xiaochoutx","小丑头像"],["https://m.qqtn.com/tx/yytx","YY头像"],["https://m.qqtn.com/tx/weibotx","微博头像"],["https://m.qqtn.com/tx/gufengtx","古风头像"],["https://m.qqtn.com/tx/dongwutx","动物头像"],["https://m.qqtn.com/tx/fengjtx","风景头像"],["https://m.qqtn.com/tx/mengtx","萌头像"],["https://m.qqtn.com/tx/qbantx","Q版头像"],["https://m.qqtn.com/tx/qpztx","强迫症"],["https://m.qqtn.com/tx/sdtx","闪动头像"],["https://m.qqtn.com/tx/ecytx","二次元"],["https://m.qqtn.com/tx/lbxxtx","蜡笔小新"],["https://m.qqtn.com/tx/mhtx","漫画头像"],["https://m.qqtn.com/tx/ytxwztx","樱桃小丸子"],["https://m.qqtn.com/tx/ggtx","搞怪头像"],["https://m.qqtn.com/tx/loltx","LOL头像"],["https://m.qqtn.com/tx/hzwtx","海贼王"],["https://m.qqtn.com/tx/vzcsdtx","V字仇杀队"],["https://m.qqtn.com/tx/kbtx","恐怖头像"]]
</div>
<div class="f-gx-name-20 f-hide">腾牛·个性头像</div>
<div class="f-gx-data-72 f-hide">
[["https://m.qqtn.com/tp/wmtp","唯美"],["https://m.qqtn.com/tp/qinglvtp","情侣"],["https://m.qqtn.com/tp/dmtp","动漫"],["https://m.qqtn.com/tp/omtp","欧美"],["https://m.qqtn.com/tp/mxtp","明星"],["https://m.qqtn.com/tp/jrtp","节日"],["https://m.qqtn.com/tp/meinvtp","美女"],["https://m.qqtn.com/tp/keaitp","可爱"],["https://m.qqtn.com/tp/wxtp","微信"],["javascript:;","更多"],["https://m.qqtn.com/tp/meinvtp","美女图片"],["https://m.qqtn.com/tp/gxtp","搞笑图片"],["https://m.qqtn.com/tp/xgtp","性感图片"],["https://m.qqtn.com/tp/omtp","欧美图片"],["https://m.qqtn.com/tp/sgtp","伤感图片"],["https://m.qqtn.com/tp/mxtp","明星图片"],["https://m.qqtn.com/tp/fjtp","风景图片"],["https://m.qqtn.com/tp/dmtp","动漫图片"],["https://m.qqtn.com/tp/dttp","动态图片"],["https://m.qqtn.com/tp/fzltp","非主流图片"],["https://m.qqtn.com/tp/shuaigetp","帅哥图片"],["https://m.qqtn.com/tp/bjtp","背景图片"],["https://m.qqtn.com/tp/kttp","卡通图片"],["https://m.qqtn.com/tp/hkdtp","好看的"],["https://m.qqtn.com/tp/srkltp","生日快乐"],["https://m.qqtn.com/tp/dwtp","动物图片"],["https://m.qqtn.com/tp/wztp","文字图片"],["https://m.qqtn.com/tp/lztp","励志图片"],["https://m.qqtn.com/tp/xqxtp","小清新"],["https://m.qqtn.com/tp/maomitp","猫咪图片"],["https://m.qqtn.com/tp/sxtp","伤心图片"],["https://m.qqtn.com/tp/bytp","背影图片"],["https://m.qqtn.com/tp/qinglvtp","情侣图片"],["https://m.qqtn.com/tp/sdjtp","圣诞节"],["https://m.qqtn.com/tp/gftp","古风图片"],["https://m.qqtn.com/tp/dztp","带字图片"],["https://m.qqtn.com/tp/bqtp","霸气图片"],["https://m.qqtn.com/tp/wxtp","微信图片"],["https://m.qqtn.com/tp/aqtp","爱情图片"],["https://m.qqtn.com/tp/ngdtp","难过的"],["https://m.qqtn.com/tp/hstp","婚纱图片"],["https://m.qqtn.com/tp/qwtp","亲吻图片"],["https://m.qqtn.com/tp/hbtp","黑白图片"],["https://m.qqtn.com/tp/nvshengtp","女生图片"],["https://m.qqtn.com/tp/gmtp","闺蜜图片"],["https://m.qqtn.com/tp/jrtp","节日图片"],["https://m.qqtn.com/tp/gexingtp","个性图片"],["https://m.qqtn.com/tp/bsdtp","悲伤的"]]
</div>
<div class="f-gx-name-72 f-hide">腾牛·个性图片</div>
<div class="f-gx-data-28 f-hide">
[["https://m.qqtn.com/wm/qinglvwm","情侣"],["https://m.qqtn.com/wm/gexingwm","个性"],["https://m.qqtn.com/wm/nvshengwm","女生"],["https://m.qqtn.com/wm/shangganwm","伤感"],["https://m.qqtn.com/wm/nanshengwm","男生"],["https://m.qqtn.com/wm/weixinwm","微信"],["https://m.qqtn.com/wm/baqiwm","霸气"],["https://m.qqtn.com/wm/haotingwm","好听的"],["https://m.qqtn.com/wm/yingwenwm","英文"],["javascript:;","更多"],["https://m.qqtn.com/wm/nanshengwm","男生网名"],["https://m.qqtn.com/wm/nvshengwm","女生网名"],["https://m.qqtn.com/wm/qinglvwm","情侣网名"],["https://m.qqtn.com/wm/gexingwm","个性网名"],["https://m.qqtn.com/wm/shangganwm","伤感网名"],["https://m.qqtn.com/wm/yingwenwm","英文网名"],["https://m.qqtn.com/wm/koukouwm","扣扣网名"],["https://m.qqtn.com/wm/baqiwm","霸气网名"],["https://m.qqtn.com/wm/jiemeiwm","姐妹网名"],["https://m.qqtn.com/wm/gaoxiaowm","搞笑网名"],["https://m.qqtn.com/wm/lianggzwm","两个字"],["https://m.qqtn.com/wm/sigzwm","四个字"],["https://m.qqtn.com/wm/weimeiwm","唯美网名"],["https://m.qqtn.com/wm/chaozhuaiwm","超拽网名"],["https://m.qqtn.com/wm/guimiwm","闺蜜网名"],["https://m.qqtn.com/wm/fuhaowm","符号网名"],["https://m.qqtn.com/wm/haotingwm","好听的"],["https://m.qqtn.com/wm/ftzwm","繁体字"],["https://m.qqtn.com/wm/fzlwm","非主流"],["https://m.qqtn.com/wm/youxwm","游戏网名"],["https://m.qqtn.com/wm/sangzwm","三字网名"],["https://m.qqtn.com/wm/wugzwm","五个字"],["https://m.qqtn.com/wm/liugzwm","六个字"],["https://m.qqtn.com/wm/keawm","可爱网名"],["https://m.qqtn.com/wm/gufengwm","古风网名"],["https://m.qqtn.com/wm/weixinwm","微信网名"],["https://m.qqtn.com/wm/lizhiwm","励志网名"],["https://m.qqtn.com/wm/qunwm","QQ群网名"],["https://m.qqtn.com/wm/xiongdiwm","兄弟网名"],["https://m.qqtn.com/wm/jingdianwm","经典网名"],["https://m.qqtn.com/wm/wenyiwm","文艺网名"],["https://m.qqtn.com/wm/zhongkouweiwm","重口味"],["https://m.qqtn.com/wm/xingfuwm","幸福网名"],["https://m.qqtn.com/wm/jiandanwm","简单网名"],["https://m.qqtn.com/wm/neihanwm","内涵网名"],["https://m.qqtn.com/wm/yiziwm","一字网名"],["https://m.qqtn.com/wm/xqxwm","小清新"],["https://m.qqtn.com/wm/danshenwm","单身网名"],["https://m.qqtn.com/wm/aiqingwm","爱情网名"],["https://m.qqtn.com/wm/haokanwm","好看的"],["https://m.qqtn.com/wm/shiyiwm","诗意网名"],["https://m.qqtn.com/wm/shangxinwm","伤心网名"],["https://m.qqtn.com/wm/chengshugwm","成熟网名"],["https://m.qqtn.com/wm/yingyuwm","英语网名"],["https://m.qqtn.com/wm/beishangwm","悲伤网名"],["https://m.qqtn.com/wm/youyawm","优雅网名"],["https://m.qqtn.com/wm/senxiwm","森系网名"],["https://m.qqtn.com/wm/exowm","EXO网名"],["https://m.qqtn.com/wm/qiziwm","七字网名"],["https://m.qqtn.com/wm/oumeiwm","欧美网名"],["https://m.qqtn.com/wm/weibowm","微博网名"]]
</div>
<div class="f-gx-name-28 f-hide">腾牛·个性网名</div>

<mip-fixed type="gototop" class="gototop">
    <mip-gototop threshold='300'></mip-gototop>
</mip-fixed>
<script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-accordion/mip-accordion.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-imgenlarge/mip-qqtn-imgenlarge.js"></script>
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
