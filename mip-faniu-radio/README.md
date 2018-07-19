# mip-faniu-radio

图标单选框

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-faniu-radio/mip-faniu-radio.js

## 示例

### 基本用法
```html
<mip-faniu-radio 
    name="catid"
    value="36"
    validatetype="custom"
    validatereg="^[1-9]\d*$"
    validatetarget="catid"
    url="#api-url-cats"
>
</mip-faniu-radio>
```

### name

说明：选择返回值隐藏input name
必选项：是
类型：字符串

### value

说明：初始选中值
必选项：否
默认值：空字符

### validatetype

说明：验证类型, 用于支持简单的验证。
必选项：否
默认值：空字符

### validatereg

说明：自定义验证，补充站长个性化的验证规则。如果 validatetype 为 custom 时需填写相应验证规则
必选项：否
默认值：空字符

### validatetarget

说明： 验证提示对应 tag，用于对应错误时的提示显示元素的查找
必选项：否
默认值：空字符

### url

说明：数据api接口网址
必选项：是
类型：字符串

## 注意事项
api接口返回结果为json，示例:[{"id":1,"name":"选项1","icon":"默认图标url","icon_on":"选中图标url"}]

