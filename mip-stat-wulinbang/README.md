# mip-stat-wulinbang

mip-stat-wulinbang 用于武林榜（50bang）统计投放。

标题|内容
----|----
类型|通用
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-stat-wulinbang/mip-stat-wulinbang.js

## 示例

### 基本用法
```html
<mip-stat-wulinbang stat-code='' stat-uid='' stat-lO=''>
    自定义内容，可以嵌套其他组件
</mip-stat-wulinbang>
```

```html
<mip-stat-wulinbang visit-kwd=''>
   注意：内部无内容，建议放在页面底部
</mip-stat-wulinbang>
```

## 属性

### 可填字段
点击统计：
key|value
----|----
stat-code|'ajaxXXX'（此处填写页面统一的统计代码）
stat-uid|'XXXXXX'(此处填写uid，如不需要uid可以不加入本字段)
stat-lO|'XXX'(此处填写点击的统计代码，如不需要可以不加入本字段)

访问统计：
key|value
----|----
visit-kwd|'mipxxx'（此处填写页面的访问统计字段）
## 参考范例
点击统计：
```html
<mip-stat-wulinbang stat-code='ajax123' stat-uid='asd12345' stat-lO='m18'>
	<a target="_blank" href="//2345.com">点击测试1</a>
</mip-stat-wulinbang>
```

访问统计：
```html
<mip-visit-wulinbang visit-kwd='testkwd1'></mip-visit-wulinbang>
```