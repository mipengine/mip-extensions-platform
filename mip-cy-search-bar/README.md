# mip-cy-search-bar

mip-cy-search-bar组件是春雨搜索bar

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-cy-search-bar/mip-cy-search-bar.js

## 示例

### 基本用法

```html
<mip-cy-search-bar
    url="/mip/search_doctor_page/"
    placeholder="按症状、疾病、医院、科室、医生名"
    input-val="{{query}}"
    param-name="query"
></mip-cy-search-bar>
```

## 属性

### url

说明：点击搜索按钮后跳转的链接
必选项：是
类型：字符串
取值范围：URI
单位：无
默认值：无

### placeholder

说明：input框的placeholder文案
必选项：否
类型：字符串
取值范围：无限制
单位：无
默认值：空字符串

### input-val

说明：input框默认值
必选项：否
类型：字符串
取值范围：无限制
单位：无
默认值：空字符串

### param-name

说明：url需要携带的参数名
必选项：否
类型：字符串
取值范围：无限制
单位：无
默认值："query"

## 注意事项

暂无
