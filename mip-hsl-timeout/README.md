# mip-hsl-timeout

mip-hsl-timeout 定时显示某个DIV组件，可自定义显示时间

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-hsl-timeout/mip-hsl-timeout.js

## 示例

### 基本用法
```html
<mip-hsl-timeout hslspeed="2000">
	<div id="hslshow" style="display:none">
		定时显示的内容
	</div>
	<div id="hslclose">关闭显示层</div>
</mip-hsl-timeout>
```
### 说明

## 说明

### hslspeed

必选项：是
默认值：无
说明：{延迟出现的时间} 必选项：{是} 类型：{时间，单位是毫秒}

##注意事项：hslspeed必须填写。