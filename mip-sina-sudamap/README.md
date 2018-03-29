# mip-sina-sudamap

mip-sina-sudamap 新浪页面信息&点击统计组件

标题|内容
----|----
类型|定制
所需脚本|https://c.mipcdn.com/static/v1/mip-sina-sudamap/mip-sina-sudamap.js

## 示例

### 基本用法
```html
<mip-sina-sudamap>
    <script type="application/json">
        {
            "uId": "",
            "pageId": "2823"
        }
    </script>
</mip-sina-sudamap>
```

## 属性

### uId

说明：sudamap配置信息
必选项：是

### pageId

说明：sudamap配置信息
必选项：是

## 注意事项
组件需要在一进入页面就执行，所以需要使用build，不能使用firstInviewCallback