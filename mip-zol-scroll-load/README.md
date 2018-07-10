# mip-zol-scroll-load 加载更多

适用于滚动加载.

标题|内容
----|----
类型|ZOL内部通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js<br>https://c.mipcdn.com/static/v1/mip-zol-scrollLoad/mip-zol-scroll-load.js

## 更新

## 示例

### 基本用法

页面已经输出了结果，但只显示了部分，其余部分需要点击来显示

```html
<mip-zol-scroll-load appkey="wap" token="true" data-src="//path/to/api" template="tpl-xxx">
    <script type="application/json">
        {
            "query": {
                "id": 123,
                "page": 2,
                "pn": 5
            },
            "loading": "正在加载商品列表~",
            "failed": "出错了，请稍后重试",
            "over": "商品已全部加载",
            "empty": "该店暂时没有热卖商品"
        }
    </script>
    <template type="mip-mustache" id="tpl-xxx">
        {{#items}}<p>{{age}}</p>{{/items}}
    </template>
    <div class="js_container container"></div>
    <div class="js_load_status scroll-load-status">
        <span class="load-anim-icon"></span>
        <span class="load-loading-text"></span>
        <span class="load-over-text"></span>
        <span class="load-empty-text"></span>
    </div>
</mip-zol-scroll-load>
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

### request

说明：用来确定是否用请求接口的形式加载数据，基本用法一需要设置为 `false`    
必选项：否   
类型：布尔值   
取值范围：无   
单位：无   
默认值：true

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

- 异步请求接口必须是 https
- 异步请求接口需要规范 callback 为 'callback'
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
