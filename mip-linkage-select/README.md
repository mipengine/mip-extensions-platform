# mip-linkage-select

联动select（暂限2级）

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkage-select/mip-linkage-select.js

## 示例

### 基本用法
```html
<mip-linkage-select 
    name="areaid"
    value="370100"
    validatetype="custom"
    validatereg="^\d{6}"
    validatetarget="areaid"
    url="#api-url-load-select-data" 
    key="code"
    name-key="name"
    parent-key="parent"
    tips="请选择省份|请选择城市"
    tips-value="0|0"
    must-final="true"
    class="mip-linkage-select"
>
</mip-linkage-select>
```

## 属性

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

说明：二级联动数据api接口网址
必选项：是
类型：字符串

### key

说明：联动数据值字段名称
必选项：否
类型：字符串
默认值：id

### name-key

说明：联动数据显示字段名称
必选项：否
类型：字符串
默认值：name

### parent-key

说明：联动数据上级关联字段名称
必选项：否
类型：字符串
默认值：parent

### tips

说明：select选择提示文字(用|分割)
必选项：否
类型：字符串
默认值：false

### tips-value

说明：select选择提示值(用|分割)
必选项：否
类型：字符串
默认值：空字符串|空字符串

### must-final

说明：是否选择必须到最后一级
必选项：否
取值范围:true|false
类型：字符串
默认值：false


## 注意事项

