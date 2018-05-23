# mip-ck-ad-plus

mip-ck-ad-plus 用来支持整站页面的直投广告显示

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ck-ad-plus/mip-ck-ad-plus.js

## 示例
在MIP HTML中,直接使用标签, 用于正常显示直投的广告。示例如下:

### 基本用法
```html
<meta name="ck-ad-keywords" content="白癜风">
<meta name="location-enabled" content="true">
<meta name="ck-ad-config" content='{"data": {"tagid": "1,10"}}'>
<mip-ck-ad-plus pid="63"></mip-ck-ad-plus>
<mip-ck-ad-plus pid="52"></mip-ck-ad-plus>
<mip-ck-ad-plus pid="66"></mip-ck-ad-plus>
```

## 属性

### pid

说明：指定直投广告位唯一ID  
必填：是  
格式：数字  
单位：无  
默认值：无  
