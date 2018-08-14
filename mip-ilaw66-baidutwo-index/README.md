# mip-ilaw66-baidutwo-index

mip-ilaw66-baidutwo-index 组件说明
法率网2期首页

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidutwo-index/mip-ilaw66-baidutwo-index.js

## 示例

### 基本用法
```html
<mip-sina-rem>
<mip-stats-baidu token="d5a24ec2321d65ed4b781d2fce73c834">
<mip-ilaw66-baidutwo-index>

<mip-form url='https://www.baidu.com'>
   <input type="hidden" id="popValue" th:name="popValue" th:value="${popValue}" />
    <input type="hidden" id="userId" name="userId" th:value="${session.userId}" />
    <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
    <input type="hidden" id="channel" name="channel" value="baidusearch" />
    <input type="hidden" id="price" name="price" th:value="${price}"/>
</mip-form>


<div class="header_block baidu">
    <mip-history history="go, -1">
        <span class="glyphicon glyphicon-menu-left pull-left " >
    </span>
    </mip-history>
    分秒律师
    <span class="glyphicon   pull-right headerright"><a data-type="mip" data-title="订单列表" href="http://cp01-ps-fe-2.epc.baidu.com:8003/sf?pd=law&openapi=1&from_sf=1&ms=1&wd=%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83&title=%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83&atn=list&vn=law&resource_id=5184"> <mip-img  width="20px"height= "20px" src="tempbaidu/images/user.png"   ></mip-img></a> </span>
</div>



<div class="pr">
<mip-carousel defer="1000" autoplay="autoplay  "  defer="3000"    layout="responsive"   width="750"   height="370" indicatorId="mip-carousel-example"  >
    <!--<a href="#">-->
    <mip-img     src="tempbaidu/images/banner1.png"> </mip-img>
    <!--<div class="mip-carousle-subtitle">这里是title2</div>-->
    <!--</a>-->
    <mip-img     src="tempbaidu/images/banner2.png">  </mip-img>
    <mip-img     src="tempbaidu/images/banner3.png"> </mip-img>

</mip-carousel>

<div class="mip-carousel-indicator-wrapper">
    <div class="mip-carousel-indicatorDot" id="mip-carousel-example">
        <div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>
        <div class="mip-carousel-indecator-item"></div>
        <div class="mip-carousel-indecator-item"></div>
    </div>
</div>

</div>
    <div class="userinteractive">
    </div>
    <div class="backhs headerbf">
    </div>

<div class="menu-container">
<ul class="nav nav-tabs" role="tablist">
<li>
    <a href="#marriage" role="tab" data-toggle="tab">
        <div class="media" data-type="CT001" data-href="marriage" data-num="01">
            <mip-img  width="45px"height= "45px" src="tempbaidu/images/1.png"> </mip-img>
            <p class="menu-list__context">婚姻家庭</p>
        </div>
    </a>
</li>
<li>
    <a href="#property" role="tab" data-toggle="tab">
        <div class="media" data-type="CT006" data-href="property" data-num="02">
            <mip-img  width="45px"height= "45px" src="tempbaidu/images/4.png" ></mip-img>
            <p class="menu-list__context">资金借贷</p>
        </div>
    </a>
</li>
<li class="menu-list__item media_hot">
    <a href="#room" role="tab" data-toggle="tab">
        <div class="media" data-type="CT002" data-href="room" data-num="03">
             <mip-img  width="45px"height= "45px"  src="tempbaidu/images/2.png" ></mip-img>
            <p class="menu-list__context">房产物业</p>
        </div>
    </a>
</li>
</ul>
</div>
<div class="menu-container">
<ul class="nav nav-tabs" role="tablist">
    <li>
        <a href="#traffic" role="tab" data-toggle="tab">
            <div class="media" data-type="CT003" data-href="traffic" data-num="04">
                <mip-img  width="45px"height= "45px" src="tempbaidu/images/3.png" ></mip-img>
                <p class="menu-list__context">交通意外</p>
            </div>
        </a>
    </li>
    <li>
        <a href="#labour" role="tab" data-toggle="tab">
            <div class="media" data-type="CT004" data-href="labour" data-num="05">
                <mip-img  width="45px"height= "45px" src="tempbaidu/images/5.png" ></mip-img>
                <p class="menu-list__context">劳动就业</p>
            </div>
        </a>
    </li>
    <li>
        <a href="#debt" role="tab" data-toggle="tab">
            <div class="media" data-type="CT008" data-href="debt" data-num="06">
                <mip-img  width="45px"height= "45px" src="tempbaidu/images/6.png" ></mip-img>
                <p class="menu-list__context">合同债务</p>
            </div>
        </a>
    </li>
</ul>
</div>
<div class="media dediaqi" data-type="CT007" data-href="Other" data-num="07">
   <mip-img alt="baidu mip img" src="tempbaidu/images/homeqt.png"></mip-img>
</div>
<div class="slogonMsg"></div>

<div class="menu-container">

<div class="tab-content">

<div class="tab-pane" id="marriage" data-qusType="CT001">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>婚姻家庭</h1>
            </div>
            <div class="tab-content__midd">
                <p>财产分割</p>
                <p>房产分割</p>
                <p>抚养费</p>
                <p>协议离婚</p>
                <p>诉讼离婚</p>
                <p>子女抚养权</p>
                <p>家庭暴力</p>
                <p>第三者</p>
                <!--<div class="tab-content__midd__inform tab-content__midd__inform1">-->
                    <!--<p>协议离婚</p>-->
                    <!--<p>诉讼离婚</p>-->
                    <!--<p>房产分割</p>-->
                    <!--<p>财产分割</p>-->
                <!--</div>-->
                <!--<div class="tab-content__midd__inform tab-content__midd__inform1">-->
                    <!--<p>子女抚养权</p>-->
                    <!--<p>抚养费</p>-->
                    <!--<p>第三者</p>-->
                    <!--<p>家庭暴力</p>-->
                    <!--<div class="jzkc"></div>-->
                <!--</div>-->
            </div>
            <div class="tab-content__bottom" data-stats-baidu-obj='%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22CT001_baidusearch_01%22%5D%7D'>
                <button class="consulting" data-type="CT001" >开始咨询</button>
                <p class="priceText">
                    特惠:
                    <span class="indexPrice"></span>
                    元/分钟  ( <del>原价12元</del>
                    ) 咨询总时长少于1分钟免费
                </p>
            </div>
        </div>
        <button class="tab-content__close"></button>
    </div>
</div>

<div class="tab-pane" id="property" data-qusType="CT006">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>资金借贷</h1>
            </div>
            <div class="tab-content__midd">
                <p>房产抵押</p>
                <p>欠款失联</p>
                <p>担保</p>
                <p>互联网金融</p>
                <p>借条欠条</p>
                <p>信用卡诈骗</p>
                <p>非法集资</p>
                <p>利息</p>
                <!--<div class="tab-content__midd__inform tab-content__midd__inform2">-->
                    <!--<p>互联网金融</p>-->
                    <!--<p>借条欠条</p>-->
                    <!--<p>房产抵押</p>-->
                    <!--<p>担保</p>-->
                <!--</div>-->
                <!--<div class="tab-content__midd__inform tab-content__midd__inform2">-->
                    <!--<p>利息</p>-->
                    <!--<p>欠款失联</p>-->
                    <!--<p>非法集资</p>-->
                    <!--<p>信用卡咋骗</p>-->
                <!--</div>-->
            </div>
            <div class="tab-content__bottom" data-stats-baidu-obj='%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22CT006_baidusearch_02%22%5D%7D'>
                <button class="consulting" data-type="CT006">开始咨询</button>
                <p class="priceText">
                    特惠:
                    <span class="indexPrice"></span>
                    元/分钟  ( <del>原价12元</del>
                    ) 咨询总时长少于1分钟免费
                </p>
            </div>
        </div>
        <button class="tab-content__close"></button>
    </div>
</div>

<div class="tab-pane" id="traffic" data-qusType="CT003">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>交通意外</h1>
            </div>
            <div class="tab-content__midd">
                <p>车辆被扣</p>
                <p>赔偿项目</p>
                <p>伤残鉴定</p>
                <p>事故调解</p>
                <p>责任认定</p>
                <p>交警执法</p>
                <p>赔偿标准</p>
                <p>保险理赔</p>
                <!--<div class="tab-content__midd__inform tab-content__midd__inform3">-->
                    <!--<p>事故调解</p>-->
                    <!--<p>责任认定</p>-->
                    <!--<p>车辆被扣</p>-->
                    <!--<p>赔偿项目</p>-->
                <!--</div>-->
                <!--<div class="tab-content__midd__inform tab-content__midd__inform3">-->
                    <!--<p>赔偿标准</p>-->
                    <!--<p>伤残鉴定</p>-->
                   <!--<p>保险理赔</p>-->
                    <!--<p>交警执法</p>-->

                <!--<div class="bxgh"></div>-->
                <!--<div class="dqcl"></div>-->
        <!--</div>-->
    </div>
    <div class="tab-content__bottom" data-stats-baidu-obj='%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22CT003_baidusearch_04%22%5D%7D'>

        <button class="consulting" data-type="CT003">开始咨询</button>
        <p class="priceText">
            特惠:
            <span class="indexPrice"></span>
            元/分钟  ( <del>原价12元</del>
            ) 咨询总时长少于1分钟免费
        </p>
    </div>
</div>
<button class="tab-content__close"></button>
</div>
</div>
<!--
<div class="tab-pane" id="lending" data-qusType="CT002">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>人身伤害</h1>

            </div>
            <div class="tab-content__midd">
                <div class="tab-content__midd__inform tab-content__midd__inform4">

                    <p>打架斗殴</p>
                    <p>伤残索赔</p>
                    <p>精神损害</p>
                    <p>学校</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform4">
                   <p>未成年</p>
                    <p>医疗纠纷</p>
                    <p>产品质量</p>
                    <p>宠物伤人</p>

                <div class="cpzl"></div>
                <div class="cwsr"></div>

        </div>
    </div>
    <div class="tab-content__bottom" data-stats-baidu-obj='%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22CT003_baidusearch_04%22%5D%7D'>
        <button class="consulting" data-type="CT002">开始咨询</button>
        <p class="priceText">
            特惠:
            <span class="indexPrice"></span>
            元/分钟  ( <del>原价12元</del>
            ) 咨询总时长少于1分钟免费
        </p>
    </div>
</div>
<button class="tab-content__close"></button>
</div>
</div>
 -->

<div class="tab-pane" id="room" data-qusType="CT002">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>房产物业</h1>
            </div>
            <div class="tab-content__midd">
                <p>拆迁动迁</p>
                <p>小区物业</p>
                <p>租房</p>
                <p>买房卖房</p>
                <p>中介纠纷</p>
                <p>房产更名</p>
                <p>停车位</p>
                <p>装修</p>
                <!--<div class="tab-content__midd__inform tab-content__midd__inform6">-->
                    <!--<p>买房卖房</p>-->
                    <!--<p>租房</p>-->
                    <!--<p>拆迁动迁</p>-->
                    <!--<p>中介纠纷</p>-->
                <!--</div>-->
                <!--<div class="tab-content__midd__inform tab-content__midd__inform6">-->
                    <!--<p>装修</p>-->
                    <!--<p>小区物业</p>-->
                    <!--<p>停车位</p>-->
                    <!--<p>房产更名</p>-->
                <!--</div>-->
            </div>
            <div class="tab-content__bottom" data-stats-baidu-obj='%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22CT002_baidusearch_03%22%5D%7D'>

                <button class="consulting" data-type="CT002">开始咨询</button>
                  <p class="priceText">
                      特惠:
                      <span class="indexPrice"></span>
                      元/分钟  ( <del>原价12元</del>
                      ) 咨询总时长少于1分钟免费
                  </p>
            </div>
        </div>
        <button class="tab-content__close"></button>
    </div>
</div>

<div class="tab-pane" id="debt" data-qusType="CT008">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>合同债务</h1>
            </div>
            <div class="tab-content__midd">
                <p>账户冻结</p>
                <p>房产查封</p>
                <p>违约金</p>
                <p>欠款不还</p>
                <p>催款要债</p>
                <p>工程款纠纷</p>
                <p>合同纠纷</p>
                <p>签合同</p>
                <!--<div class="tab-content__midd__inform tab-content__midd__inform7">-->
                    <!--<p>欠款不还</p>-->
                    <!--<p>催款要债</p>-->
                    <!--<p>账户冻结</p>-->
                    <!--<p>房产查封</p>-->
                <!--</div>-->
                <!--<div class="tab-content__midd__inform tab-content__midd__inform7">-->
                    <!--<p>合同纠纷</p>-->
                    <!--<p>工程款纠纷</p>-->
                    <!--<p>违约金</p>-->
                    <!--<p>签合同</p>-->
                <!--</div>-->
            </div>
            <div class="tab-content__bottom" data-stats-baidu-obj='%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22CT008_baidusearch_06%22%5D%7D'>

                <button class="consulting" data-type="CT008">开始咨询</button>
                <p class="priceText">
                    特惠:
                    <span class="indexPrice"></span>
                    元/分钟  ( <del>原价12元</del>
                    ) 咨询总时长少于1分钟免费
                </p>

            </div>
        </div>
        <button class="tab-content__close"></button>
    </div>
</div>
<div class="tab-pane" id="Other" data-qusType="CT007">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>其他问题</h1>
            </div>
            <div class="tab-content__midd">
                <p>消费维权</p>
                <p>伤害赔偿</p>
                <p>诈骗</p>
                <p>刑事犯罪</p>
                <p>创业股权</p>
                <p>造谣诽谤</p>
                <p>打架斗殴</p>
                <p>遗嘱公证</p>
                <!--<div class="tab-content__midd__inform tab-content__midd__inform8">-->
                    <!--<p>刑事犯罪</p>-->
                    <!--<p>消费维权</p>-->
                    <!--<p>创业股权</p>-->
                    <!--<p>伤害赔偿</p>-->
                <!--</div>-->
                <!--<div class="tab-content__midd__inform tab-content__midd__inform8">-->
                    <!--<p>遗嘱公证</p>-->
                    <!--<p>造谣诽谤</p>-->
                    <!--<p>诈骗</p>-->
                    <!--<p>打架斗殴</p>-->
                <!--</div>-->
            </div>
            <div class="tab-content__bottom" data-stats-baidu-obj='%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22CT007_baidusearch_07%22%5D%7D'>

                <button class="consulting" data-type="CT007">开始咨询</button>
                <p class="priceText">
                    特惠:
                    <span class="indexPrice"></span>
                    元/分钟  ( <del>原价12元</del>
                    ) 咨询总时长少于1分钟免费
                </p>
            </div>
        </div>
        <button class="tab-content__close"></button>
    </div>
</div>

<div class="tab-pane" id="labour" data-qusType="CT004">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>劳动就业</h1>

            </div>
            <div class="tab-content__midd">
               <!--<div class="tab-content__midd__inform tab-content__midd__inform9">-->
                   <p>工伤赔偿</p>
                   <p>退休返聘</p>
                   <p>试用期</p>
                   <p>劳动合同</p>
                   <p>带薪年假</p>
                   <p>经济赔偿金</p>
                   <p>女性权益</p>
                   <p>社保</p>
                <!--<div class="tab-content__midd__inform tab-content__midd__inform9">-->
                    <!--<p>试用期</p>-->
                    <!--<p>劳动合同</p>-->
                    <!--<p>带薪年假</p>-->
                    <!--<p>退休返聘</p>-->

                <!--</div>-->
                <!--<div class="tab-content__midd__inform tab-content__midd__inform9">-->
                    <!--<p>工伤赔偿</p>-->
                    <!--<p>经济赔偿金</p>-->
                    <!--<p>社保</p>-->
                    <!--<p>女性权益</p>-->

                <!--</div>-->
            </div>
            <div class="tab-content__bottom" data-stats-baidu-obj='%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22CT004_baidusearch_05%22%5D%7D'>

                <button class="consulting" data-type="CT004">开始咨询</button>
               <p class="priceText">
                   特惠:
                   <span class="indexPrice"></span>
                   元/分钟  ( <del>原价12元</del>
                   ) 咨询总时长少于1分钟免费
               </p>
            </div>
        </div>
        <button class="tab-content__close"></button>
    </div>
</div>
</div>
</div>



<div class="backhs"></div>
<div class="menu-container">
    <p class=" baidu-title">服务流程</p>
    <mip-img alt="baidu mip img" src="tempbaidu/images/homeserver.png"></mip-img>
</div>

 <!--<div class="backhs"></div>-->
 <!---->
<div class="menu-container">
	<p class=" baidu-title">用户评价</p>
	<div id="usercomment_content">
	</div>
	<div class="usercommentMore">
        <a data-type="mip" data-title="用户评价" href="usercommentContent">查看更多评价 ></a>
    </div>
</div>
    
<!--
<div class="menu-container">
    <p class=" baidu-title">大家都在问</p>
    <ul class="userwenda">
        <li><span>1. </span> 我想要离婚，孩子的抚养权怎么争取？房产如何分割</li>
        <li><span>2. </span> 我把钱借给了别人，现在他不还，应该怎么办？</li>
    </ul>
</div> -->



<div class="menu-container bottomtip">
    <p>法律服务来源于第三方：分秒律师平台</p>
    <p>客服电话：021-80117789</p>
</div>






<!--预约成功弹层start-->
<div class="reservationSuccess_bg">
    <div></div>
    <div>
       <mip-img alt="baidu mip img"src="tempbaidu/images/Arrow.png"  class="resevationjt"></mip-img>
        <!--<h2>预约成功</h2>-->
        <!--<p>您可在此查看预约信息</p>-->
        <button class="reservationSuccess_close"></button>
    </div>
</div>
<!--预约成功弹层end-->
<!-- 送卡状态遮罩层start -->
<div class="sendcardstatus-bg">
    <div class="sendcardstatus" id="sendcardstatus">
        <p class="cardByAgent_p">新购买的律师卡已存入“我的卡券”</p>
        <p class="gift_P">您的朋友（手机尾号：<em id="phonenum"></em>）送您一张“<em id="cardtype"></em>”</p>
        <div class="sendcardstatus-close"></div>
    </div>
</div>
<!-- 送卡状态遮罩层end -->
<!-- 查看卡状态遮罩层start -->
<div class="checkcardstatus-bg">
    <div class="checkcardstatus-go">直接查看</div>
</div>
<!-- 查看卡状态遮罩层end -->

<!-- 去支付继续问弹框start -->
<div class="popUp_uncheckErr">
    <div class="talking_result text-center">
        <h4>温馨提示</h4>
        <p id="tips"></p>
        <div class="link_btn_uncheckErrConfirm">
            <span class="link_confirm">确认</span>
        </div>
    </div>
</div>
<div class="popUp_confirm">
    <div class="talking_result text-center">
        <h4>温馨提示</h4>
        <p>您咨询的律师已下线或正在服务中</p>
        <div class="link_btn">
            <span data-type="02" id="still_reAsk">希望重试</span>
            <span class="link_others">咨询其他律师</span>
        </div>
    </div>
</div>
<div class="popUp_sysErr">
    <div class="talking_result text-center">
        <h4>温馨提示</h4>
        <p>系统异常，请返回重新咨询</p>
        <div class="link_btn_sysErrConfirm">
            <span class="link_confirm">确认</span>
        </div>
    </div>
</div>
<div class="popUp_unFinishedBillErr">
    <div class="talking_result text-center">
        <h4>温馨提示</h4>
        <p id="messagecontem">您有订单未结束，请等待1分钟后再试</p>
        <div class="link_btn_unFinishedBillErrConfirm">
            <span class="link_confirm">确认</span>
        </div>
    </div>
</div>
<div class="popUp_unpaidErr">
    <div class="talking_result text-center">
        <h4>温馨提示</h4>
        <p>您有订单未支付，请支付后再咨询</p>
        <div class="link_btn_unpaidErrConfirm">
            <span class="link_confirm">确认</span>
        </div>
    </div>
</div>
<div id="popUp" class="popUp">
    <div class="talking_result text-center">
        <h4>温馨提示</h4>
        <p>非服务时间，可尝试为您匹配律师，是否继续？</p>
        <div class="link_btn">
            <span id="link_undo" class="link_undo">取消</span>
            <span id="link_done" class="link_done">确定</span>
        </div>
    </div>
</div>
<!-- 去支付继续问弹框end -->

<!--引导遮罩层start-->
<div class="guidance_bg">
    <div class="guidance_iknow"></div>
</div>
<!--引导遮罩层end-->
<!-- 背景遮罩层start -->
<div class="background_kuang"></div>

</mip-ilaw66-baidutwo-index>
</mip-stats-baidu>
</mip-sina-rem>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

