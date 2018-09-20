# mip-ck-referrer

mip-ck-referrer 根据康网访问来源显示内容

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ck-referrer/mip-ck-referrer.js

## 示例

### 基本用法
```html
<mip-ck-referrer referrer="192.168.1.21">
	来源是192.168.1.21才会显示内容
</mip-ck-referrer>
```

## 属性

### referrer

说明：来源的host
必选项：是
类型：字符串

### converse 

说明：排除referrer属性提供的host
必选项：否
类型：字符串
取值范围：converse, true

