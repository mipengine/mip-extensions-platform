# mip-cy-pay-button

mip-cy-pay-button 组件用于创建订单并进行百度支付

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-cy-pay-button/mip-cy-pay-button.js

## 示例

### 基本用法

```html
    <mip-cy-pay-button
        login-url="{{login_url}}"
        doctor-id="{{id}}"
        order-name="{{name}}"
        order-desc="{{name}}-图文咨询"
        order-type="graph"
        partner="chunyu_xzh"
        info-dict='{"doctor_id": "{{id}}"}'
        fail-url=""
    >[按钮文案]</mip-cy-pay-button>
```

## 属性

### login-url

说明：登录url, 空则表示用户已经登录
必选项：否
类型：字符串
取值范围：URL
单位：无
默认值：空

### doctor-id

说明：医生id
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无

### order-name

说明：订单类型
必选项：是
类型：字符串
取值范围：URL
单位：无
默认值：空

### order-type

说明：订单类型
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无

### order-desc

说明：订单描述
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：空

### partner

说明：渠道标示, 后端统计需要
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：空

### fail-url

说明：失败后跳转url
必选项：否
类型：字符串
取值范围：URL
单位：无
默认值：空

### auto-pay

说明：是否自动触发图文支付，值是1时自动触发，否则不触发
必选项：否
类型：数字
取值范围：非负整数
单位：无
默认值：无

## 注意事项

login-url为空表示已登陆，否则为需要登录，跳转到登录url～
