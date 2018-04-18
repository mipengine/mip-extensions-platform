# mip-append-video

mip-append-video 实现了一个简单的广告（非必填）+视频的播放器

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-append-video/mip-append-video.js

## 示例

### 带广告的播放
```html
<div class="shipin">
<mip-append-video id="video" ad-src=""
    ad-src-end=""
    poster="http://file.youlai.cn/cnkfile1/M00/00/0E/ooYBAFdfLiGAKRKPAAFPJnnRsBs14.jpeg"
    target-src="//gslb.miaopai.com/stream/zdraxTyRKGqLXS5wU5Kn3w__.mp4">
</mip-append-video>
    <div class="video_logo" id="cnklogo">sss</div>
    <div class="box2 hide"></div>
    <div class="box3 hide">
               <div class="tuijian">
                  <p>向您推荐</p>
                  <p class="close"><a>关闭</a><b></b></p>
               </div>
               <div class="picqu">
                   <a class="pic" href="http://m.youlai.cn/video/article/272742.html">
                       <mip-img class="gaodu" id="gaodu1" src="http://file.youlai.cn/cnkfile1/M00/00/0E/ooYBAFdfLiGAKRKPAAFPJnnRsBs14.jpeg">
                   </a>
                   <a class="pic juli" href="http://m.youlai.cn/video/article/272742.html">
                      <mip-img class="gaodu" src="http://file.youlai.cn/cnkfile1/M00/00/0E/ooYBAFdfLiGAKRKPAAFPJnnRsBs14.jpeg">
                   </a>
               </div>
               <div class="neirong">
                  <a href="http://m.youlai.cn/video/article/272742.html"></a>
                  <a class="juli" href="http://m.youlai.cn/video/article/272742.html"></a>
               </div>
     </div>
     <div class="play hide">继续播放</div>
     <div class="changliang hide">383</div> 
     <div class="changliang1 hide">274176</div>
</div>
<style mip-custom>
	  mip-append-video {
	     width: 100%;
	     position: relative;
	  }
	  video {
	     width: 100%;
	     display: block;
	     background-color: rgb(0, 0, 0);
	  }
	  #video{}
	  .shipin{position:relative; }
	  .box2{width:100%;  position:absolute; background-color:#000000;z-index:5500000000; top:0;opacity: 0.85;}
	  .box3{width:100%;  position:absolute;z-index:5500000001; top:0;}
	  .tuijian{ width:100%; height:45px;}
	  .tuijian p{color:#FFF; font-size:18px; width:30%; float:left; margin-left:15px; line-height:40px;}
	  .tuijian .close{font-size:15px; text-align:center;width: 55px; height: 25px;
	   margin-top: 10px; margin-right:20px; float:right; line-height:25px;
	   border: 1px solid rgba(255, 255, 255, 0.3);border-radius:2px;}
	  .tuijian .close b{display:inline-block; width:12px; height:2px; background:#fff; font-size:0; line-height:0;
	   vertical-align:middle;-webkit-transform: rotate(45deg); margin-left:3px;}
	  .tuijian .close a{color:#fff !important;}
	  .tuijian .close b:after{content:'.'; display:block; width:12px; height:2px;
	  background:#fff;-webkit-transform: rotate(-90deg);}
	  .picqu{ width:90%; margin:0 auto;}
	  .pic{width: 46.7%;  display:inline-block;}
	  .juli{margin-left: 5.2%;}
	  .neirong{width:90%; height:20px; margin:0 auto; margin-top:3px; font-size:14px;}
	  .neirong a{color:#fff; width: 46.7%;  display:inline-block; float:left; overflow:hidden; height:16px;}
	  .play{width:80px; height:30px; background-color:#e2480e; border-radius:15px; bottom:9px;
	   text-align:center; line-height:28px; color:#fff; margin:0 auto; position:absolute; left:50%;
	   margin-left:-40px; z-index:5500000001;}
	   .gaodu{height: 90px; width: 100%;}
	  .hide{display:none;}
	  @media screen and (min-width:300px) and (max-width:374px){
          .play { bottom: 10px;}
		  .gaodu{height:60px; width: 100%;}
	  }
	  @media screen and (min-width:414px) and (max-width:750px){
          .play { bottom: 15px;}
	  }
</style>

## 属性

### ad-src
说明：广告视频的url地址  
必选项：否
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


