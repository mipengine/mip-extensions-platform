# mip-faniu-filter

律师筛选

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-faniu-filter/mip-faniu-filter.js

## 示例

### 基本用法
```html
<mip-faniu-filter url="#api-url-filter-base">
    <form>
    <input name="type" value="1" type="hidden" />
    <select name="areaid">
        <option value="">选择地区</option>
        <option value="100000">北京</option>
        <option value="370000">山东</option>
    </select>
    <label><input name="catid" value="1" type="radio">分类1</label>
    <label><input name="catid" value="2" type="radio">分类2</label>
    </form>
</mip-faniu-filter>
```

## 属性

### url

说明：不带筛选参数的基础链接
必选项：是
类型：字符串

## 注意事项

