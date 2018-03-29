# mip-zmall-distance

获取同城购门店距离收货地址的距离

标题|内容
----|----
类型|公司业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-distance/mip-zmall-distance.js

## 示例

### 基本用法

```html
<mip-zmall-distance id="storeDistance" m-bind:lat="address.info.lat" m-bind:lng="address.info.lng" m-bind:mlat="storeInfo.data.lat" m-bind:mlng="storeInfo.data.lng" url=""></mip-zmall-distance>
</mip-zmall-yunfei>

<div on="tap:storeDistance.distance"></div>
```

业务组件，比较特殊，需配合 mip-bind 来使用。

具体使用方法请咨询作者。



## 属性

各种跟商家相关的属性，具体定义咨询作者


## 注意事项


