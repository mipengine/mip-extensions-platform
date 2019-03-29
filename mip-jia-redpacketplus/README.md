# mip-jia-redpacketplus

红包领取

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-redpacketplus/mip-jia-redpacketplus.js

## 示例

### 基本用法
```html
<mip-jia-redpacketplus>
    <script type="application/json">
    {
        "logo": "//mued3.jia.com/image/mobile/mip/hb-icon-1.png",
        "logoW": "96",
        "logoH": "96",
        "logoText": "黄晓明",
        "desc": "给您发了一个装修红包",
        "couponText": "领取1000元装修优惠券！",
        "class":".fixed-hb .hb-box",
        "eventClass":".footer_xrhb",
        "scrollClass":".related-reading",
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
</mip-jia-redpacketplus>
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

### eventClass

说明：触发弹窗的class
必选项：否
类型：string

### scrollClass

说明：滚动到指定位置的class
必选项：否
类型：string

### redRequest

说明：接口参数对象
必选项：是
类型：Object

### signRequest

说明：接口参数对象
必选项：是
类型：Object

### keyUrl

说明：获取key接口url
必选项：是
类型：string

### cityUrl

说明：城市接口url
必选项：是
类型：string


## 注意事项

