# mip-fj-fetch

能够使用任意事件来触发fetch请求

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-fj-fetch/mip-fj-fetch.js

## 示例

### 基本用法

```html
<mip-data>
    <script type="application/json">
        {
            "fetchParams": {
                "username": "Jason",
                "sex": "male"
            },
            "others": "swift"
        }
    </script>
</mip-data>
<mip-fj-fetch
    id="mip-fj-fetch-id"
    method="POST"
    fetch-url="https://www.xxx.com"
    fetch-params-name="fetchParams"
>
    <span m-text="fetchParams.username"></span>
    <span m-text="fetchParams.sex"></span>
    <input type="checkbox" on="tap:MIP.setData({fetchParams:{username:m.others,sex:'female'}}) tap:mip-fj-fetch-id.event_fetch">
</mip-fj-fetch>
```

## 属性

### method

说明：fetch提交方法  
必选项：是  

### fetch-url

说明: 有此属性则可以开启异步请求数据逻辑，组件会并根据数据返回状态来按`submit-success`，`submit-error`块中的模板刷新局部信息。
需要注意的几个点：

- 方法支持
- 请求结果请返回json对象。
- 数据状态只有在成功(返回的status=0)的时候触发`submit-success`的逻辑，其他的均触发`submit-error`逻辑。

必选项：否  

### fetch-params-name

说明：存放fetch参数的名称  

- 参数为object的时候，直接将object作为fetch body请求；否则(string)把fetch-params-name当做键名，值作为键值请求
- 提交方法为POST
- 使用mip-bind动态设置时引入mip-bind.js

必选项：否  

## 注意事项

1. 如果需要动态设置fetch的params，应使用POST方法
2. 使用mip-bind时需要引入https://c.mipcdn.com/static/v1/mip-bind/mip-bind.js
3. 使用fetch功能时，请求使用cors时不能配置为*
4. 提交方法如果为post，应使用https地址。避免 MIP-Cache https环境提交到http，导致浏览器报错
