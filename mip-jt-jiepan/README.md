# mip-jt-jiepan

mip-jt-jiepan 解盘组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-jt-jiepan/mip-jt-jiepan.js

## 示例

### 基本用法
```html
<section class="mt20">
	<div class="index_tit">
		<i class="icon"></i>
		<h2><a href="${mobileDomain}/kp/" title="专家直播">专家直播</a></h2>
		<p class="fr xuanchuan_r1"><a href="https://tg.cngold.org/tj/m/jwx03.html" target="_blank"><img src="${resourceDomain}/mobile/home/images/xuanchuan_r_img5.png" /></a></p>
	</div>
	<ul class="zbs_content" id="todayAnalyzeId"></ul>
	<div class="view_more"><a href="${mobileDomain}/kp/" title="专家直播">查看更多直播<i class="icon"></i></a></div>
	<mip-jt-jiepan num =2>
	</mip-jt-jiepan>
</section>

```

## 属性

### num

说明：直播信息条数
必选项：是
类型：整数

## 注意事项
封面页一般一条,栏目页两条
