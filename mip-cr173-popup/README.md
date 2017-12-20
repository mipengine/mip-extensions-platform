# mip-cr173-popup

mip-cr173-popup 点击下载按钮弹出推荐内容,IP过滤功能,并没有引入外部JS

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-cr173-popup/mip-cr173-popup.js

## 示例

```html
<mip-cr173-popup>
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
fieldset { border:0px; margin: 0 2px;  padding: 0.35em 0.625em 0.75em;}
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

a,a:visited{text-decoration:none;color:#333;}

#cnzz_stat_icon_3608757{ display:none}
#cnzz_stat_icon_1257189736{ display:none}
div,p,strong,b,em,li,ul,dl,dt,dd{ box-sizing:border-box;}
body{text-align:left;font-size: 12px;padding:0 0 8px 0; background:none; background:#f2f2f2; font-family:arial,"Microsoft YaHei","\5fae\8f6f\96c5\9ed1"; overflow-y: scroll;}

.g-top{ width:100%; height:44px; background:#66d105; box-sizing:border-box; display:block; overflow:hidden; position:relative; zoom:1; padding:0 44px 0 122px;}
.g-top .g-logo{ width:100px; height:auto; display:block; overflow:hidden; position:absolute; left:10px; top:12px;}
.g-top .g-logo img{ width:100%; height:auto; display:block; overflow:hidden}
.g-top form{ width:auto; height:auto; display:-webkit-box; overflow:hidden; margin:8px 0 0 0; float:none; background:none; border:0; border-radius:0;}
.g-top form .search-input{ width:auto; height:28px; line-height:28px; font-size:14px; font-weight:normal; color:#666; text-indent:10px; background:#f7ffef; display:block; overflow:hidden; -webkit-box-flex:1; border:0; padding:0; margin:0; border-radius:4px 0 0 4px; float:none; font-family:"Trebuchet MS", Arial, Helvetica, sans-serif; box-shadow:none; border:0;}
.g-top form .search-button{ width:28px; height:28px; display:block; overflow:hidden; border:0; padding:0; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat 0 -60px #f7ffef; background-size:400px; border-radius:0 4px 4px 0; float:none}
.g-top .g-btn{ float:none;width:44px; height:44px; display:block; overflow:hidden; position:absolute; right:0; top:0; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat 14px 13px; background-size:400px;}

.g-nav{ width:100%; height:40px; border-bottom:1px solid #dcdcdc; background:#fff;box-sizing:border-box; padding:0 44px 0 0; display:-webkit-box;}
.g-nav a{ width:auto; height:40px; line-height:40px; font-size:16px; font-weight:normal; color:#333; text-align:center; display:block; overflow:hidden; -webkit-box-flex:1}
.g-nav b{width:40px; height:40px; display:block; overflow:hidden; position:absolute; right:0; top:44px; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat 14px -105px; background-size:400px;}
.g-nav .m-hover{ background-position:14px -141px}
.g-nav ul{ width:92px; height:0; position:absolute; right:0; top:84px; display:block; overflow:hidden; background:#fff; z-index:999}
.g-nav ul li{ width:100%; height:33px;  display:block; overflow:hidden;}
.g-nav ul li a{ width:100%; height:33px;line-height:33px; font-size:14px; font-weight:normal; color:#333; text-align:center; border-bottom:1px solid #eee;}

.m-nav-float{ position:fixed; top:0; left:0; z-index:9999}
.m-nav-float b{ top:0}
.m-nav-float #m-nav-hide{ position:fixed; top:40px;}

.g-box{ width:100%; height:auto; background:none; padding:0; display:block; overflow:hidden; box-sizing:border-box;}


/*改于2015-12-28*/
.g-show-cont .m-hover{ background-position:56px -151px}

.content p a{ color:#09F; text-decoration:underline}
.content h3{ font-size:16px; color:#f60; font-weight:bold; height:25px; line-height:30px;}
.content p img{ width:90%; height:auto; margin:0 0 0 -2em;}

.g-box .info{ width:100%; height:auto;box-sizing:border-box; padding:10px; background:#fff; display:block; overflow:hidden;}
.g-box .info .pic{ width:100%; height:auto; margin:0; display:-webkit-box; overflow:hidden;}
.g-box .info .pic .ico-wrap{ width:70px; height:70px; display:block; overflow:hidden}
.g-box .info .pic .ico-wrap img{ width:100%; height:70px; border-radius:16px; display:block; overflow:hidden; margin:0; padding:0; max-width:none; max-height:none}
.g-box .info .pic ul{ width:auto; height:auto; margin:0; text-align:left; padding:0 0 0 12px; box-sizing:border-box; display:block; overflow:hidden; -webkit-box-flex:1}
.g-box .info .pic ul li{width:100%; margin:2px 0 0 0;}
.g-box .info .pic ul .ver{ display:none}
.g-box .info .pic ul .cpname{  margin:6px 0 7px 0;}
.g-box .info .pic ul .cpname h1{ width:100%; height:20px; line-height:20px; font-size:18px; font-weight:normal; color:#333; display:block; overflow:hidden}
.g-box .info .pic ul .cpname h1 span{ font-size:14px;}
.g-box .info .pic ul li h1{ font-weight:normal;}
.g-box .info .pic ul li b{ width:50%; height:16px; line-height:16px; font-size:12px; font-weight:normal; color:#999; float:left; margin:2px 0 0 0; display:inline; overflow:hidden}
.g-box .info .pic ul li b a{ color:#1294E4; text-decoration:underline}

#downAddress { width:100%; height:auto; float:left; margin:0; display:inline; overflow:hidden; padding:0; box-sizing:border-box;}
#downAddress .m-down-ul{ width:100%; height:auto; margin:0; box-sizing:border-box; display:block; overflow:hidden; padding:5px 0;}
#downAddress .m-down-ul li{ width:50%; height:auto; padding:10px 0 10px 10px; box-sizing:border-box; float:left; display:inline; overflow:hidden; margin:0;}
#downAddress .m-down-ul li a{ width:100%; height:38px; line-height:38px; background:#66d105; border-radius:6px; font-size:16px; font-weight:normal; color:#fff; text-align:center; display:block; overflow:hidden; margin:0; text-decoration:none}
#downAddress .m-down-ul li  .zanwu {background-color: #ccc;    font-weight: normal;    /* font-size: 14px; */}
#downAddress .m-down-ul li a:active{ background:#00be3a}
#downAddress .m-down-ul .m-down-last{ width:100%;}

/*精品推荐*/
#g-related-box{ display:block;}
#g-related-box .g-game-recomd{ margin:0 0 10px 0; box-sizing:border-box;}
.g-game-recomd{ width:100%; height:auto; margin:10px 0 0  0; box-sizing:border-box; display:block; overflow:hidden; background:#fff;}
.g-game-recomd strong{ width:100%; height:auto; font-size:18px; font-weight:normal; color:#09aa10; text-indent:14px; border-bottom:2px solid #eee; padding:10px 0 8px; box-sizing:border-box; display:block; overflow:hidden; }
.g-related-scroll{ width:100%; height:112px;padding:15px 15px 0 0; box-sizing:border-box; background:#fff; display:block; overflow:hidden;}
.g-down-recomd-game{ width:100%; height:112px;  display:block; overflow:hidden; position:relative; zoom:1;}
.g-down-recomd-game .g-down-recomd-ul{  width:auto; height:auto; position:absolute; top:0; left:0; padding:0 15px 0 0; white-space:nowrap; overflow:hiden; display:block; overflow:hidden}
.g-down-recomd-game .g-down-recomd-ul li{ width:60px; height:auto; display:inline-block; margin:0 0 0 15px; white-space:nowrap; overflow:hidden}
.g-down-recomd-game .g-down-recomd-ul li a{ width:100%; height:auto; display:block; overflow:hidden; text-decoration:none}
.g-down-recomd-game .g-down-recomd-ul li a img{  width:100%; height:auto; border-radius:10px; display:block; overflow:hidden; margin:0 0 0 0;}
.g-down-recomd-game .g-down-recomd-ul li a strong{ width:100%; height:20px; line-height:20px; font-size:14px; font-weight:normal; color:#666; text-align:center; margin:5px 0 0 0; display:block; overflow:hidden; white-space:normal; border:0; padding:0; text-indent:0;}
.g-down-recomd-game .g-down-recomd-ul li a span{width:100%; height:20px; line-height:20px; font-size:12px; font-weight:normal; color:#999; text-align:center; margin:0 0 0 0; display:block; overflow:hidden;}
.g-down-recomd-game .g-down-recomd-ul li a b{ width:80%; height:28px; line-height:26px; font-size:12px; font-weight:normal; color:#ff4000; border:1px solid #ff4000; border-radius:4px;text-align:center; margin:4px auto 0; display:block; overflow:hidden; box-sizing:border-box;}

/*同类游戏*/
.g-rank-ul{ width:100%; height:auto; display:block; overflow:hidden; padding:0 0 0 0; box-sizing:border-box;}
.g-rank-ul li{ width:100%; height:auto; display:-webkit-box; overflow:hidden; background:#fff; padding:0 10px; box-sizing:border-box; position:relative; zoom:1}
.g-rank-ul li i{ width:27px; height:40px; line-height:32px; font-size:14px; font-weight:normal; font-style:normal; color:#fff; text-align:center; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat -377px 0; background-size:496px; display:block; overflow:hidden; position:absolute; left:10px; top:12px;}
.g-rank-ul li .g-a-left{ width:100%; height:auto; display:-webkit-box; overflow:hidden; padding:10px 36px 10px 0; box-sizing:border-box; border-bottom:1px solid #eee;}
.g-rank-ul li .g-a-left mip-img{width: 50px;height: 50px;border-radius: 12px;margin:0 10px 0 0;display:block;overflow:hidden;}
.g-rank-ul li .g-a-left img{width: 50px;height: 50px;display:block;overflow:hidden;}
.g-rank-ul li .g-a-left p{ width:auto; height:auto; display:block; overflow:hidden; -webkit-box-flex:1}
.g-rank-ul li .g-a-left p strong{width:100%;height:20px;line-height:20px;font-size:16px;font-weight:normal;color:#333;margin: 5px 0 0 0;padding:0;text-indent:0;border:0;display:block;overflow:hidden;}
.g-rank-ul li .g-a-left p b{width:100%;height:18px;line-height:18px;font-size: 12px;font-weight:normal;color:#bbb;margin: 5px 0 0 0;display:block;overflow:hidden;}
.g-rank-ul li .g-a-left p b span{ float:left; margin:0 0 0 4px; display:inline; overflow:hidden}
.g-rank-ul li .g-a-left p img{ width:auto; height:14px; display:none; overflow:hidden; margin:4px 0 0 0;}
.g-rank-ul li .g-a-right{width: 36px;height: 36px;line-height: 36px;font-size: 16px;font-weight:normal;color:#66d105;text-indent: 38px;background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat -120px -162px;background-size:382px;display:block;overflow:hidden;position:absolute;right:10px;top: 17px;}
.g-rank-ul li .g-a-right:active{ color:#fff; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat -170px -162px; background-size:382px}

/*其他版本*/
.g-soft-ul{ width:100%; height:auto; display:block; overflow:hidden;}
.g-soft-ul li{ width:100%; height:auto; display:block; overflow:hidden; background:#fff; padding:0 10px; box-sizing:border-box; position:relative; zoom:1}
.g-soft-ul li i{ width:100%; height:1px; background:#eee; display:block; overflow:hidden;}
.g-soft-ul li .g-a-left{ width:100%; height:auto; display:-webkit-box; overflow:hidden; padding:10px 86px 10px 0; box-sizing:border-box;}
.g-soft-ul li .g-a-left mip-img{ width:56px; height:56px; margin:0 10px 0 0; display:block; overflow:hidden;}
.g-soft-ul li .g-a-left img{  display:block; overflow:hidden;}
.g-soft-ul li .g-a-left p{ width:auto; height:auto; display:block; overflow:hidden; -webkit-box-flex:1}
.g-soft-ul li .g-a-left p strong{ width:100%; height:20px; line-height:20px; font-size:16px; font-weight:normal; color:#333; margin:4px 0 0 0; text-indent:0; padding:0; border:0; display:block; overflow:hidden;}
.g-soft-ul li .g-a-left p b{ width:100%; height:auto; line-height:18px; font-size:14px; font-weight:normal; color:#bbb; margin:4px 0 0 0; display:block; overflow:hidden;}
.g-soft-ul li .g-a-left p b img{ width:auto; height:12px; display:inline}
.g-soft-ul li .g-a-right{ width: 73px; height: 30px; line-height: 30px; font-size: 16px; font-weight:normal; color:#66d105; text-indent: 30px; border:1px solid #66d105; border-radius:4px; background: url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat -130px -60px; background-size: 434px; display:block; overflow:hidden; position:absolute; right:10px; top:31px;}
.g-soft-ul li .g-a-right:active{ color:#fff; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat -146px -128px #66d105; background-size:500px}
.g-soft-ul .m-eq3{ margin:10px 0 0 0;}
.g-soft-ul .m-eq3 i{ display:none}
.g-soft-ul li:nth-child(1) i{ display:none}

#screen{ width:auto; height:auto; box-sizing:border-box; background:#fff; margin:5px; display:block; overflow:hidden; position:relative; zoom:1}
#screen .content{ width:100%; height:auto; line-height:28px; padding:0 10px 5px; font: 14px "Helvetica Neue",HelveticaNeue,Helvetica-Neue,Helvetica,'\5fae\8f6f\96c5\9ed1'; color:#333; box-sizing:border-box; background:#fff; display:block; overflow:hidden ; text-transform:capitalize; }
.content p {text-indent:2em;     line-height: 24px;    margin-top: 10px;}
#screen .showbox{ background:#fff;}
.g-cont-tab-btn{ width:100%; height:44px; background:#fff; border-bottom:1px solid #efefef; display:-webkit-box; overflow:hidden;}
.g-cont-tab-btn li{ width:auto; height:44px;  border-right:1px solid #efefef; display:block; overflow:hidden; -webkit-box-flex:1;}
.g-cont-tab-btn li b{ width:100%; height:44px;line-height:44px; font-size:16px; font-weight:normal; color:#333; padding:0 0; margin:auto; text-align:center;display:block; overflow:hidden;}
.g-cont-tab-btn li:nth-child(3){ border:0;}

.g-cont-tab-btn .m-hover b{ height:43px; line-height:43px; color:#66d105; border-bottom:2px solid #66d105}
.g-previmg-box{ width:100%; height:auto; padding:0 5px 0 5px;  box-sizing:border-box; background:#fff; display:block; overflow:hidden}
.g-previmg{     overflow-x: auto;    overflow-y: hidden;    white-space: nowrap;}
.g-previmg .g-previmg-show{}
.g-previmg .g-previmg-show li{     display: inline-block;    margin: 5px 5px 5px 0;}
.g-previmg .g-previmg-show li img{ max-width:170px; height:auto; border:1px solid #eee; display:block; overflow:hidden}
.g-show-cont{ width:60%; height:33px; line-height:33px; font-size:14px; font-weight:normal; color:#666; padding:0; text-align:center; border:1px solid #eee; border-radius:3px; margin: 12px auto; background:#f4f4f4; display:block; overflow:hidden}
#screen .mip-layout-container{ background:#fff; overflow:hidden}
.g-updatetime{ width:100%; height:auto; line-height:20px; padding:10px 10px 0; background:#fff; font-size:12px; font-weight:normal; color:#999; display:block; overflow:hidden; box-sizing:border-box; position:relative; zoom:1}
.g-show-cont span{ color:#555;}
.g-show-cont b{width: 79px;height:19px;display:block;overflow:hidden;position:absolute;font-weight: normal;right:0;font-size: 12px;top:0;background: url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat 54px -115px;background-size:400px;}

.g-keyword-btn{ width:100%; height:46px; border-bottom:1px solid #eee; display:-webkit-box; overflow:hidden;}
.g-keyword-btn li{ width:auto; height:46px; padding:0 14px; box-sizing:border-box; display:block; overflow:hidden; position:relative; zoom:1; -webkit-box-flex:1}
.g-keyword-btn li b{ width:100%; height:45px; line-height:45px; font-size:14px; font-weight:normal; color:#333; text-align:center;  box-sizing:border-box; display:block; overflow:hidden;}
.g-keyword-btn .m-hover b{border-bottom:2px solid #66d105; color:#66d105}
.g-keyword-btn li i{ width:1px; height:16px; background:#ccc; display:block; overflow:hidden; position:absolute; right:0; top:10px;}

.g-keyword-cont{ width:100%; height:auto; display:block; overflow:hidden;}
.g-keyword-cont dl{width:100%;height:auto;padding: 10px 14px 10px;box-sizing:border-box;display:block;overflow:hidden;position:relative;zoom:1;}
.g-keyword-cont dl dt{ width:100%; height:auto; font-size:14px; font-weight:normal; color:#333; display:none; overflow:hidden;}
.g-keyword-cont dl dd{ width:100%; height: 60px; line-height:20px; font-size:12px; font-weight:normal; color:#999; margin:4px 0 0 0; display:block; overflow:hidden}
.g-keyword-cont dl .g-keyword-info{ width:auto; height:auto; margin:0; padding:0; display:block; overflow:hidden; position:absolute; bottom: 0; right: 11px; padding: 5px 6px 6px 69px; background: #fff;}
.g-keyword-cont dl .g-keyword-info a{ width:auto; height:auto; padding: 2px 6px; background:#ffa351; font-size: 12px; font-weight:normal; color:#fff; border-radius:6px; display:block; overflow:hidden; text-decoration:none}
.g-keyword-cont dl .g-keyword-info a:active{ background:#ff5182}
.g-keyword-cont ul{ width:100%; height:auto; padding:0 14px 12px 0; box-sizing:border-box; display:block; overflow:hidden}
.g-keyword-cont ul li{width:25%;height:auto;padding: 10px 0 0 14px;float:left;box-sizing:border-box;display:inline;overflow:hidden;}
.g-keyword-cont ul li a{width: 66px;height:auto;margin: auto;display:block;overflow:hidden;}
.g-keyword-cont ul li a img{width:100%;height: 66px;border-radius:16px;display:block;overflow:hidden;}
.g-keyword-cont ul li a strong{width:100%;height:20px;line-height:20px;font-size:14px;font-weight:normal;color:#333;text-align:center;margin: 2px 0 0 0;display:block;overflow:hidden;text-indent:0;padding:0;border:0;}

#g-keyword .g-game-recomd{ margin:0;}

.relate li{ width:20%;  height:90px; float:left; box-sizing:border-box; z-index:2; position:relative; zoom:1;}
.relate li a{ width:100%; height:100%; font-size:16px; color:#333; text-decoration:none; display:block; overflow:hidden;}
.relate li a mip-img{ width:48px; height:48px; margin:10px auto 0; display:block; overflow:hidden;}
.relate li a img{ width:48px; height:48px;display:block; overflow:hidden;}
.relate li a span{  width:100%; height:14px; line-height:14px; font-size:12px; font-weight:normal; color:#333; text-align:center; display:block; overflow:hidden; margin:4px 0 0 0;}
.relate li a .name{ width:90%; height:20px; line-height:20px; font-size:12px; font-weight:normal; color:#333; text-align:center; display:block; overflow:hidden; margin:4px auto 0;}

.m-mt10{ margin-top:10px}

.m-news li{height: 35px;line-height: 35px;padding:0 3.1%;overflow:hidden;border-bottom:1px solid #e8e8e8;background:url(/skin/new2015/images/dd.png) no-repeat 8px 15px;background-size:3px 3px;font-size: 13px;}
.m-news li a{padding: 0 0 0 8px;}
.m-news li.hui{ background-color:#f1f1f1;}
.g-comment{ padding:0 0px 0;}

/*广告优化+其他优化*/
#cms_install{ width:100%; height:auto; padding:0 10px; display:block; overflow:hidden; box-sizing:border-box}
.showads{ margin:0 0 0 0; display:block; overflow:hidden}
.relate{ background:#fff; margin:0 0 0 0; display:block; overflow:hidden}
.sgroup{ padding:0 10px; box-sizing:border-box;}
.g-relate-cms{ margin:5px 0 0; box-sizing:border-box}
#screen .showbox .showimg{ width:111px;}
#descript{ width:100%; height:auto; box-sizing:border-box; background:none; padding:0px 0px 0; display:block; overflow:hidden}


footer{ padding:0 0 0 0;}

.g-foot-nav{ width:100%; height:40px; background:#EAEAEA; margin:20px 0 0 0; border-top:1px solid #ccc; display:block; overflow:hidden;}
.g-foot-nav .g-foot-nav-ul{ width:100%; height:40px; display:block; overflow:hidden;}
.g-foot-nav .g-foot-nav-ul li{ width:25%; height:40px; border-right:1px solid #ccc;  float:left; box-sizing:border-box; display:inline; overflow:hidden;}
.g-foot-nav .g-foot-nav-ul li a{ width:100%; height:40px;line-height:40px; font-size:12px; font-weight:normal; color:#333; text-align:center; display:block; overflow:hidden; text-decoration:none}
.g-foot-nav .g-foot-nav-ul li a:active{ color:#fff; background:#66d105}
footer{ width:100%; line-height: 46px; background:#EAEAEA;font-size:18px;font-weight:normal; border-top: 1px solid #ccc; color: #ccc; text-align: center;}
footer a{padding: 0 6px; color: #302f2d; font-size:14px; text-decoration:none}
#m-backtop{width:40px; height:40px; background:url(/skin/new2015/images/index-icon.png) no-repeat 0 -143px; background-size:600px; display:none; overflow:hidden; position:fixed; right:10px; bottom:100px; z-index:500}


.g-web-nav{ width:100%; height:auto; padding:0; background:#fff; display:none; overflow:hidden; box-sizing:border-box; position:absolute; left:0; top:44px; box-shadow:1px 2px 2px #ccc; z-index:9999;}
.g-web-nav .g-nav-btn{ width:auto; height:40px; margin:14px; border:1px solid #66d105; border-radius:4px; display:-webkit-box; overflow:hidden}
.g-web-nav .g-nav-btn li{ width:auto; height:40px; line-height:40px; font-size:15px; font-weight:normal; color:#60C505; text-align:center; display:block; overflow:hidden; border-right:1px solid #66d105; -webkit-box-flex:1; display:block; overflow:hidden; cursor:pointer}
.g-web-nav .g-nav-btn li:nth-child(4){ border:0;}
.g-web-nav .g-nav-btn .m-hover{ background:#60C505; color:#fff;}
.g-web-nav .g-nav-ul{ width:100%; height:auto; padding:0 14px 0 0; box-sizing:border-box; display:block; overflow:hidden;}
.g-web-nav .g-nav-ul li{ width:33.33%; height:auto; float:left; padding:0 0 14px 14px; display:inline; overflow:hidden; box-sizing:border-box;}
.g-web-nav .g-nav-ul li a{ width:100%; height:auto; padding:10px; box-sizing:border-box; border:1px solid #d6d6d6; display:block; overflow:hidden;}
.g-web-nav .g-nav-ul li a strong{ width:100%; height:20px; line-height:20px; font-size:14px; font-weight:normal; color:#333; text-align:center; margin:2px 0 0 0; display:block; overflow:hidden}
.g-web-nav .g-nav-ul li a b{ width:100%; height:20px; line-height:20px; font-size:14px; font-weight:normal; color:#999; text-align:center; margin:2px 0 0 0; display:block; overflow:hidden}
.g-web-nav .g-nav-ul li a:active{ background:#60C505; color:#fff; border:1px solid #60C505}
.g-web-nav .g-nav-ul li a:active strong{ color:#fff;}
.g-web-nav .g-nav-ul li a:active b{ color:#fff;}

/*修改于2016-1-11*/
.g-rank-ul li .g-a-left:active{ background:#E0E0E0}
.m-news li:active{ background:#E0E0E0}
#downAddress .m-down-ul li a:active{ background:#0EDB86}

#g-company a{ width:100%; height:auto; font-size:16px; font-weight:normal; color:#333; text-indent:14px; border-bottom:2px solid #eee; padding:10px 0; box-sizing:border-box; display:block; overflow:hidden; position:relative; zoom:1; box-sizing:border-box; background:#fff; position:relative; zoom:1; text-decoration:none}
#g-company a:active{ background:#E0E0E0; text-decoration:none}
#g-company a span{ color:#FF5B73; font-weight:bold;}
#g-company a em{ font-size:12px; font-weight:normal; color:#999; font-style:normal; position:absolute; right:10px; top:10px;}

#g-company .g-soft-ul li .g-a-left{ width:100%; height:auto; display:-webkit-box; overflow:hidden; padding:10px 86px 10px 0; box-sizing:border-box; border:0;}
#g-company .g-soft-ul li .g-a-left img{width: 55px;h;height: 55px;argin:0 10px 0 0;display:block;overflow:hidden;}
#g-company .g-soft-ul li .g-a-left p{ width:auto; height:auto; display:block; overflow:hidden; -webkit-box-flex:1}
#g-company .g-soft-ul li .g-a-left p strong{width:100%;height:20px;line-height:20px;font-size:16px;font-weight:normal;color:#333;margin: 6px 0 0 0;text-indent:0;padding:0;border:0;display:block;overflow:hidden;}
#g-company .g-soft-ul li .g-a-left p b{width:100%;height:auto;line-height:18px;font-size: 12px;font-weight:normal;color:#bbb;margin: 6px 0 0 0;display:block;overflow:hidden;text-indent:0;}
#g-company .g-soft-ul li .g-a-left p b span{ color:#bbb; font-weight:normal}
#g-company .g-soft-ul li .g-a-left p img{width:auto;height:12px;display: none;}
#g-company .g-soft-ul li .g-a-right{width: 36px;height: 36px;line-height: 36px;font-size: 16px;font-weight:normal;color:#66d105;text-indent: 38px;background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat -120px -162px;background-size:382px;display:block;overflow:hidden;position:absolute;right:10px;top: 17px;border:0;text-indent:999px;}
#g-company .g-soft-ul li .g-a-right:active{ color:#fff; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat -170px -162px; background-size:382px}

#m-down-msg .info{ padding:0}
#m-down-msg .info .pic{ padding:10px 10px 0;}

body,td,th {	font-family: arial, "Microsoft YaHei", \5fae\8f6f\96c5\9ed1;}
#details{ width:100%; height:auto; line-height:28px; padding:0 10px 5px; font: 14px "Helvetica Neue",HelveticaNeue,Helvetica-Neue,Helvetica,'\5fae\8f6f\96c5\9ed1'; color:#333; box-sizing:border-box; background:#fff; display:none; overflow:hidden ; text-transform:capitalize; }
#details p {text-indent:2em;     line-height: 24px;    margin-top: 10px;}
#details p a{ color:#09F; text-decoration:underline}
#details h3{ font-size:16px; color:#f60; font-weight:bold; height:25px; line-height:30px;}
#details p img{ width:90%; height:auto; margin:0 0 0 -2em;}
.g-tags-box{width:100%;height:auto;padding: 5px 0px 0;margin: 0;box-sizing:border-box;display:none;overflow:hidden;}
.g-tags-box strong{width:100%;height: auto;line-height:20px;font-size:18px;font-weight:normal;color:#333;display:block;overflow:hidden;padding: 10px 10px 0px;background: #fff;}
.g-tags-box ul{width:100%;height:auto;padding: 4px 10px 0;display:block;overflow:hidden;background: #fff;}
.g-tags-box ul li{ width:100%; height:38px; border-bottom:1px dotted #e1e1e1; display:block; overflow:hidden}
.g-tags-box ul li a{ width:100%; height:auto; display:-webkit-box; overflow:hidden}
.g-tags-box ul li a i{width:0;height:0;border-top: 4px solid transparent;border-bottom: 4px solid transparent;border-left: 4px solid #C5C5C5;display:block;margin: 15px 0 0 4px;overflow:hidden;}
.g-tags-box ul li a p{width:auto;height:38px;line-height:38px;font-size:14px;font-weight:normal;color:#333;margin: 0 0 0 8px;padding:0 10px 0 0;box-sizing:border-box;display:block;overflow:hidden;-webkit-box-flex:1;}
.g-tags-box ul li a b{ width:46px; height:22px; line-height:22px; font-size:14px; font-weight:normal; color:#fff; text-align:center; background:#2ddea2; border-radius:4px; display:block; overflow:hidden; margin:8px 0 0;}

/*新增*/
#f-information{ display:none}
.f-hide{ display:none}
.g-top .g-btn{ float:none;width:44px; height:44px; display:block; overflow:hidden; position:absolute; right:0; top:0; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat 14px 13px; background-size:400px;}
.g-top .f-hideshow-btn{ width:44px; height:44px; float:right; display:inline; overflow:hidden; position:relative; zoom:1}
.g-top .f-hideshow-btn:before{ content:""; width:16px; height:16px; border-radius:33px; border:2px solid #fff; display:block; overflow:hidden; position:absolute; left:12px; top:11px; z-index:50;}
.g-top .f-hideshow-btn:after{ content:""; width:3px; height:10px; border-radius:6px;display:block; overflow:hidden; position:absolute; left:30px; top:25px; z-index:50; transform:rotate(135deg); background:#fff}

.g-top .f-hideshow-cont{ display:none}
.g-top form{ width:auto; height:auto; display:-webkit-box; overflow:hidden; margin:8px 0 0 0; float:none; background:none; border:0; border-radius:0;}
.g-top form .search-input{ width:auto; height:28px; line-height:28px; font-size:14px; font-weight:normal; color:#666; text-indent:10px; background:#f7ffef; display:block; overflow:hidden; -webkit-box-flex:1; border:0; padding:0; margin:0; border-radius:4px 0 0 4px; float:none; font-family:"Trebuchet MS", Arial, Helvetica, sans-serif; box-shadow:none; border:0;}
.g-top form .search-button{ width:28px; height:28px; display:block; overflow:hidden; border:0; padding:0; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat 0 -60px #f7ffef; background-size:400px; border-radius:0 4px 4px 0; float:none}
.g-top .g-btn{ float:none;width:44px; height:44px; display:block; overflow:hidden; position:absolute; right:0; top:0; background:url(http://m.cr173.com/skin/new2016/images/home-icon.png) no-repeat 14px 13px; background-size:400px;}
#screen .g-content-box{ background:#fff; padding:0 0 12px 0;}
#screen .g-content{ width:100%; height:auto; line-height:28px; padding:0 10px 5px; font: 14px "Helvetica Neue",HelveticaNeue,Helvetica-Neue,Helvetica,'\5fae\8f6f\96c5\9ed1'; color:#333; box-sizing:border-box; background:#fff; display:block; overflow:hidden ; text-transform:capitalize; }
#screen .g-content p {text-indent:2em;     line-height: 24px;    margin-top: 15px;}
#screen .g-content-all{ width:100%; height:auto; line-height:28px; padding:0 10px 5px; font: 14px "Helvetica Neue",HelveticaNeue,Helvetica-Neue,Helvetica,'\5fae\8f6f\96c5\9ed1'; color:#333; box-sizing:border-box; background:#fff; display:none; overflow:hidden ; text-transform:capitalize; }
#screen .g-content-all p {text-indent:2em;     line-height: 24px;    margin-top: 15px;}
#screen .g-content-all p a{ color:#09F; text-decoration:underline}
#screen .g-content-all h3{ font-size:16px; color:#f60; font-weight:bold; height:25px; line-height:30px;}
#screen .g-content-all p img{ width:90%; height:auto; margin:0 0 0 -2em;}
#screen .g-show-cont{ width:60%; height:33px; line-height:33px; font-size:14px; font-weight:normal; color:#666; padding:0; text-align:center; border:1px solid #eee; border-radius:3px; margin: 12px auto; background:#f4f4f4; display:block; overflow:hidden}
/*弹层*/
.m-click-show{ width:100%; height:100%; display:none; overflow:hidden; position:absolute; left:0; top:0; z-index:50;}
.m-black-bg{ width:100%; height:100%; background:#000; opacity:0.7; display:block; overflow:hidden; position:absolute; left:0; top:0; z-index:10;}
.m-click-show .m-show-cont{ width:94%; height:auto; max-height:94%; background:#fff; border-radius:6px; padding:0 0 62px; box-sizing:border-box; display:block;overflow-x:hidden; position:absolute; left:3%; top:3%; z-index:20;}
.m-click-show .m-show-cont .g-show-title{width:auto;height:auto;line-height:24px;font-size:15px;font-weight:normal;color:#333;margin: 0px 12px 0;display:block;overflow:hidden;border-bottom:1px solid #eee;padding:2px 0 8px 0;}.m-click-show .m-show-cont .g-show-title p{ width:100%; height:auto; float:left; display:inline; overflow:hidden}.m-click-show .m-show-cont .g-show-title b{ width:auto; height:16px; line-height:16px; font-size:14px; font-weight:normal; color:#999; margin:5px 0 0; float:left; display:inline;overflow:hidden}.m-click-show .m-show-cont .g-show-title b i{ width:16px; height:16px; border:1px solid #ccc; float:left; margin:0 10px 0 0; display:inline;}.m-click-show .m-show-cont .g-show-title b i:before{content: "";transform: rotate(-45deg) translate(-2px,6px);display:block;overflow:hidden;width: 2px;height: 6px;background: #777;}.m-click-show .m-show-cont .g-show-title b i:after{content: "";transform: rotate(45deg) translate(3px,-9px);display:block;overflow:hidden;width: 2px;height: 11px;background: #777;}.m-click-show .m-show-cont .g-show-title em{ float:left; height:16px; line-height:16px; font-size:14px; font-weight:normal; color:#999; float:left; margin:5px 0 0 10px; display:inline; overflow:hidden}.m-click-show .m-show-cont .g-show-title span{ color: #1ADFB2; font-weight:normal}.m-click-show .m-show-cont .g-show-title a{ float:right; font-size:12px; font-weight:normal; color:#999; padding:0 10px 0 0; display:inline; overflow:hidden}.m-click-show .m-show-cont .m-close-btn{ width:auto; height:auto; font-size:30px; font-weight:bold; color:#333; -webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-o-transform: rotate(45deg);-ms-transform: rotate(45deg);transform: rotate(45deg); display:block; overflow:hidden; position:absolute; right:6px; top:0; z-index:30; cursor:pointer}.m-click-show .m-show-cont .m-show-ul{ width:100%; height:auto; display:block; overflow:hidden;}.m-click-show .m-show-cont .m-show-ul li{ width:50%; height:auto; float:left; margin:12px 0 0; display:inline; overflow:hidden;}.m-click-show .m-show-cont .m-show-ul li a{ width:100%; height:auto; display:-webkit-box; overflow:hidden; cursor:pointer; text-decoration:none}.m-click-show .m-show-cont .m-show-ul li a img{ width:60px; height:60px; display:block; overflow:hidden}.m-click-show .m-show-cont .m-show-ul li a p{ width:auto; height:auto; padding:0 0 0 10px; box-sizing:border-box; display:block; overflow:hidden; -webkit-box-flex:1;}.m-click-show .m-show-cont .m-show-ul li a p strong{ width:100%; height:20px; line-height:20px; font-size:14px; font-weight:bold; color:#333; display:block; overflow:hidden}.m-click-show .m-show-cont .m-show-ul li a p em{ width:100%; height:20px; line-height:20px; font-size:12px; font-weight:normal; color:#B5B5B5; display:block; overflow:hidden}.m-click-show .m-show-cont .m-show-ul li a p b{ width:44px; height:20px; line-height:20px; border-radius:2px; background:#70E2BA; font-size:14px; font-weight:normal; color:#fff; text-align:center; display:block; overflow:hidden}.m-hideshow-top{width:100%;height:auto;padding: 0 0 10px 0;display:block;overflow:hidden;box-sizing:border-box;}.m-hideshow-top li{ width:25%; margin-top:17px; float:left; text-align:center;}.m-hideshow-top li a img {     width: 18vw;    height: 10vh;border-radius:6px;margin:0 auto; display:block; overflow:hidden;    min-width: 10vw;}.m-hideshow-top li a strong{width:70px;line-height:14px; height:14px; font-size:14px; color:#151415; font-weight:normal; text-align:center;white-space: nowrap;  text-overflow: ellipsis; display:block; overflow:hidden;margin:0 auto; margin-top:5px; }.m-hideshow-top li b{ width:48px; height:20px; line-height:20px; font-size:13px; font-weight:normal; color:#41C1FA; border:1px #41C1FA solid; border-radius:3px; margin:5px auto 0 auto; text-align:center; display:block; overflow:hidden}.m-hideshow-middle{ width:100%; height:auto; padding:0 12px; display:block; overflow:hidden; box-sizing:border-box;}.m-hideshow-middle li{width:100%;height:auto;padding: 10px 8px;box-sizing:border-box;border-bottom:1px solid #eee;display:block;overflow:hidden;}.m-hideshow-middle li a{ width:100%; height:auto; display:-webkit-box; overflow:hidden;}.m-hideshow-middle li a mip-img{ width:56px; height:56px; margin:0 10px 0 0; display:block; overflow:hidden;}.m-hideshow-middle li a img{ width:56px; height:56px;display:block; overflow:hidden;}.m-hideshow-middle li p{ width:auto; height:56px; display:block; overflow:hidden; -webkit-box-flex:1;}.m-hideshow-middle li p strong{width:100%;height: 20px;line-height: 20px;font-size: 17px;font-weight:normal;color:#333;margin: 6px 0 0;display:block;overflow:hidden;}.m-hideshow-middle li p strong i{width: 18px;height: 18px;line-height: 18px;font-size: 14px;font-weight:normal;color:#fff;text-align:center;font-style:normal;background:#ff0000;float:left;margin: 0px 9px 0 0;display:inline;overflow:hidden;}.m-hideshow-middle li:nth-child(2) p strong i{ background:#ff6430}.m-hideshow-middle li:nth-child(3) p strong i{ background:#f97a4f}.m-hideshow-middle li p em{ width:100%; height:14px; line-height:14px; font-size:12px; font-weight:normal; font-style:normal; color:#0da5ee; margin:7px 0 0; display:block; overflow:hidden} .m-hideshow-middle li p span{width:100%;height:14px;line-height:14px;font-size: 13px;font-weight:normal;color:#999;margin: 8px 0 0;display:block;overflow:hidden;} .m-hideshow-middle li b{ width:54px; height:27px; line-height:27px; font-size:15px; font-weight:normal; color:#41C1FA; text-align:center; border:1px solid #41C1FA; box-sizing:border-box; border-radius:4px; margin-top:14px; display:block; overflow:hidden;}.m-hideshow-middle li:nth-child(3){ border:0}
/*d1*/
#down_d1_1{ width:auto; height:auto; background:#fff; margin:5px 0px 0; padding:0 0 0 10px; box-sizing:border-box; display:block; overflow:hidden}
#down_d1_1 li{    width: 20%;    height: auto;    float: left;    padding: 10px 10px 10px 0;    box-sizing: order-box;    display: inline;    overflow: hidden;}
#down_d1_1 li a{ width:100%; height:auto; display:block; overflow:hidden; text-align: center;}
#down_d1_1 li a img{  display:block; overflow:hidden; margin:auto;border-radius: 12px;}
#down_d1_1 li a h3{width: 100%;    height: 20px;    line-height: 20px;    font-size: 13px;    font-weight: normal;    color: #333;    text-align: center;    display: block;    overflow: hidden;    margin: 4px auto 0;}
/*增加高速下载*/
.addlabel{  width: 40% !important;    display: block;    float: left;       font-size: 15px;    color: #5a5a5a;	}
.addlabel .icon {    width: 19px;    height: 20px;    display: block;    float: left;    background: url(http://m.cr173.com/img/checkbox.png) 0 0px no-repeat;    margin: 2px 6px 0 0;}
.addlabel .checkhover {    background-position: 0px -23px !important;}
#downAddress{ padding:0 10px 0 0;}
.m-down-btn { width: 60% !important; float:left;  height: 43px;  overflow: hidden;  display: block;  text-align: center; line-height: 43px;  font-size: 22px;  color: #fff;  -webkit-border-radius: 3px;  -moz-border-radius: 3px;    border-radius: 3px;}
.highdown{color:#999; padding:10px; font-size: 13px; line-height: 20px;}
.ng-hide { color: #387ab6;border: 1px solid #a8cce2; background-color: #e3f1fa; text-indent:10px; margin:0 0 10px 10px; display:block; overflow:hidden}
.u-wdj-img{width:auto; height:auto; border:1px solid #eee; display:block; overflow:hidden;margin:10px 12px 0;}

/*标签tags*/
.g-theme-ul{ width:auto; height:auto; padding:0 10px 0px 0; background:#fff; margin:0; display:block; overflow:hidden;}
.g-theme-ul li{ width:auto; height:auto; float:left; margin:6px 2px 0 10px; display:inline; overflow:hidden}
.g-theme-ul li a{ width:auto; height:24px; line-height:24px; border:1px solid #d2d2d2; border-radius:2px; font-size:12px; font-weight:normal; color:#666; margin:0 0 0 0; padding:0 8px; text-decoration:none; box-sizing:border-box; display:block; overflow:hidden;}
.g-theme-ul li:nth-child(1) a{ border: 1px solid #E8A6FA; color: #C663E2;}
.g-theme-ul li:nth-child(2) a{ border: 1px solid #B4B3FF; color: #6461FF;}
.g-theme-ul li:nth-child(3) a{ border: 1px solid #7CD2F2; color: #3AAFDA;}
.g-theme-ul li:nth-child(4) a{ border: 1px solid #63EFCA; color: #17C0B3;}

/*选项卡*/
.guess-nav {height: 40px;width: 100%;}
.guess-nav li {display: inline-block;float: left;height: 38px;line-height: 38px;font-size: 14px;text-align: center;overflow: hidden;-webkit-tap-highlight-color: rgba(255,255,255,0);width:25%;}
#wrapert ul .active, #wrapert ul li:active {border-bottom: 1px solid #65bb0a;color: #65bb0a;height: 36px;-webkit-tap-highlight-color: rgba(255,255,255,0);}
.tags-main-box .tit {height: 25px;line-height: 25px;margin: 5px 0;}
.tags-main-box .tit a {height: 25px;line-height: 25px;font-size: 16px;color: #474747;}
.tags-main-box .tit .more {float: right;font-size: 12px;color: #999;}
.tags-main-box .info {color: #999;line-height: 20px;display: -webkit-box;-webkit-line-clamp: 3;max-height:60px;word-wrap: break-word;word-break: break-all;overflow: hidden;text-overflow: ellipsis;-webkit-box-orient: vertical;}
.tags-box{padding:0 10px}
.tags-box-ul li {width: 25%;float: left;margin-top: 8px;}
.tags-box-ul li a {display: block;width: 66px;height: 98px;text-align: center;margin: 0 auto;}
.tags-box-ul li img {width: 66px;height: 66px;text-align: center;float: left;display: block;margin: 0 auto;border-radius: 10px;}
.tags-box-ul li span {clear: both;overflow: hidden;display: block;width: 66px;height: 32px;line-height: 16px;font-size: 12px;color: #000;text-align: center;word-break: break-all;}
#tags-main{margin:0 auto; overflow:hidden;}
.tags-main-ul{ width:100%; max-height:305px; overflow:hidden}
.guess .tags-main-box {overflow:hidden; float:left;}
.guess{ background:#fff}
.f-mg-gl{ display:none}
/*评论*/
#comment {margin-top: 5px}
#view-comment header{background:#fff;}
#comment .fb {display: block;-webkit-border-radius: 2px;border: 1px solid #ccc;color: #333;-webkit-box-sizing: border-box;line-height: 28px;padding: 10px 5px 10px 46px;position: relative;margin: 8px 10px 0 10px;background: url(/skin/new2015/images/pl.png) 6px 3px no-repeat;box-shadow: 0px 2px 1px #fff,inset 0px 1px 1px rgba(138, 138, 138, 0.2);}
#comment-list {margin: 10px;font-size: 12px;}
#comment-list li {padding: 10px 2px;border-bottom: 1px solid #e6e6e6;line-height: 24px;}
#comment-list li:first-child {border-top: 1px solid #e6e6e6;}
#comment-list li:last-child {border-bottom: 0;}
#comment #submit {display: none;margin-bottom: 10px;}
.w-text textarea {color: #666;background: #fff;border: 1px solid #c5c5c5;width: 100%;font-size: 16px;-webkit-box-shadow: 0 1px 4px rgba(0,0,0,.1) inset;height: 80px;padding: 5px 10px;line-height: 32px;}
.w-text {margin: 0 15px 15px;padding: 8px 0px 0 0;}
.w-button {margin: 0 20px;}
#submit .button {width: 47%;margin-left: 2%;color: #555;height: 32px;border: 1px solid #ccc;-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .06);-moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .06);box-shadow: 0 1px 1px rgba(0, 0, 0, .06);float:left;}
#comment .button { display: inline-block;color: #555;height: 32px;border: 1px solid #ccc;-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .06);-moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .06);box-shadow: 0 1px 1px rgba(0, 0, 0, .06);cursor: pointer;line-height: 32px;margin:0 auto; }
#view-comment .button-status-complete {border-top: 1px solid #e6e6e6;overflow: hidden;text-align: center;position: relative;display: none;padding: 10px 0; background-color: #fff}
#view-comment .button {padding: 0 20px;}
#submit #verify {color: #fff;border: 1px solid #94c804;background: #66d105; line-height: 19px;}
#submit #verify.disable {color: #999;background:#fff;border: 1px solid #ccc;}
#comment #cancel {line-height: 30px;text-align: center;vertical-align: top;height: 30px;display: inline-block; margin-left: 5%}
#comment-list .user {color: #65bb0a;padding-right: 100px;position: relative;margin-bottom: 2px;height: 24px;overflow: hidden;}
#comment-list .user time {position: absolute;right: 0;top: 0;color: #a6a6a6;width: 62px;height: 24px;overflow: hidden;}
footer span { font-size: 14px; }
/*04-06*/
.mip-appdl-box{ margin:0; padding:0; background:none; position:relative; left:auto; height:auto;}
.mip-appdl-textbox,.mip-appdl-closebutton{ display:none}
.mip-appdl-downbtn{ width:auto; height:auto; line-height:inherit; position:relative; left:0; right:auto; top:0;}
.a-chuanqi { margin:0 5px;  }
/* 增加库 */
.g-addku {    width: 100%;        overflow: hidden;margin-top: 10px;    max-height: 220px;}
.g-addku h6 { height: 46px; background-color: #fff;    width: 100%;    height: auto;    font-size: 18px;    font-weight: bold;    color: #09aa10;    text-indent: 14px;    border-bottom: 2px solid #eee;    padding: 10px 0;    box-sizing: border-box;    display: block;    overflow: hidden;}
.ad-kucolname { background-color: #fff }
.ad-kucolname p {display:-webkit-box;display:-moz-box;display:box;}
.ad-kucolname p a{ -webkit-box-flex:1.0;-moz-box-flex:1.0;box-flex:1.0;text-align:center;display:block;height:36px;line-height:36px;font-size:16px; }
.ad-kucolname p a:nth-child(6),.ad-kucolname p a:nth-child(7),.ad-kucolname p a:nth-child(8){ display: none }
.ad-kucolname p a i{background:#f90;color:#fff;padding:1px 4px;border-radius:8px;letter-spacing:0.6px;font-size:12px;margin-left:4px;}

.ad-kucolname p a:nth-child(1) {border-bottom: 2px #66d105 solid}
.m-ttdiv {position: relative;  height: 100%; background-color: #fff;    padding-bottom: 5px;}
.m-addkuul {    width: auto;        height: auto;          top: 0px;    left: 0;    white-space: nowrap;    display: block;    overflow: hidden;}

.m-addkuul li{ height: auto;    display: inline-block;    margin: 0 0 0 0;    white-space: nowrap;    padding: 0;    height: auto;    display: inline-block;    margin: 0 0 0 0;     padding: 0;overflow: hidden;white-space: nowrap;}
.m-addkuul li div{white-space:normal; }
.m-addkuul li  span { box-sizing: border-box;   height: 32px;    line-height: 32px;    overflow: hidden;    width: 33.3%;    float: left;    border-bottom: none;    text-align: center;white-space:normal; }
.m-addkuul li  span a {     height: 22px;    line-height: 22px;    overflow: hidden;    font-size: 14px;    display: block;    margin-top: 10px; border-right: 1px #d9d9d9 solid;padding:0 10px;box-sizing: border-box;}
.g-addku .m-scroll-num {    width: 100%;    height: auto;    padding: 8px 0;    position: absolute;    left: 0;    top: 152px;    text-align: center;}

</style>
<div id="downAddress">
            <ul class="m-down-ul">
            	<li class="m-down-last"><a target="_blank" href="http://duokoo.baidu.com/game/?pageid=Hdkicssp&amp;p_tag=1887613" class="span9 m-game-down down" id="address">点击下载</a></li>
            </ul>
        </div>
<ul class="group f-ajul" id="down_d1_1" data-topdateurl="https://aj.cr173.com/"></ul>
<mip-fixed type="top" class="lightbox m-click-show" id="customid">
    <div class="m-show-cont">        
        <strong class="g-show-title">
            <p>大家<span>还下载了</span>这些：</p>
        </strong>        
        <b class="m-close-btn" on="tap:customid.close">+</b>
        <ul class="m-hideshow-top f-tkul"></ul>
    </div>    
    <b class="m-black-bg" on="tap:customid.close"></b>    
</mip-fixed>
<div class="f-information" data-id="566552" data-path="down" data-categroyid="161" data-rootid="13" data-commendid="9, 15" data-system="Android" data-ppaddress="" data-ismoney="1" data-commenttpye="0" data-username="huangkui" data-type="0" data-datetime="2017/8/17" data-comid="0"></div>
<script src="https://c.mipcdn.com/static/v1/mip-fixed/mip-fixed.js"></script>
<div class="f-androidxz-url f-hide">
[151, 156, 158, 159, 160, 161, 162, 163, 164,256, 257, 258, 178, 179, 180, 181, 182, 183, 184, 185, 186, 207, 208,81, 209, 210, 211, 212, 218, 219, 220, 221, 222, 223, 224, 225, 226, 230,237, 238, 239, 240, 241, 308, 309, 310, 311, 328, 322, 323, 324, 325, 326, 329]
</div>
<div class="f-iosxz-url f-hide">
[141, 214, 215, 216, 227, 228, 229, 231, 232, 233, 234,235, 312, 313, 314, 315, 316, 317, 318, 319, 327, 330]
</div>
<div class="f-AppArray f-hide">
[435, 368]
</div>
<div class="f-chars f-hide">
["0","1","2","3","4","5","6","7","8","9","A","B","C","D','E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T','U","V","W","X","Y","Z"]
</div>
<div class="f-webUrl f-hide">
["xz.L5645.net","xz.zj2jy.com","xz.ithaida.com","xz.51sayes.com","xz.dgtzhLszx.com","xz.szcLcsc.com","xz.coybcs1.com","xz.sdhzghc.com","xz.zshwzy.com","xz.hmjade.com","xz.moviece.com","xz.dfmjLpt.com"]	
</div>
<div class="f-noAd f-hide">
["6071.com","1030.apk","duokoo.baidu.com","ugame.uc.cn","ugame.9game.cn","360.cn","ewan.cn","anfan.com","caohua.com","open.play.cn","tj.tt1386.com","http://g.","http://tj.","yiwan.com","x1.241804.com","moban.com","s.qq.com","456.com.cn","xinkuai.com","g.hgame.com","yxgames.com","qianghongbaoyo.com","down1.qianghongbaoyo.com","down2.guopan.cn","dl.guopan.cn","guopan.cn","duowan.com"]
</div>
<div class="f-hzurl f-hide">https://openbox.mobilem.360.cn/channel/getUrl?src=8294770&app=zs</div>
<div class="f-open-eject f-hide">开启弹层</div>
<div class="f-eject-city f-hide">["北京","上海","广州","深圳","武汉"]</div>
<div class="f-azsp-url f-hide">["http://tj.tt1386.com/0005/4299"]</div>
<div class="f-iossp-url f-hide">["http://tj.tt1386.com/0005/4299"]</div>
</mip-cr173-popup>
```




