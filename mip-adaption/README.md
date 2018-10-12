# mip-adaption

mip-adaption 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-adaption/mip-adaption.js

## 示例

### 基本用法
```html
<mip-adaption data-src="post方式请求到需要调用的页面" data-res="需要获取的class对象是谁"></mip-adaption>
```

## 属性

### {属性名}

说明：针对iframe 响应式布局使用，直接post请求到需要调用的页面，然后后台直接打印post参数赋值完成；
必选项：data-src必选，data-res必选
类型：获取屏宽屏高
取值范围：number
单位：number
默认值：''

## 注意事项

