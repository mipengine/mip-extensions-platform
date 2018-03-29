# mip-zol-input

该组件用于需要输入表单，但不想用mip-form的情况

标题|内容
----|----
类型|公司通用组件
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-zol-input/mip-zol-input.js

## 示例

### 基本用法

```html
<mip-zol-input id="companyNameInput" type="input" placeholder="请输入公司名称"></mip-zol-input>
```

提供blur事件，可以再页面中DOM用 on 来绑定

```html
<div on="tap:companyNameInput.blur"></div>
```

## 属性

### type

目前支持 input, textarea 两种

### 其他属性

data-id: 作为表单元素id
data-name: 作为表单元素name
value: 作为表单元素value
placeholder: 作为表单元素placeholder

## 注意事项


