# mip-hlj-statisticsV2

mip-hlj-statisticsV2 埋点组件 公司内部使用

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hlj-statisticsV2/mip-hlj-statisticsV2.js

## 示例

### 基本用法
```html
<mip-hlj-statisticsV2
    data-name='熊掌套餐详情页'
    data-event='call'
    data-tag='package_item'
    data-id='698294'
    data-type='Package'
>

</mip-hlj-statisticsV2>
```


## 属性

### {data-name}

说明：{页面名称}
必选项：{是}
类型：{string}


### {data-event}

说明：{事件类型}
必选项：{是}
类型：{string}


### {data-tag}

说明：{事件标签}
必选项：{是}
类型：{string}


### {data-id}

说明：{接口埋点id}
必选项：{是}
类型：{string}

### {data-type}

说明：{数据类型}
必选项：{是}
类型：{string}
