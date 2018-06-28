# mip-zol-histogram

横向柱状图动态显示

标题|内容
----|----
类型|公司通用组件
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-zol-histogram/mip-zol-histogram.js

## 示例

### 基本用法
```html
<mip-zol-histogram>
    <div class="horizontal-histogram">
        <ul data-total="10000">
            <li data-val="500">
                <div class="title clearfix">
                    <div class="t-left">小米6</div>
                    <div class="t-right">217396分</div>
                </div>
                <div class="bar">
                    <p class="global-gradient"></p>
                </div>
            </li>
        </ul>
    </div>
</mip-zol-histogram>
```

### 点击从新渲染的方法
- 给 <mip-zol-histogram> 标签添加一个自定义的 id=customid。
- 给需要点击切换的标签添加属性 on="tap:customid.refresh"。

