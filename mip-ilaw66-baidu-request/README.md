# mip-ilaw66-baidu-request

mip-ilaw66-baidu-request 组件说明
匹配律师页

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js
所需脚本|https://c.mipcdn.com/static/v1/mip-cdel-swiper/mip-cdel-swiper.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidu-popup/mip-ilaw66-baidu-popup.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidu-request/mip-ilaw66-baidu-request.js

## 示例

### 基本用法
```html
<mip-ilaw66-baidu-request>
    <input type="hidden" id="lawyerId" name="lawyerId" />
        <input type="hidden" id="requestId" name="requestId" />
        <input type="hidden" id="questionType" name="questionType" />
        <input type="hidden" id="askingType" name="askingType" />
        <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
        <input type="hidden" id="channel" name="channel" th:value="${session.channel}" />   
    			<div class="top_header">
                        <span class="glyphicon glyphicon-menu-left pull-left"></span>
                        <div class="div_header">问律师</div>
                    </div>
                
                    <div class="requestText">
                        <p>已通知<i class="jingxuanLawyer_num"></i>位律师,匹配中...</p>
                        <p>精选过程不计费，大约10秒</p>
                        <div class="bottomtime">
                            <i class="countdownTime"></i>秒
                            <div class="countdownCircle">
                                <div class="wrapper left">
                                    <div class="circleProgress leftcircle"></div>
                                </div>
                                <div class="wrapper right">
                                    <div class="circleProgress rightcircle"></div>
                                </div>
                            </div>
                        </div>
                        <p class="tocancle">取消咨询</p>
                    </div>
                    <div class="jingxuan_middle">
                        <div class="countdownRing">
                            <mip-cdel-swiper container=".swiper-container">
                                <script type="application/json">
                                    {
                                        "autoplay": 2000
                                    }
                                </script>
                                <div class="swiper-container">
                                    <div class="swiper-wrapper" id="mip-template-lawyerImg">
                                        <template type="mip-mustache">
                                            {{#list}}
                                            <div class="swiper-slide">
                                                <mip-img class="mip_img" src="{{identifyPhoto}}"></mip-img>
                                                <p>{{name}}</p>
                                            </div>
                                            {{/list}}
                                        </template>
                                    </div>
                                </div>
                            </mip-cdel-swiper>
                        </div>
                    </div>
                    <div id="popUp_sysErr" class="popUp_sysErr">
                        <div class="talking_result text-center">
                            <h4>温馨提示</h4>
                            <p>系统异常，请返回重新咨询</p>
                            <div class="link_btn_sysErrConfirm">
                                <span class="link_confirm">确认</span>
                            </div>
                        </div>
                    </div>
                    <div id="popUp_unFinishedBillErr" class="popUp_unFinishedBillErr">
                        <div class="talking_result text-center">
                            <h4>温馨提示</h4>
                            <p>您有订单未结束，请等待1分钟后再试</p>
                            <div class="link_btn_unFinishedBillErrConfirm">
                                <span class="link_confirm">确认</span>
                            </div>
                        </div>
                    </div>
                    <div id="popUp_unpaidErr" class="popUp_unpaidErr">
                        <div class="talking_result text-center">
                            <h4>温馨提示</h4>
                            <p>您有订单未支付，请支付后再咨询</p>
                            <div id="link_btn_unpaidErrConfirm" class="link_btn_unpaidErrConfirm">
                                <span class="link_confirm">确认</span>
                            </div>
                        </div>
                    </div>
</mip-ilaw66-baidu-request>
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

