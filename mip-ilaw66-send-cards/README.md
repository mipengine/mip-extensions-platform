# mip-ilaw66-send-cards

mip-ilaw66-send-cards 组件说明
通过判断激活状态跳转页面，赠送表单验证,表单可以使用mip组件
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-send-cards/mip-ilaw66-send-cards.js

## 示例

### 基本用法
```html
<mip-ilaw66-send-cards>
    <div>
    		<div class="header_block">
		<span class="glyphicon glyphicon-menu-left pull-left" style="left:5px" ></span>送朋友
	</div>
	<p class="activationcard__text">送卡给朋友</p>
	<mip-form method="get" url="https://xxx.php">
		<input type="text" placeholder="输入朋友的手机号" name="activationid" id="activationid" class="mycardandcoupons_sendanyone"/>
		<input type="text" placeholder="再次输入朋友的手机号" name="activationid" id="activationidagain" class="mycardandcoupons_sendanyone"/>
		<button id="sendtoanyone" class="mycardandcoupons_sendanyone__btn">送卡给朋友</button>
	</mip-form>
	<div class="sendmessage_bg">
		<h3>送卡说明</h3>
		<ol>
			<li>该卡仅限于问律师服务使用。</li>
			<li>您的朋友须用您输入的手机号登录服务查收。</li>
			<li>因赠卡不可逆，请确保您输入的手机号码正确。</li>
			<li>送卡成功后，系统将短信告知您的朋友。</li>
		</ol>
	</div>
	<!-- 遮罩层 -->
	<div id="statebg" class="statebg">
		<div class="activationstate">
			<mip-img id="stateimg" src="images/wx_bg_fail.png"></mip-img>
			<p id="statemsg">激活结果信息显示</p>
			<p id="gocheck" class="gocheck">去查看</p>
		</div>
	</div>
	<!-- 输入弹层提示 -->
	<div id="popbg" class="popbg">
		<div class="pleasetype">
			<p class="typeactivationid" id="telephonecontent">请输入朋友的手机号</p>
			<p id="gotype" class="gotype">好的</p>
		</div>
	</div>
    </div>
</mip-ilaw66-send-cards>
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

