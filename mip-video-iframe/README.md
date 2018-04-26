# mip-video-iframe

mip-video-iframe 组件说明
`<mip-video-iframe>`是用来支持在 MIP 中嵌入searchvideo的一种方式，需要注意的是：所嵌入的内容强制是符合 HTTPS 协议的
与`<mip-iframe>`的区别是会加上统计用的referrer，使用时不用关心.

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-video-iframe/mip-video-iframe.js

## 示例

### 基本用法
```html
<mip-video-iframe
    allowfullscreen 
    src="https://www.mipengine.org/article/instant-pageview.html" 
    width="400"
    height="300" 
    allowtransparency="true">
</mip-video-iframe>
```

## 属性

###src
说明：与原生 `<iframe>` 的 src 属性作用一致。
必选项：是
类型：URL
单位：无
取值：必须要使用 HTTPS 地址
默认值：无

###width
说明：宽度，不是实际宽度，与高度属性配合来设置图片比例，详见组件布局
必选项：是
类型：数字
单位：无
默认值：无

###height
说明：高度，不是实际高度，与宽度属性配合来设置图片比例，详见组件布局
必选项：是
类型：数字
单位：无
默认值：无

###allowfullscreen
说明：与原生 `<iframe>` 的 allowfullscreen 属性作用一致
必选项：否
取值：空
默认值：无

###srcdoc
说明：与原生 `<iframe>` 的 srcdoc 属性作用一致
必选项：否
类型：HTML_code
单位：无
取值：要显示在 `<iframe>` 中的 HTML 内容。必需是有效的 HTML 语法
默认值：无

###sandbox
说明：与原生 `<iframe>` 的 sandbox 属性作用一致
必选项：否
类型：字符串
单位：无
取值："", allow-same-origin, allow-top-navigation, allow-forms, allow-script
默认值：无

###allowtransparency
说明：与原生 `<iframe>` 的 allowtransparency 属性作用一致
必选项：否
类型：字符串
单位：无
取值："", true, false
默认值：无

