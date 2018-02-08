# mip-truckcn-hash

mip-truckcn-hash 组件说明

根据url里的hash值，改变页面的内容

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-truckcn-hash/mip-truckcn-hash.js

## 示例1

url：https://www.mipengine.org#tel=13333333333*&text=url里的文字*
<mip-truckcn-tel style="tel" default-tel="19999999999"></mip-truckcn-tel>
返回代码：<a href="tel:13333333333">13333333333</a>
<mip-truckcn-hash style="text" default-text="自定义文字"></mip-truckcn-hash>
返回代码：url里的文字

## 示例2

url：https://www.mipengine.org
<mip-truckcn-tel style="tel" default-tel="19999999999"></mip-truckcn-tel>
返回代码：<a href="tel:19999999999">19999999999</a>
<mip-truckcn-hash style="text" default-text="自定义文字"></mip-truckcn-hash>
返回代码：自定义文字

### 基本用法
```html
<mip-truckcn-tel style="tel" default-tel="19999999999"></mip-truckcn-tel>
<mip-truckcn-hash style="text" default-text="自定义文字"></mip-truckcn-hash>
```

## 属性

### style

说明：数据类型
必选项：是
类型：字符串
取值范围：tel, text

## 注意事项
当style="tel"时，对应的默认是default-tel;
当style="text"时，对应的默认是default-text.


