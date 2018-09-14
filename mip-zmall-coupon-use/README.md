# mip-zmall-coupon-use

mip-zmall-coupon-use 主要是在确认订单页选择使用优惠券的组件

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-coupon-use/mip-zmall-coupon-use.js

## 示例

### 基本用法
```html
<mip-zmall-coupon-use id="onlineCouponRender" src="接口地址" data-goods-id-str="商品id">
    <template type="mip-mustache">
        <div class="discounts">
            {{#data}}
            {{#isCanUse}}
            <div class="option-item fix-flex" on="click:couponsPopupWindow.close click:MIP.setData({discount:{{couponDiscount}},deduct:{{couponDeduct}},userCouponId:{{couponReceiveId}}})">
                <div class="caption"><div class="type">{{backTypeText}}</div>{{couponDesc}}</div>
                <div class="flex-item"><label class="label-radio"><i></i></label></div>
            </div>
            {{/isCanUse}}
            {{^isCanUse}}
            <div class="option-item option-item-disabled fix-flex">
                <div class="caption"><div class="type">{{backTypeText}}</div>{{couponDesc}}</div>
                <div class="flex-item"><label class="label-radio"><i></i></label></div>
            </div>
            {{/isCanUse}}
            {{/data}}
            <div class="option-item fix-flex" on="click:couponsPopupWindow.close click:MIP.setData({discount:0,deduct:0,userCouponId:0})">
                <div class="caption">不使用优惠</div>
                <div class="flex-item"><label class="label-radio label-radio--checked"><i></i></label></div>
             </div>        
        </div>
    </template>
</mip-zmall-coupon-use>
```

配合mip-bind来使用，可以控制优惠券弹层是否展示

## 属性

### src

说明：用户已经领取优惠券的接口地址    
必选项：是    

### data-goods-id-str

说明：商品ID串，包括商品ID，数量等决定优惠券的因素    
必选项：是    


## 注意事项

