# mip-ilaw66-falv-fvindex

mip-ilaw66-falv-fvindex 组件说明
点击实现对应弹框出现,以及异步调取接口，返回数据展现咨询类别
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-falv-fvindex/mip-ilaw66-falv-fvindex.js

## 示例

### 基本用法
```html
<mip-ilaw66-falv-fvindex>
     <div class="main_block">
    	<mip-form url='https://www.baidu.com'>
        <input type="hidden" id="popValue" th:name="popValue" th:value="${popValue}" />
        <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
        <input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
        <input type="hidden" id="price" name="price" th:value="${price}"/>
        <input type="hidden" id="userId" name="userId" th:value="${session.userId}" />
        </mip-form>
        <!--隐藏盒子-->
        <div class="popUp_clickMore">
            <div id="box-1" class="hidden-box hidden-loc-index">
                <div class="myRelative-bg__accountBalance">
                    <p id="accountBalance"></p>
                </div>
                <ul class="myRelative-bg__list">
                    <li class="li-margin" id="orderlist"><p>我的订单</p></li>
                    <li class="li-margin" id="mycardandcoupons" onclick="location.href='mycardandcoupons'"><p>我的卡券</p></li>
                    <!--<li class="li-margin" id="account"><p>账户余额</p></li>-->
                    <li class="li-margin" id="account"><a href="lawyerlist" ><p class="wxl_p">我的律师</p></a></li>
                </ul>
                <div class="myRelative-bg__service">
                    客服
                    <!--<p>021-80117789</p>-->
                    <a href="tel:021-80117789">021-80117789</a>
                    <p>工作时间：9:00~18:00</p>
                </div>
            </div>
        </div>
            <!--<div class="top_bg"></div>-->
        <div class="swiper-container swiper-container__banner swiper-container-horizontal">
            <div class="swiper-wrapper" id="bannerImgDiv">
                <div class="swiper-slide">
                    <mip-img src="images/banner2.png" style="width: 100%"></mip-img>
                </div>
                <div class="swiper-slide">
                    <mip-img src="images/banner1.png" class="bg_banner_tonglian_active" style="width: 100%"></mip-img>
                </div>
            </div>
            <div class="swiper-pagination" style="top: 1.45rem"></div>
            <div class="title_more">
                <mip-img src="images/my_@2x.png" alt=""></mip-img>
            </div>
        </div>
        <div class="slogonMsg"></div>
        <div class="menu-container">
            <p class="otherservice_baoxianshi">选择你要咨询的问题</p>
        <ul class="nav nav-tabs" role="tablist">
            <li><a href="#marriage" role="tab" data-toggle="tab">
                <div class="media" data-type="CT015" data-href="marriage" data-num="01">
                    <mip-img src="images/1.png"></mip-img>
                    <p class="menu-list__context">保险展业</p>
                </div>
            </a></li>
            <li><a href="#property" role="tab" data-toggle="tab">
                <div class="media" data-type="CT001" data-href="property" data-num="02">
                    <mip-img src="images/2.png"></mip-img>
                    <p class="menu-list__context">婚姻家庭</p>
                </div>
            </a></li>
            <li class="menu-list__item media_hot"><a href="#traffic" role="tab" data-toggle="tab">
                <div class="media" data-type="CT002" data-href="traffic" data-num="03">
                    <mip-img src="images/3.png"></mip-img>
                    <p class="menu-list__context">房产物业</p>
                </div>
            </a></li>
        </ul>                   
        </div>
        <div class="menu-container">
        <ul class="nav nav-tabs" role="tablist">
            <li><a href="#lending" role="tab" data-toggle="tab">
                <div class="media" data-type="CT003" data-href="lending" data-num="04">
                    <mip-img src="images/4.png"></mip-img>
                    <p class="menu-list__context">交通意外</p>
                </div>
            </a></li>
            <li><a href="#heritage" role="tab" data-toggle="tab">
                <div class="media" data-type="CT006" data-href="heritage" data-num="05">
                    <mip-img src="images/5.png"></mip-img>
                    <p class="menu-list__context">民间借贷</p>
                </div>
            </a></li>
            <li><a href="#contract" role="tab" data-toggle="tab">
                <div class="media" data-type="CT004" data-href="contract" data-num="06" >
                    <mip-img src="images/6.png"></mip-img>
                    <p class="menu-list__context">劳动用工</p>
                </div>
            </a></li>
        </ul>        
        </div>
        <div class="menu-container">
        <ul class="nav nav-tabs" role="tablist">
            <li><a href="#work" role="tab" data-toggle="tab">
                <div class="media" data-type="CT011" data-href="work" data-num="07">
                    <mip-img src="images/7.png"></mip-img>
                    <p class="menu-list__context">消费维权</p>
                </div>
            </a></li>
            <li><a href="#injury" role="tab" data-toggle="tab">
                <div class="media" data-type="CT010" data-href="injury" data-num="08">
                    <mip-img src="images/8.png">	</mip-img>
                    <p class="menu-list__context">人身伤害</p>
                </div>
            </a></li>
            <li><a href="#other" role="tab" data-toggle="tab">
                <div class="media" data-type="CT007" data-href="other" data-num="09">
                    <mip-img src="images/9.png"></mip-img>
                    <p class="menu-list__context">其他问题</p>
                </div>
            </a></li>
        </ul>          
        <div class="tab-content">
            <div class="tab-pane" id="marriage" data-qusType = "CT015">
                <div class="tab-content__bg">
                    <div class="tab-content__inform">
                        <div class="tab-content__top">
                            <h1>保险展业</h1>
                            <p class="priceText">限时:<span class="indexPrice"></span>元/分钟  (<del>原价8元/分钟</del>) 少于60秒免费</p>
                        </div>
                        <div class="tab-content__midd">
                            <div class="tab-content__midd__inform tab-content__midd__inform1">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <p>保险合同</p>
                                <p>条款争议</p>
                                <p>免责条款</p>
                                <p>财富传承</p>
                            </div>
                            <div class="tab-content__midd__inform tab-content__midd__inform1">
                                <p>保险理赔</p>
                                <p>保单设计</p>
                                <p>法商相关</p>
                                <p>客户疑问</p>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="tab-content__bottom">
                            <div class="tab-content__bottom__inform">
                                <p>开始咨询</p>
                                <p><i>1分钟</i>律师回电</p>
                                <p>满意付费</p>
                            </div>
                            <button id="js-consultingCT015" class="consulting" data-type="CT015">开始咨询</button>
                            <p id="js-radio-ruleCT015" class="radio-rule rule-checked" data-type="CT015">
                                <mip-img id="radio-rule-iconCT015" src="images/button_ok_c.png" alt="" class="isChecked"></mip-img> <span>我同意</span>
                                <a  class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
            <div class="tab-pane" id="property" data-qusType = "CT001">
                <div class="tab-content__bg">
                    <div class="tab-content__inform">
                        <div class="tab-content__top">
                            <h1>婚姻家庭</h1>
                            <p  class="priceText">限时:<span class="indexPrice"></span>元/分钟  (<del>原价8元/分钟</del>) 少于60秒免费</p>
                        </div>
                        <div class="tab-content__midd">
                            <div class="tab-content__midd__inform tab-content__midd__inform2">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <p>抚养费</p>
                                <p>第三者</p>
                                <p>协议离婚</p>
                                <p>诉讼离婚</p>
                            </div>
                            <div class="tab-content__midd__inform tab-content__midd__inform2">
                                <p>家庭暴力</p>
                                <p>财产分割</p>
                                <p>房产分割</p>
                                <p>子女抚养权</p>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="tab-content__bottom">
                            <div class="tab-content__bottom__inform">
                                <p>开始咨询</p>
                                <p><i>1分钟</i>律师回电</p>
                                <p>满意付费</p>
                            </div>
                            <button id="js-consultingCT001" class="consulting" data-type="CT001">开始咨询</button>
                            <p id="js-radio-ruleCT001" class="radio-rule rule-checked" data-type="CT001">
                                <mip-img id="radio-rule-iconCT001" src="images/button_ok_c.png" alt="" class="isChecked"></mip-img> <span>我同意</span>
                                <a  class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
            <div class="tab-pane" id="traffic" data-qusType = "CT002">
                <div class="tab-content__bg">
                    <div class="tab-content__inform">
                        <div class="tab-content__top">
                            <h1>房产物业</h1>
                            <p  class="priceText">限时:<span class="indexPrice"></span>元/分钟  (<del>原价8元/分钟</del>) 少于60秒免费</p>
                        </div>
                        <div class="tab-content__midd">
                            <div class="tab-content__midd__inform tab-content__midd__inform3">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <p>拆迁问题</p>
                                <p>买房卖房</p>
                                <p>租房问题</p>
                                <p>公共区域问题</p>
                            </div>
                            <div class="tab-content__midd__inform tab-content__midd__inform3">
                                <p>中介纠纷</p>
                                <p>物业纠纷</p>
                                <p>停车位问题</p>
                                <p>装修纠纷</p>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="tab-content__bottom">
                            <div class="tab-content__bottom__inform">
                                <p>开始咨询</p>
                                <p><i>1分钟</i>律师回电</p>
                                <p>满意付费</p>
                            </div>
                            <button id="js-consultingCT002" class="consulting" data-type="CT002">开始咨询</button>
                            <p id="js-radio-ruleCT002" class="radio-rule rule-checked" data-type="CT002">
                                <mip-img id="radio-rule-iconCT002" src="images/button_ok_c.png" alt="" class="isChecked"></mip-img> <span>我同意</span>
                                <a  class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
            <div class="tab-pane" id="lending" data-qusType = "CT003">
                <div class="tab-content__bg">
                    <div class="tab-content__inform">
                        <div class="tab-content__top">
                            <h1>交通意外</h1>
                            <p  class="priceText">限时:<span class="indexPrice"></span>元/分钟  (<del>原价8元/分钟</del>) 少于60秒免费</p>
                        </div>
                        <div class="tab-content__midd">
                            <div class="tab-content__midd__inform tab-content__midd__inform4">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <p>事故责任认定</p>
                                <p>上班期间工伤</p>
                                <p>车辆被扣处理</p>
                                <p>事故私了</p>
                            </div>
                            <div class="tab-content__midd__inform tab-content__midd__inform4">
                                <p>哪些需要赔</p>
                                <p>赔多少钱</p>
                                <p>保险理赔</p>
                                <p>伤残鉴定</p>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="tab-content__bottom">
                            <div class="tab-content__bottom__inform">
                                <p>开始咨询</p>
                                <p><i>1分钟</i>律师回电</p>
                                <p>满意付费</p>
                            </div>
                            <button id="js-consultingCT003" class="consulting" data-type="CT003">开始咨询</button>
                            <p id="js-radio-ruleCT003" class="radio-rule rule-checked" data-type="CT003">
                                <mip-img id="radio-rule-iconCT003" src="images/button_ok_c.png" alt="" class="isChecked"></mip-img> <span>我同意</span>
                                <a  class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
            <div class="tab-pane" id="work" data-qusType = "CT011">
                <div class="tab-content__bg">
                    <div class="tab-content__inform">
                        <div class="tab-content__top">
                            <h1>消费维权</h1>
                            <p  class="priceText">限时:<span class="indexPrice"></span>元/分钟  (<del>原价8元/分钟</del>) 少于60秒免费</p>
                        </div>
                        <div class="tab-content__midd">
                            <div class="tab-content__midd__inform tab-content__midd__inform7">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <p>强买强卖</p>
                                <p>欺诈消费</p>
                                <p>产品质量差</p>
                                <p>售后服务差</p>
                            </div>
                            <div class="tab-content__midd__inform tab-content__midd__inform7">
                                <p>网购问题</p>
                                <p>微商问题</p>
                                <p>快递问题</p>
                                <p>电视购物</p>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="tab-content__bottom">
                            <div class="tab-content__bottom__inform">
                                <p>开始咨询</p>
                                <p><i>1分钟</i>律师回电</p>
                                <p>满意付费</p>
                            </div>
                            <button id="js-consultingCT011" class="consulting" data-type="CT011">开始咨询</button>
                            <p id="js-radio-ruleCT011" class="radio-rule rule-checked" data-type="CT011">
                                <mip-img id="radio-rule-iconCT011" src="images/button_ok_c.png" alt="" class="isChecked"></mip-img> <span>我同意</span>
                                <a  class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
            <div class="tab-pane" id="contract" data-qusType = "CT004">
                <div class="tab-content__bg">
                    <div class="tab-content__inform">
                        <div class="tab-content__top">
                            <h1>劳动用工</h1>
                            <p  class="priceText">限时:<span class="indexPrice"></span>元/分钟  (<del>原价8元/分钟</del>) 少于60秒免费</p>
                        </div>
                        <div class="tab-content__midd">
                            <div class="tab-content__midd__inform tab-content__midd__inform6">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <p>工伤索赔</p>
                                <p>退休返聘</p>
                                <p>女性维权</p>
                                <p>社保</p>
                            </div>
                            <div class="tab-content__midd__inform tab-content__midd__inform6">
                                <p>试用期</p>
                                <p>带薪休假</p>
                                <p>劳动用工</p>
                                <p>经济补偿金</p>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="tab-content__bottom">
                            <div class="tab-content__bottom__inform">
                                <p>开始咨询</p>
                                <p><i>1分钟</i>律师回电</p>
                                <p>满意付费</p>
                            </div>
                            <button id="js-consultingCT004" class="consulting" data-type="CT004">开始咨询</button>
                            <p id="js-radio-ruleCT004" class="radio-rule rule-checked" data-type="CT004">
                                <mip-img id="radio-rule-iconCT004" src="images/button_ok_c.png" alt="" class="isChecked"></mip-img> <span>我同意</span>
                                <a  class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
            <div class="tab-pane" id="heritage" data-qusType = "CT006">
                <div class="tab-content__bg">
                    <div class="tab-content__inform">
                        <div class="tab-content__top">
                            <h1>民间借贷</h1>
                            <p  class="priceText">限时:<span class="indexPrice"></span>元/分钟  (<del>原价8元/分钟</del>) 少于60秒免费</p>
                        </div>
                        <div class="tab-content__midd">
                            <div class="tab-content__midd__inform tab-content__midd__inform5">
	                            <div></div>
	                            <div></div>
	                            <div></div>
	                            <div></div>
	                            <p>借钱问题</p>
	                            <p>贷款问题</p>
	                            <p>保证人责任</p>
	                            <p>担保人责任</p>
                            </div>
                            <div class="tab-content__midd__inform tab-content__midd__inform5">
	                            <p>利息怎么算</p>
	                            <p>债务纠纷处理</p>
	                            <p>欠钱不还</p>
	                            <p>欠款人跑路</p>
	                            <div></div>
	                            <div></div>
	                            <div></div>
	                            <div></div>
                            </div>
                        </div>
                        <div class="tab-content__bottom">
                            <div class="tab-content__bottom__inform">
                                <p>开始咨询</p>
                                <p><i>1分钟</i>律师回电</p>
                                <p>满意付费</p>
                            </div>
                            <button id="js-consultingCT006" class="consulting" data-type="CT006">开始咨询</button>
                            <p id="js-radio-ruleCT006" class="radio-rule rule-checked" data-type="CT006">
                                <mip-img id="radio-rule-iconCT006" src="images/button_ok_c.png" alt="" class="isChecked"><mip-img> <span>我同意</span>
                                <a class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
            <div class="tab-pane" id="injury" data-qusType = "CT010">
                <div class="tab-content__bg">
                    <div class="tab-content__inform">
                        <div class="tab-content__top">
                            <h1>人身伤害</h1>
                            <p  class="priceText">限时:<span class="indexPrice"></span>元/分钟  (<del>原价8元/分钟</del>) 少于60秒免费</p>
                        </div>
                        <div class="tab-content__midd">
                            <div class="tab-content__midd__inform tab-content__midd__inform8">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <p>打架受伤</p>
                                <p>在校受伤</p>
                                <p>监护人责任</p>
                                <p>宠物伤人</p>
                            </div>
                            <div class="tab-content__midd__inform tab-content__midd__inform8">
                                <p>商品质量受损</p>
                                <p>伤残索赔</p>
                                <p>精神损害索赔</p>
                                <p>医疗纠纷</p>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="tab-content__bottom">
                            <div class="tab-content__bottom__inform">
                                <p>开始咨询</p>
                                <p><i>1分钟</i>律师回电</p>
                                <p>满意付费</p>
                            </div>
                            <button id="js-consultingCT010" class="consulting" data-type="CT010">开始咨询</button>
                            <p id="js-radio-ruleCT010" class="radio-rule rule-checked" data-type="CT010">
                                <mip-img id="radio-rule-iconCT010" src="images/button_ok_c.png" alt="" class="isChecked"></mip-img> <span>我同意</span>
                                <a  class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
            <div class="tab-pane" id="other" data-qusType = "CT007">
                <div class="tab-content__bg">
                    <div class="tab-content__inform">
                        <div class="tab-content__top">
                            <h1>其他问题</h1>
                            <p  class="priceText">限时:<span class="indexPrice"></span>元/分钟  (<del>原价8元/分钟</del>) 少于60秒免费</p>
                        </div>
                        <div class="tab-content__midd">
                            <div class="tab-content__midd__inform tab-content__midd__inform9">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <p>刑事犯罪</p>
                                <p>消费维权</p>
                                <p>名誉受损</p>
                                <p>创业股权</p>
                            </div>
                            <div class="tab-content__midd__inform tab-content__midd__inform9">
                                <p>公安执法</p>
                                <p>网络言论</p>
                                <p>名誉权</p>
                                <p>合同纠纷</p>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="tab-content__bottom">
                            <div class="tab-content__bottom__inform">
                                <p>开始咨询</p>
                                <p><i>1分钟</i>律师回电</p>
                                <p>满意付费</p>
                            </div>
                            <button id="js-consultingCT007" class="consulting" data-type="CT007">开始咨询</button>
                            <p id="js-radio-ruleCT007" class="radio-rule rule-checked" data-type="CT007">
                                <mip-img id="radio-rule-iconCT007" src="images/button_ok_c.png" alt="" class="isChecked"></mip-img> <span>我同意</span>
                                <a  class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
        </div>             
        </div>

    </div>

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
</mip-ilaw66-falv-fvindex>
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

