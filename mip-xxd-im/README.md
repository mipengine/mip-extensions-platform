# mip-xxd-im

该组件用于配合熊掌号jssdk调用IM组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xxd-im/mip-xxd-im.js

## 示例

### 基本用法
```html
<mip-xxd-im data-redirect="xxx.com">
    嵌套其他需要调用im功能的元素
</mip-xxd-im>
```

## 属性

### data-redirect

说明：调用im失败后需要跳转的地址
必选项：是
类型：string
默认值：''

## 注意事项
需要配合mip-st-auth和mip-st-xzh引入熊掌号jssdk后使用
