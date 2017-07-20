# mip-wkclub-wss

寻医问药问答搜索分词组件

标题|内容
----|----
类型|搜索分词组件
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-wkclub-wss/mip-wkclub-wss.js

## 示例

只需要一个`<mip-wkclub-wss>`标签，无须其他填充dom

```
<mip-wkclub-wss el="keyword" url="https://3g.club.xywy.com"></mip-wkclub-wss>

```
## 属性

### el

说明：搜索框的class
必填：是
格式：className
取值：字符串

### url

说明：分词请求的地址,请求成功后,返回分词
必填：是
格式：标准url格式
取值：字符串