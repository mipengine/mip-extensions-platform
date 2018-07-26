# mip-otto-ad

mip-otto-ad 组件说明

| 标题     | 内容                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| 类型     | 通用                                                                                                                      |
| 支持布局 | responsive,fixed-height,fill,container,fixed                                                                              |
| 所需脚本 | https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js<br/>https://c.mipcdn.com/static/v1/mip-otto-ad/mip-otto-ad.js |

## 示例

### 基本用法

```html
<mip-otto-ad typid="20180713115313558" sign="jz1">
    <template type="mip-mustache">
        <mip-carousel autoplay width="540" height="168" indicatorId="mip-carousel-example" layout="responsive" >
            {{#Data}}
            <a href="{{link}}">
                <mip-img src="{{img}}" ></mip-img>
            </a>
            {{/Data}}
        </mip-carousel>
        <div class="mip-carousel-indicator-wrapper">
            <div class="mip-carousel-indicatorDot" id="mip-carousel-example">
                <div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>
                <div class="mip-carousel-indecator-item"></div>
                <div class="mip-carousel-indecator-item"></div>
                <div class="mip-carousel-indecator-item"></div>
            </div>
        </div>
    </template>
</mip-otto-ad>
```

## 属性

### typid

说明：获取广告位类别
必选项：否
类型：字符串
默认值："20180713115313558"

### sign

说明：获取考试sign
必选项：是
类型：字符串
默认值："jz1"

## 注意事项
1. 网校定制，可供其他使用者参考。