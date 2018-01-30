# mip-jt-calendar

mip-jt-calendar 财经日历组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-jt-calendar/mip-jt-calendar.js

## 示例

### 基本用法
```html
<section class="mt20">
	<input id="timeM01" type="hidden">
	<input id="timeM02" type="hidden">
	<input id="atime01" type="hidden">
	<input id="atime02" type="hidden">
	<div class="index_tit">
		<i class="icon"></i>
		<h2><a href="${mobileDomain}/calendar/" title="财经日历">财经日历</a></h2>
		<p class="fr xuanchuan_r3"><a href="https://tg.cngold.org/futures/m/hjqh.html" target="_blank"><img src="${resourceDomain}/mobile/home/images/xaunchuan_r_img3.png" /></a></p>
	</div>
	<ul class="event_panel" id="calendarUl">
	</ul>
	<div class="view_more"><a href="${mobileDomain}/calendar/" title="财经日历">更多经济指标<i class="icon"></i></a></div>
</section>
<mip-jt-calendar num=3>
</mip-jt-calendar>

```

## 属性

### name

说明：财经日历条数
必选项：是
类型：整型


## 注意事项
封面页一般三条，栏目页一条
