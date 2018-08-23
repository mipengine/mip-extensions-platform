# mip-codeHMback-tgb

mip-codeHMback-tgb 组件说明
港股美股回调函数
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-codeHMback-tgb/mip-codeHMback-tgb.js
https://c.mipcdn.com/static/v1/mip-loadJS-tgb/mip-loadJS-tgb.js

## 示例

### 基本用法
```html
<input type="button"  value='{"status":true,"dto":{"listStock":[{"keywordID":471148,"keywordName":"hk00762","stockName":"中国联通"}]},"_t":1534747346346}'   id='aaaaa'   />
<mip-codeHMback-tgb   data='aaaaa'  type='H'></mip-codeHMback-tgb>
<div id="H_stocke" class="HMstock"></div>
```

## 属性

### funId
说明：存储回调函数数据的标签id
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无
### type
说明：股票类型
必选项：是
类型：字符串
取值范围：H或者M
单位：无
默认值：无

## 注意事项
存储回调函数数据的格式必须为
status为成功状态
keywordID为股票id
keywordName为股票代码
stockName为股票名
{"status":true,
"dto":{
"listStock":[
{"keywordID":471148,"keywordName":"hk00762","stockName":"中国联通"}
]
},
"_t":1534747346346}

