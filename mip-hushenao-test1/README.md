# mip-hushenao-test1

实现在一个部分引入特定内容的组件，内容链接由外部提供。

标题|内容
----|----
类型|通用
支持布局|N/A
所需脚本|https://c.mipcdn.com/static/v1/mip-hushenao-test1/mip-hushenao-test1.js

## 示例

### 基本用法
```html
<!--src="http://www,baidu.com"为示例，需要填写提供的指定网址-->
<mip-hushenao-test1 type="10010">
    <iframe src="http://www.baidu.com" width="375" height="667"></iframe>
</mip-hushenao-test1>
```

## 属性

### type

说明：广告的类型
必选项：是
类型：String
取值范围：无
单位：无
默认值：无

### src

说明：iframe的跳转地址
必选项：是
类型：String
取值范围：无
单位：无
默认值：无

### width

说明：iframe的宽度
必选项：否
类型：Number
取值范围：无
单位：px
默认值：当前屏幕宽度

### height

说明：iframe的高度
必选项：否
类型：Number
取值范围：无
单位：px
默认值：当前屏幕高度

## 注意事项

