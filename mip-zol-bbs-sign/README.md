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

### [data-name="bbs-sign-config"]
说明：包含此属性名的script/json数据，做数据提交时作为附加数据提交给后端
必选项：否
类型：json对象

### data-data-xxx
说明：此类型的数据可用作提交数据时的附加数据，自动转换为xxx:value形式
必选项：否
类型：字符串