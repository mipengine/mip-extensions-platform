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
            "sign":"jz1"
        }
    </script>
    <div style="height:1000px"></div>
    <!--右侧悬浮 -->
    <div class="commonFixedRight cfr">
        <div class="cfr__kf kf">
            <div class="cfr__kf_img"></div>
        </div>
        <div class="cfr__back2top" id="js__back2top">
            <div class="cfr__back2top_img"></div>
        </div>
    </div>

</mip-otto-common>
```

## 属性

### rem

说明：是否当前页面启用rem
必选项：否
类型：boolean
默认值：false

### fixedright

说明：是否当前页面启用右侧悬浮
必选项：否
类型：boolean
默认值：false

### sign

说明：指定考试sign
必选项：否
类型：boolean
默认值：false


## 注意事项
1. 网校业务定制。