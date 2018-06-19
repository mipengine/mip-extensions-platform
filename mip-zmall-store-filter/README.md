# mip-zmall-store-filter

商家店铺首页门店切换筛选组件

标题|内容
----|----
类型| 公司业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-store-filter/mip-zmall-store-filter.js

## 更新

### 2018.06.19 (1.0.1)
- 增加事件触发，配合mip-zmall-map来使用

## 示例

### 基本用法

```html
<mip-zmall-store-filter id="myStoreSwitcher" url="path/to/api" mid="商家ID" on="point:MyBaiduMap.point">
</mip-zmall-store-filter>
```

可以再页面中DOM用 on 来绑定

```html
<div on="tap:myStoreSwitcher.open"></div>
```

具体使用方法请咨询作者。

## 属性

### mid

商家ID

## 注意事项

需配合 mip-bind 来使用。
