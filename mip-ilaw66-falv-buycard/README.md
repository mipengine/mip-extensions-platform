# mip-ilaw66-falv-buycard

mip-ilaw66-falv-buycard 组件说明
获取传值，加减数量的值，然后发送请求进行购买，跳转到支付页，如果数量值为空或者不符合对其进行验证，通过弹框形式提示弹出最少购买1张，最多购买99张
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-falv-buycard/mip-ilaw66-falv-buycard.js

## 示例

### 基本用法
```html
<mip-ilaw66-falv-buycard>
    <mip-form>
	<input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}"/>
	<input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
	
	<div class="header_block">
				<span class="glyphicon glyphicon-menu-left pull-left" style="left:5px"></span>律师卡详情
			</div>
	<div class="topbg">
		<mip-img src="" class="banner"></mip-img>
		<div class="blackboard"></div>
		<mip-img src="" class="banner"></mip-img>
		<mip-img src="" class="banner"></mip-img>
		<mip-img src="" class="banner"></mip-img>
		<mip-img src="" class="banner"></mip-img>
		<mip-img src="" class="banner"></mip-img>
	</div>
	<div class="chatingcard-down">
		<div class="yearcard-price" title="cardPrice">
			¥<i id="cardPrice" style="font-style: normal"></i>
			<div class="gw_num">
				<em class="jian">-</em>
				<input type="text" value="1" class="num" id="wantbuynumber"  maxlength="2" minlength="1"  />
				<em class="add">+</em>
			</div>
		</div>
		<button class="wantbuy" id="buyyearcard">我要购买</button>
	</div>
	</mip-form>
	<div class="authorize_bg">
		<div class="authorize">
			<h5>大姨妈授权</h5>
			<span></span>
			<p>问律师服务申请获得如下权限</p>
			<p>获得您的手机号信息，用于律师咨询</p>
			<p>通话</p>
			<label class="refuse">拒绝</label>
			<label class="allow">允许</label>
		</div>
	</div>
	<!-- 有未支付订单时提示信息start -->
	<div class="back__pop" style="display:none;" id="back__pop">
        <div class="layer__wrapper"></div>
        <div class="back__popLayer">
            <span>温馨提示</span>
            <span id="unpaymsg">请支付订单,让律师获得咨询收入</span>
            <div class="back-continue" id="js-back-continue">放弃优惠</div>
            <div class="back-leave" id="js-back-leave">支付后买卡</div>
        </div>
    </div>
    <!-- 有未支付订单时提示信息end -->
</mip-ilaw66-falv-buycard>
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

