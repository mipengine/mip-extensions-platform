# mip-zmall-map

Z商城map业务组件|在地图中心显示店铺位置并计算用户与店铺距离

标题|内容
----|----
类型|指定位置可用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-zmall-map/mip-zmall-map.js

## 最新版本

### 1.0.1

- 修改地图链接和一些样式的改变

## 示例

### 基本用法
```html
<mip-zmall-map
	class="zMap"
	data-type="map"
	data-ak="U8p2WjWVszzPyGzr1YaYgtxhjt1XIFk6"
	data-lng="116.508667"
	data-lat="39.931152"
	data-zoom="18"
	data-address="北京市海淀区学院路37号801-6"
	data-skip="true"
	data-link=""
	data-title="">
    <div id="z_map" class="z_map storeMap flex-item"></div>
</mip-zmall-map>

<mip-zmall-map
	data-type="distance"
	data-ak="U8p2WjWVszzPyGzr1YaYgtxhjt1XIFk6"
	data-lng="116.508667"
	data-lat="39.931152"
	data-zoom="16"
	data-address="北京市海淀区学院路37号801-6"
	data-skip="false"
	data-link=""
	data-title="">
    <p id="z_map1" class="distance"></p>
</mip-zmall-map>

<mip-zmall-map
	data-type="distance-fixed"
	data-ak="U8p2WjWVszzPyGzr1YaYgtxhjt1XIFk6"
	data-lng="116.508667"
	data-lat="39.931152"
	data-zoom="16"
	data-address="北京市海淀区学院路37号801-6"
	data-skip="false"
	data-link=""
	data-title="">
    <p id="z_map2" class="address-suction"></p>
</mip-zmall-map>
```

## 属性

### data-type

说明：根据type类型判断组件样式与功能（地图定位与显示用户位置距离）     
必选项：是           
类型：String          
默认值：map              

### data-ak

说明：百度地图秘钥          
必选项：是            
类型：String                 
默认值：""

### data-lng

说明：Z商城分店经度         
必选项：是            
类型：String            
默认值：""       

### data-lat     

说明：Z商城分店纬度       
必选项：是    
类型：String    
默认值：""   

### data-zoom

说明：百度地图比例尺     
必选项：否    
类型：String    
默认值：""

### data-link

说明：百度地图链接    
必选项：否    
类型：String   
默认值：""  

### data-title

说明：Z商城分店名称
必选项：否    
类型：String   
默认值：""  


## 注意事项
该组件是Z商城业务组件
组件内部Id名称不能重名
