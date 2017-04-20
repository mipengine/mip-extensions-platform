# mip-fh-paging 

mip-fh-paging 用来支持整站分页交互组件

标题|内容
----|----
类型|通用
支持布局|N/A
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-fh-paging/mip-fh-paging.js

## 示例
基本用法
若添加了force属性，会强制显示分页

```html

<mip-fh-paging class="mip-fh-paging" url="http://m.dev.fh21.com.cn/news/mip/760798_$1.html">
    <script type="application/json">
        {
        "prev": {
            "url": "http://m.dev.fh21.com.cn/news/mip/760798.html"
        },
        "next": {
            "url": "http://m.dev.fh21.com.cn/news/mip/791271.html"
        },
        "curr": 1,
        "total": 2
        }
    </script>
</mip-fh-paging>
<br>
<mip-fh-paging class="mip-fh-paging" url="http://m.dev.fh21.com.cn/news/mip/760798_$1.html" force></mip-fh-paging>
```

## 属性

### url 

说明：分页url
必填：是
类型: string

### view

说明：页面类型
必填：否
类型：string
取值范围：detail|list

