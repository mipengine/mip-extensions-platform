# mip-qf-infinitescroll mip-七风-无限滚动组件。

当用户滚动到页面底部时，异步加载更多数据，可配合湖南七风的下载逻辑组件一起使用。

标题|内容
----|----
类型|通用
支持布局|responsive, fixed-height, fill, container, fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qf-infinitescroll/mip-qf-infinitescroll.js<br/> https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js 

## 示例

获取排行榜数据，初始化下载按钮相关逻辑，节点插入页面。

- `data-url` jsonp 请求 url。
- `gap` (可选)触发滚动回调的距离，单位px。
- `timeout` (可选) jsonp 超时时间。
- `txt-completed` (可选) 加载完毕按钮文本。
- `txt-failed` (可选) 加载失败按钮文本。
- `txt-loading` (可选) 正在加载按钮文本。

```html
<mip-qf-infinitescroll data-url="https://mtest.119you.com/fgame/game/ranking" gap="200" timeout="5" txt-completed="完毕" txt-failed="失败" txt-loading="努力加载...">
    <script type="application/json">
        {
            "columns": "downloadlink,name",
            "pageSize": 10,
            "siteId": 125,
            "type": 1
        }
    </script>
    <template type="mip-mustache">
        <li>
            <span>{{itemnum}} {{name}}</span><br>
            <span>apk：{{apkHref}}</span><br>
            <span>ipa: {{ipaHref}}</span>
        </li>
    </template>
    <ul></ul>
    <button class="mip-qf-infinitescroll-btn">加载更多</button>
</mip-qf-infinitescroll>
```

## 参数

### columns

说明：接口将根据此属性返回对应的数据。 
类型：String
必选项：否
取值范围：接口返回数据的键名
单位：无 
默认值：''

### rankCode

说明：自定义榜单编码。
类型：String
必选项：否
取值范围：无
单位：无
默认值：无

### pageIndex

说明：数据页数。
类型：Number
必选项：否
取值范围：[0, +∞)
单位：页
默认值：0

### pageSize

说明：数据条数。
类型：Number
必选项：否
取值范围：[0, +∞)
单位：条
默认值：20

### publishTarget

说明：无
类型：String
必选项：否
取值范围：['Html5', 'pc']
单位：无
默认值：'Html5'

### siteId

说明：站点 ID。
类型：Number
必选项：否
取值范围：无
单位：无
默认值：无

### type

说明：排行榜类型。1 热门; 7 自定义
类型：Number
必选项：否
取值范围：[0, +∞)
单位：无
默认值：无