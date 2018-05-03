# mip-zmall-address-map

同城购添加地址，选择地图组件

标题|内容
----|----
类型| 公司业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-address-map/mip-zmall-address-map.js

## 更新日志（2018-05-03）

- 1.0.3 把click改成JS绑定，而不是通过 on="click:xxx.xxx" 来绑定
- 1.0.2 修复 tap 穿透问题， 改成 click

## 示例

### 基本用法

```html
<mip-zmall-address-map data-ak="N5KBzk1oUZc92TCC0lzwlcv1wOEwsYIO" id="myMapPicker"></mip-zmall-address-map>
```

```html
<div on="tap:myMapPicker.open"></div>
```

## 属性

### data-ak

百度地图 ak , 必填。

## 注意事项

需配合 mip-bind 来使用。
