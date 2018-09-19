# mip-hs-scroll

mip-hs-scroll 组件说明
本组件支持所有mip-infinitescroll组件的属性，方法与用法。 不同点在于当改变组件上data-src属性的时候会刷新整个列表。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-scroll/mip-hs-scroll.js

## 示例

### 基本用法
```html
<mip-hs-scroll data-src="http://localhost:3000/api">
    <script type="application/json">
    {
        "rn": 40,
        "pn": 1,
        "prn": 6,
        "pnName": "pn",
        "bufferHeightPx": 40,
        "timeout": 5000,
        "loadingHtml": "更多数据正在路上",
        "loadFailHtml": "数据加载失败啦",
        "loadOverHtml": "没有数据了哦"
    }
    </script>
    <template type="mip-mustache" id="myTemplate">
        <li>
            <mip-img src="{{img}}"
                layout="responsive" width="100" height="100">
            </mip-img>
            <p>序号:{{number}}</p>
        </li>
    </template>
    <div class="mip-infinitescroll-results"></div>
    <div class="bg">
        <div class="mip-infinitescroll-loading"></div>
    </div>
</mip-hs-scroll>
```

## 属性
属性与用法请移步mip-infinitescroll.
### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

