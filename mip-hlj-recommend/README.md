# mip-hlj-recommend

mip-hlj-recommend 推荐列表组件，公司内部使用

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hlj-recommend/mip-hlj-recommend.js

## 示例

### 基本用法
```html
    <mip-hlj-recommend id="recommend" data-api="http://mtest.hunliji.com/baidu/getRecommendation" data-package-url="/baidu/package/detail_" data-hotel-url="/baidu/hotel/detail_">
        <p class="header"></p>
        <div class="panel"></div>
    </mip-hlj-recommend>
```

## 属性

### data-api

说明：获取列表api地址   
必选项：是   
类型：字符串   
单位：无   
取值：无   
默认值：无

### data-package-url
说明：套餐类型列表跳转地址
必选项：是   
类型：字符串   
单位：无   
取值：无   
默认值：无

### data-hotel-url
说明：酒店套餐跳转地址
必选项：是   
类型：字符串   
单位：无   
取值：无   
默认值：无

