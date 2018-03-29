# mip-jt-map

mip-jt-map 金投地图组件使用说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jt-map/mip-jt-map.js

## 示例

### 基本用法  所有参数都不填,就是定位当前位置
```html
<div id="allmap"></div>
<mip-jt-map lng="121.280827" lat="29.688249"></mip-jt-map>
```

## longitude,latitude   与  searchAddr  不需要同时存在

### 经纬度

说明：经纬度
必选项：否
类型：无
取值范围：经纬
单位：无
默认值：无

## searchAddr

### 地址

说明：地址
必选项：否
类型：无
取值范围：地址
单位：无
默认值：无


## postHtml

### 原油频道专属

说明：根据定位获取周边网点
必选项：否
类型：字符串
取值范围：jyzwd
单位：无
默认值：无

## lng,lat  与 postHtml 原油频道专属

### 当前定位坐标,规划路线使用

说明：当前定位坐标
必选项：否
类型：字符串
取值范围：经纬度
单位：无
默认值：无

## englishShortName 英文名称

### 获取定位点

说明：当前定位坐标
必选项：否
类型：字符串
取值范围：经纬度
单位：无
默认值：无

## 注意事项

