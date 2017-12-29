# mip-jia-zxpacket

mip-jia-zxpacket 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-jia-zxpacket/mip-jia-zxpacket.js

## 示例

### 基本用法
```html
<mip-jia-zxpacket>
	<script type="application/json">
		{
			"text":"推荐服务3",
			"title":"文中提到的服务",
			"list":[
				{
					"title":"专业的报价服务，提前掌握装修费用",
					"desc":"齐家网",
					"btntxt":"咨询",
					"class":"list-ad-1",
					"href":""
				},
				{
					"title":"三套设计方案，遇见家的样子",
					"desc":"剩余：19个名额",
					"btntxt":"咨询",
					"tag":"免费-每人限一张",
					"class":"list-ad-2",
					"href":""
				}
			],
			"hbinfo":{
				"title":"专项优惠",
				"img":"//mued3.jia.com/image/mobile/mip/slide-pop-img3.jpg",
				"tit":"全国各门店通用装修优惠券，抵扣1000元",
				"tag":"限时免费-每人限一张"
			},
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
					"username": "mip新人红包",
					"code": "no-code",
					"source": "m-mip",
					"source_topic":"",
					"self_url":"",
					"inversion_point": "新人领券"
				},
				"skipUrl": "//m.jia.com/zixun/newPeopleBag/"
			},
			"keyUrl": "//m.jia.com/wangpu/encrypt/mobile/public-key/base64",
			"cityUrl": "//m.jia.com/city/getCurrentAreaNew"
		}
	</script>
</mip-jia-zxpacket>
```

## 属性

### text

说明：按钮标题
必选项：是
类型：string

### title

说明：弹层标题
必选项：是
类型：string

### list

说明：跳转数组
必选项：否
类型：array

### hbinfo

说明：红包信息
必选项：是
类型：object


## 注意事项

