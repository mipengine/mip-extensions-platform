# mip-jiahezigui-search

mip-jiahezigui-search 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-___/mip-___.js

## 示例

### 基本用法
```html
<style>
.showMe{
    background-color:red;
}
</style>
<mip-jiahezigui-search show-class="showMe" id="testId" clear-url="http://localhost:2018/jhzg/web/search/clear.html">
    自定义内容，可以嵌套其他组件
</mip-jiahezigui-search>
<div style="position:fixed">
    <div on="tap:testId.open">点我打开</div>
    <div on="tap:testId.close">点我关闭</div>
    <div on="tap:testId.clear">清空搜索记录</div>
</div>

<div class="search-history">
    <div>搜索记录1</div>
    <div>搜索记录2</div>
    <div>搜索记录3</div>
</div>
<div style="height:1200px"><a href="#error">透传链接测试</a></div>
```

## 属性

### show-class

说明：为html添加的class name  
必选项：否  
类型：string  
取值范围：{取值范围}  
单位：{单位}  
默认值：show-class  

### clear-url

说明：清空搜索记录要请求的url 
必选项：否  
类型：string  
取值范围：url  
单位：{单位}  
默认值：false  

### history-selector

说明：搜索记录选择器,清空后会隐藏此dom 
必选项：否  
类型：string  
取值范围：string  
单位：{单位}  
默认值：.search-history 

## 注意事项

