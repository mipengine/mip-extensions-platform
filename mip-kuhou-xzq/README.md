# mip-kuhou-xzq

mip-kuhou-xzq 用来切换高速下载和普通下载

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-kuhou-xzq/mip-kuhou-xzq.js

## 示例

### 切换不同的下载按钮
```html
 <mip-kuhou-xzq xzqid="yingyongbao1">
	<div class="mobLgBox" id="xzaz" style="display: block;">
		<div class="mobLgIn">
			<mip-form url="http://www.kuhou.com">
				<span><label><input type="checkbox" checked="checked" id="yingyongbao1"><h3>用豌豆荚</h3></label></span>
			</mip-form>
			<a gsxzid id="gaosuxiazai1" class="hover" style="display: block;">高速下载</a>
			<a ptid href="http://xz.kuhou.com/apk/Draw.apk" id="putongxiazai1" style="display: none;" class="count_xz" target="_blank"> 普通下载</a>
			<div class="clear"></div>
		</div>
		<div class="mobLgCont">优先使用豌豆荚高速下载，更快速，更安全！</div>
	</div>
 </mip-kuhou-xzq>
```
## 属性

### xzqid

说明：区分多个不同的下载按钮
必选项：否
类型：字符串


