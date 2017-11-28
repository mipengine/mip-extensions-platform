# mip-zmall-tab

商品详情页，商品介绍tab切换

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-zmall-tab/mip-zmall-tab.js

## 示例

### 基本用法
```html
<mip-zmall-tab data-tab-current="current" data-panel-current="current">
	<ul>
	    <li data-panel="panel_1">111</li>
	    <li data-panel="panel_2">222</li>
	    <li data-panel="panel_3">333</li>
	    <li data-panel="panel_4">444</li>
	</ul>
	<div panel="panel_1">1</div>
	<div panel="panel_2">2</div>
	<div panel="panel_3">3</div>
	<div panel="panel_4">4</div>
</mip-zmall-tab>
```

## 属性

### data-tab-current

说明：tab切换按钮当前样式名    
必选项：是     
类型：String      
默认值：""           

### data-panel-current

说明：tab切换主题内容当前样式名                   
必选项：是               
类型：String              
默认值：""          

## 注意事项

- panel 必须用 `div` 包裹起来
