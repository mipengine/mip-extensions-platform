# mip-stats-qiyu

mip-stats-qiyu 组件说明：网易七鱼在线客服组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-stats-qiyu/mip-stats-qiyu.js

## 示例

### 基本用法
```html
<mip-stats-qiyu token="your-qiyu-token" defer async></mip-stats-qiyu>
```

## token

### 七鱼官方唯一标识key

说明：七鱼token
必选项：是
类型：字符串
取值范围：任何
默认值：无

## defer

### 消息进入缓冲

说明：当列表消息过多时，消息会按优先级与客服匹配发送
必选项：否

## async

### 异步客服消息

说明：与属性defer相同，提供一个异步消息处理机制
必选项：否

## 注意事项

1. 对于一般小型企业的需求，属性defer和async可以不添加。
