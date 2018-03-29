# mip-caidashi-mob

mip-caidashi-mob 检测是否是pc端访问移动端，如果是，强制进入pc端，

标题|内容
----|----
类型|通用
支持布局|
所需脚本|https://c.mipcdn.com/static/v1/mip-caidashi-mob/mip-caidashi-mob.js

## 示例

### 基本用法
```html
<mip-caidashi-mob src="" data-protocol="http:">
   
</mip-caidashi-mob>
```

## 属性

### src

说明：移动站点域名
必选项：是

### data-protocol

说明：pc站点域名
必选项：否
取值范围：http: || https: || auto(默认)

## 注意事项
如果 data-protocol-pc设置了值，那么表明PC站点的协议就是这个值，如果未设置值，将自动匹配是 http:还是https: 建议根据需求设置。

