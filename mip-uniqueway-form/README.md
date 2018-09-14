# mip-uniqueway-form

mip-uniqueway-form 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-uniqueway-form/mip-uniqueway-form.js

## 示例

### 基本用法
```html
<mip-uniqueway-form action="/plans" success="/success_page">
  <input type="hidden" name="name" value="无">
  <input type="hidden" name="destination" value="无">
  <input type="tel" name="phone" placeholder="请填写您的手机号" required="true" label="手机号">
  <textarea name="comment" placeholder="留下您想告知顾问的话（非必填）" pattern="\d+" label="备注"></textarea>
  <input type="submit" class="submit button" value="请顾问联系我">
</mip-uniqueway-form>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

