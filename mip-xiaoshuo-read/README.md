# mip-xiaoshuo-read

小说阅读页控制组件，包括四套主题皮肤、五种字号、上下章节、目录等功能。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-xiaoshuo-read/mip-xiaoshuo-read.js

## 示例

### 基本用法
```html
<mip-xiaoshuo-read>
    <div content>
        <h3>第1章 欢迎使用</h3>
        <p>这是小说内容</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
    </div>

    <div class="mip-xiaoshuo-read-control" control>
        <div class="mip-xiaoshuo-read-control-page">
            <a href="#" class="mip-xiaoshuo-read-prev disabled">上一章</a>
            <a href="#" class="mip-xiaoshuo-read-next">下一章</a>
        </div>
        <div class="mip-xiaoshuo-read-control-nav">
            <ul>
                <li><a href="#">目录</a></li>
                <li><span mode-default>日间模式</span></a></li>
                <li><span mode-night>夜间模式</span></a></li>
                <li><span settings>设置</span></li>
            </ul>
        </div>
    </div>
</mip-xiaoshuo-read>
```


### 没有分页导航
```html
<mip-xiaoshuo-read>
    <div content>
        <h3>第1章 欢迎使用</h3>
        <p>这是小说内容</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
        <p>推荐使用 p 标签作为段落。</p>
    </div>

    <div class="mip-xiaoshuo-read-control" control>
        <div class="mip-xiaoshuo-read-control-nav">
            <ul>
                <li><a href="#">目录</a></li>
                <li><span mode-default>日间模式</span></a></li>
                <li><span mode-night>夜间模式</span></a></li>
                <li><span settings>设置</span></li>
            </ul>
        </div>
    </div>
</mip-xiaoshuo-read>
```

### 子节点

组件元素中需要配合以下属性的元素才可正常使用。`[key]` 表示属性节点，`.class` 表示 `class` 样式节点。

#### .mip-xiaoshuo-read-control

说明：控制条样式 `class` ，可以覆盖样式  
必须项：是  

#### .mip-xiaoshuo-read-control-nav

说明：控制条菜样式 `class`，可以覆盖样式  
必须项：是  

#### .mip-xiaoshuo-read-control-page

说明：分页导航 `class`，可以覆盖样式。分页中的 `<a>` 标签添加 `class="disabled"` 表示禁用（不可点击跳转）。  
必须项：否  

#### [content]

说明：内容元素，用来控制该元素下字号、背景色  
必选项：是  

### [control]

说明：控制条元素，在点击组件元素本身时会显示该元素  
必选项：是  

#### [settings]

说明：用来点击显示调整主题、字号控制条  
必须项：是  

#### [mode-default]

说明：默认模式（日间模式）元素，点击开启日间模式
必须项：是  

#### [mode-night]

说明：夜间模式元素，点击开启夜间模式
必须项：是  

## 注意事项

### 覆盖样式

组件将在初始化、切换主题、切换字号时设置 `html` 元素的属性：

1. mip-xiaoshuo-read-theme - 当前使用的主题名称，值为：
    - default - 默认（日间模式）
    - night - 夜间模式
    - paper - 纸质
    - green - 护眼绿
2. mip-xiaoshuo-read-font-size - 当前使用的字号，值为：
    - 1
    - 2
    - 3
    - 4
    - 5

可以使用 CSS 去覆盖对应主题、字号的内容，如：在夜间模式下把网站头部改成黑色

```css
html[mip-xiaoshuo-read-theme="night"] .myheader {
    background-color: #000;
}
```

### 字号大小

目前的对应关系是：

- 1 - 12px
- 2 - 14px
- 3 - 16px
- 4 - 18px
- 5 - 20px

### 主题颜色

- 默认（日间模式） - 背景：`#eee`，文字： `#333`
- 夜间模式 - 背景：`#000`，文字： `#333`
- 纸质 - 背景：`#ecdabb`，文字： `#412B1A`
- 护眼绿 - 背景：`#d7e0cb`，文字： `#3B3F2F`
