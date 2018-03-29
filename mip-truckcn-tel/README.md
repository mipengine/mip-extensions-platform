# mip-truckcn-tel

mip-truckcn-tel 组件说明

根据url里的a的hash值，（url：https://www.mipengine.org#a=111111111*，111111111为a的hash值，以*结束），改变页面的电话号码

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-truckcn-tel/mip-truckcn-tel.js

## 示例1

url：https://www.mipengine.org#a=13333333333*
<mip-truckcn-tel default-tel="19999999999"></mip-truckcn-tel>
返回代码：<a href="tel:13333333333">13333333333</a>

## 示例2

url：https://www.mipengine.org#a=
<mip-truckcn-tel default-tel="19999999999"></mip-truckcn-tel>
返回代码：<a href="tel:19999999999">19999999999</a>

## 示例3

url：https://www.mipengine.org
<mip-truckcn-tel default-tel="19999999999"></mip-truckcn-tel>
返回代码：<a href="tel:19999999999">19999999999</a>容

### 基本用法
```html
<mip-truckcn-tel default-tel="默认号码"></mip-truckcn-tel>
```

## 属性

### default-tel

说明：a的hash值为空时显示的默认号码
必选项：否}

## 注意事项

