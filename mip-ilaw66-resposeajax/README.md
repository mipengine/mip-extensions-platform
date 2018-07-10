# mip-ilaw66-resposeajax

mip-ilaw66-resposeajax 组件说明
通知律师状态未回应时，有两种状态可供选择
1，点击继续通知律师,重新发送请求
2，点击预约咨询，跳转到预约流程
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-resposeajax/mip-ilaw66-resposeajax.js

## 示例

### 基本用法
```html
<mip-ilaw66-resposeajax>
 <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
    <input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
			<div class="header_block">
				<span class="glyphicon glyphicon-menu-left pull-left" onclick="location.href='./'"></span>通知律师
			</div>    
    <div class="top">
        <img class="top_avatar" src="images/bg_touxiangjx.png" />
        <p>律师未回应</p>
    </div>
    <div class="main">
        <div class="main_text_busy">律师可能在忙，请您稍后重试</div>
        <div class="main_text_nonworking">
            <div>当前是非工作时间</div>
            <p>建议您在8:00~23:00之间咨询</p>
        </div>

        <div id="js-continueAsk" class="continueAsk">继续通知律师</div>
        <div class="ruleask">预约咨询</div>
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
</mip-ilaw66-resposeajax>
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

