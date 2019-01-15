# mip-jm-articlemessage

mip-jm-articlemessage 组件说明
此组件用于资讯详情页面的留言数据提交并返回状态。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jm-articlemessage/mip-jm-articlemessage.js

## 示例

### 基本用法
```html
<mip-jm-articlemessage data-cateid="13" data-articleid="13" data-url="xxx/Article/consult" data-remark="新闻资讯留言">
    <mip-form method="post" url="xxx">
			<div class="submit-info">
			<div class="info-top">
				<div class="left fl">
					<p class="title">您可以根据下列 意向快捷留言</p>
					<ul id="question">
						<li>
							<span>想要合作,请尽快联系。</span>
						</li>
						<li>
							<span>能实地考察吗？</span>
						</li>
						<li>
							<span>合作流程怎么样的？</span>
						</li>
						<li>
							<span>合作费用是多少钱？</span>
						</li>
						<li>
							<span>有哪些扶持政策？</a>
						</li>
					</ul>
				</div>
				<div class="right fl">
					<input type="text" class="name" id="formname" placeholder="姓名">
					<input type="text" class="tel" id="formphone" placeholder="联系方式">
					<textarea class="textarea" id="formcontent" cols="30" rows="10" placeholder="留言"></textarea>
				</div>
			</div>
			<div class="info-down">
				<div class="formbtn" id="formbtn">立即提交</div>
			</div>
		</div>
		</mip-form>
		<section class="model_bg"></section>
				<section class="article_model">
					<p class="text"></p>
					<p class="article_opBtn">
						<span class="article_close">确定</span>
					</p>
				</section>
</mip-jm-articlemessage>
```

## 属性

### {属性名}
data-cateid：当前页面传过来的cateid参数，必选必填；
data-articleid：当前页面传过来的articleid参数，必选必填；
data-url：当前所要请求的url参数，必选必填；
data-remark：当前页面所要关联的关键词，必选必填；
说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

