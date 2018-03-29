# mip-9ht-bdzs

mip-9ht-bdzs 百度站搜表单提交

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-9ht-bdzs/mip-9ht-bdzs.js

## 示例

### 基本用法
```html
<mip-9ht-bdzs>
<form id="bdcs-search-form" class="bdcs-search-form" target="_blank" method="get" action="https://m.9ht.com">
  <input type="hidden" value="10517699197560052058" name="s">
  <input type="hidden" value="3" name="nsid">
  <input type="hidden" value="1" name="entry">
  <input type="hidden" value="gbk" name="ie">
  <input type="text" autocomplete="off" placeholder="请输入搜索关键词" id="bdcs-search-form-input" class="bdcs-search-form-input" name="q">
  <input type="submit" value="" id="bdcs-search-form-submit" class="bdcs-search-form-submit ">
</form>
</mip-9ht-bdzs>
```

## 注意
因为百度站搜不支持https，用脚本来替换搜索表单的主站https地址（假）为真实的百度站内搜索地址，并附加对应的搜索参数