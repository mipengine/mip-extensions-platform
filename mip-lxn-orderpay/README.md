# mip-lxn-orderpay

mip-lxn-orderpay 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-lxn-orderpay/mip-lxn-orderpay.js

## 示例

### 基本用法
```html
<mip-lxn-orderpay>
     <div class="order_pay">
        <div class="heard">
            <div class="heard-top">
                <div class="back-con">
                    <span class="back"></span>
                </div>
                <span class="text_date">7月2号-08:00</span>
            </div>
            <div class="heard_bottom clearfix">
                <div class="left_div item ">
                    <div id="move-out">
                        <span>天通苑一区12天</span>
                    </div>
                    <div id="out-dianti" class="marginT">有电梯</div>
                </div>
                <div class="center_div item">
                    <div>小面</div>
                    <div>----></div>
                </div>
                <div class="right_div item">
                    <div id="move-in">
                        <span>天通苑一区12天</span>
                    </div>
                    <div id="in-dianti" class="marginT">有电梯</div>
                </div>
            </div>
        </div>
        <div class="center">
            <p class="title">费用明细</p>
            <ul id="pilllist">
                <li>
                    <span>起步价（小面）</span>
                    <span class="right">96元</span>
                </li>
                <li>
                    <span>超里程费</span>
                    <span class="right">96元</span>
                </li>
                <li>
                    <span>合计</span>
                    <span class="right total">192元</span>
                </li>
            </ul>
        </div>
        <div class="btn_pay">
            <div class="description">
                免费提供5000元搬家服务险,服务前40分钟外,免费取消
            </div>
            <div class="sure-pay">
                确认支付
            </div>
        </div>
    </div>
</mip-lxn-orderpay>
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

