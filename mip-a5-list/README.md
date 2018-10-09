# mip-a5-list

mip-a5-list 是A5创业网mip站列表加载更多功能的组件。

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-a5-list/mip-a5-list.js

## 示例

### 基本使用

```html
<mip-a5-list
    src="https://xxx?a=a&b=b"
    page="2"
    btn="#more-btn"
    list="#more-list"
    id="mip-a5-list"
    has-more
    scrollPage="-1"
    bufferHeightPx="50"
    pageName="page"
    jsonpcallback="jsonpcallback"
    timeout="5000"
    respDataName="html">
    <ul id="more-list">
        <li><a href="###">1</a></li>
        <li><a href="###">2</a></li>
        <li><a href="###">3</a></li>
    </ul>
</mip-a5-list>
<button id="more-btn" on="tap:mip-a5-list.more">加载更多</button>
```

## 属性

### src

说明：异步请求的数据接口，如果没有其他参数结尾请不要带 ? ,必须是 HTTPS 的   
必选项：是   
类型：字符串   
默认值：无

### page

说明：翻页初始页码，每次请求会自动加 1   
必选项：否   
类型：整数   
默认值：1

### btn

说明：加载更多按钮CSS选择器的字符串   
必选项：否   
类型：字符串   
默认值：'load-btn'

### list

说明：列表容器CSS选择器的字符串，每次加载获取其子元素，并append到其中   
必选项：否   
类型：字符串   
默认值：'more-list'

### id   
说明：<mip-a5-list> 组件 id   
必选项：否
类型：字符串
默认值：'mip-a5-list'

### has-more

说明：是否有点击展开更多功能   
必选项：否   
类型：字符串   
默认值：无

### scrollPage

说明：页面滚动到底部自动加载页数，-1：不自动加载，0：无限加载，>0：自动加载此页码前的数据   
必选项：否   
类型：整数   
默认值：-1

### bufferHeightPx

说明：缓冲高度，距离底部一定高度时提前请求数据   
必选项：否   
类型：整数   
默认值：10

### pageName

说明：请求字符串中页码参数名称   
必选项：否   
类型：字符串   
默认值：'page'

### jsonpcallback

说明：请求字符串中callback参数名称   
必选项：否   
类型：字符串   
默认值：'jsonpcallback'


### timeout

说明：fetch-jsonp 请求的超时时间   
必选项：否   
类型：整数   
单位：ms   
默认值：5000

### respDataName

说明：返回值jsop中的html名称   
必选项：否   
类型：字符串   
默认值：'html'

