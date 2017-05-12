# mip-cambrian-article

mip-cambrian-article 寒武纪文章落地页组件，调用此组件，会通过发送文章aid，请求和展示文章内容

| 标题   | 内容                                       |
| ---- | ---------------------------------------- |
| 类型   | 业务                                       |
| 支持布局 | responsive,fixed-height,fill,container,fixed |
| 所需脚本 | https://mipcache.bdstatic.com/extensions/platform/v1/mip-cambrian-article/mip-cambrian-article.js<br/> https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js |

## 示例

### 基本用法
```html
<mip-cambrian-article data-aid="1234">
    <template type="mip-mustache">
        <div class="article-wrapper">
            <h1>{{title}}{{#is_original}}<span>原创</span>{{/is_original}}</h1>
            <div class="article-info">
                <span>{{author}}</span>
                <span>{{date}}</span>
                <span>{{time}}</span>
            </div>
            <div class="article-abstract">
                摘要：{{abstract}}
            </div>
            <div class="article-content">
                {{{content.html}}}
            </div>
        </div>
    </template>
</mip-cambrian-article>
```

## 属性

### data-id

说明：文章唯一id
必选项：是
类型：字符串

