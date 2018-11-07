# mip-scrollbox-autoauto

以百度mip-scroll为模板，添加子元素属性class="cur"，为默认选中。

标题|内容
----|----
类型|通用
支持布局|fixed-height
所需脚本|https://c.mipcdn.com/static/v1/mip-scrollbox-auto/mip-scrollbox-auto.js

## 示例

### 不换行文字链

```html
<style>
    .demo1 a {
        display: block;
        border: 1px solid #ccc;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        margin-right: 20px;
        border-radius: 5px;
        white-space: nowrap;
    }
    .demo1 [data-item]:last-child a {
        margin-right: 0;
    }
</style>
<mip-scrollbox-auto class="demo1" height="32" layout="fixed-height">
    <div data-wrapper>
        <div data-inner>
            <div data-scroller>
                <div data-item >
                    <a href="https://www.baidu.com">知道</a>
                </div>
                <div data-item>
                    <a href="https://www.mipengine.org">加速器。</a>
                </div>
                <div data-item class="cur">
                    <a href="https://github.com/mipengine">地址是</a>
                </div>
                <div data-item>
                    <a href="https://www.mipengine.org">内容>></a>
                </div><div data-item>
                    <a href="https://www.mipengine.org">精彩>></a>
                </div><div data-item >
                    <a href="https://www.mipengine.org">更多>></a>
                </div><div data-item>
                    <a href="https://www.mipengine.org">查看>></a>
                </div><div data-item>
                    <a href="https://www.mipengine.org">点击>></a>
                </div><div data-item>
                    <a href="https://www.mipengine.org">多内>></a>
                </div><div data-item>
                    <a href="https://www.mipengine.org">看彩>></a>
                </div><div data-item>
                    <a href="https://www.mipengine.org">查容>></a>
                </div>
            </div>
        </div>
    </div>
</mip-scrollbox-auto>
```

## 组件属性

### class='cur'
说明：默认选中的子元素
必选项：否

## 组件内部属性元素

### [data-wrapper]
说明：横滑包裹容器，每个滑动组件内只能存在一个  
必选项：是  
类型：HTML 节点  

### [data-inner]
说明：横滑内部容器，每个滑动组件内只能存在一个  
必选项：是  
类型：HTML 节点  

### [data-scroller]
说明：横滑滚动容器，每个滑动组件内只能存在一个  
必选项：是  
类型：HTML 节点  

### [data-item]
说明：横滑子容器，可以包含多个子容器  
必选项：是  
类型：HTML 节点 

## 注意事项

### 布局设置说明

如果已知滑动容器的高度，请设置该组件的 `layout` 和 `height` 以让页面渲染时组件的位置固定，从而加速页面渲染，例如已知滑动组件高度为 `100px` ，那么可以设置：

```
<mip-scrollbox-auto height="100" layout="fixed-height">
</mip-scrollbox-auto>
```

### 内部元素 box-sizing 说明

由于栅格化需要计算宽度，对 `<mip-scrollbox-auto>` 组件中的 `[data-scroller], [data-inner], [data-item]` 属性元素设置了 `box-sizing: border-box;` 样式，如有特殊需求请自动覆盖。

### 元素字号问题

由于 `[data-item]` 属性元素使用了 `display: inline-block` 样式，会引发元素之间有约 `3px` 左右的间距，组件内设置了 `[data-scroller] {font-size: 0}` 和 `[data-item] {font-size: 12px}` 来解决间距问题，如有需要可以覆盖相对应的字号大小。
