# mip-ys137-loaddata

mip-ys137-loaddata 异步加载数据

标题|内容
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/extensions/platform/v1/mip-ys137-loaddata/mip-ys137-loaddata.js

## 示例

### 立即加载列表
```html
<mip-ys137-loaddata>
	<div>加载中...</div>
</mip-ys137-loaddata>
```

### 滚动到即加载
```html
<div style="height:1000px;">
</div>
<mip-ys137-loaddata action="roll">
	<div>加载中...</div>
</mip-ys137-loaddata>
```

### 点击加载
```html
<mip-ys137-loaddata action="click">
	<div>加载数据</div>
</mip-ys137-loaddata>
```

## 属性

### action

说明：加载数据的方式
必选项：否
类型：字符串
取值范围：auto,click,roll
默认值：auto