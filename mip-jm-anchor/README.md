# mip-jm-anchor

mip-jm-anchor 组件说明
此组件用于品牌详情页每个列表触发点击进行判断后进行锚点定位到这个位置，如果没有锚点触发，就会执行切换。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jm-anchor/mip-jm-anchor.js

## 示例

### 基本用法
```html
<mip-jm-anchor>
	<div>
		<a class="page-scroll navItems other-show" navTo="advantage">合作优势</a>
		<a class="page-scroll navItems other-show" navTo="coOperate">合作支持</a>
		<a class="page-scroll navItems other-show" navTo="progress">合作流程</a>
		<a class="page-scroll navItems info-show" navTo="pro-news">项目资讯</a>
	</div>
	<ul>
		<li id='advantage'>合作优势</li>
		<li id='coOperate'>合作支持</li>
		<li id='progress'>合作流程</li>
		<li id='pro-news'>项目资讯</li>
	</ul>
</mip-jm-anchor>
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

