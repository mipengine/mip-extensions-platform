# mip-ifrontend-alert

mip-ifrontend-alert Alert弹出框

标题|内容
----|----
类型|通用
支持布局|container
所需脚本|https://c.mipcdn.com/static/v1/mip-ifrontend-alert/mip-ifrontend-alert.js

## 示例

### 基本用法
```html
<div class="btn" on="tap:my-ifrontend-alert.openAlert">打开提示框</div>
<mip-ifrontend-alert id="my-ifrontend-alert" alert-title="提示" alert-content="我的自定义alert美化弹出框">   
</mip-ifrontend-alert>
```

## 属性

### {alert-title}

说明：{alert弹出框标题}
必选项：{否}
类型：{string}
默认值：{提示}

### {alert-content}

说明：{alert弹出框内容}
必选项：{否}
类型：{string}
默认值：{提示}

## 注意事项

