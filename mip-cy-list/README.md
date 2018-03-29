# mip-cy-list

mip-cy-list 组件是对百度mip-list扩展，以符合春雨的需求～

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cy-list/mip-cy-list.js

## 示例

### 基本用法

```html
<mip-cy-list src="{{url}}" preLoad>
    <template type="mip-mustache">
        <div>
            <li>name: {{name}}</li>
            <li>alias: {{alias}}</li>
        </div>
    </template>
</mip-cy-list>
```

## 属性

### src

说明：异步请求的数据接口，如果没有其他参数结尾请不要带 `？`      
必选项：否    
类型：字符串    
取值范围：必须是 HTTPS 的    
单位：无    
默认值：无

### synchronous-data

说明：使用同步数据开关属性    
必选项：否    
类型：字符串    
取值范围：无    
单位：无    
默认值：无 

### id

说明：`<mip-list>` 组件 `id`    
必选项：否    
类型：字符串    
取值范围：字符串    
单位：无    
默认值：无

### has-more

说明：是否有点击展开更多功能   
必选项：否    
类型：字符串    
取值范围：无    
单位：无    
默认值：无

### pnName

说明：翻页变量名     
必选项：否    
类型：字符串    
取值范围：无    
单位：无    
默认值：pn

### pn

说明：翻页初始页码，每次请求会自动加 1     
必选项：否    
类型：整数    
取值范围：无    
单位：无    
默认值：1 

### preLoad

说明：异步加载数据，如果添加 `preLoad` 参数，则在初始化时加载第一页内容     
必选项：否    

### timeout

说明：fetch-jsonp 请求的超时时间         
必选项：否   
类型：整数   
取值范围：无   
单位：ms   
默认值：5000

## 注意事项

- 接口返回的数据格式需要是如下格式：
    - status：0 表示请求成功。
    - items：[] 是需要渲染的数序。
    - isEnd：表示是否是最后一页，非必须。

```
{
    status: 0, 
    data: { 
        items: [], 
        isEnd: 1 
    }
}  
```