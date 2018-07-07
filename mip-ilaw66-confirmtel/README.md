# mip-ilaw66-confirmtel

mip-ilaw66-confirmtel 组件说明
手机号码确认后产生异步交互，判断页面的跳转实现
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-confirmtel/mip-ilaw66-confirmtel.js

## 示例

### 基本用法
```html
<mip-ilaw66-confirmtel>
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
                <span class="reAsk" data-type="02">希望重试</span>
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
    <div class="loadingArea">
        <div class="loadingText">
            页面加载中...
        </div>
    </div>
    <div class="confirm_top">
        <div class="confirm_top_con">
            <span id="defaultLaywerName"></span>律师于<span id="defaultDate"></span>通过虚拟电话联系了
        </div>
        <div id="defaultPhone"></div>
    </div>
    <div class="confirm_middle">
        <span>号码正确</span>
        <div class="confirm_continueAsk link_continue reAsk" href="javascript:(0)" data-type="02">继续问</div>
    </div>
    <div class="confirm_bottom">
        <span>号码错误</span>
        <div class="confirm_continueAsk link_correct">更换手机号</div>
    </div>
</mip-ilaw66-confirmtel>
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

