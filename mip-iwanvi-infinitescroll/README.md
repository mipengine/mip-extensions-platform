# mip-iwanvi-infinitescroll

mip-iwanvi-infinitescroll 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/platform/v1/mip-iwanvi-infinitescroll/mip-iwanvi-infinitescroll.js

## 示例

### 基本用法
```html
<mip-iwanvi-infinitescroll data-src="https://m.cread.com/mip/json/mipbookstore_json?pid=1&cid="
                        template="myTemplate" data-header="12312">
                <script type="application/json">
                {
                    "rn":90,
                    "prn":10,
                    "pn": 1,
                    "pnName": "page",
                    "bufferHeightPx": 10,
                    "loadingHtml": "正在加载中...",
                    "loadFailHtml": "failed",
                    "loadOverHtml": "亲，加载到头了哦..."
                }
                </script>
                <template type="mip-mustache" id="myTemplate">
                   
                </template>
                <div class="mip-infinitescroll-results"></div>
                <div class="bg">
                    <div class="mip-infinitescroll-loading"></div>
                </div>
</mip-iwanvi-infinitescroll>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

