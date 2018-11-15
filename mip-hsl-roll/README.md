# mip-hsl-roll

mip-hsl-roll 逐行向上滚动特效

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-lnxyw-switch/mip-hsl-roll.js

## 示例

### 基本用法
```html
<mip-hsl-roll hslmt="28" speed="20" delay="1500" ulid="mip-hsl-roll" >
   <div>
   	<ul id="mip-hsl-roll">
   		<li></li>
   	</ul>
   </div>
</mip-hsl-roll>
```
### 说明

## 说明

### hslmt

必选项：是
默认值：20
说明：文字滚动间距 必选项：是 类型：像素 取值范围：0+ 单位：px 

### speed

必选项：是
默认值：20
说明：文字滚动速度 必选项：是 类型：时间 取值范围：0+ 单位：ms 

### delay

必选项：是
默认值：20
说明：文字停留时间 必选项：是 类型：时间 取值范围：0+ 单位：ms  

### ulid

必选项：是
默认值：无
说明：ul的id 必选项：是 类型：string 取值范围 