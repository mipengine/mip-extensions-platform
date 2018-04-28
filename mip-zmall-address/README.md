# mip-zmall-address

新增地址模块，可以放在页面中作为单独模块，也可以作为地址页

标题|内容
----|----
类型|公司业务组件
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-zmall-address/mip-zmall-address.js

## 更新日志

- 1.0.2 修改 tap 为 click, 解决穿透问题

## 示例

### 基本用法

```html
<mip-zmall-address id="address" data-type="component" data-adressid="" data-save=""></mip-zmall-address>
```

需配合 mip-zmall-address-map、mip-zol-picker等使用，页需要mip-bind的配合。

具体用法咨询作者。


## 属性

### data-type

data-type 如果为 "component", 那么代表是订单确认页的新增地址模块，当前页进行。

## 注意事项


