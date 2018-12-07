# mip-no-browser-operation

mip-no-browser-operation 用于禁止用户在浏览器中进行右键菜单、全选、复制的方案

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-no-browser-operation/mip-no-browser-operation.js

## 示例

### 基本用法
```html
<mip-no-browser-operation
  no-open-menu="true"
  no-select="true"
  no-copy="true">
    自定义内容，可以嵌套其他组件
</mip-no-browser-operation>
```

### 禁止右键打开菜单
```html
<mip-no-browser-operation
  no-open-menu="true">
    自定义内容，可以嵌套其他组件
</mip-no-browser-operation>
```

### 禁止全选
```html
<mip-no-browser-operation
  no-select="true">
    自定义内容，可以嵌套其他组件
</mip-no-browser-operation>
```

### 禁止复制
```html
<mip-no-browser-operation
  no-copy="true">
    自定义内容，可以嵌套其他组件
</mip-no-browser-operation>
```


## 属性

### no-open-menu

说明：是否禁止打开菜单
必选项：否
类型：布尔值
取值范围：true|false
默认值：false

### no-select

说明：是否禁止全选内容
必选项：否
类型：布尔值
取值范围：true|false
默认值：false

### no-copy

说明：是否禁止复制内容
必选项：否
类型：布尔值
取值范围：true|false
默认值：false



