# mip-yesky-subscribes

mip-yesky-subscribes 是一个实现文章订阅功能的组件 点击可是实现订阅功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-yesky-subscribes/mip-yesky-subscribes.js

## 示例
 <mip-yesky-subscribes id="lili0" class="span1" data-expiredays="30" data-sub="false" data-openId="true" data-keyId="711949234" data-type="2" data-name="转向灯" data-status="0" data-articleId="531427823" data-url="http://g.yesky.com/car/323/531427823.shtml" data-ajax-url="/wap/subscriptions.jhtml">转向灯</mip-yesky-subscribes>
### 基本用法
```html
<mip-yesky-subscribes>
    自定义内容
</mip-yesky-subscribes>
```

## 属性

### data-expiredays

说明：设置cookie过期时间
必选项：是
类型：number
取值范围：>0
单位：天
默认值：30

### data-sub

说明：是否已经订阅过
必选项：是
类型：布尔
取值范围：true|false
默认值：false


### data-articleId

说明：文章id
必选项：是
类型：number
取值范围：无


### data-openId

说明： 百度用户身份标识
必选项：是
类型：string
取值范围：无
单位：无
默认值：无


### data-url

说明： 文章url地址
必选项：是
类型：string
取值范围：无
单位：无
默认值：无


### data-namedata-name

说明： 文章所属节点名
必选项：是
类型：string
取值范围：无
单位：无
默认值：无


### data-ajax-url

说明： ajax请求地址
必选项：是
类型：string
取值范围：无
单位：无
默认值：无


### data-keyId

说明： 标识id
必选项：是
类型：string
取值范围：无
单位：无
默认值：无

### data-type

说明： 数据类型
必选项：是
类型：number
取值范围：1|2 1是分类 2是关键词


