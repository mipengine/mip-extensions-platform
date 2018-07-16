# mip-couponPay

mip-couponPay 组件说明
支付详情页面

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-couponPay/mip-couponPay.js

## 示例

### 基本用法
```html
<mip-couponPay>
	<div class="header_block">
		<span class="glyphicon glyphicon-menu-left pull-left" style="left:5px" onclick="window.history.back(-1)" ></span>支付详情
	</div>
	<input type="hidden" id="requestId" name="requestId" />
    <input type="hidden" id="cardId" name="cardId" />
    <input type="hidden" id="cardType" name="cardType" />
    <input type="hidden" id="ifUseCard" name="ifUseCard" />
    <input type="hidden" id="questionType" name="questionType" />
    <div class="orderlist-layout orderlist-layout__order" id="sky">
	 <template type="mip-mustache" id="mip-template-id">
		{{#beatles}}
		<li>{{name}}</li>
		{{/beatles}}
	 </template>
	</div>
    <div class="layerAsk clearfix">
        <div class="layerAsk__callMinutes">
            <span>通话(<i id="price"></i>元/分钟)</span>
            <span><i id="duration"></i>分钟</span>
        </div>
        <div class="layerAsk__callMinutes layerAsk__callPrice">
            <span>订单金额</span>
            <span><i id="totalAmount"></i>元</span>
        </div>
    </div>
    <div class="callList"></div>
    <div class="getOrderSuccess">
        <div class="choose_pay_type_wrapper clearfix">
            <div class="payType_choose ">选择支付方式</div>
        </div>
        <div class="payType clearfix">
            <!--<div class="payType_choose clearfix">选择支付方式</div>-->
            <div class="payType_coupon clearfix payType_coupon_use">
                <span class="coupon_icon"></span>
                <span class="nameOfCard"></span>
                <span>
                        <p style="text-align: right">可节省<i id="savedMoney"></i>元</p></span>
                <span class="coupon_arrow" id="js-coupon_arrow"></span>
            </div>
            <div class="payType_cash clearfix payType_bcm sel_pay" data-no="5" id="pay-bcm">
                <span class="cash_icon"></span>
                <span>交通银行支付</span>
                <span class="cash_allowed1 pay_icon"></span>
                <span class="cash_allowed2 pay_icon" style="display:none"></span>
            </div>
            <div class="payType_cash clearfix payType_weixin sel_pay" data-no="2" id="pay-wechat">
                <span class="cash_icon"></span>
                <span>微信支付</span>
                <span class="cash_allowed1 pay_icon"></span>
                <span class="cash_allowed2 pay_icon" style="display:none"></span>
            </div>
            <div class="payType_cash clearfix payType_jingdong sel_pay" data-no="7">
                <span class="cash_icon"></span>
                <span>京东支付</span>
                <span class="cash_allowed1 pay_icon"></span>
                <span class="cash_allowed2 pay_icon" style="display:none"></span>
            </div>
            <div class="payType_cash clearfix  payType_yinlian sel_pay" data-no="4">
                <span class="cash_icon"></span>
                <span>云闪付</span>
                <b></b>
                <label>【推荐】</label>
                <span class="cash_allowed1 pay_icon"></span>
                <span class="cash_allowed2 pay_icon" style="display:none"></span>
            </div>
            <div class="payType_cash clearfix payType_cmbc sel_pay" data-no="1" style="display: none;">
                <span class="cash_icon"></span>
                <span>民生付</span>
                <span class="cash_allowed1 pay_icon"></span>
                <span class="cash_allowed2 pay_icon" style="display:none"></span>
            </div>
            <div class="payType_cash clearfix payType_apply sel_pay" data-no="3">
                <span class="cash_icon"></span>
                <span>支付宝</span>
                <span class="cash_allowed1 pay_icon"></span>
                <span class="cash_allowed2 pay_icon" style="display:none"></span>
            </div>
            <div class="payType_cash clearfix payType_tonglian sel_pay" data-no="6">
                <span class="cash_icon"></span>
                <span>通联支付</span>
                <span class="cash_allowed1 pay_icon"></span>
                <span class="cash_allowed2 pay_icon" style="display:none"></span>
            </div>
        </div>
    </div>
    <div class="getOrderFail">
        <h1>未获取订单状态</h1>
        <p>请通话结束后，再刷新订单状态</p>
        <p>若与律师的通话已结束，请刷新重试</p>
        <div class="freshOrder">点击刷新</div>
    </div>
    <!-- 卡券支付页面弹窗B -->
    <div id="pay__pop">
        <div class="layer__wrapper " id="js-layer__wrapper"></div>
        <div class="popLayer ">
            <div class="pop_close" id="js-pop_close"></div>
            <div class="pop_no_coupon payType_coupon_use_pop" id="js-couponUse">不使用卡券</div>
        </div>
        <!-- ================== -->
    </div>
    <!-- 卡券支付页面弹窗E -->
    <!--  卡券使用确认弹窗 B -->
    <div class="couponUse__popUp" id="couponUse__popUp" style="display: none">
        <div class="couponUse__popUp_layer__wrapper"></div>
        <div class="couponUse__popUp__popLayer">
            <span>确认使用<i style="font-style: normal;" id="card_pop_name"></i>抵消咨询费用</span>
            <div class="couponUse__popUp_no">取消</div>
            <div class="couponUse__popUp_yes" id="confirmBtn">确认</div>
        </div>
    </div>
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
            <span>温馨提示</span>
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
        <div class="game_div"></div>
        <div class="footer-info">
            <span>待支付:</span><span>¥ <i id="unpaidAmount"></i></span>
        </div>
        <div id="js-pay-button">立即支付</div>
    </footer>
</mip-couponPay>
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

