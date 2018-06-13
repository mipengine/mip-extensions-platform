# mip-ys137-video

mip-ys137-video 自适应视频播放器

标题|内容
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/extensions/platform/v1/mip-ys137-video/mip-ys137-video.js

#adHTML,start_date,end_date,keyword,path,defaultHTML

## 示例

### 使用
```html
<mip-ys137-video
 start-ad='https://v.ys137.com/f302d1f14596457fbd0130d431efb430/c6857810da2f4a989c530b15e3935b56-40c456e02d1bd0cf45ba9126d4848459-od-S00000001-200000.mp4'
 end-ad='https://v.ys137.com/f302d1f14596457fbd0130d431efb430/c6857810da2f4a989c530b15e3935b56-40c456e02d1bd0cf45ba9126d4848459-od-S00000001-200000.mp4'
 poster='https://v.ys137.com/3a29fe8853194452b192bb047cc9b50e/covers/ae628ca3cda546709dfdb69c3f3b22e0-00005.jpg'
 src='https://v.ys137.com/3a29fe8853194452b192bb047cc9b50e/3961df7bb1d54f6d8dceaee3b20894fa-40c456e02d1bd0cf45ba9126d4848459-od-S00000001-200000.mp4'>
</mip-ys137-video>
```

## 属性

### start-ad

说明：视频播放开始时广告视频链接
必选项：否
类型：字符串
取值范围：无
默认值：''

### end-ad

说明：视频结束播放时的广告视频链接
必选项：否
类型：字符串
取值范围：无
默认值：''

### poster

说明：视频封面
必选项：否
类型：字符串
取值范围：无
默认值：''

### src

说明：视频链接
必选项：否
类型：字符串
取值范围：无
默认值：''

