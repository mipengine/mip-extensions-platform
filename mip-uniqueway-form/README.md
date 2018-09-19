# mip-uniqueway-form

mip-uniqueway-form Uniqueway表单组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-uniqueway-form/mip-uniqueway-form.js

## 示例

### 基本用法
```html
<mip-uniqueway-form action="/plans">
  <input type="hidden" name="name" value="无">
  <input type="hidden" name="destination" value="无">
  <input type="tel" name="phone" placeholder="请填写您的手机号" required="true" label="手机号">
  <textarea name="comment" placeholder="留下您想告知顾问的话（非必填）" pattern="\d+" label="备注"></textarea>
  <input type="button" class="submit button" value="请顾问联系我">
</mip-uniqueway-form>
```

## 属性

### action

说明：提交地址
必选项：是
类型：string
默认值：当前页面

## 注意事项

无