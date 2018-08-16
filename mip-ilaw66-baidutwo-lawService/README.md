# mip-ilaw66-baidutwo-lawService

mip-ilaw66-baidutwo-lawService 组件说明
法率网法律服务2期
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidutwo-lawService/mip-ilaw66-baidutwo-lawService.js

## 示例

### 基本用法
```html
<mip-ilaw66-baidutwo-lawService>
<mip-sina-rem>
<mip-stats-baidu token="d5a24ec2321d65ed4b781d2fce73c834"></mip-stats-baidu>
 <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
	  <div class="top_header">
            <span class="glyphicon glyphicon-menu-left pull-left"></span>
            <div class="div_header">法律服务</div>
        </div>
    <p class="lawservice_p">如有需要，可选择平台如下服务</p>
     <div class="toortip"><span class="tip">提示信息</span></div>
    <div class="lawservice_div" data-serviceid="0">
        <img src="images/mywritercard_icondiamond.png"/>
        <p>推荐律师打官司</p>
        <p>推荐资深，有胜诉经验、专业对口的当地律师</p>
    </div>
    <div class="lawservice_div" data-serviceid="1">
        <img src="images/mywritercard_iconhelp.png"/>
        <p>需要律师见面服务</p>
        <p>深度咨询、陪同谈判等，精选当地律师，时间灵活</p>
    </div>
    <div class="lawservice_div" data-serviceid="2">
        <img src="images/mywritercard_iconletter.png"/>
        <p>发送律师函</p>
        <p>催欠款、发警告、留证据</p>
    </div>
    <div class="lawservice_div" data-serviceid="3">
        <img src="images/mywritercard_iconwarning.png"/>
        <p>起草审核：合同/协议</p>
        <p>签合同、起草协议律师把关，风险预防</p>
    </div>
     <div class="lawservice_div" data-serviceid="4">
        <img src="images/mywritercard_iconqt.png"/>
        <p>其他法律服务</p>
        <p>根据实际需求，提供个性化法律服务</p>
    </div>
    <div class="lawservice_warn">
    	<p>提交后，法律顾问将于1个工作日联系您，</p>
    	<p>若事情紧急请直接拨打 <a data-type="mip" href="tel:021-80117789" class="lawservivetel">021-80117789</a>，接通后请说：在百度提交了法律服务需求，请帮我推荐律师</p>
    </div>
    <div class="lawservice_btn">
        <button class="lawservice_commit">提交</button>
     <!--   <a href="./"><button>我不需要</button></a>-->
    </div>
</mip-sina-rem>
</mip-ilaw66-baidutwo-lawService>
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

