# mip-ilaw66-reservation2

mip-ilaw66-reservation2 组件说明
法率网二期预约
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-reservation2/mip-ilaw66-reservation2.js

## 示例

### 基本用法
```html
<mip-sina-rem>
			<mip-stats-baidu token="d5a24ec2321d65ed4b781d2fce73c834"></mip-stats-baidu>
			<mip-ilaw66-reservation2>
    <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
    <div class="header_block">
        <span class="glyphicon glyphicon-menu-left pull-left" style="left:5px" onclick="window.history.back(-1)"></span>我的预约
    </div>
    <div class="reservation_div">
        <img src="tempbaidu/images/icon_yuyue.png"/>
        <p>律师将在预约时间，与您联系</p>
        <p>（可预约3天内的服务）</p>
        <div class="reservation_div__select"><span>问题分类：</span>
            <select id="reservationquestionType"></select>
        </div>
        <div class="reservation_div__select"><span>预约时间：</span>
        	
            <input type="datetime-local" id="reservationTime" name="user_date"  />
        </div>
    </div>
    <button class="reservationbtn">提交预约</button>
    <div class="reservation_txt">
        <p>预约服务说明：</p>
        <ol>
            <li>预约提交后立即生效，从首页可进入预约管理页;</li>
            <li>如有需要，您可以取消预约；</li>
            <li>咨询结束后，请至分秒律师服务页，支付费用.</li>
        </ol>
    </div>
    
    
<div class="popUp_unpaidErr fixedpoisition">
    <div class="talking_result text-center">
        <h4>温馨提示</h4>
        <p id="message">可预约3天内的服务</p>
        <div class="link_btn_unpaidErrConfirm">
            <span class="link_confirm">确认</span>
        </div>
    </div>
</div>

<div id="popUp" class="popUp fixedpoisition">
    <div class="talking_result text-center">
        <h4>温馨提示</h4>
        <p id="cimmentmessage">非服务时间，可尝试为您匹配律师，是否继续？</p>
        <div class="link_btn">
            <span id="link_undo" class="link_undo">取消</span>
            <span id="link_done" class="link_done">确定</span>
        </div>
    </div>
</div>


		</mip-ilaw66-reservation2>
   </mip-sina-rem>
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

