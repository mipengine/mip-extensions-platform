# mip-linkeddb-relmap

mip-linkeddb-relmap 用来添加linkeddb网站人物关系图绘制、分页数据加载的通用组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-linkeddb-relmap/mip-linkeddb-relmap.js

## 示例

### 基本用法
```html
<mip-linkeddb-relmap 
    data-page=""
    data-pageType=""
    data-tvEpcount=""
    data-episodesLast=""
    data-minep=""
    data-currentEpno=""
    data-tvOid=""
    data-mvOid=""
    data-personOid=""
    data-roleId=""
    data-morenUrl=""
    data-echartId=""
    data-personType=""
    data-args=""
    data-letter=""
    data-categoryId=""
    >
</mip-linkeddb-relmap>
```

## 属性

### data-page

说明：区分不同页面的标识
必选项：是
类型：string

### data-pageType

说明：不同页面的类型
必选项：是
类型：string

### data-tvEpcount

说明：tv页电视剧总集数
必选项：是
类型：string

### data-episodesLast

说明：tv页电视剧最后一集
必选项：是
类型：string

### data-minep

说明：tv页电视剧最小集数
必选项：是
类型：string

### data-currentEpno

说明：tv页电视剧当前集数
必选项：是
类型：string

### data-tvOid

说明：tv页电视剧当前电视剧的ID
必选项：是
类型：string

### data-mvOid

说明：mv页电视剧当前电影的ID
必选项：是
类型：string

### data-personOid

说明：person页当前人物ID
必选项：是
类型：string

### data-roleId

说明：人物关系ID
必选项：是
类型：string

### data-morenUrl

说明：默认关系图
必选项：是
类型：string

### data-echartId

说明：echart容器ID
必选项：是
类型：string

### data-personType

说明：person搭档的类型
必选项：是
类型：string

### data-args

说明：当前页类型 tv mv
必选项：是
类型：string

### data-letter

说明：当前页类型 music
必选项：是
类型：string

### data-categoryId

说明：当前页类型 document
必选项：是
类型：string
