# mip-youlai-audio

mip-youlai-audio 有来音频组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-youlai-audio/mip-youlai-audio.js

## 示例

### 有来音频组件
```html
<mip-youlai-audio>
	<div id="containnerBox">
        <div class="containner_box">
           <div class="containner_in">
               <audio class="audiojs" src="//file.youlai.cn/cnkfile1/M00/18/98/o4YBAFn8ShiAXzuAABAmHq1_VkI580.mp3" preload="none"></audio>
               <span class="containner_time">01:15</span>
           </div>
        </div>
    <div> 
</mip-youlai-audio>
```
```style
#containnerBox {
	height:1200px;
}
.containner_in .name {
	margin-top: 7px;
	width: 100%;
	height: 30px;
	overflow: hidden;
	line-height: 30px;
	font-size: 14px;
	color: #333;
}
.containner_box {
	padding: 0 17px;
	margin-bottom: 18px;
}
.containner_time {
	position: absolute;
	bottom: 5px;
	right: 11px;
	line-height: 1;
	font-size: 13px;
	color: #999;
	padding: 5px;
	min-width: 41px;
	height: 22px;
	text-align: right;
}
.audiojs{ margin-top:20px;    box-sizing: border-box;}
.containner_box_top {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
	background-color: #fff;
	box-sizing: border-box;
}
.containner_in {
	position: relative;
}
.audiojs .play {
	background: url(//static.youlai.cn/js/newcommon/audio/answer/player1-pause.gif) 0 0 no-repeat;
}
.audiojs .pause {
	background: url(//static.youlai.cn/js/newcommon/audio/answer/player1-pause.gif) 0 -135px no-repeat;
}
.audiojs .loading {
	background: url(//static.youlai.cn/js/newcommon/audio/answer/player1-pause.gif) 0 -45px no-repeat;
}
.audiojs .error {
	background: url(//static.youlai.cn/js/newcommon/audio/answer/player1-pause.gif) 0 -90px no-repeat;
}
```


