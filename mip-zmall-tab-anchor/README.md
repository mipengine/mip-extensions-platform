# mip-zmall-tab-anchor

锚点tab组件，用于吸顶定位区块

标题|内容
----|----
类型|业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-tab-anchor/mip-zmall-tab-anchor.js

## 示例

### 基本用法
```html
<mip-semi-fixed id="semi-fixed" fixedClassNames="tab-anchor-fixed">
    <div mip-semi-fixed-container class="tab-anchor-placeholder">
        <mip-zmall-tab-anchor  mip-semi-fixed-container>
        <script type="application/json">
            {
                "tabAnchorText": ["商品评价","商品参数","图文详情","店铺热卖"],
                "activeClass": "tab-anchor-active",
                "tabPanelIds": ["#js_tab_anchor_review","#js_tab_anchor_params","#js_tab_anchor_pics","#js_tab_anchor_hot"]
            }
        </script>
        </mip-zmall-tab-anchor>
    </div>
</mip-semi-fixed>

```

## 属性

tabPanelIds 对应需要锚点定位的区块元素ID
tabAnchorText 对应吸顶的锚点名字
activeClass 锚点激活的样式

## 注意事项

导航与内容对应