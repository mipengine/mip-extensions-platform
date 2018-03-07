# mip-mipengine-preview-v3

MIP 页面 `iframe` 嵌入式预览组件，包括切换浏览模式、打开、关闭、处理嵌入页面的跳转（不让以上级窗口跳转）。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-mipengine-preview-v3/mip-mipengine-preview-v3.js

## 示例

### 基本用法
```html
<mip-mipengine-preview-v3 id="preview" layout="nodisplay" mode="default">
    <div>
        <h3>选择模式</h3>
        <ul>
            <li on="tap:preview.toggleMode(default)">默认</li>
            <li on="tap:preview.toggleMode(mobile)">手机</li>
            <li on="tap:preview.toggleMode(ipad)">平板</li>
            <li on="tap:preview.toggleMode(pc)">电脑</li>
        </ul>

        <h3>显示容器</h3>
        <div iframe></div>
    </div>
</mip-mipengine-preview-v3>

<button on="tap:preview.open(https://www.mipengine.org)">打开预览</button>
```

## 属性

### id

说明：容器标识  
必选项：是  
类型：字符串

### mode

说明：显示模式，配置样式来处理页面显示状态  
必须项：否  
类型：字符串  
默认值：空  

### [iframe]

说明：嵌入 `iframe` 的容器  
必须项：是  
类型：`HTMLElement` 节点  

## 接口

### 打开预览 - open(url)

```
on="tap:组件id.open(https://www.mipengine.org)"
```

### 关闭预览 - close

```
on="tap:组件id.close"
```

### 切换显示模式 - toggleMode(mode)

```
on="tap:组件id.toggleMode(default)"
```


## 注意事项

### 1. 默认隐藏组件

可以使用 `layout="nodisplay"` ，也可以自行定义样式隐藏，在调用 `open(url)` 接口时显示组件，在调用 `close` 接口时隐藏组件。

### 2. 模式选中功能

在调用 `toggleMode(mode)` 接口时，会设置组件的 `mode` 属性，可以配合样式来完成预览容器的尺寸、预览模式的高亮选中效果，如：

```css
#preview[mode="default"] .nav-default {
    /* 设置选中的模式高亮 */
}
#preview[mode="default"] .content {
    /* 设置显示容器尺寸 */
}

#preview[mode="pc"] .nav-pc {
    /* 设置 pc 模式下样式 */
}
```