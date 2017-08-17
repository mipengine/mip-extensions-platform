# mip-kw-ajax

mip-kw-ajax kw—ajax请求

标题|内容
----|----
类型|业务
支持布局|N,S|
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-kw-ajax/mip-kw-ajax.js

## 示例

### 通过 mip-ajax-data标签来指定触发加载容器指定异步内容追加容器以及其他参数来异步加载内容,增加点击查看更多伸缩等
```html
<span class="praise">1230 阅读量</span>
<mip-kw-ajax mip-ajax-params="{'id':'10'}">
</mip-kw-ajax>
```

## 属性

### mip-ajax-params

说明：此异步加载所需要的参数   
必选项：是   
类型：数组格式的字符串   
取值范围：   需要配置异步加载的url （如果是类似于下拉形式多次加载 需要指定markplaceholder，即在网址中会变的量，比如page或者id，并且需要设置mip-ajax-mark属性，还要设置步长length，length和后端数据一致）,   containerclass异步内容存放的容器的class,    action触发加载的动作（click，roll）   
单位：无   
默认值：无 

### url

说明：ajax请求路径
必选项：是
类型：字符串
## 注意事项

### updateVideoCount

说明：ajax请求路径
必选项：是
类型：字符串


### id

说明：ajax请求所需参数
必选项：是
类型：字符串


### containerclass

说明：div的class
必选项：是
类型：字符串

