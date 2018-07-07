# mip-ilaw66-informlawyer

mip-ilaw66-informlawyer 组件说明
该组件是通知律师接听电话，并判断当前律师是否在线，如果不在线，则进行推荐其他律师接听服务，或者是系统异常，重新接听，判断订单状态，支付后才能咨询。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-informlawyer/mip-ilaw66-informlawyer.js

## 示例

### 基本用法
```html
<mip-ilaw66-informlawyer>
	<div class="main">
        <img src="images/bg_touxaingnan.png" class="end_avatar" />
        <div class="end_name">王律师</div>
        <div class="end_type">擅长类型：<span></span></div>
        <div class="end_type end_type__commentFromUser">用户好评：<span class="goodCommentRate"></span></div>
    </div>
    <div class="inform_failed_middle">
        <!--<span class="inform_failed_middle_con">王律师未回应</span>-->
        <div class="inform_failed_tip"></div>
        <div class="inform_failed_nonworking">
            <div>当前是非工作时间</div>
            <div>建议您在8:00-23:00之间咨询</div>
        </div>
    </div>
    <div class="inform_failed_bottom">
        <div class="askOthers">立刻推荐其他律师</div>
        <div class="continueAsk reAsk">继续问</div>
        <!--<div style="clear:both;"></div>-->
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
                <span data-type="02" id="knowBtn">我知道了</span>
                <!--<span class="link_others">咨询其他律师</span>-->
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
    <div class="loadingArea">
        <div class="loadingText">
            页面加载中...
        </div>
    </div>
</mip-ilaw66-informlawyer>
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

