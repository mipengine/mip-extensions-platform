# mip-bkmy-audio

mip-bkmy-audio 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-bkmy-audio/mip-bkmy-audio.js

## 示例

### 基本用法
```html
<mip-bkmy-audio>

    <div id="audioDiv_1"  class="aDiv2 aud" >
			<audio id="audiomip_1" src="http://v.baikemy.net/audio/2017-11-27/1511769124982.wav" controls="controls" preload hidden></audio>
			<span class="audio_icon"  id="audio_icon_1"></span>
			<span class="play" id="play_1" style="padding-left: 30px;">点击播放</span>
			<span class="audioTime" style="top:7px;font-size: 20px;color: #999999;right: 10px;">2:08</span>
	</div>
	
	 <div id="audioDiv_2"  class="aDiv2 aud" style="margin-top:50px">
			<audio id="audiomip_2" src="http://v.baikemy.net/audio/2017-11-27/1511769124982.wav" controls="controls" preload hidden></audio>
			<span class="audio_icon"  id="audio_icon_2"></span>
			<span class="play" id="play_2" style="padding-left: 30px;">点击播放</span>
			<span class="audioTime" style="top:7px;font-size: 20px;color: #999999;right: 10px;">5:21</span>
	</div>
</mip-bkmy-audio>
```

