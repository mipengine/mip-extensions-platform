# mip-51la-official
添加51LA统计组件，用于统计页面数据

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-51la-official/mip-51la-official.js

## 示例

MIP 提供51LA统计的插件，便于分析页面数据，需要提前到51LA统计这边创建站点，在百度统计后台会自动生成 JS 代码。从中找出 id 后插入到 MIP 组件的 `data-51laid` 位置。方法为：

### 基本用法

<mip-51la-official data-51laid="19594131"></mip-51la-official>
```html
<mip-51la-official data-51laid="19594131"></mip-51la-official>
```

## 属性

### {data-51laid}

说明：从51LA创建站点后获取到的id
必选项：是
类型：整型
默认值：无

## 注意事项

