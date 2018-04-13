# mip-cgcep-shipei

用于移动端网页适配

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cgcep-shipei/mip-cgcep-shipei.js

## 示例

### 基本用法
```html
<mip-cgcep-shipei>
    自定义内容，可以嵌套其他组件
</mip-cgcep-shipei>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项
默认是将设计图分成16份
对应 css 开发，任何弹性尺寸均使用 rem 单位，rem 默认宽度为 视觉稿宽度 / 16;
less 中 @ppr(pixel per rem) 变量写法 -- @ppr: 750px/16/1rem;
 元素尺寸写法 -- div { width: 750px/@ppr; }。