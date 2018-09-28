# mip-djcars-home

mip-djcars-home 组件说明
大家车言论自定义组件

标题|内容
----|----
类型|djcars 自定义组件
所需脚本|https://c.mipcdn.com/static/v1/mip-djcars-home/mip-djcars-home.js

## 示例

### 基本用法
```html

<!doctype html>
<html mip>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no,initial-scale=1, maximum-scale=1, minimum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>大家车问-阿伟203659专家主页</title>
    <link rel="stylesheet" type="text/css" href="https://c.mipcdn.com/static/v1/mip.css">
    <link rel="canonical" href="https://example.com">
    <link rel="stylesheet" href="https://bdapi-beta.djcars.cn/public/css/style.css">
    <style mip-custom>
        .loadingDiv {width: 100%;height:25px;text-align: center;overflow:hidden;}
        .loadingSpan {font-size: 12px;height: 25px;line-height: 25px;overflow: hidden;}
    </style>

</head>
<body>
<mip-djcars-home>
<mip-fixed class="user-dialog">
    <div class="user-dialog-box">
        <div class="user-dialog-title">温馨提示</div>
        <div class="user-dialog-content" id="collectText">
            确定收藏这位专家?
       </div>
        <div class="user-dialog-footer">
            <button class="user-dialog-footer-btn" id="no">取消</button>
            <button class="user-dialog-footer-btn" id="yes">确认</button>
        </div>
    </div>
</mip-fixed>
<header>

    <div class="user-header-block1">
        <div class="user-header-imgBox">
            <mip-img class="user-header-img" src="https://oss.image.test.djcars.cn/7/971ebd17-97f1-4826-9b7e-af96ebf0071e.jpeg"></mip-img>
        </div>
        <div class="user-header-right">
            <div class="user-header-block2">
                <div class="user-header-name">阿伟203659</div>
                    <div id="collect" class="user-header-btn  icon-line-star">
                        收藏</div>
            </div>

            
                <div class="user-header-content text-hidden-3" name="content_1_203659">u我默默少时诵诗书所所所所所所所少时诵诗书所所所所所所所谁谁谁三生三世所今天天少时诵诗书所所所所所所所所所谁谁谁三生三世所天气很好一二三四五六七少时诵诗书所所所所所所所所少时诵诗书所所所所所所所所所谁谁谁三生三世所所所少时诵诗书所所所所所所所少时诵诗书所所所所所所所所所所所所所少时诵诗书所所所所所所所所</div>
                <span class="user-list-text-hide" id="isShowOrHide_1_203659">展开</span>
            
            
        </div>
    </div>
    <div class="user-header-nav">
        <div class="user-header-nav-item">
            <div class="user-header-nav-text1">500</div>
            <div class="user-header-nav-text2">咨询人数</div>
        </div>
        <div class="user-header-nav-item">
            <div class="user-header-nav-text1">454</div>
            <div class="user-header-nav-text2">收藏人数</div>
        </div>
    </div>
</header>
<script src="https://c.mipcdn.com/static/v1/mip.js"></script>
<section>
    <div class="user-list-title">历史回答</div>
    <div id="con">
<div class="user-list">
    <div class="user-list-user">
            <mip-img class="user-list-userImg" src="https://wx.qlogo.cn/mmopen/vi_32/S6h3pRIScQsRGC209qkM1TFy4bNqRakxkVIgNNevdEyHt1AoBdwDsD4VryQcpMKYicHtZxXRgdDftcvjadK4x7Q/132"></mip-img>
        <div class="user-list-userName">
            温小朋203498
            
        </div>
    </div>
    <div class="user-list-text1">问题价值1.0元<span class="user-list-pad">264人围观</span></div>
        <div class="user-list-text2">问题描述：感情的事，不能勉强，要想人不知除非己莫为
        </div>
            <div class="user-list-audio">
                <mip-audio width="140px" height="19px" src="https://voice-beta.djcars.cn/1/4c356e69-7ef7-48ff-88dd-a86eb8f56d0b.mp3">
                    <div controller>
                        <label play-button id="audio-play-btn_1_15337998504590058">
                            <i class="user-list-audio-icon"></i>
                            <span class="user-list-audio-text1">点击播放</span>
                        </label>
                        <span class="user-list-audio-text2">00:07</span>
                        <div seekbar class="display-none">
                            <div seekbar-fill></div>
                            <div seekbar-button></div>
                        </div>
                        <div current-time class="display-none">00:00</div>
                        <div total-time class="color-gray">--:--</div>
                    </div>
                </mip-audio>
            </div>
    <div class="user-list-text1">大家车问<span class="user-list-pad">1月前</span></div>
</div>
<div class="user-list">
    <div class="user-list-user">
        
        
            
            <mip-img class="user-list-userImg" src="https://wx.qlogo.cn/mmopen/vi_32/S6h3pRIScQsRGC209qkM1TFy4bNqRakxkVIgNNevdEyHt1AoBdwDsD4VryQcpMKYicHtZxXRgdDftcvjadK4x7Q/132"></mip-img>
            
           
        
        <div class="user-list-userName">
            
            
            温小朋203498
            
        </div>
    </div>
    <div class="user-list-text1">问题价值1.0元<span class="user-list-pad">86人围观</span></div>
    
    
        <div class="user-list-text2">问题描述：问啊伟，图文回复长一点看看问啊伟，图文回复长一点看看问啊伟，图文回复长一点看看问啊伟，图文回复长一点看看问啊伟，图文回复长一点看看问啊伟，图文回复长一点看看榴莲
        </div>
    <div class="user-list-textBox">
        
            <div class="user-list-text2 text-hidden-3" name="content_1_15337137821820330">问题回答：好的，谢谢奇怪的人生，看不到图，我是一个粉刷匠啦啦啦啦啦了，文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字回答文字文字回答文字回答文字回答文字回答</div>
            <span class="user-list-text-hide" id="isShowOrHide_1_15337137821820330">展开</span>
    </div>
    <div class="user-list-text1">大家车问<span class="user-list-pad">1月前</span></div>
</div>
    </div>
</section>

<!--加载中-->
<div class="loadingDiv" id="loading">
    <span class="loadingSpan"></span>
</div>

<footer>
    <a class="btn-ask" data-type="mip" data-title="" href="https://m.baidu.com/sf?pd=autocar&amp;openapi=1&amp;from_sf=1&amp;resource_id=5078&amp;&amp;title=百度汽车百度汽车问答&amp;atn=index&amp;vn=autocar&amp;vn_type=choose">立即提问</a>
    <div class="btn-ask-holder"></div>
</footer>
<label name="{&quot;isFollow&quot;:0,&quot;total&quot;:116,&quot;kolId&quot;:203659,&quot;sessionId&quot;:&quot;f60af595ac9b4df35636e420b4a53d16&quot;,&quot;userId&quot;:203987}" id="jsonText" class="display-none"></label>
</mip-djcars-home>
<script src="https://c.mipcdn.com/static/v1/mip-audio/mip-audio.js"></script>

</body>
</html>
```


## 注意事项

