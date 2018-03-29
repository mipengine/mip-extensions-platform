# mip-praise

mip-praise 带有参数的点赞功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-praise/mip-praise.js

## 示例

### 带广告的播放
```html
<mip-praise class="praise"><span></span></mip-praise>
<div class="constants hide">267555</div>
``` 
```style
<style mip-custom>
	 .hide{display:none;}
	 .praise{width:49px; height:49px; margin-left:60px; background:url(https://static.youlai.cn/images/cnkang/mob/video/zanicon.png); color:#FFF;}
	 .praiseon{background:url(https://static.youlai.cn/images/cnkang/mob/video/zaniconon.png); width:45px;height:47px;}
	 .praise span{color:#666; display:inline-block; float:left; margin-left:-60px; width:60px; height:50px; padding-left:10px; line-height:60px;
	  font-size:20px;}
</style>

## 属性

### span
说明：放点赞数。 



