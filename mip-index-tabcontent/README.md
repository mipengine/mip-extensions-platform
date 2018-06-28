# mip-index-tabcontent

mip-index-tabcontent 组件说明
用于所在行业对应所需要用哪个弹框，一一对应。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-index-tabcontent/mip-index-tabcontent.js

## 示例

### 基本用法
```html
<mip-index-tabcontent>
    <div class="menu-container">
            <p class="otherservice_baoxianshi">选择你要咨询的问题</p>
        <ul class="nav nav-tabs" role="tablist">
            <li><a href="#marriage" role="tab" data-toggle="tab">
                <div class="media" data-type="CT015" data-href="marriage" data-num="01">
                    111
                    <p class="menu-list__context">保险展业</p>
                </div>
            </a></li>
            <li><a href="#property" role="tab" data-toggle="tab">
                <div class="media" data-type="CT001" data-href="property" data-num="02">
                    222
                    <p class="menu-list__context">婚姻家庭</p>
                </div>
            </a></li>
            <li class="menu-list__item media_hot"><a href="#traffic" role="tab" data-toggle="tab">
                <div class="media" data-type="CT002" data-href="traffic" data-num="03">
                    333
                    <p class="menu-list__context">房产物业</p>
                </div>
            </a></li>
        </ul>                   
        </div>
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
                                <img id="radio-rule-iconCT015" src="images/button_ok_c.png" alt="" class="isChecked"/> <span>我同意</span>
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
                                <img id="radio-rule-iconCT001" src="images/button_ok_c.png" alt="" class="isChecked"/> <span>我同意</span>
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
                                <img id="radio-rule-iconCT002" src="images/button_ok_c.png" alt="" class="isChecked"/> <span>我同意</span>
                                <a  class="rulePA">《分秒律师用户注册及服务协议》</a>
                            </p>
                        </div>
                    </div>
                    <button class="tab-content__close"></button>
                </div>
            </div>
        </div>
</mip-index-tabcontent>
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

