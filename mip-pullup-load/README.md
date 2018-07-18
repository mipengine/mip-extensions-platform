# mip-pullup-load

上拉ajax加载分页

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-pullup-load/mip-pullup-load.js

## 示例

### 基本用法
```html
<ul id="list">
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
    <li>page 1</li>
</ul>
<mip-pullup-load url="#api-url-load-page" target="list" name="p" value="1" offset="0">
</mip-pullup-load>
```

## 属性

### url

说明：加载地址
必选项：否
类型：字符串
默认值：当前页面url

### target

说明：加载数据插入元素id
必选项：否
类型：字符串
默认值：list

### name

说明：分布参数
必选项：否
类型：字符串
默认值：p

### value

说明：当前页码
必选项：否
类型：正整数
默认值：1

### offset

说明：触发加载离底部距离
必选项：否
类型：数字
默认值：0

## 注意事项
api接口返回结果 json格式：{page:1,maxpage:10,html:'第二页html'}
page:页码
maxpage:最大页码
html:分页数据html


