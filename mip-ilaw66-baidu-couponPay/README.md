# mip-ilaw66-baidu-couponPay

mip-ilaw66-baidu-couponPay 组件说明
支付详情页面

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sina-rem/mip-sina-rem.js
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidu-couponPay/mip-ilaw66-baidu-couponPay.js

## 示例

### 基本用法
```html
<mip-ilaw66-baidu-couponPay>
<mip-sina-rem>
<mip-stats-baidu>
    <script type="application/json">
        {
            "token": "d5a24ec2321d65ed4b781d2fce73c834"
        }
    </script>
</mip-stats-baidu>
    <mip-form url='https://www.baidu.com'>
    <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
    <input type="hidden" id="code" name="code"/>
    <input type="hidden" id="requestId" name="requestId" />
    <input type="hidden" id="cardId" name="cardId" />
    <input type="hidden" id="cardType" name="cardType" />
    <input type="hidden" id="ifUseCard" name="ifUseCard" />
    <input type="hidden" id="questionType" name="questionType" />
    <input type="hidden" id="totalAmountCon" name="totalAmountCon" />
    <input type="hidden" id="uuid" name="uuid" th:value="${session.uuid}"/>
    <input type="hidden" id="phone" name="phone" th:value="${session.phone}"/>
    <input type="hidden" name="savedMoney" id="savedMoneyflag" />
    <input type="hidden" name="couponId" id="couponId" />
    <input type="hidden" name="paytype" id="coupon_paytype" />
    <input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
    </mip-form>
    <div class="layerAsk clearfix">
        <div class="layerAsk__callMinutes">
            <span>通话(<i id="price"></i>元/分钟)</span>
            <span><i id="duration">33</i>分钟</span>
        </div>
        <div class="layerAsk__callMinutes layerAsk__callPrice">
            <span>订单金额</span>
            <span><i id="totalAmount">198</i>元</span>
        </div>
    </div>
    <div class="callList" style="display: block;">
        <div class="callList__each">
            <span>12/05 02:13</span>
            <span>3分钟</span>
            <span>24元</span>
        </div>
        <div class="callList__each">
            <span>12/05 02:13</span>
            <span>3分钟</span>
            <span>24元</span>
        </div>
        <div class="callList__each">
            <span>12/05 02:13</span>
            <span>3分钟</span>
            <span>24元</span>
        </div>
    </div>

    <div class="getOrderFail">
        <h1>未获取订单状态</h1>
        <p>请通话结束后，再刷新订单状态</p>
        <p>若与律师的通话已结束，请刷新重试</p>
        <div class="freshOrder">点击刷新</div>
    </div>
    <!-- 卡券支付页面弹窗B -->

    <!-- 卡券使用确认弹窗 E -->
    <!-- 支付弹窗提示 B-->
    <div class="pay__popUp_success" style="display: none;" id="pay__popUp">
        <div class="layer__wrapper"></div>
        <div class="pay__popLayer">
            <img src="images/wx_bg_success.png" />
            <span>支付成功</span>
            <div id="js-pay-btn-success" class="btnOfBtn">确定</div>
        </div>
    </div>
    <div class="pay__popUp_fail" style="display: none;" id="pay__popUp">
        <div class="layer__wrapper"></div>
        <div class="pay__popLayer">
            <img src="images/wx_bg_fail.png" />
            <span>您已支付过该订单</span>
            <div id="js-pay-btn-fail">确定</div>
        </div>
    </div>
    <!-- 支付弹窗提示 E -->
    <!-- back键离开支付提示 B -->
    <div class="back__pop" style="display:none;" id="back__pop">
        <div class="layer__wrapper"></div>
        <div class="back__popLayer">
            <span style="left: 2.54rem">温馨提示</span>
            <span>请支付订单,让律师获得咨询收入</span>
            <div class="back-leave" id="js-back-leave">
                狠心离开
            </div>
            <div class="back-continue" id="js-back-continue">
                继续支付
            </div>
        </div>
    </div>
    <!-- back键离开支付提示 E -->
    <footer class="clearfix">
        <div id="js-pay-button">立即支付 ¥ <i id="unpaidAmount"></i></div>
    </footer>
</mip-sina-rem>
</mip-ilaw66-baidu-couponPay>
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

