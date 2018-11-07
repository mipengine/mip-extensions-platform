# mip-show-dom-li

mip-show-dom-li 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-show-dom-li/mip-show-dom-li.js

## 示例

### 基本用法
```html
<mip-show-dom-li>
     <div>
    	<div ifShow='true'>我是显示的</div>
    	<div>不可控制一直显示啦啦啦</div>
    </div>
    <div ifShow='true'>我是显示的</div>
    <div ifShow='false' class="welfare_detail_text hide">我是隐藏的</div>
</mip-show-dom-li>
```

## 属性

### ifShow

说明：控制其是否显示
必选项：{是}
类型：{bool}
取值范围：{true|false}
单位：无
默认值：无

## 注意事项

