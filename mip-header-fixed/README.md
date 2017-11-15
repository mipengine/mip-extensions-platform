# mip-header-fixed

mip-header-fixed  主要是组件的position:fixed后，创建一个元素，获取该组件的height,当页面初次加载时，不影响布局。

标题|内容
----|----
类型|通用
支持布局|无
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-header-fixed/mip-header-fixed.js

## 示例

### 基本用法
```html
<mip-header-fixed data-target="inner">
   <div class="header Header-fixed">自定义内容，可以嵌套其他组件</div>
</mip-header-fixed>
```

## 属性

### data-target

说明：指定一个元素，在这个元素的前面添加一个空的div标签，这个标签将会获取到这个组件的height.默认是放置在组件内。
必选项：否
类型：字符串
取值范围 ：inner ||   queryselector的内容

## 注意事项 
1:使用该组件，组件内直接子元素有且只有一个.

