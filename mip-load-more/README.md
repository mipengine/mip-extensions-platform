# mip-load-more

mip-load-more 运用无刷新技术通过get请求达到加载更多的效果

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-load-more/mip-load-more.js

## 示例

### 基本用法
```html
<ul id='more_list'></ul>
<mip-load-more data-src='http://www.xxx.com/xx=xxxx' data-on='on_more' data-name='more_list'>
    <div id='on_more'>加载更多</div>
</mip-load-more>
<div class="more_num">1</div>
```

## 属性

### data-src

说明：请求的json地址
必选项：是
类型：GET
取值范围：完整的url地址
单位：无
默认值：无

### data-on

说明：点击元素id是谁，如：加载更多
必选项：是
类型：无
取值范围：无
单位：无
默认值：无

### data-name

说明：在哪个对象中显示数据
必选项：是
类型：无
取值范围：无
单位：无
默认值：无

## 注意事项

