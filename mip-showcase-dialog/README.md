# mip-showcase-dialog

weecoffee 商品详情弹窗逻辑

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-showcase-dialog/mip-showcase-dialog.js

## 示例

### 基本用法
```html

<mip-showcase-dialog id="scdialog">
    <div>content</div>
</mip-showcase-dialog>

<button on="tap:scdialog.open">open</button>
<button on="tap:scdialog.close">close</button>

```

## 事件

### open

说明：调起弹窗
必选项：否

### close

说明：关闭弹窗
必选项：否

## 注意事项

