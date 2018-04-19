# mip-xuexb-order

订单组件示例

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xuexb-order/mip-xuexb-order.js

## 示例

### 基本用法
```html
<mip-xuexb-order>
</mip-xuexb-order>
```

## 属性

### data-endpoint

说明：后端源站支付接口链接，需要使用 `https://` 或者 `//` 开头的源站地址，需要接口支持 HTTPS ，使用 POST 形式发送数据  
必选项：是  
类型：`string`  
示例：`data-endpoint="https://api.example.com/pay.php"`  
