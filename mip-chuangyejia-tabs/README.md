# mip-chuangyejia-tabs

- mip-chuangyejia-tabs 是创业家网的业务组件，不通用
- `mip-semi-fixed`组件在SF中打开会复制到另外一个`body`，而这些元素需要绑定事件并同步更新。故其中有大量的全局选择器。后续后讨论解决~ 

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-chuangyejia-tabs/mip-chuangyejia-tabs.js

## 示例

### 基本用法
```html
<mip-chuangyejia-tabs>
    自定义内容，可以嵌套其他组件
</mip-chuangyejia-tabs>
```

## 属性

### tabs-col

说明：定义列数

必选项：是

类型：Number

取值范围：整数

单位：无

默认值：无

### tabs-change-top

说明：定义每次翻页时回滚页面的高度

必选项：是

类型：Number

取值范围：整数

单位：无

默认值：无

## 注意事项

业务组件，不通用

