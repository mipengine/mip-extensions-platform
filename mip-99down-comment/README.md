# mip-99down-comment

mip-99down-comment 99down下载站文章详情页的评论

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|http://c.mipcdn.com/platform/v1/mip-99down-comment/mip-99down-comment.js

## 示例

在MIP HTML中,直接使用标签, 用于正常显示隐藏菜单。示例如下:
```
<mip-99down-comment>
    <section class="cont" id="comment">
		<b>网友评论</b>
		<div id="view-comment" class="reviews">
			<div class="post"><header>
				<span class="fb">我要跟贴</span></header>
				<ul id="comment-list"></ul>
				<footer class="button-status-complete"><input type="button" value="更多评论" class="button" style="display:none;" /></footer>
			</div>
		</div>
		<mip-form method="POST" url="http://www.99down.com/index.php" id="submit" class="post">
			<fieldset class="w-text"><textarea></textarea></fieldset>
			<fieldset class="w-button">
				<input id="verify" class="button disable" type="submit" value="提交跟贴"  hidefocus="true" />
				<span id="cancel" class="button">取消</span>
			</fieldset>
			<input type="hidden" id="app-id" value="109066" />
	    </mip-form>
	</section>
</mip-99down-comment>
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

