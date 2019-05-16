# mip-qqtn-onblock

mip-qqtn-onblock 判断div下总的li个数大于10个就添加一个查看更多按钮，并且每点击一次查看按钮累加一次10乘以单个li的高度

标题|内容
----|----
类型|通用
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-qqtn-onblock/mip-qqtn-onblock.js

## 示例

### 基本用法
```html
<style mip-custom>
.g-cate-list{ overflow: hidden;}
.g-cate-list li{background: #fff; position: relative;overflow: hidden;border-bottom: 1px dashed #eaeaea;}
.g-cate-list li:last-of-type{ border-bottom: none; }
.g-cate-list li strong{ display: block;  line-height: 22px; height: 44px; overflow: hidden; color: #999; font-size:12px;font-weight: normal;margin-top: 6px;padding: 0 10px 0 0;}
.g-cate-list li a.u-avatar{ float: left;width: 70px;height: 70px;padding: 18px;text-decoration: none; margin-right:0; }
.g-cate-list li a.u-avatar img{border-radius:12px;width: 70px;height: 70px;}
.g-cate-list li a.u-title{overflow: hidden;white-space: nowrap;-ms-text-overflow: ellipsis;text-overflow: ellipsis;display: block;width: auto;height: 24px;line-height: 24px;margin-top: 16px;padding: 0 10px 0 0;font-size:15px;color: #333;}
.g-cate-list li a.u-avatar:after {position: absolute;top: 41px;right: 18px;content: "入口";width: 50px;height: 22px;line-height: 22px;border: 1px solid #e5e5e5;text-align: center;color: #888;background-color: #fff;font-size: 12px;border-radius:2px;}
.g-cate-list li p{overflow: hidden;display: block;width: auto;height:20px;margin-top:4px;padding: 0 10px 0 0;font-size: 12px;color: #999;}
.g-cate-list li p img{ width: auto;height:16px; min-width:auto;float: left;}
.g-cate-list li b{ font-weight: normal; color: #999; display:block;  height: 20px; line-height: 20px;padding: 0 10px 0 0;font-size: 12px;overflow: hidden;width: auto;margin-top: 3px;}
.g-loadmore {display: block;border-radius: 4px;width: 200px;margin:15px auto 15px;height: 42px;line-height: 42px;background-color: #f95c68;}
.g-loadmore span { text-align: center;display: block;color: #ffffff; text-align: center;font-size: 16px;}
.g-xcx-list{ overflow: hidden; margin-top:10px;  }
</style>

<mip-qqtn-onblock>
<section>
    <h4 class="title">阅读小程序推荐</h4>
    <ul class="g-cate-list clearfix f-addmore f-morelist f-vateul f-tenul" id="infocon">

   <li>
            <a class="u-avatar" href="/q/330366" title="看理想微信小程序"><mip-img src="https://pic.qqtn.com/up/2018-4/201841714581001.png" alt="看理想微信小程序"></mip-img></a>
            <a class="u-title" href="/q/330366">看理想微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2018-04-17 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/328435" title="有书共读+微信小程序"><mip-img src="https://pic.qqtn.com/up/2018-4/2018041117255323816.jpg" alt="有书共读+微信小程序"></mip-img></a>
            <a class="u-title" href="/q/328435">有书共读+微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star3.png"></mip-img></p>
            <b>微信小程序 / 2018-04-11 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/328031" title="妖鹿说微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2018-4/2018041108074187644.jpg" alt="妖鹿说微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/328031">妖鹿说微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2018-04-11 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/325879" title="话本小说微信小程序"><mip-img src="https://pic.qqtn.com/up/2018-4/2018040408061017033.jpg" alt="话本小说微信小程序"></mip-img></a>
            <a class="u-title" href="/q/325879">话本小说微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2018-04-04 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/321437" title="简书微信小程序"><mip-img src="https://pic.qqtn.com/up/2018-3/2018032308071319310.jpg" alt="简书微信小程序"></mip-img></a>
            <a class="u-title" href="/q/321437">简书微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2018-03-23 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/314928" title="三言两鱼读书微信小程序"><mip-img src="https://pic.qqtn.com/up/2018-3/20183697385868.png" alt="三言两鱼读书微信小程序"></mip-img></a>
            <a class="u-title" href="/q/314928">三言两鱼读书微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2018-03-06 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/314919" title="三言两鱼阅读微信小程序"><mip-img src="https://pic.qqtn.com/up/2018-3/201836850576652.png" alt="三言两鱼阅读微信小程序"></mip-img></a>
            <a class="u-title" href="/q/314919">三言两鱼阅读微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2018-03-06 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/313373" title="创投理想国微信小程序"><mip-img src="https://pic.qqtn.com/up/2018-2/20182281434406659.png" alt="创投理想国微信小程序"></mip-img></a>
            <a class="u-title" href="/q/313373">创投理想国微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2018-02-28 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/313209" title="掌中云阅微信小程序"><mip-img src="https://pic.qqtn.com/up/2018-2/201822892785861.png" alt="掌中云阅微信小程序"></mip-img></a>
            <a class="u-title" href="/q/313209">掌中云阅微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2018-02-28 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/312232" title="大家+微信小程序"><mip-img src="https://pic.qqtn.com/up/2018-2/2018225931299067.png" alt="大家+微信小程序"></mip-img></a>
            <a class="u-title" href="/q/312232">大家+微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2018-02-25 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/278297" title="开卷Pro微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-11/20171121148334170.png" alt="开卷Pro微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/278297">开卷Pro微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-11-02 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/275141" title="微信读书书城微信小程序"><mip-img src="https://pic.qqtn.com/up/2017-10/20171025155052258.png" alt="微信读书书城微信小程序"></mip-img></a>
            <a class="u-title" href="/q/275141">微信读书书城微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-10-25 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/274610" title="很丧的书微信小程序"><mip-img src="https://pic.qqtn.com/up/2017-10/2017102415361385893.jpg" alt="很丧的书微信小程序"></mip-img></a>
            <a class="u-title" href="/q/274610">很丧的书微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-10-24 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/226784" title="微信读书电台小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-10/20171025154607496.png" alt="微信读书电台小程序入口"></mip-img></a>
            <a class="u-title" href="/q/226784">微信读书电台小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-06-30 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/170529" title="腾讯动漫微信小程序"><mip-img src="https://pic.qqtn.com/up/2017-2/2017021509011132264.png" alt="腾讯动漫微信小程序"></mip-img></a>
            <a class="u-title" href="/q/170529">腾讯动漫微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-06-06 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/170669" title="网易漫画微信小程序"><mip-img src="https://pic.qqtn.com/up/2017-2/20172151336232191.png" alt="网易漫画微信小程序"></mip-img></a>
            <a class="u-title" href="/q/170669">网易漫画微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star3.png"></mip-img></p>
            <b>微信小程序 / 2017-06-06 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/213695" title="租条街v6.5.3 安卓版"><mip-img src="https://pic.qqtn.com/up/2019-1/20191291821506029.jpg" alt="租条街v6.5.3 安卓版"></mip-img></a>
            <a class="u-title" href="/q/213695">租条街</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-06-06 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/201424" title="一首一首诗微信小程序入口【给孩子的诗小程序版】"><mip-img src="https://pic.qqtn.com/up/2017-5/2017050914261665163.jpg" alt="一首一首诗微信小程序入口【给孩子的诗小程序版】"></mip-img></a>
            <a class="u-title" href="/q/201424">一首一首诗微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-05-09 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/180166" title="图书盒子Pro微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-3/2017031708215861826.jpg" alt="图书盒子Pro微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/180166">图书盒子Pro微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-17 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/179903" title="新华社微悦读微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-3/2017031613441438005.png" alt="新华社微悦读微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/179903">新华社微悦读微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-16 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/179013" title="天天快报微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-3/2017314135543894.png" alt="天天快报微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/179013">天天快报微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-14 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/177712" title="微信读书小程序二维码"><mip-img src="https://pic.qqtn.com/up/2017-3/2017031009362174948.png" alt="微信读书小程序二维码"></mip-img></a>
            <a class="u-title" href="/q/177712">微信读书小程序二维码</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-10 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/177477" title="美文日历微信小程序分享"><mip-img src="https://pic.qqtn.com/up/2017-3/2017391535327221.jpg" alt="美文日历微信小程序分享"></mip-img></a>
            <a class="u-title" href="/q/177477">美文日历微信小程序分享</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-09 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/177429" title="小故事Pro微信小程序分享"><mip-img src="https://pic.qqtn.com/up/2017-3/2017391451121262.jpg" alt="小故事Pro微信小程序分享"></mip-img></a>
            <a class="u-title" href="/q/177429">小故事Pro微信小程序分享</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-09 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/177119" title="十点读书微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-3/201738171517722.jpg" alt="十点读书微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/177119">十点读书微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-08 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/177093" title="云阅文学miniapp微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-3/2017381650363822.jpg" alt="云阅文学miniapp微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/177093">云阅文学miniapp微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-08 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/177056" title="大角虫漫画lite微信小程序分享"><mip-img src="https://pic.qqtn.com/up/2017-3/2017381552117872.jpg" alt="大角虫漫画lite微信小程序分享"></mip-img></a>
            <a class="u-title" href="/q/177056">大角虫漫画lite微信小程序分享</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-08 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/177040" title="全球经典漫画微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-3/201738154015975.jpg" alt="全球经典漫画微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/177040">全球经典漫画微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-08 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/176950" title="原创书殿阅读微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-3/201738135505465.jpg" alt="原创书殿阅读微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/176950">原创书殿阅读微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-08 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/176693" title="此刻悦读微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-3/2017371729296568.jpg" alt="此刻悦读微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/176693">此刻悦读微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-07 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/176365" title="腾讯动漫+女生版小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-3/201737950272100.jpg" alt="腾讯动漫+女生版小程序入口"></mip-img></a>
            <a class="u-title" href="/q/176365">腾讯动漫+女生版小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-03-07 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/174116" title="号外阅读微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-2/2017022711490067815.jpg" alt="号外阅读微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/174116">号外阅读微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-27 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/174106" title="网易新闻精选微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-2/201702271119306002317.png" alt="网易新闻精选微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/174106">网易新闻精选微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-27 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/174058" title="Miss时尚杂志微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-2/2017022710581695812.png" alt="Miss时尚杂志微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/174058">Miss时尚杂志微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-27 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/174002" title="轻芒杂志微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-2/2017022709422854049.png" alt="轻芒杂志微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/174002">轻芒杂志微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-27 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/173935" title="落网音乐微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-2/2017226115564179.png" alt="落网音乐微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/173935">落网音乐微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-26 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/172872" title="凤凰News微信小程序"><mip-img src="https://pic.qqtn.com/up/2017-2/2017022216282250715.jpg" alt="凤凰News微信小程序"></mip-img></a>
            <a class="u-title" href="/q/172872">凤凰News微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-22 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/172760" title="西窗诗词微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-2/2017022213490646084.png" alt="西窗诗词微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/172760">西窗诗词微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-22 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/171737" title="酷漫漫画+小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-2/2017022008363748730.jpg" alt="酷漫漫画+小程序入口"></mip-img></a>
            <a class="u-title" href="/q/171737">酷漫漫画+小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-20 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/171411" title="追书神器mini微信小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-2/2017021714013850537.png" alt="追书神器mini微信小程序入口"></mip-img></a>
            <a class="u-title" href="/q/171411">追书神器mini微信小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-17 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/170701" title="快看漫画mini小程序入口"><mip-img src="https://pic.qqtn.com/up/2017-2/20172151433307267.png" alt="快看漫画mini小程序入口"></mip-img></a>
            <a class="u-title" href="/q/170701">快看漫画mini小程序入口</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-15 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/170594" title="QQ阅读小程序"><mip-img src="https://pic.qqtn.com/up/2017-2/2017021510441891595.jpg" alt="QQ阅读小程序"></mip-img></a>
            <a class="u-title" href="/q/170594">QQ阅读小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-15 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/170557" title="腾讯阅读小程序"><mip-img src="https://pic.qqtn.com/up/2017-2/201721594318455.png" alt="腾讯阅读小程序"></mip-img></a>
            <a class="u-title" href="/q/170557">腾讯阅读小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/images/star2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-15 </b>
        </li>
        
        <li>
            <a class="u-avatar" href="/q/169945" title="认真的虎扑篮球微信小程序"><mip-img src="https://pic.qqtn.com/up/2017-2/20172131044292684.png" alt="认真的虎扑篮球微信小程序"></mip-img></a>
            <a class="u-title" href="/q/169945">认真的虎扑篮球微信小程序</a>
            <p><mip-img src="https://m.qqtn.com/skin/new2018/imagesstar2.png"></mip-img></p>
            <b>微信小程序 / 2017-02-13 </b>
        </li>

    </ul>
</section>
</mip-qqtn-onblock>

```
## 用法
- 判断整体`g-cate-list`下面li的个数大于10个，就添加一个查看更多的按钮进行展开效果，并且每次点击按钮附加高度`g-cate-list`，获取单个li标签的高度乘以每次需要展开的个数


## 注意事项

- 整体`g-cate-list`下面的li个数是调用一次性全部读出的，为了避免页面过长，实现的这种现实效果。