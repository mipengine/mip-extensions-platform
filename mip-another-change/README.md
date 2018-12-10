# mip-another-change

换一换更新数据get请求

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-another-change/mip-another-change.js

## 示例

### 基本用法
```html
<style type="text/css">
	.active{ background-color: #f00; }
</style>

<mip-another-change url="http://picture_management.sandbox.fh21.com.cn/api/pic_list" view-id="#html" active-class="active" active-id="#active" data-type="data|datas">
    <template type="mip-mustache">
        <h2>
            {{errmsg}}
        </h2>
    </template>
    <button id="active">触发按钮换一换</button>
</mip-another-change>
<div id="html"></div>
<script src='https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js'></script>
```

## 属性

### url

说明：请求路径
必选项：是
类型：字符串
默认值：无

### view-id

说明：填充元素
必选项：是
类型：#id
默认值：无

### active-class

说明：交互动画
必选项：否
类型：字符串

### active-id

说明：动画元素
必选项：否
类型：#id

### data-type

说明：数据结构 用“|”分隔
必选项：否
类型：字符串
取值范围：data|datas

## 注意事项

