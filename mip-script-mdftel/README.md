# mip-script-mdftel

mip-script-mdftel 手机号码修改
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-script-mdftel/mip-script-mdftel.js

## 示例

### 基本用法
```html
<mip-script-mdftel>
    <form id="frmLogin">
			<input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
			<input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}"/>
			<input type="hidden" id="requestId" name="requestId"/>
			<input type="hidden" id="questionType" name="questionType"/>
            <div class="header_block">
                <span class="glyphicon glyphicon-menu-left pull-left" "></span>修改手机号&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
			<div class="main_block_confirmCorrect">
				<div class="content_inputPhone">
					<input data-role="none" type="text" id="username" name="username" placeholder="请输入您的手机号码" th:value="${tel}" class="content_tel"/>
				</div>
				<div class="content_inputCodeAll">
		        	<input type="password" id="password" name="password" placeholder="请输入验证码" class="content_inputCode"/>
	  				<input type="text" readonly="readonly" id="sms" value="获取验证码" class="content_inputCodeText"/>
				</div>
				<div class="footer_block_phone_modify">
					<a href="javascript:void(0)" id="confirmCorrectTel" class="correct-btn">修改</a>
				</div>
				<div class="popUp_error">
					<div class="talking_result text-center">
						<h4>温馨提示</h4>
						<p id="err_msg"></p>
						<div class="link_btn_sysErrConfirm">
							<span class="link_confirm">确认</span>
						</div>
					</div>
				</div>
				<div class="popUp_ok">
					<div class="talking_result text-center">
						<h4>温馨提示</h4>
						<p id="ok_msg"></p>
						<div class="link_btn_confirm">
							<span class="link_confirm">确认</span>
						</div>
					</div>
				</div>
				<div class="popUp_unpaidErr">
					<div class="talking_result text-center">
						<h4>温馨提示</h4>
						<p>您有订单未支付，请支付后再咨询</p>
						<div class="link_btn_unpaidErrConfirm">
							<span class="link_confirm">确认</span>
						</div>
					</div>
				</div>
			</div>
		</form>
</mip-script-mdftel>
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

