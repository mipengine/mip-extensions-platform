# mip-zmall-coupon

领取优惠劵 预约到店

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-zmall-coupon/mip-zmall-coupon.js

## 最新版本

### 1.1.0

- 改为独立层弹出，主要解决因 不能自己写fixed元素，而用mip-fixed导致的问题，实现逻辑变了

### 1.0.4

- 修改样式

### 1.0.3

- 修改提示语
- 修改样式

### 1.0.2

- 修改查看路线的链接

### 1.0.1

- 增加部分注释
- 更改获取 `userId` 为 获取 `sid`
- 把 `alert` 改成 `toast`

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

### data-trigger

说明：触发优惠券层的按钮         
必选项：是         
类型：String          
默认值：""      

## 注意事项
- 组件内部Dom结构及属性名称不能自定义
