# mip-zmall-store

同城购商家门店选择组件

标题|内容
----|----
类型| 公司业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-store/mip-zmall-store.js

## 更新

- 1.0.1 修复 tap 穿透问题，改用 click

## 示例

### 基本用法

```html
<mip-zmall-store id="myStorePicker" m-bind:lat="address.info.lat" m-bind:lng="address.info.lng" url="path/to/api" mid="" m-bind:cityid="address.info.cityId"></mip-zmall-store>
```

业务组件，比较特殊，需配合 mip-bind 来使用。

具体使用方法请咨询作者。

可以再页面中DOM用 on 来绑定

```html
<div on="tap:myStorePicker.open"></div>
```

## 属性

各种跟商家相关的属性，具体定义咨询作者

## 注意事项

需配合 mip-bind 来使用。
