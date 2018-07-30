# mip-ilaw66-baidu-login

mip-ilaw66-baidu-login 组件说明
法率网登录页

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sina-rem/mip-sina-rem.js
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidu-login/mip-ilaw66-baidu-login.js

## 示例

### 基本用法
```html
<mip-ilaw66-baidu-login>
<mip-sina-rem>
<mip-stats-baidu>
    <script type="application/json">
        {
            "token": "d5a24ec2321d65ed4b781d2fce73c834"
        }
    </script>
</mip-stats-baidu>
<mip-form url='https://www.baidu.com'>
    <input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
<input type="hidden" id="error" name="error" th:value="${error}" />
<input type="hidden" id="userId" name="userId" th:value="${session.userId}" />
</mip-form>
<mip-form url='https://www.baidu.com' id="frmLogin">
	<input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
	<div class="main_block">
		<!--<span class="glyphicon glyphicon-menu-left pull-left" id="precautions-back" style="top:0;left:5px;" onclick="history.go(-1)"></span>-->
		<span class="glyphicon glyphicon-menu-left pull-left" id="precautions-back" ></span>  <!--style="top:0;left:5px;"-->
		<div class="header_block">
			问律师
		</div>
		<div id="msg_bosslegal" class="tile_ele">
			<p>为了方便律师联系您</p>
			<p>请留下您的常用手机号码</p>
		</div>
		<input data-role="none" type="text" maxlength="11" id="username" name="username" placeholder="输入手机号" autocomplete="off" th:value="${tel}" class="content_tel"
		/>
		<input type="text" id="password" name="password" placeholder="输入验证码" maxlength="6" autocomplete="off" class="content_inputCode" />
		<div id="sms" class="content_inputCodeText">获取验证码</div>
		<div class="errormsg_show">
			<p id="smsCheckError_msg"></p>
		</div>
		<div id="code_div">
			<p>验证码：</p>
			<input type="text" id="Txtidcode" class="txtVerification"><span id="idcode"></span>
			</input>
		</div>
		<div class="radio-rule rule-checked" data-type="CT002" id="js-radio-ruleCT002">
			<br><p >
			<img alt="" class="isChecked"  id="radio-rule-iconCT002" src="images/button_ok_blue.png"/>
			<span>我已阅读并同意<a class="rulePA">《分秒律师用户服务协议》</a></span>
		</p><br>
		</div>
		<div class="footer_block">
			<a href="javascript:void(0)" id="login" class="btn btn_into">提交</a>
			<!--<button class="btn btn_into" data-type="CT002" id="login">提交</button>-->
		</div>
		<div class="botText01">
			<img  src="images/shield.png" /><span>&nbsp;隐私保障</span>
			<p class="botText02">咨询时，将通过技术手段隐藏您的号码，不向律师展示</p>
		</div>
		<div id="botText_div" class="botText">为保护隐私，该号码将隐藏不向对方显示</div>
		<div class="bottomText">
			本页面及服务由上海法率信息技术有限公司提供，如有疑问请咨询： 021-80117789
		</div>
	</div>
	<!--提示弹出-->
	<div class="popUp_sysErr">
		<div class="talking_result text-center">
			<h4>温馨提示</h4>
			<p id="sendSMSError_msg"></p>
			<div class="link_btn_sysErrConfirm">
				<span class="link_confirm">确认</span>
			</div>
		</div>
	</div>
</mip-form>
</mip-sina-rem>
</mip-ilaw66-baidu-login>
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

