# mip-jia-redpacket

mip-jia-redpacket 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-jia-redpacket/mip-jia-redpacket.js

## 示例

### 基本用法
```html
<mip-jia-redpacket>
    <script type="application/json">
    {
    	"fixedImg": "//mued3.jia.com/image/mobile/mip/fix-hb.png",
    	"fixedImgW": "92",
    	"fixedImgH": "114",
    	"logo": "//mued3.jia.com/image/mobile/mip/hb-icon-1.png",
    	"logoW": "96",
    	"logoH": "96",
    	"logoText": "黄晓明",
    	"desc": "给您发了一个装修红包",
    	"couponText": "领取1000元装修优惠券！",
    	"redRequest": {
    		"url": "//mall.jia.com/api/promotion/sync-obtain-by-encrypted-mobile",
    		"parms": {
    			"spreadChannel": "CMS",
		    	"spreader":"QI_JIA",
		    	"obtainPlatform":"WAP",
		    	"promotionType":"COUPON",
		    	"obtainPromotionsItems":[{"promotionId":110505,"claimNumber":1}],
		    	"source":"m-mip"
    		}
    	},
    	"signRequest": {
    		"url": "//m.jia.com/new_zhuangxiu/AjaxSaveNewShopApplyNoCodeJsonp",
    		"parms": {
    			"username": "张三",
    			"code": "no-code",
    			"source": "m-mip",
    			"inversion_point": "新人领券"
    		},
    		"skipUrl": "//m.jia.com/zixun/newPeopleBag/"
    	},
    	"keyUrl": "//qa.m.jia.com/wangpu/encrypt/mobile/public-key/base64",
    	"cityUrl": "//m.jia.com/city/getCurrentAreaNew"
    }
    </script>
</mip-jia-redpacket>
```

## 属性

### fixedImg

说明：悬浮小图标
必选项：是
类型：string

### fixedImgW

说明：悬浮小图标宽度
必选项：是
类型：string

### fixedImgH

说明：悬浮小图标高度
必选项：是
类型：string

### logo

说明：弹层小图标
必选项：是
类型：string

### logoW

说明：弹层小图标宽度
必选项：是
类型：string

### logoH

说明：弹层小图标高度
必选项：是
类型：string


## 注意事项

