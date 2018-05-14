# mip-wecoffee-fetchdata

- 提供触发接口时机
- 接品返回结果存储在 MIP全局数据中 MIP.setData({ fetchData: {[storefiled]: data});

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-showcase-options/mip-showcase-loading.js

## 示例

### 基本用法
```html
<mip-wecoffee-fetchdata id="productFetch" storefiled="productOption" >
</mip-wecoffee-fetchdata>
<div class="flexbox" on="tap:productFetch.fetch(/api/store/1/product/options)>
</div>
```

## 属性

### storefiled
- 存储字段名
MIP.setData({ fetchData: {[storefiled]: data});

## 注意事项

