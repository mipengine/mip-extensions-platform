# mip-zol-stats

ZOL统计组件

标题|内容
:----|:----
类型|通用
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-zol-stats/mip-zol-stats.js

## 示例

### 基本用法
```html
<mip-zol-stats site="ZOL">
<script type="application/json">
{"buz": "", "channel": "", "pagetype": "", "custom": {"a": "", "b":""}}
</script>
</mip-zol-stats>
```

## 属性

### site

说明：使用统计的站点，不填会拿到错误的数据            
必选项：是        

## 配置参数说明

```json
{"buz": "", "channel": "", "pagetype": "", "custom": {"a": "", "b":""}}
```

|参数|说明|
|:----|:----|
|buz|业务模块（必填）。比如，`wap` 代表wap站业务、`cms` 代表CMS业务、`mall` 代表商城业务。|
|channel|业务频道（非必填）。比如产品库的产品线可以用 子类ID 来作为此字段的名字，CMS的频道可以用`mobile`，`nb` 等二级域名来作为此字段的名字|
|pagetype|页面类型（非必填）。|
|custom|需要自定义收集的数据（非必填），格式见上面的配置代码。|

## 事件追踪

支持页面功能事件的统计追踪，需要简单的手动埋点，就能快速的增加页面功能事件的统计了。埋点方式：

```html
<button zpv-events="click|click_a_button|a=xx&b=yy"></button>
<div zpv-events="hover|hover_a_div"></div>
<div zpv-events="inview|a_div_is_in_viewport"></div>
```

其中属性 `zpv-events` 用来配置事件的一些值和类型。一共有三个值，用 `|` 隔开。
- 第一个代表事件类型，`click` 代表点击，`hover` 代表滑过，`inview` 代表该区块进入可视区
- 第二个代表事件名字
- 第三个代表要额外增加的一些参数字段。格式为：`a=xxx&b=yyy`



