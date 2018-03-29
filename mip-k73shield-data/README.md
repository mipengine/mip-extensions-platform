# mip-k73shield-data

mip-k73shield-data 需要进入页面就执行，只执行一次，一个本网站独立使用的多功能组件，通过接口获取数据进行多种逻辑判断和处理，因为数据繁多，所以为了减少请求次数，把多种功能基于一个组件中；如果分开需要多次请求同一个接口，不仅增加了请求次数，也增大了我们这边服务器的压力；

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed

所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-k73shield-data/mip-k73shield-data.js

## 示例

### 基本用法
```html
<mip-k73shield-data>
<section class="info">
    <mip-img class="tu f-game-img" src="http://pic1.uzzf.com/uzzf/mb/up/2017-7/20177121836493238_120_120.png"></mip-img>
    <h1 class="f-game-h1">网易终结者2审判日官方版1.104236.104289安卓正式版</h1>
    <p class="info1">
      <span class="f-tags-system">系统：<i>Android</i></span>
      <span>大小：<i>600M</i></span>
    </p>
    <p class="info1">
      <span>类型：<i>动作格斗</i></span>
      <span>语言：<i>中文</i></span>
    </p>
    <div>
      <ul id="downAddress" class="m-down-ul f-downbtn-url">
         <li class="m-down-last"><a target="_blank" class="down button" href="http://fxz.didiwl.com/apk/fengkdsj.apk" id="address">立即下载</a></li>
      </ul>
     </div>
</section>
<div class="f-tags-position"></div>
<section class="tabcon" id="screen">
   <div class="g-previmg-box">
        <div class="g-previmg plist" id="g-previmg">
            <ul class="g-previmg-show f-previmg-cont">
                <li><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-7/201771218375108100_235_450.jpg"  /></mip-img></li><li><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-7/2017712183712219210_235_450.jpg"  /></mip-img></li><li><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-7/2017712183719320420_235_450.jpg"  /></mip-img></li><li><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-7/2017712183726219310_235_450.jpg"  /></mip-img></li>
            </ul>
        </div>
    </div>
    <div class="cont">
    	<div class="uptime">更新时间：2017-11-06</div>
    	<mip-down-hideshow hsId="2">
        <div class="content f-maincms-cont" id="summary"><p>网易终结者2审判日官方版是一款电影改编的动作格斗手游，玩家将体验独创赛车玩法，还有武器射击玩法，BOSS副本大作战，团队作战攻击天网，让世界恢复人类的统治，快来建立的的强大军团抵御天网的统治吧！官方介绍《终结者2》电影官方正版授权，最强王者震撼归来！游戏突破性将TPS和废土冒险有机融合，构建了一个高自由度亿万平米的广袤废土世界，玩家在其中随意探索、冒险，高自由度增加了游戏耐玩性；游戏更独创真实载具</p></div>
    	<div id="details"><p><strong>网易终结者2审判日官方版</strong>是一款电影改编的动作格斗手游，玩家将体验独创赛车玩法，还有武器射击玩法，BOSS副本大作战，团队作战攻击天网，让世界恢复人类的统治，快来建立的的强大军团抵御天网的统治吧！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/201707121842218593306.png"></mip-img></p><h3>官方介绍</h3><p>《终结者2》电影官方正版授权，最强王者震撼归来！游戏突破性将TPS和废土冒险有机融合，构建了一个高自由度亿万平米的广袤废土世界，玩家在其中随意探索、冒险，高自由度增加了游戏耐玩性；游戏更独创真实载具玩法，飙车竞技、死亡冒险；游戏采用第三人称越肩视角，加上游戏电影级的画质表现，给玩家打造最真实的临场射击体验；玩法上融合PVP竞技，多人联机Boss，军团据点争夺等特色系统，游戏将从全方位为玩家打造一个终结者剧情的特色世界！</p><h3>游戏玩法</h3><p>招兵买马，打造顶尖战力</p><p>超级人工智能天网拥有非凡的计算能力，通过掌控各国的计算机网络，悍然发动了全球性的核爆，开启了“审判日”。在这之后，天网更制造了海量的机器人军团为其作战，人类抵抗军节节败退。你的到来，狠狠地挫败了天网的进攻图谋，但想要战胜强大的天网军团？你也必须组建军团，以强对强！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430146652.jpg"></mip-img></p><p>等级达到25级后，你便可以创建属于自己的终结者军团，并通过各种宣传吸引其他终结者的加入。军团人员分为团长、副团长、参谋长、普通士官和临时士官五个层级，层级越高，享有的军团福利便越多。身为团长的你，最重要的任务便是增强军团的凝聚力和战斗力，确保在每一次战斗中，取得胜利！</p><p>如火如荼，提升军团实力</p><p>在终结者军团的齐心协力下，天网节节败退，人类的胜利指日可待！而此时，军团间的争霸成为了最核心的话题——谁才是最强的军团？谁才拥有最强的实力？谁才配占有最广袤和资源丰富的地盘？一切，在竞技场上见真章！</p><p>首先，军团的成员们必须积极参与“军团建设”和“货物运输”两大日常任务，前者可以帮助军团完善基础设施，后者则关系到战略物资的运输。</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430118346.jpg"></mip-img></p><p>其次，终结者们还可以通过“记忆拷贝”任务来提升双方实力——等级高的玩家可以将自己的经验、技巧等数据拷贝给等级低的玩家，前者可以增加军团贡献，后者则能获得经验，直接提升战力。团长和副团长还可开启“军团入侵”，组织军团成员挑战强大的军团BOSS，赢得各类特殊的奖励。</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430139312.jpg"></mip-img></p><p>最终，军团间的一切争夺都要靠战斗来解决！目前《终结者2》中有两大军团PVP玩法，“军团制霸”是常规的组队PVP混战，军团可以派出多支战队参与制霸，最终取得胜场越多，排名越高，也代表实力越强悍。“领地争夺”则是不死不休的终极大战，两大军团将围绕一片领地展开殊死的搏杀！一旦胜利，便意味着将坐拥资源，而失败，则代表着整体实力将直线下降！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430213529.jpg"></mip-img></p><p>绝命攻防，恢弘战场对决</p><p>令玩家们津津乐道的战场玩法，是《终结者2》全新推出的大型PVP玩法——16名玩家将进行一场惊心动魄的攻防对战，分秒必争的战场上，实力、配合、默契都将直接影响胜负！</p><p>在战场玩法中，16名玩家将被分为8V8的攻防阵营，进攻方摧毁防守方核心，则进攻方胜利，反则防守方胜利。但最刺激的是，进攻方仅有5分钟的时间！在5分钟内，攻破防守方的大门，才能获得时间奖励，进攻方必须连续不断的进击，方有机会在时间耗尽前直捣敌人核心。</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430235963.jpg"></mip-img></p><p>而防守方也必须围绕每一道大门布置防线，甚至可以派遣队员绕后对进攻方发起奇袭，摧毁他们的营地，阻挡其前进的步伐！在战场上，攻防双方都必须竭尽全力，使出浑身解数，为胜利而战！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430258397.jpg"></mip-img></p><h3>游戏特色</h3><p>自天网启动核爆之后，死亡和绝望笼罩大地，战斗成为了唯一的谋生之道，在废土大路上，驾驶各类载具，让天网军团臣服于你的超级战力！</p><p>电影官方冒险射击手游《终结者2：审判日》即将于6月15日开启天网觉醒测试，游戏中创新性地加入了载具系统，使玩家能够在畅快厮杀的同时体验载具对决的别样快感，决定人类未来的最终一战正式打响，让特色载具助你一臂之力！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430256929.jpg"></mip-img></p><p>个性载具，锋芒毕露</p><p>在废土末世，强者将拥有旁人难以想象的权力与财富，而化身成最强机器战士T－800的你，自然能屹立在末世之巅。《终结者2》手游精心地为玩家准备了种类丰富、各具特色的载具，从劲爆的清道车到酷炫的机车，从飞驰的赛车到厚重的装甲车，足以满足你的个性需求，彰显出你的独到品味！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430279363.jpg"></mip-img></p><p>极具视觉冲击力的色彩搭配；夸张拉风的整体外形；刚硬铁血的车身材质；动力强劲的助推设备；威力不俗的射击器械……载具的存在，就是为了让身为终结者的你更加与众不同，哪怕群敌环绕依然能够横冲直撞杀出血路！无论身处何地，你和载具，便是最引人注目的风景！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430242776.jpg"></mip-img></p><p>肆意战斗，纵横废土</p><p>作为人类抵抗军的王牌力量，T－800本身就拥有强大的实力，而特色载具的加入，更将使你如虎添翼！</p><p>是在一望无际的旷野上，驾驶载具疯狂飙车，挑战速度极限，还是无视任何规则，驱使载具畅快碾压天网军团？让载具在你的驾驶下绽放出耀眼光芒！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430228622.jpg"></mip-img></p><p>在激烈的战斗之外，你还可以邀上三五好友，在人烟稀少的高速上进行一场速度与实力的竞逐，将油门轰到最大，打开所有助推设备，体验极致快感。更可以利用载具特点，进行撞击，阻拦等，为这场速度之争增加更多趣味！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430293252.jpg"></mip-img></p><p>专属定制，载具皮肤</p><p>在海量的载具中挑选出一款最适合自己的，需要玩家的耐心与智慧，但《终结者2》也给予了玩家继续改造载具的机会。</p><p>在未来，《终结者2》将上线载具皮肤系统，玩家将可以为自己的爱车换上最酷炫的涂装，瞬间便成为独一无二的战场明星！皮肤还将赋予载具某些特别的属性，在你的战斗中可以发挥出巨大助力！</p><p><mip-img src="http://pic.uzzf.com/up/2017-7/2017071218430380154.jpg"></mip-img></p><p>无垠废土，驾驶特色载具任意纵横！电影官方冒险射击手游《终结版2：审判日》即将于6月15日开启天网觉醒测试，畅爽战斗，不容错过！登录九游专区，了解更多测试资讯！</p></div>  
        <div class="g-show-cont hideshow-btn" id="expand"><span></span><i>展开全部</i></div>
        </mip-down-hideshow>
    </div>
    <div class="tltj cfix">
        <p class="tit">同类推荐</p>
        <div class="m-flnav" id="wrapper2">
         <div id="scroller2" class="flnav">
        <ul id="thelist2">
          
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/342893.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-7/20177121836493238_72_72.png" ></mip-img><span>网易终结者2审判日官方版</span></a>
           </li>
           
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/263679.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-12/20161214143848586_72_72.png" ></mip-img><span>英魂之刃双旦版</span></a>
           </li>
           
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/282675.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-3/201733957468039_72_72.png" ></mip-img><span>4399生死狙击手游跨国战版【送枪】</span></a>
           </li>
           
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/281114.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-2/20172271848555952_72_72.png" ></mip-img><span>时间反冲手游</span></a>
           </li>
           
        </ul>
    </div>
   </div>
    </div>     
</section>
<section class="tabcon">
    <div class="g-box" id="g-keyword">
      <div class="g-game-recomd m-tab-box">
            <strong>猜你喜欢</strong>
            <ul class="g-keyword-btn m-tab-btn">
            	
            	
            	<li><b>安卓动作竞技网游</b></li>
                
           		
            	
            	<li><b>网易游戏</b></li>
                
           		
            	
            	<li><b>安卓网游榜</b></li>
                
           		
            </ul>
               
            
            
            <div class="g-keyword-cont m-tab-cont">
              <dl>
                  <dt>安卓动作竞技网游</dt>
                    <dd>无论是动作格斗，还是体育竞技游戏都有着非常多的游戏受众，安卓动作竞技网游排行榜为广大游戏玩家提供了最新的游戏排行，随时了解最新的游戏热度。</dd>
                    <dd class="g-keyword-info"><a target="_blank" href="http://m.uzzf.com/fz/azdzjj/">进入专区</a></dd>
                </dl>
                <ul>
                  
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/177592.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-9/2017930854597299_72_72.jpg"  ></mip-img><strong>王者荣耀2018最新版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/250513.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-10/20161014951527764_72_72.png"  ></mip-img><strong>garena传说对决手游</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/252261.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-10/201610191551488412_72_72.png"  ></mip-img><strong>时空猎人四周年庆版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/253915.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-10/20161026123294917_72_72.png"  ></mip-img><strong>时空召唤万圣节版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/147060.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-5/20165112034301129_72_72.png"  ></mip-img><strong>穿越火线枪战王者修改版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/91381.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2014-11/201411258304_72_72.png"  ></mip-img><strong>全民枪战内购破解版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/203913.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-5/2016513107533803_72_72.png"  ></mip-img><strong>无尽争霸手游安卓版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/201639.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-5/20165593838234_72_72.png"  ></mip-img><strong>奔跑吧兄弟4撕名牌大战</strong></a></li>
                    
                </ul>
            </div>
            
            
            
            <div class="g-keyword-cont m-tab-cont">
              <dl>
                  <dt>网易游戏</dt>
                    <dd>网易手机游戏是中国手机游戏行业的领头羊，出品了超多精品手游，比如梦幻西游手游，天下手游等等，都非常的不错，小编整理了网易出品的手机游戏，汇集了全部类型的网易游戏，每天不停更新攻略，，都是小编精选推荐，喜欢的朋友可以来挑选！</dd>
                    <dd class="g-keyword-info"><a target="_blank" href="http://m.uzzf.com/fz/wysjyx/">进入专区</a></dd>
                </dl>
                <ul>
                  
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/206032.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-5/2016522107572489_72_72.jpg"  ></mip-img><strong>网易天下手游(天下3同名手游)</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/246896.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-9/20169291541351404_72_72.jpg"  ></mip-img><strong>网易我朝有马助手</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/205722.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-5/2016520144108407_72_72.png"  ></mip-img><strong>我的世界网易安卓版下载</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/183634.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-2/2016224151148857_72_72.png"  ></mip-img><strong>网易童话大冒险安卓版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/254149.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-10/20161027112723140_72_72.png"  ></mip-img><strong>网易迷雾世界安卓正式版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/243323.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-2/20172211633336706_72_72.png"  ></mip-img><strong>网易大航海之路</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/76267.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2014-7/2014721101910_72_72.png"  ></mip-img><strong>网易农场</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/253040.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-10/201610221426457737_72_72.jpg"  ></mip-img><strong>网易hit我守护的一切</strong></a></li>
                    
                </ul>
            </div>
            
            
            
            <div class="g-keyword-cont m-tab-cont">
              <dl>
                  <dt>安卓网游榜</dt>
                    <dd>喜欢各种最新的安卓网游的用户就不要错过了东坡下载为大家提供的安卓网游榜，在这里你可以随时了解当下最为火爆热门的安卓网游，随时免费下载感兴趣的游戏。</dd>
                    <dd class="g-keyword-info"><a target="_blank" href="http://m.uzzf.com/fz/azwyb/">进入专区</a></dd>
                </dl>
                <ul>
                  
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/208636.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-5/2016531114342778_72_72.png"  ></mip-img><strong>阴阳师手游</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/236293.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-2/2017221162442131_72_72.jpg"  ></mip-img><strong>hit我守护的一切</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/77729.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-6/2017627845387851_72_72.png"  ></mip-img><strong>全民枪战2</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/222172.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-7/201672014837396_72_72.jpg"  ></mip-img><strong>剑侠世界手游vip破解版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/184796.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-2/20172201644441582_72_72.png"  ></mip-img><strong>部落冲突皇室战争安卓版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/206041.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-2/2017225115146731_72_72.jpg"  ></mip-img><strong>诛仙手游(唯一正版授权)</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/104605.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2015-1/201512985736_72_72.png"  ></mip-img><strong>自由之战破解版</strong></a></li>
                    
                  <li><a target="_blank" href="http://m.uzzf.com/mipu/254493.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2016-10/20161028164192530_72_72.png"  ></mip-img><strong>地牢猎手5国服2016版</strong></a></li>
                    
                </ul>
            </div>
            
            
                  
        </div>
    </div>
    <ul class="softlist cfix">
         
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/341657.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-7/20177101849167228_72_72.png" ></mip-img><span>绅士江湖手游安卓官网版</span></a>
           </li>
         
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/317978.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-5/20175191026282543_72_72.jpg" ></mip-img><span>英雄枪战无限钻石破解版</span></a>
           </li>
         
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/284155.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-3/201737155416179_72_72.jpg" ></mip-img><span>钢铁坦克机器人冲突</span></a>
           </li>
         
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/120744.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2015-5/2015527171147_72_72.jpg" ></mip-img><span>穿越火线2046</span></a>
           </li>
         
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/333550.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-6/2017623849576518_72_72.png" ></mip-img><span>交锋联盟(Fight League)官方版</span></a>
           </li>
         
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/77048.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2014-7/201472983529_72_72.png" ></mip-img><span>坦克帝国电脑版(坦克帝国pc版)</span></a>
           </li>
         
           <li>

              <a target="_blank" href="http://m.uzzf.com/mipu/115621.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2015-4/2015424103253_72_72.png" ></mip-img><span>天天狙击3</span></a>
           </li>
         
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/289426.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-3/2017320154047924_72_72.png" ></mip-img><span>加拿大死亡之路手机中文版</span></a>
           </li>
         
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/343429.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-7/20177131739526066_72_72.png" ></mip-img><span>热血少年手游</span></a>
           </li>
         
           <li>
              <a target="_blank" href="http://m.uzzf.com/mipu/333926.html"><mip-img src="http://pic1.uzzf.com/uzzf/mb/up/2017-6/20176231652233826_72_72.png" ></mip-img><span>战斗盒子手游</span></a>
           </li>
         
    </ul>
    <div class="xgwz">
        <p class="tit">相关文章</p>
        <ul>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/51600.html">终结者2审判日狙击镜怎么调 狙击灵敏度使用攻略</a></li>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/51505.html">荒野行动和终结者2审判日哪个游戏更好玩 荒野行动和终结者2游戏对比分析</a></li>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/51466.html">终结者2审判日11月22日更新增加了什么 终结者2审判日11月22日更新介绍</a></li>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/51397.html">终结者2审判日11.22日更新了什么 11.22更新新增撬棍、煎锅、战狼套装</a></li>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/51333.html">终结者2审判日狙击枪有哪些 巴雷特在哪里</a></li>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/51264.html">终结者2审判日南瓜头什么时候发放 金币补偿公告</a></li>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/51227.html">终结者2审判日安卓和iOS可以一起玩吗 安卓和苹果互通吗</a></li>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/50928.html">终结者2审判日补给箱里有什么道具 补给箱有哪些道具</a></li>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/50758.html">终结者2审判日11月15更新了什么 终结者2审判日雾天介绍</a></li>
         
           <li><em></em><a target="_blank" href="http://m.uzzf.com/mipz/50755.html">网易终结者2审判日美服手游哪里可以下载 Rules of Survival美</a></li>
         
        </ul>
    </div>    
</section>
<footer>
    <a target="_blank" class="go-desktop" href="http://www.uzzf.com/?m">访问电脑版</a>
</footer>
<mip-fixed type="top" class="lightbox m-click-show" id="customid">
    <div class="m-show-cont">        
        <strong class="g-show-title">
            <p>大家<span>还下载了</span>这些：</p>
        </strong>        
        <b class="m-close-btn" on="tap:customid.close">+</b>
        <ul class="m-hideshow-top f-android-eject"></ul>
    </div>    
    <b class="m-black-bg" on="tap:customid.close"></b>    
</mip-fixed>


<div class="f-tags-box">
	<strong>其它版本</strong>    
    <ul class="m-tags-android f-tags-android">   
    	
        
    	<li data-system="Android" data-id="535329" data-size="107.1M"><a href="http://m.cr173.com/x/535329"><i></i><p>三生道诀私服1.3.0安卓版</p><b>下载</b></a></li>
        
    	<li data-system="Android" data-id="535313" data-size="107.1M"><a href="http://m.cr173.com/x/535313"><i></i><p>三生道诀公益服1.3.0 安卓版</p><b>下载</b></a></li>
        
        
    </ul>
    <ul class="m-tags-ios f-tags-ios">    	
    	<li data-system="IOS" data-id="535313" data-size="107.1M"><a href="http://m.cr173.com/x/535313"><i></i><p>三生道诀公益服1.3.0 安卓版</p><b>下载</b></a></li>
        
        
    </ul>
</div>

</mip-k73shield-data>
```
