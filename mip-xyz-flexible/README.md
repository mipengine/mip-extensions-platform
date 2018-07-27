# mip-xyz-flexible

mip-xyz-flexible 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xyz-flexible/mip-xyz-flexible.js

## 示例

### 基本用法
```html
<mip-xyz-flexible hidden>
    页面容器根节点，嵌套所有其他内容，用以支持REM单位，F12查看到HTML根节点出现font-size属性即代表生效
</mip-xyz-flexible>
```

## 属性

### hidden

说明：防抖

必选项：是

类型：string

取值范围：'hidden'

默认值：'hidden'

## 注意事项
因为计算rem布局的js后于页面渲染执行，会导致页面布局抖动，故需要在此组件添加hidden属性，默认隐藏组件内的所有DOM，带该组件渲染完成后再显示内容。
