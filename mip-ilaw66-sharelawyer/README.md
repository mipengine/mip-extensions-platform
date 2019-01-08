# mip-ilaw66-sharelawyer

mip-ilaw66-sharelawyer 组件说明
法率网律师分享页

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sina-rem/mip-sina-rem.js
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-sharelawyer/mip-ilaw66-sharelawyer.js

## 示例

### 基本用法
```html
<mip-ilaw66-sharelawyer >
				<mip-data>
					<script type="application/json">
						{
							"user": {}
						}
					</script>
				</mip-data>

				<mip-login-xzh id="user" data-endpoint="https://www.ilaw66.com/jasmine/baidusearch/authorize2" data-client-id="X6AyjqI3QaDevHbWrwEp2VZnyc91TTNm" on="login:comment.login logout:comment.exit logout:comment.error">
					<mip-form url='https://www.baidu.com'>
						<input type="hidden" id="popValue" th:name="popValue" th:value="${popValue}" />
						<input type="hidden" id="userId" name="userId" th:value="${session.userId}" />
						<input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
						<input type="hidden" id="channel" name="channel" value="baidusearch" />
						<input type="hidden" id="price" name="price" th:value="${price}" />
					</mip-form>
					<div class="shareLawyer_div">

						<div class="shareLawyer_bg" id="authorbox">

						</div>
						<p class="shareLawyer_txt">特惠：<span id="minutes"></span>元/分钟 (<del>原价8元</del>) 总时长少于60秒免费</p>
						<div class="shareLawyer_btn shareLawyer_btn__toask">开始咨询</div>
						<a data-type="mip" data-title="订单列表" href="https://m.baidu.com/mip/c/s/www.ilaw66.com/jasmine/baidusearch"><div class="shareLawyer_btn shareLawyer_btn__toindex">返回首页</div></a>
					</div>
					<div class="popUp_unpaidErr alertbox" id="payalert">
						<div class="talking_result text-center">
							<h4>温馨提示</h4>
							<p id="messagecontem">您有订单未支付，请支付后再咨询</p>
							<div class="link_btn_unpaidErrConfirm">
								<span class="link_confirm">确认</span>
							</div>
						</div>
					</div>
				</mip-login-xzh>
			</mip-ilaw66-sharelawyer>
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

