# mip-change

mip-change 点击换一批

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-change/mip-change.js

## 示例

### 基本用法
```html
<mip-change>	
	<ul class="list1 listchange1">
		<li>A</li>
		<li>A</li>
		<li>A</li>
		<li>A</li>
		<li>A</li>
		<li>A</li>
		<li>A</li>
		<li>A</li>
	</ul>
	<ul class="list1 listchange2">
		<li>B</li>
		<li>B</li>
		<li>B</li>
		<li>B</li>
		<li>B</li>
		<li>B</li>
		<li>B</li>
		<li>B</li>
	</ul>
	<ul class="list1 listchange3">
		<li>a</li>
		<li>a</li>
		<li>a</li>
		<li>a</li>
		<li>a</li>
		<li>a</li>
		<li>a</li>
		<li>a</li>
	</ul>
	<ul class="list1 listchange4">
		<li>b</li>
		<li>b</li>
		<li>b</li>
		<li>b</li>
		<li>b</li>
		<li>b</li>
		<li>b</li>
		<li>b</li>
	</ul>
	<div style="text-align: center;"><span class="exClick">换一批</span></div>
</mip-change>
```

## 属性

### {firstChange:代表第一次换的是第二组}
### {changeNum:这是要换的批数}
### {changeObj:选择要点击进行执行此组件的对象}
extend(firstChange,changeNum,changeObj)

说明：{换一批}
必选项：{否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

