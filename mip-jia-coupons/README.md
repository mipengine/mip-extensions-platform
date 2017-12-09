# mip-jia-coupons

mip-jia-coupons 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-jia-coupons/mip-jia-coupons.js

## 示例

### 基本用法
```html
<mip-jia-coupons>
	<div class="btn">一键领取所有优惠</div>
	<script type="application/json" discount-coupon id="discount-coupon">
        {	
        	"url": "http://qa.m.jia.com/wangpu/api/promotion/mip-obtain",
        	"shopId": "292",
            "coupons": [
                {
                    "pomotionId": "1234",
                    "money": "10",
                    "desc": "满100使用"
                },
                {
                    "pomotionId": "2234",
                    "money": "100",
                    "desc": "满1000使用"
                },
                {
                    "pomotionId": "9158",
                    "money": "100",
                    "desc": "满1000使用"
                }
            ]
        }
    </script>
</mip-jia-coupons>
```

## 属性

### url

说明：领券接口地址
必选项：是
类型：string

### shopId

说明：店铺ID
必选项：是
类型：string

### coupons

说明：优惠券信息
必选项：是
类型：array


## 注意事项

