# mip-zhaobiao-select 下拉更改表单提交插件

下拉更改表单提交插件

标题|内容
----|----
类型|通用
支持布局|responsive, fixed-height, fill, container, fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zhaobiao-select/mip-zhaobiao-select.js

## 示例

### 基本使用

```html
<mip-form method="get" url="https://www.mipengine.org?we=123">
    <mip-zhaobiao-select name="zhaobiaoSelect" id="zhaobiaoSelect" options="所有|招标|中标|预告" values="1|2|3|4">
	</mip-zhaobiao-select>
</mip-form>
```

## 属性

### name

说明：组件name
必选项：是  

### id

说明：组件id
必选项: 是  

### options

说明:  组件内部options名称
必选项：是   

### values

说明：组件内部options值
必选项：是
