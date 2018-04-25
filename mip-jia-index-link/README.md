# mip-jia-index-link

mip首页获取城市、更改跳转链接

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-index-link/mip-jia-index-link.js

## 示例

### 基本用法
```html
<mip-jia-index-link>
    <script type="application/json">
        {
            "linkto":"http://m.jia.com/mip/",
            "changetxt":".changetxt",
            "changelink":".changelink"
        }
    </script>
</mip-jia-index-link>
```

## 属性

### {linkto}

说明：{跳转url}
必选项：{否}
类型：{string}
默认值：{/mip/}

### {changetxt}

说明：{需要替换文字的元素}
必选项：{否}
类型：{string}
默认值：{无}

### {changelink}

说明：{需要替换href的元素}
必选项：{否}
类型：{string}
默认值：{无}

## 注意事项

