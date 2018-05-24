# mip-xzw-float
mip-xzw-float 星座屋float浮层组件,主要用于底部浮层的应用

标题|内容
----|----
类型|通用
支持布局|responsive,fix-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-xzw-float/mip-xzw-float.js

## 示例

### 基本使用
```html 页面之间引入以下标签并引用所需脚本即可~<div class="m_layer"></div>为蒙层；<div class="float_sbox"></div>标签内的为浮层内容；id为openlayer的标签点击触发打开浮层~点击蒙层m_layer则关闭浮层；
<mip-xzw-float><div class="m_layer"></div><div class="float_sbox"></div></mip-xzw-float>