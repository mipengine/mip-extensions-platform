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
    <input name="type" value="1" type="hidden" />
    <input name="test" value="1" disabled />
    <select>
        <option value="">选择省份</option>
        <option value="100000">北京</option>
        <option value="370000">山东</option>
    </select>
    <select name="areaid">
        <option value="">选择城市</option>
        <option value="370100">济南</option>
        <option value="370200">青岛</option>
    </select>
    <label><input name="catid" value="1" type="radio">分类1</label>
    <label><input name="catid" value="2" type="radio">分类2</label>
    <label><input name="opt" value="1" type="checkbox">选项1</label>
    <label><input name="opt" value="2" type="checkbox">选项2</label>
    <textarea name="content">21516113213</textarea>
</mip-faniu-filter>
```

## 属性

### url

说明：不带筛选参数的基础链接
必选项：是
类型：字符串

### separator

说明：复选框参数值分割符
必选项：否
类型：字符串
默认值：false:不拼接

## 注意事项

