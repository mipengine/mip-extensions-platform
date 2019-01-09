# mip-load-cmstab

mip-load-cmstab 用于给选项卡里边的内容增加点击加载内容，每个选项卡对应不同的接口，接口id和接口地址通过模版获取，接口网址为https.。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-load-cmstab/mip-load-cmstab.js

## 示例

```html
<mip-load-cmstab data-topdateurl="https://m.qqtn.com/" data-page="2" data-tid="67">

<section class="m-content m-dimain" id="infocon">
	<mip-html-tabs tabs-type="Qi_4" tabs-nav="#tab-nav ul li" tabs-key="#tab-div ul" nav-cur="hover">
	<div id="tab-nav">
		<ul>
			<li class="hover" data-tabid="4"><i>最新发布</i></li>
			<li data-tabid="5"><i>小编推荐</i></li>
			<li data-tabid="6"><i>本周热门</i></li>
		</ul>
	</div>
   <div id="tab-div">
    <ul class="content clearfix tab-con"  data-tabnum="0">
        <li>
        <li><a href="/c/275142" title="2019qq爱情个性签名超级幸福 你是我的触手可及" class="tab-con-li"><img src="https://www.qqtn.com/skin/NoPic.jpg" alt="2019qq爱情个性签名超级幸福 你是我的触手可及"><p><strong>2019qq爱情个性签名超级幸福 你是我的触手可及</strong><span class="u-deta">2019-01-02</span></p></a></li>     
       <li><a href="/c/275142" title="2019qq爱情个性签名超级幸福 你是我的触手可及" class="tab-con-li"><img src="https://www.qqtn.com/skin/NoPic.jpg" alt="2019qq爱情个性签名超级幸福 你是我的触手可及"><p><strong>2019qq爱情个性签名超级幸福 你是我的触手可及</strong><span class="u-deta">2019-01-02</span></p></a></li>  
            <li><a href="/c/275143" title="伤感个性签名大全短一点的 既然不可能那就别等了" class="tab-con-li"><img src="https://pic.qqtn.com/up/2019-1/2019121429283819.jpg" alt="伤感个性签名大全短一点的 既然不可能那就别等了"><p><strong>伤感个性签名大全短一点的 既然不可能那就别等了</strong><span class="u-deta">2019-01-02</span></p></a></li>

        </li>       
        <li>
            <li><a href="/c/275143" title="伤感个性签名大全短一点的 既然不可能那就别等了" class="tab-con-li"><img src="https://pic.qqtn.com/up/2019-1/2019121429283819.jpg" alt="伤感个性签名大全短一点的 既然不可能那就别等了"><p><strong>伤感个性签名大全短一点的 既然不可能那就别等了</strong><span class="u-deta">2019-01-02</span></p></a></li>
        </li>       
        <li>
           <li><a href="/c/275143" title="伤感个性签名大全短一点的 既然不可能那就别等了" class="tab-con-li"><img src="https://pic.qqtn.com/up/2019-1/2019121429283819.jpg" alt="伤感个性签名大全短一点的 既然不可能那就别等了"><p><strong>伤感个性签名大全短一点的 既然不可能那就别等了</strong><span class="u-deta">2019-01-02</span></p></a></li>
        </li>       
        <li><a href="/c/275142" title="2019qq爱情个性签名超级幸福 你是我的触手可及" class="tab-con-li"><img src="https://www.qqtn.com/skin/NoPic.jpg" alt="2019qq爱情个性签名超级幸福 你是我的触手可及"><p><strong>2019qq爱情个性签名超级幸福 你是我的触手可及</strong><span class="u-deta">2019-01-02</span></p></a></li>     
       <li><a href="/c/275142" title="2019qq爱情个性签名超级幸福 你是我的触手可及" class="tab-con-li"><img src="https://www.qqtn.com/skin/NoPic.jpg" alt="2019qq爱情个性签名超级幸福 你是我的触手可及"><p><strong>2019qq爱情个性签名超级幸福 你是我的触手可及</strong><span class="u-deta">2019-01-02</span></p></a></li>   
    </ul>    
    <ul class="content clearfix tab-con hide"  data-tabnum="1">
         <li><a href="/c/275142" title="2019qq爱情个性签名超级幸福 你是我的触手可及" class="tab-con-li"><img src="https://www.qqtn.com/skin/NoPic.jpg" alt="2019qq爱情个性签名超级幸福 你是我的触手可及"><p><strong>2019qq爱情个性签名超级幸福 你是我的触手可及</strong><span class="u-deta">2019-01-02</span></p></a></li>     
       <li><a href="/c/275142" title="2019qq爱情个性签名超级幸福 你是我的触手可及" class="tab-con-li"><img src="https://www.qqtn.com/skin/NoPic.jpg" alt="2019qq爱情个性签名超级幸福 你是我的触手可及"><p><strong>2019qq爱情个性签名超级幸福 你是我的触手可及</strong><span class="u-deta">2019-01-02</span></p></a></li>   
        <li>
            <a data-type="mip" href="/mipc/227908.html">情侣网名微信网名2018最新版 好听的微信情侣网名一对</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/223591.html">情侣网名搞笑幽默霸气一对2018 逗比搞笑情侣网名一男一女</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/218493.html">浪漫小清新情侣网名一男一女 幸福甜蜜的情侣个性网名大全</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/213740.html">情侣网名英文简单气质2018最新版 好听的纯英文情侣网名</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/206881.html">小清新可爱的情侣网名带特殊符号 独一无二的情侣网名一对</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
    </ul>
    <ul class="content clearfix tab-con hide"  data-tabnum="2">
        <li>
            <a data-type="mip" href="/mipc/245107.html">情侣网名2018独一无二霸气 时尚潮流的个性情侣网名一对</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/238199.html">2018情侣网名两个字的简单 浪漫不肉麻的情侣网名一对</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/232017.html">个性情侣网名2018独一无二的 好听独特的情侣网名一对</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/226590.html">2018情侣网名最新版的小清新大全 幸福低调的情侣网名一对</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/222181.html">2018情侣网名一男一女暖心小浪漫 幸福小清新情侣个性网名</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/206361.html">2017最好看的个性情侣网名带符号 特殊又好看的情侣网名一对</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/201018.html">霸气超拽情侣网名一男一女2018最新的 个性超拽情侣网名一对</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/196349.html">2017七夕版情侣秀恩爱幸福网名 七夕必备秀恩爱情侣网名一对</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
        <li>
            <a data-type="mip" href="/mipc/189739.html">最新霸气超拽的情侣网名一对2017 好看的带符号的情侣网名</a>
            <span><font color=red>发布时间：2018-03-08</font></span><span class="u-read">阅读：151</span>
        </li>       
    </ul>    
    </div>
    </mip-html-tabs>  
    <p id="more" class="f-ajul" >点击查看更多...</p>
</section>
<script src="https://mipcache.bdstatic.com/static/v1/mip-html-tabs/mip-html-tabs.js"></script>
</mip-load-cmstab>
```




