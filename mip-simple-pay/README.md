# mip-simple-pay

MIP 支付组件，支付流程：

![MIP 支付流程图](https://user-images.githubusercontent.com/3872051/38978569-648ca01a-43ea-11e8-9042-1e1c414a89e1.png)

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-simple-pay/mip-simple-pay.js,https://c.mipcdn.com/static/v1/mip-login-xzh/mip-login-xzh.js

注意：支付组件所需脚本链接需要前置到登录组件脚本链接前面。

## 示例

### 多组件联调数据
```
<mip-simple-pay
    data-endpoint="https://pay.mipengine.org"
    id="mypay"
>
    <!-- 可以配置多个静态的支付数据 -->
    <script type="application/json">
        {}
    </script>
</mip-simple-pay>

<!-- 自定义组件，如订单生成组件，成功后触发支付组件的添加数据接口，并提交支付 -->
<mip-demo on="success:mypay.addEventData success:mypay.pay">
</mip-demo>

<mip-login-xzh
    data-endpoint="https://xzh.mip.xuexb.com"
    data-autologin="true"
    on="login:mypay.setSessionId"
    id="user">        
</mip-login-xzh>

<!-- mip-demo 触发添加数据示例 -->
<script>
    var viewer = require('viewer');

    Demo.prototype.build = function () {
        // 在订单成功后触发自身组件的 success 提交成功事件
        viewer.eventAction.execute('success', this.element, {
            data: {
                orderId: 1,
                // 这里的数据将直接合并到支付数据中
            }
        });
    };
</script>
```

## 属性
### data-endpoint

说明：后端源站支付接口链接，需要使用 `https://` 或者 `//` 开头的源站地址，需要接口支持 HTTPS ，使用 POST 形式发送数据  
必选项：是  
类型：`string`  
示例：`data-endpoint="https://api.example.com/pay.php"`  
说明：[后端跨域说明](#cors) 、[后端数据说明](#data) 、[会话凭证 sessionId](#sessionId)

## 组件方法和事件

#### 设置会话标识方法 - `<mip-login-xzh on="login:支付组件id.setSessionId">`

由登录组件完成登录后透传会话标识到支付组件，源字段为：`event.sessionId` 。

#### 添加支付数据方法 - `<mip-demo on="事件名称:支付组件id.addEventData">`

由其他组件透传数据到支付组件中，源字段为：`event.data` ，会深度合并到支付数据中，常见于订单生成成功、收货地址保存成功等场景，如：

```js
var viewer = require('viewer');

Demo.prototype.build = function () {
    viewer.eventAction.execute('事件名称', this.element, {
        data: {
            orderId: 1,
            // 这里的数据将直接合并到支付数据中
        }
    });
};
```

#### 提交支付方法 - `<mip-demo on="事件名称:支付组件id.pay">`

触发提交支付数据，常见于订单生成功后添加数据到支付组件后调用，也可由用户点击按钮时调用。

#### 提交数据前事件 - `<mip-simple-pay on="ajaxBefore:其他组件id.其他组件行为">`
提交支付数据前触发。

#### 提交数据完成事件 - `<mip-simple-pay on="ajaxComplete:其他组件id.其他组件行为">`
提交支付数据完成后触发，不论成功或者失败都会触发。

#### 提交数据失败事件 - `<mip-simple-pay on="error:其他组件id.其他组件行为">`
提交支付数据失败时触发。

## 注意事项

<a id="cors" name="cors" href="#cors"></a>
### 1. 后端需要支持 CORS + `withCredentials`

- [CORS 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [`withCredentials` 附带身份凭证的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)

支付组件（mip-simple-pay）已经在前端发送请求时处理了 `withCredentials` ，需要对应的接口服务响应头设置：

- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Origin: 对应请求的 origin`

注意：出于安全考虑请对来源的 `origin` 进行判断，并正确的返回 `Access-Control-Allow-Origin` 字段，不能为 `*` 。

<a id="data" name="data" href="#data"></a>
### 2. 后端数据说明

请求：

名称 | 说明
--- | ---
请求链接 | `data-endpoint`
请求类型 | POST
请求参数 | `{sessionId: '会话凭证', state: '需要在支付完成后回传给 MIP oob 回调链接中', ...}`

异常情况，`status` 非 `0` 时为失败：
```json
{
    "status": 403
}
```

成功：
```json
{
    "status": 0,
    "data": {
        "url": "https://付款链接"
    }
}
```

注意：付款成功后回调链接应该为源站后端订单处理链接，如：`https://支付链接?callback=urlencode('https://api.mipengine.org/order?id=1')` ，回调链接（`https://api.mipengine.org/order?id=1`）在支付完成后处理完成订单数据后重定向到 MIP oob 支付回调链接中，并携带参数，如：

格式如：
```
https://域名（.换成-）.mipcdn.com/static/oob/simple-pay.html?state=回传&redirect_url=显示支付完成页面，必须是MIP页面
```
示例如：
```
https://www-mipengine-org.mipcdn.com/static/oob/simple-pay.html?state=xxxxx&redirect_url=urlencode('https://mip.mipengine.org/order.html?id=1')
```

<a id="sessionId" name="sessionId" href="#sessionId"></a>
### 3. 会话凭证 sessionId

由于在 iOS 对跨域透传 `cooke` 的限制（<https://webkit.org/blog/7675/intelligent-tracking-prevention/>），由登录组件统一记录会话标识，并透传给支付组件，在发送支付请求时携带，后端应该优先使用 `cookie > sessionId` 校验登录状态。

