# mip-rich-video
mip-rich-video 实现了一个带前贴片后贴片广告和播放完推荐的视频播放器

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-rich-video/mip-rich-video.js

## 示例

### 带广告的播放
```html
<mip-rich-video ad-src="https://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    ad-src-end="https://img.vodjk.com/templates/vodjk/images/ad-shipin/ad-pc-qfk.mp4"
    poster="https://upload.vodjk.com/2016/0930/1475202927645.jpg"
    target-src="https://dianbo.vodjk.com/vod/xinma/jbl/wgk/2016/04/20/499DBA6FFCD74fc195C4C59859BDA08C.mp4">
</mip-rich-video>
``` 

## 属性

### ad-src
说明：广告视频的url地址  
必选项：是
类型：string

### ad-src-end
说明：目标视频播放完毕之后的广告url地址
必选项：否
类型：string

### target-src
说明：视频的url地址    
必选项：是  
类型：string

### poster
说明：视频的封面图片    
必选项：是  
类型：string

## 注意事项  
不带广告的播放器,请使用 mip-video
