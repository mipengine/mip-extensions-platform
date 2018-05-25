# mip-xzw-changexz
mip-xzw-changexz 主要用于读取页面的星座cookie值并改变页面相应内容~

标题|内容
----|----
类型|通用
支持布局|responsive,fix-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-xzw-changexz/mip-xzw-changexz.js

## 示例

### 基本使用
# html 页面之间引入以下标签并引用所需脚本即可~data-cookie为要获取的cookie名称, data-url为数据请求地址;xzname,imgtbox,febox均是替换内容的容器
<mip-xzw-changexz data-cookie="123456" data-url="https://m.xzw.com/data.js"><div class="xzname"></div><div class="imgtbox"></div><div class="febox"></div></mip-xzw-changexz>