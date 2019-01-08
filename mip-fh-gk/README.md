# mip-fh-gk

点击触发按钮 侧边栏从层面推出 点击蒙版层 侧边栏恢复

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-fh-gk/mip-fh-gk.js

## 示例

### 基本用法
```html
<style type="text/css">
time{
	display: inline-block;
	width: 30px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	margin:0 10px;
	background-color: #fc0;
	color: #fff;
}

</style>

<!-- <section id="view" class="transtons"> -->
<time id="three"></time><time id="two"></time><time id="one"></time>
<mip-fh-gk three-id="#three" two-id="#two" one-id="#one"></mip-fh-gk>
<!-- </section> -->
```

## 属性

### three-id

说明：百位
必选项：是



### two-id

说明：十位
必选项：是


### one-id

说明：个位
必选项：是

## 注意事项

