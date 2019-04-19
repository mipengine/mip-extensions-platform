# mip-qqtn-zqtab

mip-qqtn-zqtab 数据调用，抓取指定条数插入到指定地方，每12条为一个p标签差入。然后进行点击切换对应显示的p标签，并且截取设置的字符隐藏

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-qqtn-zqtab/mip-qqtn-zqtab.js

## 示例

### 基本用法
```html

<style mip-custom>
.ad-kucolname p span.m-hover {border-bottom: 2px #19b5fe solid}
.g-addku {  width: 100%;    height: 280px;    overflow: hidden;margin-top: 0px;  position: relative; padding-top:12px;}

.g-addku h6 { height: 46px; background-color: #fff;    width: 100%;    height: auto;    font-size: 18px;    font-weight: bold;    color: #09aa10;    text-indent: 14px;    border-bottom: 2px solid #eee;    padding: 10px 0;    box-sizing: border-box;    display: block;    overflow: hidden;}
.m-addku { position: relative;    height: 100%;    background-color: #fff; width: 100%;    overflow: hidden;}
.m-addkuul {    width: auto;        height: auto;        position: absolute;    top: 0px;    left: 0;    white-space: nowrap;    display: block;    overflow: hidden;}

.m-addkuul li{ display: none;   white-space: nowrap;    padding: 0;      margin: 0 0 0 0;     padding: 0;max-height: 160px;overflow: hidden;white-space: nowrap;}
.m-addkuul li div{white-space:normal; }
.m-addkuul li  span { box-sizing: border-box;   height: 40px;    line-height: 40px;    overflow: hidden;    width: 33.3%;    float: left;    border-bottom: none;    text-align: center;white-space:normal; }
.m-addkuul li  span a {     height: 22px;    line-height: 22px;    overflow: hidden;    font-size: 14px;    display: block;    margin-top: 10px; border-right: 1px #d9d9d9 solid;padding:0 10px;box-sizing: border-box;}
.g-addku .m-scroll-num {    width: 100%;    height: auto;    padding: 8px 0;    position: absolute;    left: 0;    top: 152px;    text-align: center;}
 .m-scroll-num{ width:100%; height:auto; padding:8px 0; position:absolute; left:0; bottom:10%; text-align:center;}
 .m-scroll-num li{ width: 0.6rem; height:0.6rem; background: #D5D5D5; display:inline-block; overflow:hidden; margin: 0 0 0 10px; border-radius: 12px;}
 .m-scroll-num .m-hover{ background: #666;}

.g-addku .more{ width:100%; height:35px; padding:0 10px; display:block; overflow:hidden; box-sizing:border-box;position: absolute;    bottom: 10px;}
.g-addku .more a{ width:100%; height:35px; line-height:33px; font-size:16px; font-weight:normal; color:#19b5fe; text-align:center; border:1px solid #19b5fe; border-radius:4px; display:block; overflow:hidden; position:relative; zoom:1}
.g-addku .more a span{ width:10px; height:10px; background:url(/img/index-icon.png) no-repeat 0 -88px; background-size:600px; display:inline-block; overflow:hidden;  margin:0 0 0 6px;}
.g-addku .more a i { font-style:normal; }
.m-ttdiv {position: relative;  height: 100%; background-color: #fff}
.ad-kucolname { background-color: #fff }
.ad-kucolname p { display:-webkit-box; display:-moz-box;display:box;}
.ad-kucolname p span{ -webkit-box-flex:1.0; -moz-box-flex:1.0;box-flex:1.0;text-align:center;display:block;height:36px;line-height:36px;font-size:16px;}
.ad-kucolname p span i{background:#f90;color:#fff;padding:1px 6px;border-radius:4px;letter-spacing:0.6px;font-size:14px;margin-left:4px;}


.m-addkuul li.block{display:block}
</style>

<mip-qqtn-zqtab>

<div class="g-addku">
        <div class="ad-kucolname"><p><span>新闻公告<i>2</i></span><span>攻略秘籍<i>4</i></span><span>游戏问答<i>6</i></span><span>游戏下载<i>15</i></span></p></div>
        <div class="m-ttdiv pagescroll" id="g-page-scroll" data-kuname="航海王强者之路">
            <ul class="g-recomd-ul m-addkuul clearfix">             
                  <li ><div class="clearfix">
                  <span><a href="/c/263345">礼包大全</a></span><span><a href="/c/123206">航海王强者之路什么时候可以玩 不删档计费测试</a></span><span><a href="/c/263350">一人流攻略</a></span><span><a href="/c/123384">航海王强者之路iOS版本安装与打开指南</a></span><span><a href="/c/123222">航海王强者之路辅助器烧饼修改器修改教程</a></span><span><a href="/c/123210">航海王强者之路苹果电脑版下载地址 航海王强者之路电脑版iOS模拟器有没有</a></span><span><a href="/c/263352">红卡速成</a></span><span><a href="/c/123396">航海王强者之路手游初始耐力上限是多少 游戏中如何获得更多耐力</a></span><span><a href="/c/123392">航海王强者之路手游体力怎么获得 体力获得方法大全</a></span><span><a href="/c/123389">航海王强者之路常见问题解答FAQ指南官方版</a></span><span><a href="/c/123218">航海王强者之路辅助修改器 航海王强者之路游戏辅助有没有</a></span><span><a href="/c/123215">航海王强者之路手游金币价格是多少</a></span> </div>
                </li>
                <li class="m-li2">
                        <div class="clearfix"></div>
                </li>
                <li class="m-li3">
                        <div class="clearfix"></div>
                </li>
            </ul>
            <ul class="m-scroll-num"><li class="m-hover"></li><li></li><li></li></ul>
        </div>  
        <div class="more"><a href="/ku/hhwqzzl/">进入<i>航海王强者之路</i>专区<span></span></a></div>  
    </div>    



     


</mip-qqtn-zqtab>

</body>
</html>
