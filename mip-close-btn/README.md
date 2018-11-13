# mip-close-btn

mip-close-btn 可以自定义关闭某元素的自定义按钮

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-close-btn/mip-close-btn.js

## 示例

### 基本用法
```html
<style>
	.rec_gift_mask{
		width: 100%;
		height: 200%;
		background-color: rgba(0, 0, 0, .2);
		position: absolute;
		top: 0;
		left: 0; 
		z-index: 1000;
	}
	.mip-close-btn{
		display:inline-block;
		width:100px;
		height: 100px;
		background-color:#fff;
	}
	.confirm-btn{
		display:inline-block;
		width:100px;
		height: 100px;
		background-color:blue;
	}
	.confirm-btn:hover{background-color:red;}
	.hide{display:none!important;}
</style>
<div>
	<div class="click-show"></div>
	<div id="rec_gift_mask" class="rec_gift_mask">
		<mip-close-btn close-target="rec_gift_mask" class="mip-close-btn">X</mip-close-btn>
		<mip-close-btn close-target="rec_gift_mask" class="confirm-btn">确定</mip-close-btn>
	</div>
</div>
```

## 属性

### close-target

说明：需要关闭的目标dom的id，支持queryselector
必选项：是
类型：string
取值范围：queryselector内容
默认值：无


