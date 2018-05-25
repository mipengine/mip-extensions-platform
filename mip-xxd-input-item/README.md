# mip-xxd-input-item

该组件为选校帝工具页表单输入框组件，为解决MIP工具页表单交互问题而制作，支持的类型有输入框，下拉框，下拉输入框组合，图形验证码框，短信验证码框等。组件使用的时候需要与`mip-xxd-logic-form`配合使用

标题|内容
----|----
类型|通用
支持布局|responsive
所需脚本|https://c.mipcdn.com/static/v1/mip-xxd-input-item/mip-xxd-input-item.js

## 示例

### 基本用法
```html
<mip-xxd-input-item
    id="scoreItem"
    data-item="{title:学习成绩,type:input,key:score,placeholder:百分制}"
    data-validate="[{type:require,text:请填写学习成绩},{type:range,minValue:0,maxValue:100,text:请填写正确的学习成绩}]"
>
</mip-xxd-input-item>
```

## 属性

### id
id为必须属性，该属性在与其他输入框交互时需要用到

### data-item
元素所用到的属性，需要以json形式传入

### data-validate
该属性用来进行校验，需要以json形式传入

### on
用来与其他组件进行通信，需要与data-actionsMap配合使用
```
on=目标元素ID.refreshData(自身ID|action名称)
```
action包括：`changeList`，`toggleShow`，`changePlaceholder`

### data-actionsMap
与on配合使用，以json形式传入
