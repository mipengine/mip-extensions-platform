# mip-zmall-baidu-coupon

百度优惠券领取成功弹层组件

标题|内容
----|----
类型|业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-baidu-coupon/mip-zmall-baidu-coupon.js

## 示例

### 基本用法
```html
<mip-zmall-baidu-coupon id="baiduCouponReceiver" template="tpl-receive-success">
        <script type="application/json">
        {
            "merchantId": "商家ID",
            "storeId": "门店ID",
            "url": "Path/to/领取优惠卡"
        }
        </script>
        <template type="mip-mustache" id="tpl-receive-success">
            <div id="js_coupon_success_layer" class="receive-coupon-success">
                <div class="receive-coupon-header">恭喜成功领取到店优惠券</div>
                <div id="js_coupon_success_close" class="receive-coupon-close"></div>
                <div class="receive-coupon-code">百度优惠专享码：{{cardNumber}}</div>
                <div class="receive-coupon-qrcode">
                    <mip-img src="{{cardQcodeUrl}}"></mip-img>
                </div>
                <div class="receive-coupon-qrcode-tip">温馨提示：请使用手机截图保存二维码到店参加活动</div>
                {{#content}}
                <dl class="receive-coupon-arrive">
                    <dt>到店惠</dt>
                    <dd>{{content}}</dd>
                </dl>
                {{/content}}
                {{#couponList}}
                <div class="receive-coupon-list fix-flex">
                    <div class="receive-coupon-worth">
                        <p class="receive-coupon-price">50</p>
                        <p class="receive-coupon-condition">满100使用</p>
                    </div>
                    <div class="receive-coupon-explain flex-item">
                        <p class="receive-coupon-type">到店优惠红包</p>
                        <p class="receive-coupon-text">到店出示短信优惠码即可享受优惠</p>
                    </div>
                </div>
                {{/couponList}}
                <p class="receive-coupon-tip">注：优惠详细使用规则请到店咨询商家。</p>
            </div>
            <div id="js_receive_mask" class="receive-coupon-mask"></div>
        </template>
    </mip-zmall-baidu-coupon>
```

## 属性


## 注意事项

