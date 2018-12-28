# mip-ydcategory

mip-ydcategory 组件说明  按分类筛选数据的组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ydcategory/mip-ydcategory.js

## 示例

### 基本用法
```html
<mip-ydcategory url="/case/list/data?pageIndex=1&&categoryId=7">
    <span>类目名称</span>
</mip-ydcategory>
```

### {url}
说明 {数据请求地址，地址需带参数categoryId。pageIndex默认为1，可不写}  必选项{是}  类型{字符串}


