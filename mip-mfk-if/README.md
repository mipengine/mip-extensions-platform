# mip-mfk-if

mip-mfk-if 判断模块显示

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-mfk-if/mip-mfk-if.js

## 示例

### 基本用法
```html
<mip-mfk-if get-a="123" get-b_d="222" referrer="baidu.com" pass="hide">
    <ul>
    	<li>自定义内容</li>
    	<li>自定义内容</li>
    	<li>自定义内容</li>
    	<li>自定义内容自定义内容</li>
    	<li>自定义内容</li>
    </ul>
</mip-mfk-if>
```

## 属性

### referrer
说明：页面来源  
必选项：否
类型：string

### get-*
说明：get参数
必选项：否
类型：string

### pass
说明：判断通过后操作
必选项：是
默认：show  
类型：string

## 注意事项

