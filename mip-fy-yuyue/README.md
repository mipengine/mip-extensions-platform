# mip-fy-yuyue
功能介绍：1.无下载资源的情况，同平台显示预约，非同平台显示暂无对应平台。2.针对PC端的资源(下载资源是.exe和.zip)。判断分类，有对应安卓和苹果资源下载的时候，给出对应的提示，没有对应安卓苹果资源的时候给出没有对应资源的提示


标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-fy-yuyue/mip-fy-yuyue.js
## 示例

### 基本用法
```html





<mip-ychlyxgs-data>
<mip-ychlyxgs-adddata>
<mip-cr173-downthe data-downurl="https://m.cr173.com" data-sourl="https://so.cr173.com">
<div class="g-top">
    <a href="https://m.cr173.com/" class="g-logo"><mip-img src="https://m.cr173.com/skin/new2015/images/home-logo.png"></mip-img></a>    
        <section class="f-showhide-function">           
           <div class="f-hideshow-cont">
                <mip-form method="post" class="m-soudiv" url="https://so.cr173.com">
                    <input class="search-input" type="text" name="q" placeholder="请输入关键字">
                    <p class="search-button"></p>
                </mip-form>
            </div>
        </section>
    <b class="g-btn" data-num="0"></b>
</div>
<div class="g-nav">
    <ul>
        <li><a href="https://m.cr173.com/">首页</a></li>
        <li><a href="https://m.cr173.com/glist.html">游戏</a></li>
        <li><a href="https://m.cr173.com/nlist.html">软件</a></li>
        <li><a href="https://m.cr173.com/grankall.html">排行</a></li>
        <li><a href="https://m.cr173.com/znyj.html">智能</a></li>
        <li><a href="https://m.cr173.com/topic.html">专题</a></li>
        <li><a href="https://m.cr173.com/game_cms.html">资讯</a></li>
        <li><a href="https://m.cr173.com/complist.html">厂商</a></li>
    </ul>
</div>
<mip-fy-yuyue data-nodownurl="https://m.cr173.com" data-color="#66d105" data-id="606563" data-yuyueurl="https://www.cr173.com">
<mip-qqtn-shield data-shield="cr173">   
<div class="g-box m-down-msg f-yydiv" id="m-down-msg">
    <header class="info">
        <div class="pic">
            <div class="ico-wrap middle">
                <mip-img class="ico f-game-img" src="https://pic.cr173.com/up/2017-10/201710121016484958.jpg!100_100" alt="2017最新0一17岁身高表含体重"></mip-img>
            </div>
            <ul>
                <li class="cpname"><h1 class="f-game-h1">2017最新0一17岁身高表含体重<span>最新版</span></h1></li><li class="type"><b>大小：<span class="f-game-size">526KB</span></b><b>更新：2017-10-12</b></li><li class="ver" >最新版</li><li class="type"><b>类别：<a href="https://m.cr173.com/x/catalogid/153/0/0/">电子资料</a></b><b class="f-tags-system">系统：WinAll</b></li>
            </ul>
        </div>
        <div id="downAddress">
            <ul class="m-down-ul f-downbtn-url">
                <li class="m-down-last"><a href="http://xcy.xiaoshikd.com//2017zx017ssgbhtz.zip" class="span9 m-game-down down f-eject-btn" data-flag="downbtn" id="address">点击下载</a></li>
            </ul>
        </div>
    </header>
</div>

<div class="g-recomd-game f-recomd-top"></div>
<section id="screen" class="g-game-msg f-tags-position">
    <div class="g-previmg-box">
        <div class="g-previmg plist" id="g-previmg">
            <ul class="g-previmg-show f-previmg-cont">
                <li><mip-img src="https://pic.cr173.com/up/2017-10/201710121017264674.jpg!320_500" popup></mip-img></li>
            </ul>
        </div>
    </div>
    <ul class="g-theme-ul">
    
    </ul>
    <mip-down-hideshow hsId="2">
        <div class="content f-maincms-cont" id="summary"><p>2017最新0一17岁身高表含体重是一份2017年1—18岁男女孩最新身高标准表大全，2017最新孩子1~18岁身高发育对照表，快来测测娃儿能长多高，遗传学中表明，孩子的身高有35%遗传于爸爸，有30%遗传于妈妈，剩下的30%来自后天因素，如饮食、行为习惯等。计算公式以下是遗传学上的男女身高计算公式，大家可以通过这个公式，计算出孩子成年后的平均身高。体重身高如果你家孩子的遗传身高不太理想，你也不必</p></div>
        <div id="details"><p><strong>2017最新0一17岁身高表含体重</strong>是一份2017年1—18岁男女孩最新身高标准表大全，2017最新孩子1~18岁身高发育对照表，快来测测娃儿能长多高，遗传学中表明，孩子的身高有35%遗传于爸爸，有30%遗传于妈妈，剩下的30%来自后天因素，如饮食、行为习惯等。</p><h3>计算公式</h3><p>以下是遗传学上的男女身高计算公式，大家可以通过这个公式，计算出孩子成年后的平均身高。</p><p ><mip-img src="http://t10.baidu.com/it/u=2921085414,304058855&fm=173&s=8967CF140BEEC4CC5E42EC520300C0FB&w=640&h=656&img.JPEG"></mip-img></p><h3>体重身高</h3><p>如果你家孩子的遗传身高不太理想，你也不必灰心，可别忘了还有30%的后天因素呢！当然，要想让孩子长得更高，更帅气、漂亮，这就需要爸爸妈妈们帮助孩子养成良好的生活作息习惯、饮食习惯了。</p><p ><mip-img src="https://pic.cr173.com/up/2017-10/15077747983269330.JPEG!360_360"></mip-img></p><p>孩子小学1~6年级是生长发育的黄金期，生长激素分泌旺盛，特别是在晚上9点到凌晨2点之间属于生长激素的分泌高峰期，因此家长们最好让孩子在九点前入睡，让孩子养成早睡的好习惯。</p><p ><mip-img src="https://pic.cr173.com/up/2017-10/15077748055512052.JPEG!360_360"></mip-img></p><p>此外，家长朋友们还要注意孩子的饮食营养、体育锻炼。很多孩子有偏食、挑食的坏毛病，家长们应及时纠正，必要时可为孩子补充一些维生素含片、钙片等，让孩子更健康快乐地成长。</p></div>    
        <p class="g-show-cont hideshow-btn f-hide-box f-admorediv" id="expand">显示全部</p>
    </mip-down-hideshow>
    <mip-ad type="baidu-wm-ext" domain="t1.612.com" token="bwofslstszdec">
        <div id="bwofslstszdec"></div>
    </mip-ad>
</section>
<!-- 库分离 tmp mipdown -->

<section id="descript"> 
    <div class="g-game-recomd g-relate-cms">
        <strong>同类推荐</strong>
        <ul class="g-rank-ul g-scoll-ul" id="m-add-cont">
            <!-- 同类下载分离 -->
            <li class="m-rank-1"><a href="https://m.cr173.com/x/357554" class="g-a-left"><mip-img class="ico" src="https://pic.cr173.com/up/2016-11/20161141116566353.png!70_70"></mip-img><p><strong>超级教练v4.1.4 安卓版</strong><b><span>20.1M /</span><span>中文 /</span><span>18-04-05</span></b></p></a><a href="https://m.cr173.com/x/357554" class="g-a-right"></a></li> <li class="m-rank-2"><a href="https://m.cr173.com/x/722297" class="g-a-left"><mip-img class="ico" src="https://pic.cr173.com/up/2018-4/2018451710258234.png!70_70"></mip-img><p><strong>E家管理2.1.4安卓版</strong><b><span>44.6M /</span><span>中文 /</span><span>18-04-05</span></b></p></a><a href="https://m.cr173.com/x/722297" class="g-a-right"></a></li> <li class="m-rank-3"><a href="https://m.cr173.com/x/722291" class="g-a-left"><mip-img class="ico" src="https://pic.cr173.com/up/2018-4/2018451551378578.png!70_70"></mip-img><p><strong>电安心1.0.4安卓版</strong><b><span>31.3M /</span><span>中文 /</span><span>18-04-05</span></b></p></a><a href="https://m.cr173.com/x/722291" class="g-a-right"></a></li> <li class="m-rank-4"><a href="https://m.cr173.com/x/629969" class="g-a-left"><mip-img class="ico" src="https://pic.cr173.com/up/2017-11/2017111581288833.png!70_70"></mip-img><p><strong>叮当享办公通V1.0.4安卓版</strong><b><span>36.5M /</span><span>中文 /</span><span>18-04-05</span></b></p></a><a href="https://m.cr173.com/x/629969" class="g-a-right"></a></li> <li class="m-rank-5"><a href="https://m.cr173.com/x/644214" class="g-a-left"><mip-img class="ico" src="https://pic.cr173.com/up/2017-12/20171261454515197.jpg!70_70"></mip-img><p><strong>大圣云app1.6.4</strong><b><span>12.8M /</span><span>中文 /</span><span>18-04-05</span></b></p></a><a href="https://m.cr173.com/x/644214" class="g-a-right"></a></li> 
        </ul>
    </div>
    <div class="relate g-game-recomd g-relate-cms m-mt10">
       <strong>精品推荐</strong>
       <ul class="group">
            <!-- 精品推荐分离 -->
            <li><a data-id="184839" href="https://m.cr173.com/x/184839"><mip-img class="ico" src="https://pic.cr173.com/up/2015-11/20151120152623.png!70_70"></mip-img><span class="name">大卡app(货运圈交流平台)</h3></a></li> <li><a data-id="176881" href="https://m.cr173.com/x/176881"><mip-img class="ico" src="https://pic.cr173.com/up/2015-10/2015103093458.png!70_70"></mip-img><span class="name">百度商桥最新版本</h3></a></li> <li><a data-id="172159" href="https://m.cr173.com/x/172159"><mip-img class="ico" src="https://pic.cr173.com/up/2015-10/2015101694829.png!70_70"></mip-img><span class="name">中国大地保险手机客户端</h3></a></li> <li><a data-id="181609" href="https://m.cr173.com/x/181609"><mip-img class="ico" src="https://pic.cr173.com/up/2016-10/2016101210813800.png!70_70"></mip-img><span class="name">58转转</h3></a></li> <li><a data-id="63131" href="https://m.cr173.com/x/63131"><mip-img class="ico" src="https://pic.cr173.com/up/2017-4/20174251414287756.png!70_70"></mip-img><span class="name">千牛手机卖家版</h3></a></li> <li><a data-id="234660" href="https://m.cr173.com/x/234660"><mip-img class="ico" src="https://pic.cr173.com/up/2016-3/2016322103481777.png!70_70"></mip-img><span class="name">知己交友官方app</h3></a></li> <li><a data-id="132730" href="https://m.cr173.com/x/132730"><mip-img class="ico" src="https://pic.cr173.com/up/2015-6/20156314312.png!70_70"></mip-img><span class="name">Office Lens</h3></a></li> <li><a data-id="210464" href="https://m.cr173.com/x/210464"><mip-img class="ico" src="https://pic.cr173.com/up/2016-1/201612692940.png!70_70"></mip-img><span class="name">腾讯多多记账</h3></a></li> <li><a data-id="315624" href="https://m.cr173.com/x/315624"><mip-img class="ico" src="https://pic.cr173.com/up/2016-8/20168241015381307.png!70_70"></mip-img><span class="name">石墨文档app</h3></a></li> <li><a data-id="183619" href="https://m.cr173.com/x/183619"><mip-img class="ico" src="https://pic.cr173.com/up/2017-5/2017551614327135.png!70_70"></mip-img><span class="name">蜂鸟众包(配送兼职平台)</h3></a></li>  
       </ul>
    </div> <!--/relate -->
    <div class="g-game-recomd g-relate-cms">
        <strong>相关文章</strong>
        <ul class="m-news"><li><a data-type="mip" href="https://m.cr173.com/mipw/256774.html">九阳神功2手游太卡了怎么设置流畅    高画质设置方法介绍</a></li> <li><a data-type="mip" href="https://m.cr173.com/mipw/256773.html">九阳神功2手游天义盟和弘月城选哪个好   天义盟和弘月城选择推荐</a></li> <li><a data-type="mip" href="https://m.cr173.com/mipw/256772.html">九阳神功2侠邪隐伶选哪个好   侠邪隐伶选择分析</a></li> <li><a data-type="mip" href="https://m.cr173.com/mipw/256771.html">妹子何必嫁这货是什么梗 妹子何必嫁这货什么意思</a></li> <li><a data-type="mip" href="https://m.cr173.com/mipw/256770.html">九阳神功2平民玩什么职业好  不花钱职业选择推荐</a></li> <li><a data-type="mip" href="https://m.cr173.com/mipw/256769.html">九阳神功2手游什么职业厉害   九阳神功2职业介绍</a></li> </ul>
    </div>   
</section> 
<div class="g-box f-num" id="g-keyword">
    <div class="g-game-recomd">
        <strong>猜你喜欢</strong>        <!--相关分组-->        
         <mip-html-tabs tabs-type="Qi_4" tabs-nav="#tab-nav  li" tabs-key="#tab-div div" nav-cur="m-hover">
      <ul class="g-keyword-btn m-tab-btn" id="tab-nav"></ul>        <!--相关分组-->  
        <div id="tab-div">
        <!-- 分组分离 2 -->          <!--/相关分组-->  
        </div>
        </mip-html-tabs>   
    </div>
</div>

<div class="g-box f-num" id="g-company">
    <p>开发者其他应用</p>
    <ul class="g-rank-ul g-soft-ul" id="m-add-cont" data-comp="0">            </ul>
</div>
<mip-cr173-comment>
<section class="cont g-game-recomd" id="comment">
    <strong>网友评论</strong>
    <div id="view-comment" class="reviews">
        <div class="post"><header>
        <span class="fb">我要跟贴</span></header>
        <ul id="comment-list"></ul>
        <footer class="button-status-complete"><span class="button">更多评论</span></footer>
        </div>
    </div>
    <mip-form method="post" url="https://aj.cr173.com/" id="submit" class="post">
        <fieldset class="w-text"><textarea></textarea></fieldset>
            <fieldset class="w-button">
            <input id="verify" class="button disable" type="submit" value="提交跟贴" hidefocus="true" />
            <span id="cancel" class="button">取消</span>
            </fieldset>
        <input type="hidden" id="app-id" value="606563" />
    </mip-form>
</section>
</mip-cr173-comment>
<div class="g-foot-nav">
    <ul class="g-foot-nav-ul">
        <li><a href="https://m.cr173.com/topranknew.html">最新游戏</a></li>
        <li><a href="https://m.cr173.com/ranknew.html">最新软件</a></li>        
        <li><a href="https://m.cr173.com/topic.html">最新专题</a></li>
        <li><a href="https://m.cr173.com/complist.html">最新厂商</a></li>
    </ul>
</div>
</mip-qqtn-shield>
<footer>
    <a href="https://m.cr173.com/webmap.html">网站地图</a> | <a href="https://www.cr173.com/?m">访问电脑版</a>
</footer>

<div class="f-tags-box">
    <strong>其它版本</strong>    
    <ul class="m-tags-android f-tags-android">                               </ul>
    <ul class="m-tags-ios f-tags-ios">     </ul>
</div>

<mip-fixed type="top" class="lightbox m-click-show f-eject-cont" id="customid">
    <div class="m-show-cont">        
        <strong class="g-show-title">
            <p>大家<span>还下载了</span>这些：</p>
        </strong>        
        <b class="m-close-btn" on="tap:customid.close">+</b>
        <ul class="m-hideshow-top f-tkul"></ul>
    </div>    
    <b class="m-black-bg" on="tap:customid.close"></b>    
</mip-fixed>
<div class="f-information f-hide" data-id="606563" data-path="down" data-categroyId="153" data-rootid="8" data-commendid="0" data-system="WinAll" data-ppaddress="" data-ismoney="0" data-CommentTpye="0" data-Username="huyakun" data-Type="0" data-DateTime="2017/10/12" data-comid="0" data-phpurl="1"></div>
</mip-fy-yuyue>
</mip-cr173-downthe>
</mip-ychlyxgs-adddata>
</mip-ychlyxgs-data>






<script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-ad/mip-ad.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-fixed/mip-fixed.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-data/mip-ychlyxgs-data.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-ychlyxgs-adddata/mip-ychlyxgs-adddata.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-cr173-downthe/mip-cr173-downthe.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-down-hideshow/mip-down-hideshow.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-html-tabs/mip-html-tabs.js"></script>
<script src="https://mipcache.bdstatic.com/static/v1/mip-stats-baidu/mip-stats-baidu.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-cr173-comment/mip-cr173-comment.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-num0/mip-qqtn-num0.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-cambrian/mip-cambrian.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-qqtn-shield/mip-qqtn-shield.js"></script>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-fy-yuyue/mip-fy-yuyue.js"></script>
<mip-stats-baidu token="e6ffbf0bfdbf2a950f41d2fe29b0a6ba"></mip-stats-baidu>
<mip-stats-baidu token="41a558f8f1e97449528bf4764e81bbf3"></mip-stats-baidu>







```
<!-- ## 用法
- 用来判断的相关`href`的`ID`必须命名为`address`，假如为空或者为指定地址，则更改按钮为预约。


## 属性

###  data-nodownurl
- 说明：用来跟address的heaf比对，当值一样时才会执行。
- 取值：没有下载地址的。
- 必选项：是
- 类型：指定字符串

## 注意事项

- 下载地址的a标签id必须为 `address` 。

###  data-color
- 说明：配置预约按钮背景颜色，提供不同风格网站需要。
- 取值：rgb色值。
- 必选项：是

###  data-id
- 说明：预约的ID号，会以jsonp的方式传送。
- 取值：ID。
- 必选项：是

###  data-yuyueurl
- 说明：接口地址，用于不同网站定义。
- 取值：URL。
- 必选项：是

## 注意事项

- 地址必须为 `https` 。 -->