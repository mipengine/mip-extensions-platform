# mip-multi-pay

MIP 多种支付方式组件，支付流程：

![MIP 支付流程图](https://user-images.githubusercontent.com/3872051/38978569-648ca01a-43ea-11e8-9042-1e1c414a89e1.png)

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-multi-pay/mip-multi-pay.js,https://c.mipcdn.com/static/v1/mip-login-xzh/mip-login-xzh.js

注意：支付组件所需脚本链接需要前置到登录组件脚本链接前面。

## 示例

### 多组件联调数据
```
<mip-multi-pay id="mypay" ajaxBefore:MPay.addPostData({orderId:<%=orderId%>}) >
    <!-- 可以配置多个静态的支付数据 -->
    <script type="application/json">
        {
	        "payInfos":[{
			        "id":"baifubao",
			        "endpoint": "http://xxx.xxx.com/api/pay/baifubao",
			        "name":"百度钱包"
		        },{
			        "id":"weixin",
			        "type":"weixin",
			        "endpoint": "http://xxx.xxx.com/api/pay/weixin",
			        "name":"微信"
		        },{
			        "id":"alipay",
			        "type":"alipay",
			        "endpoint": "http://xxx.xxx.com/api/pay/alipay",
			        "name":"支付宝"
		        }]
		}
    </script>
	<template type="mip-mustache" id="coffee-order-list">
		 <div class="payBox"> 
		     {{#payInfos}}
		     <div data-class="{{#selected}}selected{{/selected}}" on="tap:MPay.setPayId({{id}})">
		         <span class="pay">{{name}}</span>
		         <span class="pay">{{id}}</span>
		     </div>
		     {{/payInfos}}
		 </div>
	</template>
</mip-multi-pay>

<!-- 自定义组件，如订单生成组件，成功后触发支付组件的添加数据接口，并提交支付 -->

<mip-demo on=" success:mypay.pay">
</mip-demo>

<mip-login-xzh
    data-endpoint="https://xzh.mip.xuexb.com"
    data-autologin="true"
    on="login:mypay.setSessionId"
    id="user">        
</mip-login-xzh>
```

## 数据
### payInfos
说明：支付方式列表
必选项：是  
类型：`array`  
示例：`[{...}]`


#### payInfos[ ].endpoint
说明：后端源站支付接口链接，需要使用 `https://` 或者 `//` 开头的源站地址，需要接口支持 HTTPS ，使用 POST 形式发送数据  
必选项：是  
类型：`string`
说明：[后端跨域说明](#cors) 、[后端数据说明](#data) 、[会话凭证 sessionId](#sessionId)

#### payInfos[ ].id
说明：支付id
必选项：是  
类型：any

#### payInfos[ ].type
说明：支付方式
必选项：是  
类型：`nomal` ,`wexin` ,`alipay` , `nomal`(默认)
说明：`微信内环境`  会屏蔽 alipay支付

## 组件方法和事件
### MPay.addPostData
说明：添加支付数据方法
示例：MPay.addPostData({orderId:123})

### MPay.setPayId
说明：设置当前支付ID
示例：MPay.setPayId('alipay')

#### 设置会话标识方法 - `<mip-login-xzh on="login:支付组件id.setSessionId">`

由登录组件完成登录后透传会话标识到支付组件，源字段为：`event.sessionId` 。


#### 提交支付方法 - `<mip-demo on="事件名称:支付组件id.pay">`

触发提交支付数据，常见于订单生成功后添加数据到支付组件后调用，也可由用户点击按钮时调用。

#### 提交数据前事件 - `<mip-multi-pay on="ajaxBefore:其他组件id.其他组件行为">`
提交支付数据前触发。

#### 提交数据完成事件 - `<mip-multi-pay on="ajaxComplete:其他组件id.其他组件行为">`
提交支付数据完成后触发，不论成功或者失败都会触发。

#### 提交数据失败事件 - `<mip-multi-pay on="error:其他组件id.其他组件行为">`
提交支付数据失败时触发。

#### 支付确认事件 - `<mip-multi-pay on="payConfirm:其他组件id.其他组件行为">`
微信支付时，当前页面触发， 可进行弹窗进行用户确认

#### 支付成功事件 - `<mip-multi-pay on="paySuccess:其他组件id.其他组件行为">`
微信内环境，可监听支付成功此事件


## 注意事项

<a id="cors" name="cors" href="#cors"></a>
### 1. 后端需要支持 CORS + `withCredentials`

- [CORS 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [`withCredentials` 附带身份凭证的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)

支付组件（mip-multi-pay）已经在前端发送请求时处理了 `withCredentials` ，需要对应的接口服务响应头设置：

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
#### payInfos[ ].type = `nomal|alipay`
```json
{
    "status": 0,
    "data": {
        "url": "https://付款链接"
    }
}
```
#### payInfos[ ].type = `weixin`
- 微信外环境
```json
{
    "status": 0,
    "data": {
        "url": "https://付款链接"
    }
}
```
- 微信内环境

```javascript
{
    "status": 0,
    "data": {
          {
		        "appId": "wx3dxxxxxxxx",
		        "timeStamp": "1527508907",
		        "nonceStr": "ASDFWSACSDCDSGA",
		        "package": "prepay_id=wx3dxxxxxxxx",
		        "signType": "MD5",
		        "paySign": "SADF98S0A9D00A9S09A0SDCASD",
		        "timestamp": "1527508907"
		    }
    }
}


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

### 4. 百度搜索结果页降级处理

在百度搜索页打开使用该组件页面时，由于有些支付密码输入框在 `iframe` 框架下有问题，在调用[提交支付接口](#action-pay)时做了降级处理，处理方式为跳转源站。包括以下设备、浏览器：

- iOS设备下的手百App