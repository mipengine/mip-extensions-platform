# mip-jia-shopcomment

mip-jia-shopcomment 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-shopcomment/mip-jia-shopcomment.js

## 示例

### 基本用法
```html
<mip-jia-shopcomment
    data-url="http://qa.m.jia.com/wangpu/evaluation/list/item/141/?evaluationLevel=0&pageSize=10"
    data-page="1">

    <script type="application/json" evaluation>
        {   
            "zan_url": "http://qa.m.jia.com/wangpu/evaluation/zan",
            "reply_url": "http://qa.m.jia.com/wangpu/evaluation/reply"
        }
    </script>

    <div class="evaluation-detail pd-lr">
    </div>
    <div class="loading-more">查看更多<i class="arrow-icon"></i></div>
    <div class="wait-icon"></div>   
</mip-jia-shopcomment>
```

## 属性

### data-url

说明：数据接口
必选项：是
类型：string

### data-page

说明：返回第几页内容
必选项：是
类型：string

### zan_url

说明：点赞接口
必选项：是
类型：string

### reply_url

说明：回复接口
必选项：是
类型：string


## 注意事项

