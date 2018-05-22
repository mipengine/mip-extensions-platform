# mip-jdd-trend

根据内部元素的类的不同 绘制不同的折线

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jdd-trend/mip-jdd-trend.js

## 示例

### 默认绘制折线
```html
<mip-jdd-trend trend>
<table>
	<tr>
		<td><span>日期</span></td>
		<td><span>时间</span></td>
		<td><span>类别</span></td>
		<td><span>长度</span></td>
		<td><span>长度</span></td>
		<td><span>长度</span></td>
		<td><span>长度</span></td>
	</tr>
	<tr>
		<td><span class="ball-red">1</span></td>
		<td><span>2</span></td>
		<td><span>3</span></td>
		<td><span class="ball-blue">3</span></td>
		<td><span>3</span></td>
		<td><span>3</span></td>
		<td><span>4</span></td>
	</tr>
	<tr>
		<td><span>5</span></td>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span class="ball-blue">3</span></td>
		<td><span>6</span></td>
		<td><span>7</span></td>
		<td><span>8</span></td>
	</tr>
	<tr>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span>19</span></td>
		<td><span>234</span></td>
		<td><span class="ball-blue">42</span></td>
	</tr>
	<tr>
		<td><span>3</span></td>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span class="ball-blue">19</span></td>
		<td><span>234</span></td>
		<td><span>42</span></td>
	</tr>
	<tr>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span>19</span></td>
		<td><span class="ball-blue">234</span></td>
		<td><span>42</span></td>
	</tr>
	<tr>
		<td><span>3</span></td>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span>19</span></td>
		<td><span>234</span></td>
		<td><span class="ball-blue">42</span></td>
	</tr>
</table>
</mip-jdd-trend>
```
### 点击按钮绘制折线
```html
<button on="tap:trend.trend">点击按钮绘制折线</button>
<mip-jdd-trend id="trend">
<table>
	<tr>
		<td><span>日期</span></td>
		<td><span>时间</span></td>
		<td><span>类别</span></td>
		<td><span>长度</span></td>
		<td><span>长度</span></td>
		<td><span>长度</span></td>
		<td><span>长度</span></td>
	</tr>
	<tr>
		<td><span class="ball-red">1</span></td>
		<td><span>2</span></td>
		<td><span>3</span></td>
		<td><span class="ball-blue">3</span></td>
		<td><span>3</span></td>
		<td><span>3</span></td>
		<td><span>4</span></td>
	</tr>
	<tr>
		<td><span>5</span></td>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span class="ball-blue">3</span></td>
		<td><span>6</span></td>
		<td><span>7</span></td>
		<td><span>8</span></td>
	</tr>
	<tr>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span>19</span></td>
		<td><span>234</span></td>
		<td><span class="ball-blue">42</span></td>
	</tr>
	<tr>
		<td><span>3</span></td>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span class="ball-blue">19</span></td>
		<td><span>234</span></td>
		<td><span>42</span></td>
	</tr>
	<tr>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span>19</span></td>
		<td><span class="ball-blue">234</span></td>
		<td><span>42</span></td>
	</tr>
	<tr>
		<td><span>3</span></td>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span>19</span></td>
		<td><span>234</span></td>
		<td><span class="ball-blue">42</span></td>
	</tr>
</table>
</mip-jdd-trend>
```

### 绘制折线（不根据类名分类）
```html
<mip-jdd-trend notClassific trend>
<table>
	<tr>
		<td><span>日期</span></td>
		<td><span>时间</span></td>
		<td><span>类别</span></td>
		<td><span>长度</span></td>
		<td><span>长度</span></td>
		<td><span>长度</span></td>
		<td><span>长度</span></td>
	</tr>
	<tr>
		<td><span class="ball-red">1</span></td>
		<td><span>2</span></td>
		<td><span>3</span></td>
		<td><span class="ball-blue">3</span></td>
		<td><span>3</span></td>
		<td><span>3</span></td>
		<td><span>4</span></td>
	</tr>
	<tr>
		<td><span>5</span></td>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span class="ball-blue">3</span></td>
		<td><span>6</span></td>
		<td><span>7</span></td>
		<td><span>8</span></td>
	</tr>
	<tr>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span>19</span></td>
		<td><span>234</span></td>
		<td><span class="ball-blue">42</span></td>
	</tr>
	<tr>
		<td><span>3</span></td>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span class="ball-blue">19</span></td>
		<td><span>234</span></td>
		<td><span>42</span></td>
	</tr>
	<tr>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span>19</span></td>
		<td><span class="ball-blue">234</span></td>
		<td><span>42</span></td>
	</tr>
	<tr>
		<td><span>3</span></td>
		<td><span class="ball-red">3</span></td>
		<td><span>3</span></td>
		<td><span>9</span></td>
		<td><span>19</span></td>
		<td><span>234</span></td>
		<td><span class="ball-blue">42</span></td>
	</tr>
</table>
</mip-jdd-trend>
```

## 属性

### trend

说明：标签含有这个属性，立即初始化，不含有则监听trend事件初始化。
必选项：否
类型：无
取值范围：无
单位：无
默认值：无

### notClassific

说明：标签含有这个属性，则不根据类名来分类渲染不同的折线图，没有的话则根据类名分类渲染不同的折线图。
必选项：否
类型：无
取值范围：无
单位：无
默认值：无

## 注意事项

