# mip-scroll-anchor

MIP 滚动定位锚点组件，常用于定位导航联动滚动事件来高亮当前的元素导航名称。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-scroll-anchor/mip-scroll-anchor.js

## 示例

### 基本用法
```html
<mip-scroll-anchor data-current-class="current">
    <ul>
        <li>
            <a href="#a1" anchor="a1">导航1</a>
        </li>
        <li>
            <a href="#a2" anchor="a2">导航2</a>
        </li>
        <li>
            <a href="#disabled">禁用</a>
        </li>
        <li>
            <a href="#a3" anchor="a3">导航3</a>
        </li>
    </ul>
</mip-scroll-anchor>

<div class="examples">
    <div id="a1">
        <h2>导航1</h2>
        <p>01</p>
        <p>02</p>
        <p>03</p>
        <p>04</p>
        <p>05</p>
        <p>06</p>
        <p>07</p>
        <p>08</p>
        <p>09</p>
        <p>10</p>
    </div>
    <div id="a2">
        <h2>导航2</h2>
        <p>01</p>
        <p>02</p>
        <p>03</p>
        <p>04</p>
        <p>05</p>
        <p>06</p>
        <p>07</p>
        <p>08</p>
        <p>09</p>
        <p>10</p>
    </div>
    <div id="a3">
        <h2>导航3</h2>
        <p>01</p>
        <p>02</p>
        <p>03</p>
        <p>04</p>
        <p>05</p>
        <p>06</p>
        <p>07</p>
        <p>08</p>
        <p>09</p>
        <p>10</p>
    </div>
</div>
```

## 属性

### data-current-class

说明：高亮当前元素的样式名称，在滚动屏幕时，目标容器在屏幕显示时会给对应的 `[anchor]` 元素添加该样式名称    
必选项：否  
类型：字符串  
默认值：`current`  

### data-threshold

说明：调整滚动距离的阀值，可用于滚动元素在屏幕显示位置的判断调整  
必选项：否  
类型：数字  
默认值：`200`  

### [anchor]

说明：子元素，用来查找目标容器，对应目标容器 `id`  
必选项：是  
类型：字符串  

## 注意事项

### 1. 页面 `id` 唯一性

在组件内，添加属性 `anchor="a1"` 对应的目标容器 `id` ，可配合链接的锚点使用，如：

```html
<a href="#index" anchor="index">首页</a>

...

<div id="index"></div>
```

以上代码中 `href="#index"` 表示锚点定位，`anchor="index"` 表示让组件首页导航元素关联到 `<div id="index"></div>` 元素。
