# mip-wecoffeescroll-locator

mip-wecoffeescroll-locator 联动滚动效果组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-wecoffeescroll-locator/mip-wecoffeescroll-locator.js

## 示例

### 基本用法
```html
<mip-wecoffeescroll-locator data-current-class="current" wrapper="examples">
        <mip-fixed type="top">
            <nav>
                <ul>
                    <li>
                        <p anchor="a1">导航1</p>
                    </li>
                    <li>
                        <p anchor="a2">导航2</p>
                    </li>
                    <li>
                        <p anchor="a3">导航3</p>
                    </li>
                </ul>
            </nav>
        </mip-fixed>
    </mip-wecoffeescroll-locator>

    <div id="examples" class="examples">
        <div id="a1">
            <h2>导航1</h2>
            <p>001</p>
            <p>002</p>
            <p>003</p>
            <p>004</p>
            <p>005</p>
        </div>
        <div id="a2">
            <h2>导航2</h2>
            <p>001</p>
            <p>002</p>
            <p>003</p>
            <p>004</p>
            <p>005</p>
        </div>
        <div id="a3">
            <h2>导航3</h2>
            <p>001</p>
            <p>002</p>
            <p>003</p>
            <p>004</p>
            <p>005</p>
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

### [wrapper]

说明：目标容器，对应目标容器 `id`  
必选项：否  
类型：字符串  

### [during]

说明：滚动到目标描点时间，如果为默认值或值为0，则没有滚动动画  
必选项：否  
类型：数字  

## 注意事项

### 1. 页面 `id` 唯一性

在组件内，添加属性 `anchor="a1"` 对应的目标容器 `id` ，可配合链接的锚点使用，如：

```html
<div anchor="index">首页</div>

...

<div id="index"></div>
```

以上代码中`anchor="index"` 表示让组件首页导航元素关联到 `<div id="index"></div>` 元素。
