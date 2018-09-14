# mip-zmall-coupon

领取优惠劵组件，主要提供领取线上或者线下优惠券的操作

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-zmall-coupon/mip-zmall-coupon.js

## 更新

### 2.0.0

- 重写全部代码，功能定义为领取优惠券的操作

## 示例

### 基本用法
```html
<mip-zmall-coupon id="couponReceiver" template="tpl-receive-success" on="toast:myDialog.toast">
        <script type="application/json">
        {
            "merchantId": "",
            "online": "path/to/api",
            "offline": "path/to/api"
        }
        </script>
        <template type="mip-mustache" id="tpl-receive-success">
            <div id="js_coupon_success_layer" class="receive-coupon-success">
                <div class="receive-coupon-header">恭喜成功领取到店优惠券</div>
                <div class="receive-coupon-text">内容包含：</div>
                <div id="js_coupon_scroller" class="receive-coupon-scroller">
                    {{#successList}}
                    <div class="receive-coupon-item">{{.}}</div>
                    {{/successList}}
                </div>
                <p class="receive-coupon-tip">提示：到店出示领取成功的短信提示即可享受优惠，优惠详细规则请到店咨询商家。</p>
                <div id="js_coupon_success_close" class="receive-coupon-btn">确定</div>
            </div>
            <div id="js_receive_mask" class="receive-coupon-mask"></div>
        </template>
    </mip-zmall-coupon>
```

## 属性

### on

执行自生事件方法

## 注意事项

