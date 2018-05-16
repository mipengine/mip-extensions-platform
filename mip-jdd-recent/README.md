# mip-jdd-recent

mip-jdd-recent 近期查看组件

标题|内容
----|----
类型|业务
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jdd-recent/mip-jdd-recent.js

## 示例

### 基本用法
```html
<span recent="lotteryId=1041&lotteryName=江苏15选5&lotteryType=1&issueNo=2018101">点我</span>

<mip-jdd-recent type="place" host="10.33.92.27:3000">
    
</mip-jdd-recent>
```

## 属性

### recent

说明：近期查看记录参数

必填：是

格式：字符串

## 配置项

### type

说明：保存类型:place、height

必填：是

格式：字符串

### host

说明：打开的页面host

必填：是

格式：字符串
