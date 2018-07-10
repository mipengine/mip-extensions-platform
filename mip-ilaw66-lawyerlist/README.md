# mip-ilaw66-lawyerlist

mip-ilaw66-lawyerlist 组件说明
律师列表异步加载
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-lawyerlist/mip-ilaw66-lawyerlist.js

## 示例

### 基本用法
```html
<mip-ilaw66-lawyerlist>
 <div id="wrapper">
		<div id="scroller">
			<div id="refreshing_block">
				<span id="down-icon" class="icon-double-angle-down pull-down-icon"></span>
				<span id="pullDown-msg" class="pullDownLabel"></span>
			</div>
				<div class="header_block">
		<span class="glyphicon glyphicon-menu-left pull-left backfirst"></span>我的律师
	</div>
			<div class="content_block block_lawyerlist" style="display:none;" id="content_block"></div>
		</div>
	</div>
	<div class="popUp_uncheckErr">
		<div class="talking_result text-center">
			<h4>温馨提示</h4>
			<p id="tips"></p>
			<div class="link_btn_uncheckErrConfirm">
				<span class="link_confirm">确认</span>
			</div>
		</div>
	</div>
	<div class="popUp_confirm">
		<div class="talking_result text-center">
			<h4>温馨提示</h4>
			<p>您咨询的律师已下线或正在服务中</p>
			<div class="link_btn">
				<span data-type="02" id="still_reAsk">希望重试</span>
				<span class="link_others">咨询其他律师</span>
			</div>
		</div>
	</div>
	<div class="popUp_sysErr">
		<div class="talking_result text-center">
			<h4>温馨提示</h4>
			<p>系统异常，请返回重新咨询</p>
			<div class="link_btn_sysErrConfirm">
				<span class="link_confirm">确认</span>
			</div>
		</div>
	</div>
	<div class="popUp_unFinishedBillErr">
		<div class="talking_result text-center">
			<h4>温馨提示</h4>
			<p>您有订单未结束，请等待1分钟后再试</p>
			<div class="link_btn_unFinishedBillErrConfirm">
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
	<!--<div class="loadingArea">
		<div class="loadingText">
			页面加载中...
		</div> 
	</div>-->
    <!--菜单栏【我的】遮罩层start-->
    <div class="myRelative-bg">
        <div class="myRelative-bg__module">
            <div class="myRelative-bg__accountBalance">
                <p id="accountBalance"></p>
            </div>
            <div class="myRelative-bg__list">
                <a href="mycardandcoupons">
                    <p>我的卡券</p>
                </a>
                <a href="lawyerlist">
                    <p>我的律师</p>
                </a>
                <a href="orderlist">
                    <p>我的订单</p>
                </a>
            </div>
            <div class="myRelative-bg__service">
                客服
                <p>021-80117789</p>
                <p>工作时间：9:00~18:00</p>
            </div>
        </div>
    </div>
</mip-ilaw66-lawyerlist>
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

