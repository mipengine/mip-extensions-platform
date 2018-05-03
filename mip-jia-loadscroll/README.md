# mip-jia-loadscroll

mip-jia-loadscroll ajax上拉加载数据插入html

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-loadscroll/mip-jia-loadscroll.js

## 示例

### 基本用法
```html
<mip-jia-loadscroll>
    <script type="application/json">
        {
            "request": {
                "jsonpCallback":"callback",
                "url": "//m.jia.com/zixunApi/ajax_get_xzx_data/",
                "params": {
                    "page": 2,
                    "type": "article",
                    "keyword": "tuijian"
                }
            },
            "response": {
                "parentBox": ".tuijian-list",
                "button": ".tuijian-list",
                "params": "html",
                "event":"",
                "pageSizeKey": "page",
                "bottomDistance": 10,
                "loadingBox": ".loading1"
            }
        }
    </script>
</mip-jia-loadscroll>
```

## 属性

### {jsonpCallback}

说明：{ajax回调方法名}
必选项：{否}
类型：{string}
默认值：{callback}

### {url}

说明：{ajax请求url}
必选项：{是}
类型：{string}

### {params}

说明：{ajax请求参数}
必选项：{否}
类型：{Object}

### {parentBox}

说明：父类元素(html都将append到改元素内部)
必选项：是
类型：string
取值范围："#id" || ".class"

### pageSizeKey

说明：{页码的key值}
必选项：{是}
类型：{string}

### {params}

说明：{接口返回数据key值}
必选项：{是}
类型：{string}


## 注意事项

