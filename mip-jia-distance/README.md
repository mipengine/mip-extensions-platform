# mip-jia-distance

mip-jia-distance 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-mip-jia-distance/mip-mip-jia-distance.js

## 示例

### 基本用法
```html
<mip-jia-distance>
	<script type="application/json">
    {
        "ak": "243f68afdbfe0aa70ca23117c4606b94",
        "address": "上海市普陀区真南路1228号齐家建材家居馆2楼E-09",
        "unit": "千米",
        "beforeText": "距您现在位置约",
        "afterText": "km"
    }
    </script>
</mip-jia-distance>
```

## 属性

### ak

说明：使用地图组件之前必须要申请成为百度开发者，并创建百度服务密钥（ak）
必选项：是
类型：string

### address

说明：目标地址
必选项：是
类型：string

### unit

说明：距离单位
必选项：否
类型：string
取值范围：十米，百米，千米，万米
默认值：米

### beforeText

说明：距离之前的文字
必选项：否
类型：string
默认值：""

### afterText

说明：距离之后的文字
必选项：否
类型：string
默认值：""


## 注意事项

