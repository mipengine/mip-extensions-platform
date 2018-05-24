# mip-xzw-cookie
mip-xzw-cookie 星座屋cookie主要用于读取页面的cookie值~

标题|内容
----|----
类型|通用
支持布局|responsive,fix-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-xzw-cookie/mip-xzw-cookie.js

## 示例

### 基本使用
```html 页面之间引入以下标签并引用所需脚本即可~data-cookie为要获取的cookie名称,username为替换cookie内容的标签
<mip-xzw-cookie data-cookie="1234567"><a href="http://u.xzw.com/" target="_blank" class="username">登录</a></mip-xzw-cookie>