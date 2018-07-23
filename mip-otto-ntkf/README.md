# mip-otto-ntkf

mip-otto-ntkf 用来支持网校小能客服咨询功能

标题|内容
----|----
类型|通用,定制
支持布局|container
所需脚本| https://c.mipcdn.com/static/v1/mip-otto-ntkf/mip-otto-ntkf.js

## 示例

### 基本用法

```html
<mip-otto-ntkf siteid="kf_9009" kfid="kf_9009_1497510869857">咨询客服</mip-otto-ntkf>
```

## 属性

### siteid

说明：小能客服网站代码
必选项：否
类型：字符串
默认值："kf_9009"
使用限制: 如果其他网站调用，务必添加专属 `siteid`

### kfid

说明：小能客服接待组代码
必选项：否
类型：字符串
默认值："kf_9009_1497510869857"
使用限制: 如果其他网站调用，务必添加专属 `kfid`

## 注意事项

1. 本插件定制使用，其他网站调用务必添加 `siteid`，`kfid` 属性