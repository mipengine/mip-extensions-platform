# mip-pc-redirect
mip-pc-redirect 实现当使用非移动设备访问时自动跳转到PC页面

根据浏览器UserAgent来判断是否是移动设备

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-pc-redirect/mip-pc-redirect.js

## 示例

### 带广告的播放
```html
<mip-pc-redirect url="http://www.vodjk.com/mxyy/180813/1497455.shtml"></mip-pc-redirect>
``` 

## 属性

### url
说明：mip页面对应的PC网页地址  
必选项：是
类型：string
