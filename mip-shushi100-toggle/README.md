# mip-shushi100-toggle

mip-shushi100-toggle 关闭/展开组件，关闭/展开指定dom

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-shushi100-toggle/mip-shushi100-toggle.js

## 示例

### 基本用法
```html
<section class="toggle-target">我是要被关闭或展开的层</section>
<mip-shushi100-toggle class="toggle-icon" target="toggle-target">关闭/展开</mip-shushi100-toggle>
```

## 属性

### target

说明：指定需要关闭/展开的dom,支持queryselector
必选项：是
类型：字符串
取值范围：'toggle-target',queryselector内容
默认值：toggle-target

##注意事项
目标dom中如果默认展开，可以加上class:'toggle-show'


