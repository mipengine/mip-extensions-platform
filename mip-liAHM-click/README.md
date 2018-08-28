# mip-liAHM-click

mip-liAHM-click 组件说明
自定义切换条
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-liAHM-click/mip-liAHM-click.js

## 示例

### 基本用法
```html
<mip-liAHM-click>
   <ul class="tabClick">
			<li class="active " id="lia"><a 
				href="#" id="titA" class='liastyle'>沪深</a></li>
			<li id="lib"><a  href="#"
				id="titH" class='liastyle'>港股</a></li>
			<li id="lic"><a  href="#"
				id="titM" class='liastyle'>美股</a></li>
</ul>
	<div class="tabList" id="aHM">aa</div>
	<div class="tabList" id="AhM">
<div id="H_stocke" class="HMstock"></div>
       </div>
	<div class="tabList" id="AHm">
        <div id="M_stocke" class="HMstock"></div>
       </div>

</mip-liAHM-click>
```

#### 属性

### aId
说明：a标签的id
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无

### type
说明：类型
必选项：是
类型：字符串
取值范围：A H  M
单位：无
默认值：无

## 注意事项
无


