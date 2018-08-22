# mip-xxd-set-cookie

mip-xxd-set-cookie 组件说明

该组件为选校帝页面cookie设置组件，可以通过该组件再页面设置cookie

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xxd-set-cookie/mip-xxd-set-cookie.js

## 示例

### 基本用法
```html
<mip-xxd-set-cookie
    data-cookies='[{"name":"name","value":"xxx","maxAge":"1000"}]'
    data-prefix='prefix_'
    data-domain='xxx.com'
    data-path='/'
>
</mip-xxd-set-cookie>
```

## 属性

### data-cookies

说明：JSON后的cookie数组
必选项：是
类型：string
默认值：'[]'

### data-prefix

说明：cookie前缀
必选项：否
类型：string
默认值：''

### data-domain

说明：cookie的域
必选项：否
类型：string
默认值：当前域名

### data-path

说明：cookie的路径
必选项：否
类型：string
默认值：''

## 注意事项

无特殊注意事项
