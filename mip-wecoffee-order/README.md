# mip-wecoffee-order

mip-wecoffee-order weecoffee 购物车列表

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js,https://c.mipcdn.com/static/v1/mip-bind/mip-bind.js,https://deploy-preview-1119--mip-extensions.netlify.com/mip-toggle/1.0.0/mip-toggle.js,https://c.mipcdn.com/static/v1/mip-login-xzh/mip-login-xzh.js,https://c.mipcdn.com/static/v1/mip-simple-pay/mip-simple-pay.js,https://c.mipcdn.com/static/v1/mip-wecoffee-order/mip-wecoffee-order.js

## 示例

### 基本用法
```html
<mip-wecoffee-order
    id="superorder" layout="nodisplay" on="setOrderId:payElement.addEventData submitOrder:payElement.pay error:payfailed.show error:orderloading.hide"
    data-address-endpoint="//weecoffee-backend.oott123.com/store/1/user/addresses"
    data-order-endpoint="//weecoffee-backend.oott123.com/store/1/order"
>
    <mip-data>
        <script type="application/json">
        {
            "sessionId": "",
            "address": "",
            "name": "",
            "phoneNumber": "",
            "comment": "",
            "orderItems": [
                {"skuId": 2087, "spec": {"_sugar": "半糖", "_heat": "超热"}, "count": 1}
            ]
        }
        </script>
    </mip-data>
    <mip-login-xzh
        id="user"
        data-endpoint="//weecoffee-backend.oott123.com/session/mip-login/endpoint/"
        data-client-id="XSlxfyP1VaRPzwKOUdnoyh3uua2bog15"
        on="login:superorder.login login:payElement.setSessionId login:makeorder.show"
        data-autologin="true"
    ></mip-login-xzh>
    <mip-simple-pay
        data-endpoint="//weecoffee-backend.oott123.com/payment/pay"
        id="payElement"
        on="ajaxBefore:orderloading.show ajaxComplete:orderloading.hide error:superorder.error"
    ></mip-simple-pay>
    <mip-form class="info area">
        <div class="cart-item">
            <span>姓名</span>
            <input name="name" required class="cartitem-right" type="text" placeholder="请填入姓名姓名" value="">
        </div>
        <div class="cart-item">
            <span>手机号码</span>
            <input name="phoneNumber" required class="cartitem-right" type="text" placeholder="请填入手机号码" value="">
        </div>
        <div class="cart-item">
            <span>详细地址</span>
            <input name="address" required class="cartitem-right" type="text" placeholder="请填入详细地址" value="">
        </div>
        <div class="cart-item">
            <span>订单备注</span>
            <input name="comment" class="cartitem-right" type="text" placeholder="" value="">
        </div>
    </mip-form>
</mip-wecoffee-order>
<div>
    <mip-toggle id="orderloading" layout="nodisplay">
        <div>订单提交中……</div>
    </mip-toggle>
    <mip-toggle id="payfailed" hidetimeout="3000" layout="nodisplay">
        <div>付款提交失败！</div>
    </mip-toggle>
    <mip-toggle id="makeorder" layout="nodisplay">
        <button on="tap:superorder.triggerSubmit">提交订单</button>
    </mip-toggle>
</div>
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

