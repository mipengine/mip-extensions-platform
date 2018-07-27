# mip-xyz-toggle-class

mip-xyz-toggle-class 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xyz-toggle-class/mip-xyz-toggle-class.js

## 示例

### 基本用法
```html
<mip-xyz-toggle-class className="active" target=".layout">
    点击源DOM会添加或删除源DOM自定义CLASS名，并控制添加或者删除一个目标DOM的CLASS名。
    用以实现类似点击展开收起的效果。点击该段落，F12查看DOM变化。
</mip-xyz-toggle-class>
<div class="layout">目标对象</div>
```

## 属性

### className

说明：需要TOGGLE的CLASS名

必选项：是

类型：'String'

### target

说明：目标对象

必选项：否

类型：'String'

取值范围：queryselector

## 注意事项

此组件剥离了样式层，需要自行实现具体视觉效果
