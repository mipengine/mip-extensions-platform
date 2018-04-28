# mip-jia-infinite

mip-jia-infinite 无限加载数据

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-infinite/mip-jia-infinite.js

## 示例

### 基本用法
```html
<mip-jia-infinite>
    <script type="application/json">
        {
            "request": {
                "isJsonp": false,
                "jsonpCallback": "",
                "resultType": "json",
                "url": "http://qa.m.jia.com/wangpu/shanghai/shop/list/",
                "method": "post",
                "init": {
                    "mode": "cors",
                    "credentials": "include"
                },
                "headers": {
                    "Content-type": "application/json"
                },
                "body": {
                    "format": "stringify",
                    "data": {
                        "pageNo": 20,
                        "sort": "ORDER_SELF"
                    }
                }
            },
            "response": {
                "textIdCard": "<li>",
                "parentBox": ".parent",
                "Datatier": "shopList",
                "size": 8,
                "pageSizeKey": "pageNo",
                "event": "click",
                "button": ".button",
                "bottomDistance": 10,
                "loadingBox": ".loading"
            }
        }
    </script>
    <template type="mip-mustache">
        {{#.}}
            <div>
                {{shop_name}}
            </div>
        {{/.}}
    </template>
</mip-jia-infinite>



<div class="parent"></div>
<button class="button">button</button>
<div class="loading">loading...</div>

<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
```

## 属性


### isJsonp

说明：是否为jsonp(接口)
必选项：是
类型：boolean
取值范围：true || false
单位：{单位}
默认值：{默认值}


### jsonpCallback

说明：jsonp回调名称
必选项：否
类型：string
默认值：空


### resultType

说明：返回数据类型(接口)
必选项：是
类型：string
取值范围："json" || "text"


### url

说明：接口url
必选项：是
类型：string


### method

说明：请求方式(接口)
必选项：是
类型：string
取值范围："get" || "post"


### init

说明：请求参数(接口)
必选项：是
类型：json对象


### headers

说明：请求头(接口)
必选项：是
类型：json对象


### body

说明：请求体(接口)
必选项：是
类型：json对象


### format

说明：请求体传输格式(接口)
必选项：是
类型：string
取值范围："string" || "stringify" || "json"
默认值："json"


### parentBox

说明：父类元素(html都将append到改元素内部)
必选项：是
类型：string
取值范围："#id" || ".class"


### pageSizeKey

说明：页码的key值
必选项：是
类型：number


### size

说明：每次请求的内容条数
必选项：是
类型：number


### event

说明：事件触发
必选项：是
类型：string
取值范围："click" || "scroll"
默认值："scroll"


### Datatier

说明：返回数据层级(用于找到需要的数据), 例如:{a:{b:{c:[]}}},要c的值，传递"a.b.c"
必选项：是
类型：string
默认值：空




## 注意事项

需引入template模版: https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js