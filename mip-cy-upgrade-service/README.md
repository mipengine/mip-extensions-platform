# mip-cy-upgrade-service

mip-cy-upgrade-service 春雨升级qa服务组件

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-cy-upgrade-service/mip-cy-upgrade-service.js <br> https://c.mipcdn.com/static/v1/mip-cy-pay-button/mip-cy-pay-button.js

## 示例

### 基本用法
```html
<mip-cy-upgrade-service partner="chunyu_xzh" problem-id="xxx">
    <div class="cyui-cells cyui-cells__top">
            <div class="cyui-cell">
                <div class="cyui-cell__bd color-gray">系统指派医生</div>
                <div class="cyui-cell__ft">
                    <div class="cyui-cell__bd color-orange">¥2</div>
                </div>
            </div>
        </div>
        <div class="cyui-cells">
            <div class="cyui-cell cyui-cell_icon">
                <i class="upgrad-icon"></i>
            </div>
            <div class="cyui-cell cyui-cell_switch cyui-cell__no-border">
                <div class="cyui-cell__bd">{{ item.title }} <span class="color-orange"> + {{ item.price_text }}</span></div>
                <div class="cyui-cell__ft">
                    <input class="cyui-switch" type="checkbox" data-upgrade-type="{{ item.type }}" value="{{ item.price }}">
                </div>
            </div>
            <div class="cyui-cell">
                <div class="cyui-cell__bd color-gray">共需支付</div>
                <div class="cyui-cell__ft">
                    <div class="cyui-cell__bd color-orange" id="total-price">¥2</div>
                </div>
            </div>
        </div>
        <div class="btn-wrap">
            <mip-cy-pay-button
                class="cyui-btn cyui-btn_primary"
                id="pay-btn"
                data-problem-id="{{ problem_id }}"
                order-desc="快速提问"
                m-bind:order-type=orderType
                partner="chunyu_xzh"
                m-bind:info-dict=infoDict
            >去支付{{graph.price}}</mip-cy-pay-button>
        </div>
</mip-cy-upgrade-service>
```

## 属性

### partner

说明：渠道参数
必选项：是
类型：string
默认值：无

### problem-id

说明：问题id
必选项：是
类型：string
默认值：无

