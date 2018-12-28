# mip-pbpix

mip-pbpix 是平步科技推出的mip统计组件，该组件将在网页打开和关闭的时候，将请求数据发送到服务器。
发送数据格式如下：


标题|内容
----|----
类型|通用
支持布局|none
所需脚本|https://c.mipcdn.com/static/v1/mip-pbpix/mip-pbpix.js



## 发送到服务器的数据

```json
 {"event":"window.beforeunload",
 "loadId":"OPqjrggJ3ENxlptPsE6oRboobhjCLFE0",
 "clientId": "",
 "openTime":1545737356878,
 "closeTime":1545737630627,
 "referrer":"http://127.0.0.1:8000/local-extension-debug/mip-pbpix",
 "documentSize":{"width":1366,"height":54},
 "screenSize":{"width":1366,"height":768},
 "scrollTop":0,
 "scrollHeight":667,
 "clientHeight":667,
 "os":"Win7",
 "browser":["chrome/69.0.3497.100"],
 "title":"mip-pbpix_组件预览"}

```

### loadId 
标记了一次页面请求，值是唯一的，打开页面，到离开页面，loadId不会改变，也不会重复。

### clientId
唯一标记客户的标识，除非清除客户端cookie，否则该值不会改变


其他字段都比较简单，不赘述


## 示例

### 基本用法
```html
<mip-pbpix postUrl="https://域名/API接口路径" title="平步科技mip-pbpix简介"></mip-pbpix>
```

## 属性

### postUrl

说明：推送的地址
必选项：否
类型：字符串
默认值：/index/ApiAnonyMipPix/index.html

### title

说明：当前页面地址
必选项：否
类型：字符串
默认值：当前页面的title


## 版本升级

### 1.0.2
修正跨域请求的时候，携带cookie字段，否则会无法获得session    
修正fetch的跨域，增加了credentials: 'include',

### 1.0.1
修正获取浏览器版本的方法。   
增加了cookieId的字段    
更改referer的拼写错误，改为referrer的正确拼写
