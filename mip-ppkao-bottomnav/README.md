# mip-ppkao-bottomnav

mip-ppkao-bottomnav ppkao试题bottomnav

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ppkao-bottomnav/mip-ppkao-bottomnav.js

## 示例

### 基本用法
```html
<mip-ppkao-bottomnav id="bottomnav" data-class="active">
    自定义内容，可以嵌套其他组件
</mip-ppkao-bottomnav>
```

## 属性

### data-class
说明：单击按钮时添加或删除的类名
必选项：是
类型：字符串
单位：
默认值：'active'


## 注意事项
在按钮中增加on属性，注意on属性中需要填写对应 mip-ppkao-showsubject 的id。
比如本例中，mip-ppkao-bottomnav id="bottomnav"，on属性需要写成 on="tap:bottomnav.toggle"

