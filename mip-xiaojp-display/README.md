# mip-xiaojp-display

mip-xiaojp-display 点击组件，可根据传递的data-type类型，打开或者 关闭 目标dom;

标题|内容
----|----
类型|通用
支持布局|无
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-xiaojp-display/mip-xiaojp-display.js

## 示例

### 基本用法
```html
<mip-xiaojp-display target-idname="" data-flan="false" data-type="open">
    自定义内容，可以嵌套其他组件
</mip-xiaojp-display>
```

## 属性

### target-idname

说明：指向要打开的dom的id
必选项：是
类型：字符串
取值范围：queryselector的内容


### data-type

说明：有三个值，show||hide||toggle,分别是显示，隐藏，显示或者隐藏。
必选项：否
类型：字符串
取值范围：show || hide || toggle
默认值：show


## 注意事项
1:open-target的取值必须是另外一个元素的id;
2:data-type如果缺省，或者是其他值，默认为show;
3:为show时，给目标元素添加一个addClass="show",hide时,addClass="hide",toggle时toggleClass="show";因此，具体CSS需要自行设置。
4:该组件还为目标元素添加了一个mip-xiaojp-display的class，具体样式，用户自定义，比如说，页面中有多个这样的功能模块，可以在这里设置一些统一的样式。

