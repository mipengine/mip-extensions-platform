# mip-zmall-buy

立即购买

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-zmall-buy/mip-zmall-buy.js

## 最新版本

### 1.0.3

- 解决浏览器因跳转回退不刷新页面造成的弹层挂起的bug

### 1.0.2

- 登录判断bug修改

### 1.0.1

- bug修复

## 示例

### 基本用法
```html
<mip-zmall-buy
		data-src="//path/to/api"
		data-empty="//path/to/emptyapi"
		data-form="//path/to/submit">
    <!-- 请求参数 -->
	<script type="application/json">
		{
			"goodsId": 27851087,
			"merchantId": 194340,
			"skuId": 7591876,
			"suitSetId": 1,
			"productTypeId": 6406,
			"colorTypeId": 21,
			"saleTypeId": 1,
			"suitTypeId": 1
		}
	</script>
	<span class="suction-buy flex-item" id="_js_zmall_buy">立即购买</span>
	<div id="_js_buy_panel" class="spec-menu"></div>
</mip-zmall-buy>
```

## 属性

### data-src

说明：商品选项请求地址        
必选项：是       
类型：String      
默认值：""         

### data-empty

说明：商品选项无套装选项接口         
必选项：是         
类型：String          
默认值：""  

### data-form    

说明：购买提交页面         
必选项：是         
类型：String          
默认值：""     


## 注意事项

- `id="_js_zmall_buy"` 和 `id="_js_zmall_buy"` 两个 dom 不能丢
