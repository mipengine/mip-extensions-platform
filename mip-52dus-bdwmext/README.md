# mip-52dus-bdwmext

自适应MIP网站使用百度网盟反屏蔽广告自动匹配PC广告或WAP广告。

标题|内容
----|----
类型|广告
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-52dus-bdwmext/mip-52dus-bdwmext.js

## 示例

### 基本用法
```html
<mip-52dus-bdwmext domain="www.example.com" waptoken="wap123456" pctoken="pc123456"></mip-52dus-bdwmext>
```

## 属性

### domain

说明：反屏蔽域名，填在百度网盟申请的域名
必选项：是
类型：URL
取值范围：不能带 HTTP 或 HTTPS 不带 // ,结尾不带 /
默认值：无

### waptoken

说明：在网盟申请的 token 值，用于手机浏览器的广告
必选项：是
类型：字符串
默认值：无

### pctoken

说明：在网盟申请的 token 值，用于PC浏览器的广告
必选项：否
类型：字符串
默认值：无