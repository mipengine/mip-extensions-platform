# mip-qtkj-layer

mip-qtkj-layer 点击显示隐藏

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qtkj-layer/mip-qtkj-layer.js

## 示例

### 基本用法
```html
<mip-qtkj-layer sindex="0" hindex="0" cindex="0"></mip-qtkj-layer>
<div class="layer-show"></div>
<div class="layer-hide"></div>
<div class="layer-close"></div>
```

## 属性

### sindex
说明：对应第几个显示模块儿的角标
必选项：是

### hindex
说明：对应第几个显示内容的角标
必选项：是

### cindex
说明：对应第几个关闭模块儿的角标
必选项：是

### class属性名layer-show
说明：点击显示隐藏的按钮类名
必选项：是

### class属性名layer-hide
说明：内容的类名
必选项：是

### class属性名layer-close
说明：关闭按钮的类名
必选项：是

## 注意事项:mip-qtkj-layer标签或其父级需定位为position:fixed;top:0;不然如果页面有其他元素，只有滑动到当前标签一次之后，点击隐藏效果才会生效。