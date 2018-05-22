# mip-jdd-sort

点击排序功能，点击类为'sort-head'的第一行可以对 类为'sort-body'的子标签进行排序

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jdd-sort/mip-jdd-sort.js

## 示例

### 基本用法
```html
<mip-jdd-sort sort>
    <div class ='sort-head'>
    	<span>排序一</span>
    	<span>排序二</span>
    	<span class="notSort">排序三</span>
    </div>
    <div class ='sort-body'>
    	<div>
    		<span>11</span>
    		<span>12</span>
    		<span>13</span>
    	</div>
    	<div>
    		<span>16</span>
    		<span>43</span>
    		<span>89</span>
    	</div>
    	<div>
    		<span>09</span>
    		<span>76</span>
    		<span>64</span>
    	</div>
    	<div>
    		<span>54</span>
    		<span>23</span>
    		<span>87</span>
    	</div>
    	<div>
    		<span>12</span>
    		<span>65</span>
    		<span>81</span>
    	</div>
    </div>
</mip-jdd-sort>
```

### 点击button 初始化排序组件
```html
<button on="tap:sort.sort">点击初始化</button>
<mip-jdd-sort id="sort">
    <div class ='sort-head'>
    	<span>排序一</span>
    	<span>排序二</span>
    	<span class="notSort">排序三</span>
    </div>
    <div class ='sort-body'>
    	<div>
    		<span>11</span>
    		<span>12</span>
    		<span>13</span>
    	</div>
    	<div>
    		<span>16</span>
    		<span>43</span>
    		<span>89</span>
    	</div>
    	<div>
    		<span>09</span>
    		<span>76</span>
    		<span>64</span>
    	</div>
    	<div>
    		<span>54</span>
    		<span>23</span>
    		<span>87</span>
    	</div>
    	<div>
    		<span>12</span>
    		<span>65</span>
    		<span>81</span>
    	</div>
    </div>
</mip-jdd-sort>
```

## 属性

### sort

说明：标签含有这个属性，立即初始化，不含有则监听sort事件初始化。
必选项：否
类型：无
取值范围：无
单位：无
默认值：无

## 注意事项

类为'sort-head'的标签是点击区域，类为'sort-body'的标签为排序区域
类为'sort-head'的标签的子标签添加'not-sort'类。此子标签点击不可排序
类为'sort-head'的标签的子标签中
'normal'为不排序的类,'up'为正序排序的类，'down'为倒序
