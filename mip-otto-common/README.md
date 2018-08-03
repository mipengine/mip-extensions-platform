# mip-otto-common

mip-otto-common 网校通用模块集合

| 标题     | 内容                                                              |
| -------- | ----------------------------------------------------------------- |
| 类型     | 通用                                                              |
| 支持布局 | responsive,fixed-height,fill,container,fixed                      |
| 所需脚本 | https://c.mipcdn.com/static/v1/mip-otto-common/mip-otto-common.js |

## 示例

### 基本用法

```html
<mip-otto-common>
    <script type="application/json" >
        {
            "rem": true,
            "fixedright": true,
            "sign":"jsz",
            "fixedbottom":true,
            "downbanner":{
                "enable":true,
                "positon":"top"
            }
        }
    </script>
    <div style="height:1000px"></div>
</mip-otto-common>
```

## 属性

### rem

说明：是否当前页面启用 rem
必选项：否
类型：boolean
默认值：false

### fixedright

说明：是否当前页面启用右侧悬浮
必选项：否
类型：boolean
默认值：false

### sign

说明：指定考试 sign
必选项：否
类型：boolean
默认值：false

### fixedbottom

说明：设置顶部tab
必选项：否
类型：boolean
默认值：false

### downbanner

说明：设定下载banner
必选项：否
类型：boolean
默认值：false

## 注意事项

1. 网校业务定制。
2. 更新了导航链接
