# mip-9939adv

mip-9939adv 实现了一个顶部广告，页面到达指定高度时候变成悬浮+可关闭功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/mip-9939adv/v1/mip-9939adv.js

## 示例

### 基本用法

```html
<mip-9939adv class="rel-adv"  threshold='300'>
	<div class="close-btn"></div>
	<div class="rel-adv-con">
		这是广告内容
	</div>
</mip-9939adv>
```

## 属性

### threshold

说明：页面滚动到指定高度的时候变换Class
必选项：否
取值范围：数值 
单位：无
默认值：200

## 注意事项

