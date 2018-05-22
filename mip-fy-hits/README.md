# mip-fy-hits
功能介绍：通过接口获取点击次数显示到页面中，刷新增加。因为接口数据为非jsonp格式(只有纯数字)，必须使用fetch才能正确获取。


标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-fy-hits/mip-fy-hits.js
## 示例

### 基本用法
```html

<mip-fy-hits data-hitsurl="https://m.qqtn.com/ajax.asp?Action=4&id=" data-hitsid="138796">
    点击次数：<span id="hits"></span></mip-fy-hits>




```
## 用法
- 获取接口地址，将对应id的点击数填入页面。


## 属性

###  data-hitsurl
- 说明：json接口地址。
- 取值：url。
- 必选项：是
- 类型：指定字符串

###  data-hitsid
- 说明：当前页面id号。
- 取值：数字。
- 必选项：是
- 类型：id

## 注意事项

- 对应的显示id必须为 `hits` 。
- 地址必须为 `https` 。 