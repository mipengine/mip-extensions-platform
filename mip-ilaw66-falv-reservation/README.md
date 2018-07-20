# mip-ilaw66-falv-reservation

mip-ilaw66-falv-reservation 组件说明
律师预约：
1，日历了表实现
2，通过选择下拉框值，选择日期时间后，提交预约时间（预约时间必须三天之内，若不是，则提醒预约时间要在三天之内，并不能提交）
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-falv-reservation/mip-ilaw66-falv-reservation.js

## 示例

### 基本用法
```html
<mip-ilaw66-falv-reservation>
    <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
    <div class="reservation_div">
        <img src="images/icon_yuyue.png"/>
        <p>律师将在预约时间，与您联系</p>
        <p>（可预约3天内的服务）</p>
        <div class="reservation_div__select"><span>问题分类：</span>
            <select id="reservationquestionType"></select>
        </div>
        <div class="reservation_div__select"><span>预约时间：</span>
            <input type="datetime-local" id="reservationTime" name="user_date"/>
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
</mip-ilaw66-falv-reservation>
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

