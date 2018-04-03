# mip-dynamic-scroll

mip-dynamic-scroll 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-dynamic-scroll/mip-dynamic-scroll.js


## 示例

### 基本用法

本组件支持所有[mip-infinitescroll](https://github.com/mipengine/mip-extensions/tree/master/src/mip-infinitescroll)组件的属性，方法与用法。
不同点在于当改变组件上`data-src`属性的时候会刷新整个列表。

```html
<mip-dynamic-scroll data-src="http://localhost:3000/mip">
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
</mip-dynamic-scroll>
```

## 属性
属性与用法请移步[mip-infinitescroll](https://github.com/mipengine/mip-extensions/tree/master/src/mip-infinitescroll)。

## 说明
不在原始组件迭代的原因：

1. 原来组件逻辑复杂，迭代成本巨大。
2. 紧急case，排期短，无充分的测试时间回归线上。