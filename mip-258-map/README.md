# mip-258-map

`<mip-258-map>` 组件集成了百度地图的服务，目前支持经纬度定位、地图控件加载、定位点弹窗信息定制等功能！

标题|内容
----|----
类型|通用
支持布局|responsive, fixed-height, fill, container, fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-258-map/mip-258-map.js

## 示例


地图组件具体参数的配置和使用方式如下：

### ak

使用地图组件之前必须要申请成为百度开发者，并创建百度服务密钥（`ak`），这里的 `ak` 参数即代表该功能。具体申请方式可以参见[百度地图 Javascript api 文档](http://lbsyun.baidu.com/index.php?title=jspopular/guide/getkey)。

### location
lng:纬度
lat:经度
zoom:地图显示的缩放值

### marker
address:显示实际地址就好，这里放置的是搜索的地址
```
<mip-258-map>
    <script type="application/json">
    {
        "ak": "izbPlbCyrFQSUnlWXgSx0LgFUCK9CYnv",
        "location": {
            "lng":"118.203584",
            "lat":"24.492249",
            "zoom":"16"
        },
        "marker":{
            "address":"天瑞99"
        }
    }
    </script>
</mip-258-map>
```
