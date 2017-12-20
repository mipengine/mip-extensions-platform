# mip-zol-bbs-sign

请求

标题|内容
----|----
类型|业务
支持布局|N,S|
所需脚本|https://c.mipcdn.com/static/v1/mip-zol-bbs-sign/mip-zol-bbs-sign.js

## 示例

### 基本用法
```html
<mip-zol-bbs-sign data-check-url="" data-sign-url="" data-data='{}'></mip-zol-bbs-sign>
```

## 属性

### data-data

说明：提交签到请求时的追加数据
必选项：否
类型：json

### data-url

说明：提交签到的接口地址
必选项：是
类型：string

### data-check-url

说明：检查是否已经签到的接口地址
必选项：是
类型：string
