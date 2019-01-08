# mip-yuandun-page

mip-yuandun-page 缘盾分页组件，分页信息数据的异步加载

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-yuandun-page/mip-yuandun-page.js


## 示例

### 基本用法
```html
<mip-yuandun-page url="/case/list/data?pageIndex=pageIndex" container="container" content="content" class="mip-element mip-layout-container">
    <a href="javaScript:">页码</a>
</mip-yuandun-page>
```

### {url}
说明 {数据请求地址,地址参数pageIndex为必填项}  必选项{是}  类型{字符串}
### {container}
说明 {数据请求容器dom，是需要替换的数据父级容器
### {content}
说明 {数据请求内容dom，是需要替换的数据内容