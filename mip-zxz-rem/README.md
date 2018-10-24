# mip-zxz-rem

移动端根字大小随页面变化而变化的解决方案。
移动端字体大小通过js的计算来完成移动端的页面适配。

标题|内容
----|----
类型|通用
支持布局|responsive
所需脚本|https://c.mipcdn.com/static/v1/mip-zxz-rem/mip-zxz-rem.js

## 示例
```html
    <mip-zxz-rem>
        <script src="https://c.mipcdn.com/static/v1/mip-zxz-rem/mip-zxz-rem.js"></script>
    </mip-zxz-rem>
    
```
### 基本用法
直接引用文件，是以html为根元素进行计算的。变化的范围在页面宽度[320,480]区间内变化。


## 技术实现原理
1. 通过js获取页面的宽度，区间为[320,480]，超过范围则取值边界值；
2. 计算出当前页面的的合适字体大小；
3. 把计算出来的值赋值给html，作为当前页面的根元素的单位，配合rem完成移动端页面的适配。
