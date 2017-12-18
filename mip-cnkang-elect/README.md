# mip-cnkang-elect

mip-cnkang-elect 康网下拉列表点选组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-cnkang-elect/mip-cnkang-elect.js

## 示例

### 基本用法
```html
<mip-cnkang-elect>
    <div class="pageStyle">
		<a href="http://m.cnkang.com/sex/list/1047/"><p>上一页</p></a>
		<div class="jueding">
			<ul><p><span>1</span>/8</p></ul>
			<select class="touchPage" id="touch_page">
				<option value="1" selected="">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
			</select>
		</div>
		<a id="dian" href="//m.cnkang.com/sex/list/1047/"></a>
		<a href="http://m.cnkang.com/sex/list/1047/2/"><p>下一页</p></a>
	</div>
	<div class="fuhao">/</div>
</mip-cnkang-elect>
```
```style
.pageStyle {clear: both;margin: 20px 10px;height: 36px;}
.pageStyle a {display: block;float: left; width: 28%;}
.pageStyle a p, .pageStyle div ul {border: 1px solid #ececec;background: #f8f9fa;height: 36px;
line-height: 36px;text-align: center;font-size: 14px;color: #666;}
.jueding {position: relative;}
.pageStyle div {display: block;float: left;width: 44%;}
.pageStyle a p, .pageStyle div ul {border: 1px solid #ececec;background: #f8f9fa;height: 36px;
line-height: 36px;text-align: center;font-size: 14px;color: #666;}
.pageStyle div ul {margin: 0 5px;}
.pageStyle div ul p {display: inline;padding-right: 20px;position: relative;color: #666;}
.pageStyle ul p span {color: #ec1a6c;}
.pageStyle ul p span {color: #01c2d2;}
.touchPage {position: absolute;top: 0;left: 0;width: 100%; height: 38px;display: block;opacity: 0;}
.fuhao{ display:none;}
```



