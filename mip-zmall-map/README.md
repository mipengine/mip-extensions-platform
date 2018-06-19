# mip-zmall-map

Z商城map业务百度地图组件，可用于显示地图，计算距离，导航等。

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-map/mip-zmall-map.js

## 最新版本

### 2.0.0

- 重写了全部代码，只提供方法调用，不涉及到业务，和1.x版本（已弃用）有很大的不同

## 示例

### 基本用法

调用的适合用组件 `mip-zmall-bmap` 来调用，具体方法查看 `mip-zmall-bmap` 组件。

```html
<mip-zmall-map id="MyBaiduMap" data-ak="你的AK"></mip-zmall-map>

<mip-zmall-bmap on="loaded:MyBaiduMap.map"></mip-zmall-bmap>

<mip-zmall-bmap on="distance:MyBaiduMap.distance"></mip-zmall-bmap>

<mip-zmall-bmap on="link:MyBaiduMap.gps"></mip-zmall-bmap>
```

## 属性

### data-ak

说明：百度地图秘钥          
必选项：是            
类型：String                 
默认值：""


## 注意事项

