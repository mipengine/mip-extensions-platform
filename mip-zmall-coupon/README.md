# mip-zmall-coupon

领取优惠劵 预约到店

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-zmall-coupon/mip-zmall-coupon.js

## 示例

### 基本用法
```html
<mip-zmall-coupon data-url="//path/to/api">
	<div class="draw_box">
    	<div class="_js_coupon_btn draw_entry">一键领取所有优惠</div>
	</div>
</mip-zmall-coupon>
```

## 属性

### data-url

说明：一键领取接口地址    
必选项：是     
类型：String       
默认值：""         

## 注意事项
- 组件内部Dom结构及属性名称不能自定义
