# mip-stat-wulinbang

mip-stat-wulinbang 用于武林榜（50bang）统计投放。

标题|内容
----|----
类型|通用
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-stat-wulinbang/mip-stat-wulinbang.js

## 示例

### 基本用法
```html
<mip-stat-wulinbang>
    自定义内容，可以嵌套其他组件
</mip-stat-wulinbang>
```

## 属性

### 可填字段
key|value
----|----
stat-code|'ajaxXXX'
stat-uid|'XXXXXX'
## 参考范例
```html
<mip-stat-wulinbang stat-code='ajax123' stat-uid='asd12345'>
    <a href="//2345.com">点击测试</a>
</mip-stat-wulinbang>
```