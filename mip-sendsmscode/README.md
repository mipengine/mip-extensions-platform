# mip-sendsmscode

发送短信验证码

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sendsmscode/mip-sendsmscode.js

## 示例

### 基本用法
```html
<mip-sendsmscode url="#api-url-send-sms-code">
    <input id="mobile" name="mobile" type="tel">
	<button type="button">发送</button>
</mip-sendsmscode>
```

## 属性

### url

说明：短信验证码接口url
必选项：是

## 注意事项
### 组件内元素
手机号码文本框 type="tel"
发送按钮type="button"
### 短信接口
短信验证码接口url跨域问题
返回结果应为json格式,示例： {"status":1,"info":"发送成功"}
status 发送结果：1成功, 0失败
info 信息

