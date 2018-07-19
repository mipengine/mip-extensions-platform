# mip-ilaw66-baidu-index

mip-ilaw66-baidu-index 组件说明
法率网首页

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidu-index/mip-ilaw66-baidu-index.js

## 示例

### 基本用法
```html
<mip-ilaw66-baidu-index>

<mip-form url='https://www.baidu.com'>
   <input type="hidden" id="popValue" th:name="popValue" th:value="${popValue}" />
    <input type="hidden" id="userId" name="channel" th:value="${session.userId}" />
    <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
    <input type="hidden" id="channel" name="channel" value="baidusearch" />
    <input type="hidden" id="price" name="price" th:value="${price}"/>
</mip-form>


<div class="header_block baidu">
    <span class="glyphicon glyphicon-menu-left pull-left headerlf5 " ></span>
    分秒律师
    <span class="glyphicon   pull-right headerright"> <mip-img  width="20px"height= "20px" src="tempbaidu/images/user.png"   ></mip-img></span>
</div>



<div>
<mip-carousel defer="1000"   layout="responsive"   width="750"   height="370" indicatorId="mip-carousel-example"  >
    <mip-img      src="tempbaidu/images/banner1.png"> </mip-img>
    <mip-img     src="tempbaidu/images/banner2.png">  </mip-img>
    <mip-img        src="tempbaidu/images/banner3.png"> </mip-img>
</mip-carousel>

<div class="mip-carousel-indicator-wrapper">
    <div class="mip-carousel-indicatorDot" id="mip-carousel-example">
        <div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>
        <div class="mip-carousel-indecator-item"></div>
        <div class="mip-carousel-indecator-item"></div>
    </div>
</div>


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
                <h2>婚姻家庭</h2>
            </div>
            <div class="tab-content__midd">
                <div class="tab-content__midd__inform tab-content__midd__inform1">
                    <p>协议离婚</p>
                    <p>财产分割</p>
                    <p>诉讼离婚</p>
                    <p>房产分割</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform1">
                    <p>家庭暴力</p>
                    <p>第三者</p>
                    <p>子女抚养权</p>
                    <p>抚养费</p>
                    <div class="jzkc"></div>
                </div>
            </div>
            <div class="tab-content__bottom">

                <button class="consulting" data-type="CT001">开始咨询</button>
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
                <h2>资金借贷</h2>
            </div>
            <div class="tab-content__midd">
                <div class="tab-content__midd__inform tab-content__midd__inform2">
                    <p>借钱问题</p>
                    <p>贷款问题</p>
                    <p>保证人责任</p>
                    <p>担保人责任</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform2">
                    <p>欠钱不还</p>
                    <p>债务纠纷</p>
                    <p>利息怎么算</p>
                    <p>欠款人跑路</p>
                </div>
            </div>
            <div class="tab-content__bottom">

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
                <div class="tab-content__midd__inform tab-content__midd__inform3">
                    <p>责任认定</p>
                    <p>上班时工伤</p>
                    <p>保险理赔</p>
                    <p>事故私了</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform3">
                    <p>赔多少钱</p>
                    <p>哪些需要赔</p>
                   <p>车被扣处理</p>
                    <p>伤残鉴定</p>

                <div class="bxgh"></div>
                <div class="dqcl"></div>

        </div>
    </div>
    <div class="tab-content__bottom">

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
                    <p>医疗纠纷</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform4">
                    <p>产品质量</p>
                    <p>宠物伤人</p>
                    <!--<p>欠债不还</p>
                <p>失联跑路</p>
                -->
                <div class="cpzl"></div>
                <div class="cwsr"></div>
                <!--<div></div>
            <div></div>
            -->
        </div>
    </div>
    <div class="tab-content__bottom">
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

<!-- <div class="tab-pane" id="work" data-qusType="CT010">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>婚姻家庭</h1>

            </div>
            <div class="tab-content__midd">
                <div class="tab-content__midd__inform tab-content__midd__inform5">
                    <p>协议离婚</p>
                    <p>诉讼离婚</p>
                    <p>房产分割</p>
                    <p>财产分割</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform5">
                    <p>子女抚养权</p>
                    <p>抚养费</p>
                    <p>第三者</p>
                    <p>家庭暴力</p>
                </div>
            </div>
            <div class="tab-content__bottom">

                <button class="consulting" data-type="CT010">开始咨询</button>
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
</div> -->

<div class="tab-pane" id="room" data-qusType="CT002">
    <div class="tab-content__bg">
        <div class="tab-content__inform">
            <div class="tab-content__top">
                <h1>房产物业</h1>

            </div>
            <div class="tab-content__midd">
                <div class="tab-content__midd__inform tab-content__midd__inform6">

                    <p>拆迁问题</p>
                    <p>买房卖房</p>
                    <p>租房问题</p>
                    <p>公摊区域问题</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform6">
                    <p>中介纠纷</p>
                    <p>物业纠纷</p>
                    <p>装修纠纷</p>
                    <p>停车问题</p>

                </div>
            </div>
            <div class="tab-content__bottom">

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
                <div class="tab-content__midd__inform tab-content__midd__inform7">
                    <p>对方违约</p>
                    <p>合同争议</p>
                    <p>失联跑路</p>
                    <p>去哪打官司</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform7">
                    <p>拖欠贷款</p>
                    <p>房产查封</p>
                    <p>账户冻结</p>
                    <p>找财产线索</p>
                </div>
            </div>
            <div class="tab-content__bottom">

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
                <div class="tab-content__midd__inform tab-content__midd__inform8">
                    <p>刑事犯罪</p>
                    <p>消费维权</p>
                    <p>遗产继承</p>
                    <p>邻里纠纷</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform8">
                    <p>执法不严</p>
                    <p>网络暴力</p>
                    <p>名誉受损</p>
                    <p>被诽谤</p>

                </div>
            </div>
            <div class="tab-content__bottom">

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
                <div class="tab-content__midd__inform tab-content__midd__inform9">

                    <p>工伤赔偿</p>
                    <p>退休返聘</p>
                    <p>女性权益</p>
                    <p>社保</p>
                </div>
                <div class="tab-content__midd__inform tab-content__midd__inform9">
                    <p>试用期</p>
                    <p>带薪年假</p>
                    <p>劳动合同</p>
                    <p>经济赔偿金</p>

                </div>
            </div>
            <div class="tab-content__bottom">

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
<div class="backhs"></div>

<!--
<div class="menu-container">
    <p class=" baidu-title">大家都在问</p>
    <ul class="userwenda">
        <li><span>1. </span> 我想要离婚，孩子的抚养权怎么争取？房产如何分割</li>
        <li><span>2. </span> 我把钱借给了别人，现在他不还，应该怎么办？</li>
    </ul>
</div> -->

<div class="backhs"></div>

<div class="menu-container bottomtip">
    <p>法率服务来源于第三方：分秒律师平台</p>
    <p>客服电话：021-80117789</p>
</div>







<!--预约成功弹层start-->
<div class="reservationSuccess_bg">
    <div></div>
    <div>
       <mip-img alt="baidu mip img"src="images/reservation_arrow.png" ></mip-img>
        <h2>预约成功</h2>
        <p>您可在此查看预约信息</p>
        <button class="reservationSuccess_close">我知道了</button>
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
        <p>您有订单未结束，请等待1分钟后再试</p>
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

</mip-ilaw66-baidu-index>
```

## 属性
需要给组件添加属性id，名称为frmLogin
### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

