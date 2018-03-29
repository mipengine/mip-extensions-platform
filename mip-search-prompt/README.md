# mip-search-prompt

mip-search-prompt 搜索组件，有百度提示的搜索提示框组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-search-prompt/mip-search-prompt.js

## 示例

### 基本用法
```html
<mip-search-prompt class="ms-p" url-prefix="http://m.91wangpan.com/s/">
    <input class="s-ipt" type="text" placeholder="姓名">
    <button class="s-bn" type="submit">91一下</button>
    <div class="tt-menu"></div>
    <div class="tt-menu-close"></div>
</mip-search-prompt>
```

## 属性

### url-prefix

说明：指定搜索链接前缀
必选项：是
类型：字符串
取值范围：http://或https://开头的字符串链接

## 注意事项
    1.搜索框只支持get请求，不支持post请求
    2.点会被转成空格
