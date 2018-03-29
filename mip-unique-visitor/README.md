# mip-unique-visitor
mip-unique-visitor 可以统计每天的用户访问次数(UV)

标题|内容
----|----
类型|业务,定制
支持布局|nodiaplay
所需脚本|https://c.mipcdn.com/static/v1/mip-unique-visitor/mip-unique-visitor.js

## 示例

### 基本用法
```html
<mip-unique-visitor requestUrl="https://m.idongde.com/tj/"></mip-unique-visitor>
``` 
## 属性说明

### requestUrl
说明：发送数据时请求的地址          
必选项：是                   
类型：string

## 注意事项  
使用MD5对发送的数据进行了加密