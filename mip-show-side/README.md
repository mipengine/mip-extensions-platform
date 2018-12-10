# mip-show-side

点击触发按钮 侧边栏从层面推出 点击蒙版层 侧边栏恢复

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-show-side/mip-show-side.js

## 示例

### 基本用法
```html
<style type="text/css">
	#view{
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: #ccc;
	}
	#side{
		position: fixed;
		left: -51%;
		top: 0;
		width: 50%;
		height: 100%;
		background-color: #fc0;
		z-index: 999999;
	}
	.transtons{
		transition: all 0.2s linear;
	}
	.mark{
		display: flex;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.6);
		z-index: 99999;
	}
	#view.active{
		left: 50%;
	}
	#side.active{
		left: 0;
	}
	.none{
		display: none;
	}


</style>

<section id="view" class="transtons">
	<div class="mark none" id="mark"></div>
	<div class="transtons" id="side"></div>
	<mip-show-side side-id="#side" mark-id="#mark" view-id="#view">
		<button>close</button>
	</mip-show-side>
</section>
```

## 属性

### view-id

说明：指向需要打开的dom，支持queryselector
必选项：否



### side-id

说明：指向需要打开的dom，支持queryselector
必选项：是


### mark-id

说明：指向需要打开的dom，支持queryselector
必选项：是

## 注意事项

