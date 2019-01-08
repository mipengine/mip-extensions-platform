# mip-yuandun-category

mip-yuandun-category 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-yuandun-category/mip-yuandun-category.js

## 示例

### 基本用法
```html
<mip-yuandun-category url="/case/list/data?pageIndex=pageIndex&&categoryId=categoryId" container="container" content="content" class="mip-element mip-layout-container">
    <a href="javaScript:">条目名称</a>
</mip-yuandun-category>
```

### {url}
说明 {数据请求地址，地址需带参数categoryId。pageIndex默认为1，可不写}  必选项{是}  类型{字符串}
### {container}
说明 {数据请求容器dom，是需要替换的数据父级容器
### {content}
说明 {数据请求内容dom，是需要替换的数据内容

