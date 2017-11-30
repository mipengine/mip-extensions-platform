# mip-zol-loadmore 加载更多

适用于滚动加载，点击加载。

标题|内容
----|----
类型|ZOL内部通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js<br>https://mipcache.bdstatic.com/extensions/platform/v1/mip-zol-loadmore/mip-zol-loadmore.js

## 版本介绍

### 1.0.1

- 加载数据源增加 `token` 的判断
- 修正引用链接等


## 示例

### 基本用法一

页面已经输出了结果，但只显示了部分，其余部分需要点击来显示

```html
<div id="container" data-hidden-total="5">
    <p>xxxxx</p>
    <p>xxxxx</p>
    <p>xxxxx</p>
    <p class="hidden">yyyyy</p>
    <p class="hidden">yyyyy</p>
    <p class="hidden">yyyyy</p>
    <p class="hidden">yyyyy</p>
    <p class="hidden">yyyyy</p>
</div>
<mip-zol-loadmore>
    <script type="application/json">
        {
            "query": {
                "pn": 3 // 每次点击显示个数

            },
            "container": "container",
            "request": false,
            "type": "click",
            "failed": "出错了，请稍后重试",
            "over": "没有更多了"
        }
    </script>
	<div class="load-more-box">
		<div class="load-more-trigger">点击加载更多</div>
		<div class="load-status">
            <span class="load-anim-icon"></span>
            <span class="load-loading-text"></span>
            <span class="load-over-text"></span>
        </div>
	</div>
</mip-zol-loadmore>
```
```html
<style mip-custom>
    .hidden {display:none;}
</style>
```

### 基本用法二

```html
<mip-zol-loadmore appkey="wap" token="true" data-src="//path/to/api" template="tpl-xxx">
    <script type="application/json">
        {
            "query": {
                "id": 123,
                "page": 2,
                "pn": 5
            },
            "container": "container",
            "request": true,
            "type": "scroll",
            "loading": "努力加载中，请稍等~",
            "failed": "出错了，请稍后重试",
            "over": "没有更多了"
        }
    </script>
    <template type="mip-mustache" id="tpl-xxx">
        {{#items}}<p>{{age}}</p>{{/items}}
    </template>
	<div class="load-more-box">
		<div class="load-more-trigger">点击加载更多</div>
		<div class="load-status">
            <span class="load-anim-icon"></span>
            <span class="load-loading-text"></span>
            <span class="load-over-text"></span>
        </div>
	</div>
</mip-zol-loadmore>
```

## 属性

基本用法二的时候需要属性，基本用法一则不需要

### data-src

说明：异步请求数据接口   
必选项：是
类型：字符串   
取值范围：无   
单位：无   
默认值：无   

### appkey

说明：应用组件的业务，具体请咨询作者。当 `token="true"` 时起作用                  
必选项：否    
类型：字符串   
默认值：无   

### token

说明：获取内容是否需要token来限制。                               
必选项：否    
类型：字符串   
默认值：`false`    

### template

说明：与模板 id 对应，用来标识所采用的模板，如不设置，则默认取组件子节点中的template  
必选项：否   
类型：字符串   
取值范围：无   
单位：无   
默认值：无

## 参数配置

### container

说明：加载数据的容器（element)     
必选项：是   
类型：整数   
取值范围：无   
单位：无   
默认值：无

### request

说明：用来确定是否用请求接口的形式加载数据，基本用法一需要设置为 `false`    
必选项：否   
类型：布尔值   
取值范围：无   
单位：无   
默认值：true

### type

说明：加载数据的方式，`click` 为点击加载，`scroll` 为滚动加载    
必选项：是   
类型：字符串
取值范围：无   
单位：无   
默认值：scroll  

### query

说明：接口查询参数字段，“基本用法一” 时只有 `query.pn` 有用，为每次点击显示的条数
必选项：是   
类型：对象   
取值范围：无   
单位：无   
默认值：`query.pn: 10`、`query.page: 1`

### loading

说明：loading时提示文案         
必选项：否   
类型：字符串   
取值范围：无   
单位：无   
默认值：加载中

### failed

说明：加载失败时提示文案         
必选项：否   
类型：字符串   
取值范围：无   
单位：无   
默认值：加载失败

### over

说明：加载完毕时提示文案         
必选项：否   
类型：字符串   
取值范围：无   
单位：无   
默认值：没有了

## 注意事项

- 基本用法一的时候，容器必须要带有 `data-hidden-total` 这个属性, 表示隐藏的总个数
- 异步请求接口必须是 https
- 异步请求接口需要规范 callback 为 'callback'
- 因为每个页面的样式会有所不同，所以组件里只有基本的CSS，其余的CSS需要自行添加，可以参考下面修改：

```css
.load-more-box {height: 1.42rem; margin: 0 0 .3rem; background-color: #fff;}
.load-more-trigger {height: 1.42rem; font-size: .42rem; line-height: 1.42rem;color: #666;}
.load-more-trigger::after {width: 0.48rem; height: 0.48rem; border-style: solid; border-color: #666; border-width: 0.06rem 0.06rem 0 0; -webkit-transform: translate(20%,4%) rotate(135deg) scale(0.5); transform: translate(20%,4%) rotate(135deg) scale(0.5)}
.load-more-trigger:visited { color: #666;}
.load-status {line-height: 1.42rem;background-color: #fff; font-size: 0.42rem; color: #999}
.load-anim-icon {width: .5rem; height: .5rem;margin-right: .2rem;-webkit-transform: translateY(.45rem);transform: translateY(.45rem);}
```

- 接口返回的数据格式需要是如下格式：

```json
    {
        "status": 0,
        "data": {
            "items": [{}],
            "isEnd": 0
        }
    }
```
- status 0 表示请求成功
- items: [] 是需要渲染的数据
- isEnd  1表示已经没有数据了，0表示还有
