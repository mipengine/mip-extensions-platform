# mip-ck-domain

mip-ck-domain 根据康网子域名展示不同的内容

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ck-domain/mip-ck-domain.js

## 示例

### 基本用法
```html
<mip-ck-domain domain="a.youlai.cn">
	在指定的子域下显示
</mip-ck-domain>

<mip-ck-domain domain="b.youlai.cn" converse>
	不在指定的子域 b.youlai.cn 下显示
</mip-ck-domain>
```

## 属性

### domain

说明：选择子域
必选项：是
类型：字符串

### converse 

说明：排除domain属性提供的子域
必选项：否
类型：字符串
取值范围：converse, true

## 注意事项

