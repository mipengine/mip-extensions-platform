# mip-jia-masonrymore

mip-jia-masonrymore 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-jia-masonrymore/mip-jia-masonrymore.js

## 示例

### 基本用法
```html
<mip-jia-masonrymore>
    <script type="application/json">
        {
            "url": "https://m.jia.com/tags/ajaxNewIndex",
            "params":{
                    "tags": 7,
                    "page_num":2,
                    "page_size":10,
                    "page_count":2
             },
            "action":"scroll",
            "containerclass":".list-ul",
            "type":"masonry",
            "masonryclass":".waterfall",
            "itemselector":".list-li",
            "loadclass":".loadmore",
            "flipclass":".page-flip"
        }
    </script>
</mip-jia-masonrymore>
```



### url

说明：请求接口url
必选项：是
类型：string

### params

说明：参数对象
必选项：是

### action

说明：事件
必选项：是

### containerclass

说明：内容存放元素
必选项：是

### loadclass

说明：加载更多图标元素
必选项：是

### type

说明：加载类型,如果是masonry则调用瀑布流
必选项：否

### masonryclass

说明：添加瀑布流的元素
必选项：否

### itemselector

说明：调用瀑布流的元素
必选项：否

### flipclass

说明：翻页元素
必选项：否






