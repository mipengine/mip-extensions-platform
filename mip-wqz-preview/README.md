# mip-wqz-preview

弹出一个预览

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-wqz-preview/mip-wqz-preview.js

## 示例

![](https://raw.githubusercontent.com/jenkey2011/blog/master/themes/melody_mod/source/img/preview.gif)

### 基本用法
```html
<mip-wqz-preview>
    <button preview data-preview-link="https://m.baidu.com/"> 预览Baidu</button>
    <button preview data-preview-link="https://www.mipengine.org/"> 预览Mip</button>  
</mip-wqz-preview>
```

## 属性

### preview

说明：有此属性才会触发预览弹窗
必选项：是
类型：字符串

### data-preview-link

说明：预览的地址
必选项：是
类型：字符串

## 注意事项

