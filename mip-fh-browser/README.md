# mip-fh-browser

mip-fh-browser 指定浏览器跳转到指定页面。在页面渲染时，跳转到指定页面，针对性的提高用户体验

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-fh-browser/mip-fh-browser.js

## 示例

### 基本用法
```html
<mip-fh-browser browser="SE" href="https://m.fh21.com.cn/"></mip-fh-browser>
<mip-fh-browser browser="SE,QQ" converse href="https://m.fh21.com.cn/"></mip-fh-browser>
<mip-fh-browser converse href="https://m.fh21.com.cn/"></mip-fh-browser>
<mip-fh-browser converse></mip-fh-browser>
```

## 属性

### browser

说明：需要跳转到href页面的浏览器，多个值用,隔开 \
必选项：否 \
类型：字符串 \
取值范围：UC、QQ、SE、Safari

### converse

说明：取反，browser为空时，所有浏览器跳转到href页面 \
必选项：否 \
类型：布尔值 

### href

说明：页面地址，href为空时，会跳转到默认地址 \
必选项：否 \
类型：字符串

## 注意事项

