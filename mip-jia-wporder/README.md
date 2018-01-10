# mip-jia-wporder

mip-jia-wporder 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-jia-wporder/mip-jia-wporder.js

## 示例

### 基本用法
```html
<mip-jia-wporder
	data-request-params="{'order-typ': 0, 'order-money': '10', 'request-url': 'http://qa.m.jia.com/wangpu/product/reservation/add', 'request-data': {'productId': '819', 'shopId': '64935', 'sourceReferrer': ''}, 'key-url': '//qa.m.jia.com/wangpu/encrypt/mobile/public-key/base64'}}">
	<div class="order">	
		<span class="small-txt time-area" data-time="2017/12/10 12:22:00"><em>xx天xx时xx分</em>后结束</span>
		<span class="big-txt">免费预约</span>
	</div>
</mip-jia-wporder>
```

## 属性

### order-typ

说明：0表示免费，1表示收费
必选项：是
类型：number

### order-money

说明：定金
必选项：是
类型：string

### request-url

说明：接口url
必选项：是
类型：string

### request-data

说明：接口请求参数
必选项：是
类型：json

### key-url

说明：加密key
必选项：是
类型：string


## 注意事项

