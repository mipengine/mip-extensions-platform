# mip-hs-share

mip-hs-share 组件说明
需要配合mip-fixed和mip-share组件实现
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-share/mip-hs-share.js

## 示例

### 基本用法
```html
<mip-hs-share>
    <div class="hs-share-icon">分享</div>
	<div class="pop-mask"></div>	
	<mip-fixed type="bottom" class="hs-bottom-share">
		<mip-hs-share>
		    <mip-share>
		    </mip-share>
	    </mip-hs-share>
	</mip-fixed>
</mip-hs-share>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

