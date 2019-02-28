# mip-asy-law

mip-asy-law 页面加载完成ajax异步加载数据到指定容器

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-asy-law/mip-asy-law.js

## 示例

### 通过 mip-asy-law标签来指定触发异步内容追加容器以及其他参数来异步加载内容
```html
<mip-asy-law mip-ajax-params="{'url':'','containerId':'ajaxcontainer2'}">
    <span>页面加载完成后加载</span>
</mip-asy-law>
<div id="ajaxcontainer2">我下面是页面加载完成后加载的</div>
```

## 属性

### mip-ajax-params

说明：此异步加载所需要的参数   
必选项：是   
类型：数组格式的字符串   
取值范围：   需要配置异步加载的url ,   containerId异步内容存放的容器的id,   
单位：无   
默认值：无   

   

## 注意事项
无
