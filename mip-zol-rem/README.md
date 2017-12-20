# mip-zol-rem

rem设置，以及百分比class名字的预设

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-zol-rem/mip-zol-rem.js

## 示例

### 基本用法
```html
<mip-zol-rem design-width="1242" max-width="540" percent="true"></mip-zol-rem>
```

## 属性

### design-width

说明：设计稿尺寸    
必选项：是   
类型：数字   
取值范围：无限制   
默认值：750

### max-width

说明：最大尺寸，只页面的最大尺寸（实际像素）    
必选项：否   
类型：数字   
取值范围：无限制   
默认值：540

### percent

说明：是否需要生成百分比的样式，`percent-1` ~ `percent-100` 的样式    
必选项：是   
类型：字符串   
取值范围：`true` or `false`   
默认值：false

## 注意事项

- 当页面当中没有需要进度条或者星级等需要展现百分比的样式的时候，`percent` 可以不设置
- 该组件的作用是为了 rem的初始值的计算和载入 reset，所以 `mip-zol-rem.less` 文件不能少
- 请把该组件放在 `<body>` 的下方作为第一个元素
