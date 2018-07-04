# mip-ilaw66-make-appointment

mip-ilaw66-make-appointment 组件说明
订单预约界面数据交互，根据不同的的接口返回数据，呈现不同的提示，预约时间实现，预约时间的修改
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-make-appointment/mip-ilaw66-make-appointment.js

## 示例

### 基本用法
```html
<mip-ilaw66-make-appointment>
    <div>
    		<div class="reservation_div">
        <img src="images/icon_yuyue.png"/>
        <p>律师将在预约时间，与您联系</p>
        <p></p>
        <div class="reservation_div__select__content"><span>问题分类：</span>
            <span id="reservationquestionTypeContent">eg婚姻家庭</span>
        </div>
        <div class="reservation_div__select__content"><span>预约时间：</span>
            <span id="reservationTime">eg2018-03-10 12:59</span>
        </div>
    </div>
    <button class="reservationbtn_change">修改预约</button>
    <button class="reservationbtn_cancel">取消预约</button>
    <div class="reservation_txt">
        <p>预约服务说明：</p>
        <ol>
            <li>预约提交后立即生效，从首页可进入预约管理页;</li>
            <li>如有需要，您可以取消预约；</li>
            <li>咨询结束后，请至分秒律师服务页，支付费用.</li>
        </ol>
    </div>
    </div>
</mip-ilaw66-make-appointment>
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

