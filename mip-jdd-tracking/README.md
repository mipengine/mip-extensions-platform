# mip-jdd-tracking

mip-jdd-tracking jdd埋点

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jdd-tracking/mip-jdd-tracking.js

## 示例

### 基本用法
```html
<span track="1000|click|t=2&c=3">点我</span>
<mip-jdd-tracking>
    <script type="application/json">
    {
        "url":"xxx",
        "appName":"xxx",
        "pageId":"222"
    }
    </script>
</mip-jdd-tracking>
```

## 属性

### track

说明：用|分割，第一个参数为埋点id；第二个为事件类型，目前仅支持click；第三个为附加信息，用&分割（可省略）

必填：是

格式：字符串

## 配置项

### url

说明：埋点请求地址

必填：是

格式：字符串

### appName

说明：项目名称

必填：是

格式：字符串

### pageId 

说明：页面Id

必填：是

格式：字符串

