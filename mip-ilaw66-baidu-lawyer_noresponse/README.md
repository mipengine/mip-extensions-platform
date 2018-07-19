# mip-ilaw66-baidu-lawyer_noresponse

mip-ilaw66-baidu-lawyer_noresponse 组件说明
精选律师无人应答页面

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sina-rem/mip-sina-rem.js
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidu-lawyer_noresponse/mip-ilaw66-baidu-lawyer_noresponse.js

## 示例

### 基本用法
```html
<mip-ilaw66-baidu-lawyer_noresponse>
<mip-sina-rem>
<mip-stats-baidu>
    <script type="application/json">
        {
            "token": "d5a24ec2321d65ed4b781d2fce73c834"
        }
    </script>
</mip-stats-baidu>
	<mip-form url='https://www.baidu.com'>
    <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
    </mip-form>
    <div class="top">
        <!--<img class="top_avatar" src="images/bg_touxiangjx.png" />-->
        <!-- <p>律师未回应</p> -->
        <div class="main_text_busy">
            <div>在线律师全忙</div>
            <div class="tips">您可以选择文字描述遇到的问题,</div>
            <div class="tips">我们会24小时内回电或者发送短信为您服务,</div>
            <div class="tips">也可以由系统为您重新匹配律师</div>
        </div>
        <div class="main_text_nonworking">
            <div>律师均已休息</div>
            <p class="tips">您可以选择文字描述遇到的问题,</p>
            <p class="tips">我们会24小时内回电或者发送短信为您服务</p>
        </div>
    </div>
    <div class="main">

    <div id="js-continueAsk" class="continueAsk restjx">重新匹配</div>
    <div id="js-textConsulting" class="continueAsk ruleask">文字咨询</div>

    </div>

    <div class="popUp_sysErr" style="display: none;">
        <div class="talking_result text-center">
            <h4>温馨提示</h4>
            <p id="err_msg" style="font-size:20px"></p>
            <div class="link_btn_sysErrConfirm">
                <span class="link_confirm" id="err_confirm">确定</span>
            </div>
        </div>
    </div>
</mip-sina-rem>
</mip-ilaw66-baidu-lawyer_noresponse>
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

