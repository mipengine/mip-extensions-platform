# mip-zol-dialog

模态框UI组件，包括 toast, confirm 等

标题|内容
----|----
类型|公司通用组件
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-zol-dialog/mip-zol-dialog.js

## 示例

### 此次更新

- 解决通过 `<div on="tap:myDialog.toast(消息)"></div>` 方式调用时候的bug

### 基本用法

```html
<mip-zol-dialog id="myDialog" data-confirm-mask="true" data-toast-mask="true"></mip-zol-dialog>
```

可以通过别的组件来调用

```javascript
var mipDialogComponent = document.querySelector('mip-zol-dialog');

mipDialogComponent.customElement.toast('消息');

mipDialogComponent.customElement.confirm('确定删除吗？', {
    ok: '确定',
    cancel: '取消',
    okCallback: function () {},
    canselCallback: function () {}
});
```

可以再页面中DOM用 on 来绑定

```html
<div on="tap:myDialog.toast(消息)"></div>

<div on="tap:myDialog.confirm(确定删除吗？)"></div>
```

## 属性

### data-confirm-mask

设置当使用 confirm 的时候是否显示遮罩层，设置了且值为 "true" 则显示

### data-toast-mask

设置当使用 toast 的时候是否显示遮罩层，设置了且值为 "true" 则显示

## 注意事项


