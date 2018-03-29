# mip-pop-video
mip-pop-video 播放完成后带弹出层的视频播放器

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-pop-video/mip-pop-video.js
## 示例	 

### 带弹层的播放
```html
<mip-pop-video pop-selecter="#end-pop" pause-pop
    poster="http://upload.vodjk.com/2016/0930/1475202927645.jpg"
    v-src="https://gslb.miaopai.com/stream/h7Bl6r2havigFyILBt2vschzfqqRB97L.mp4?ssig=b54fd220dfd24fe6cb9bf5f07d72b904&time_stamp=1498546980748&cookie_id=&vend=1&os=1&partner=1&platform=2&cookie_id=&refer=miaopai&scid=h7Bl6r2havigFyILBt2vschzfqqRB97L">
</mip-pop-video>
<section id="end-pop" style="display:none;">
    123123123i <i class="close-but">关闭</i>
    123123123i <i class="continue-but">继续</i>
</section>
``` 

## 属性

### v-src
说明：视频的url地址  
必选项：是
类型：string

### pop-selecter
说明：目标视频播放完毕之后弹出层的queryselecter
必选项：是
类型：string

### pause-pop
说明：视频暂停是否弹窗  
必选项：否
默认：否  
类型：string

## 注意事项  
不带弹层的播放器,请使用 mip-video
