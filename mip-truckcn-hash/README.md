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
<mip-truckcn-hash type="tel" default-tel="19999999999"></mip-truckcn-hash>
返回代码：<a href="tel:13333333333">13333333333</a>
<mip-truckcn-hash type="text" default-text="自定义文字"></mip-truckcn-hash>
返回代码：url里的文字

## 示例2

url：https://www.mipengine.org
<mip-truckcn-hash type="tel" default-tel="19999999999"></mip-truckcn-hash>
返回代码：<a href="tel:19999999999">19999999999</a>
<mip-truckcn-hash style="text" default-text="自定义文字"></mip-truckcn-hash>
返回代码：自定义文字

## 示例3

<mip-fixed type="top" id="topid">
  <div><mip-truckcn-hash type="fixed-top" default-tel="19999999999"></mip-truckcn-hash></div>
  <div class="btn_style" on="tap:topid.close"></div>
</mip-fixed>

## 示例4

<mip-fixed type="bottom" id="bottomid">
  <div><mip-truckcn-hash type="fixed-bottom" default-tel="19999999999"></mip-truckcn-hash></div>
  <div class="btn_style" on="tap:bottomid.close"></div>
</mip-fixed>

## 示例5

<mip-truckcn-hash type="name" default-name="张经理"></mip-truckcn-hash>

### 基本用法
```html
<mip-truckcn-hash style="tel" default-tel="19999999999"></mip-truckcn-hash>
<mip-truckcn-hash style="text" default-text="自定义文字"></mip-truckcn-hash>
```

## 属性

### type

说明：数据类型
必选项：是
类型：字符串
取值范围：tel, text, name, fixed-top, fixed-bottom

## 注意事项
当type="tel"时，对应的默认是default-tel;
当type="name"时，对应的默认是default-name;
当type="text"时，对应的默认是default-text.
fixed-top, fixed-bottom配合mip-fixed使用

