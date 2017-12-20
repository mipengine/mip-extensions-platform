# mip-objectpropertycheck-min

mip-objectpropertycheck-min 元素属性检测，可根据检测到的属性，做出一些操作，比如说检测某个元素内的子元素长度，如果大于某个值，让另外一个元素做出什么改变  以添加class的形式体现。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-objectpropertycheck-min/mip-objectpropertycheck-min.js

## 示例

### 基本用法
```html
<mip-objectpropertycheck-min data-checkobj="" data-target="" data-property="" data-eq-condition=""  data-flan="" >
    自定义内容，可以嵌套其他组件
</mip-objectpropertycheck-min>
```

## 属性

### data-checkobj

说明：需要检测属性的元素。
必选项：是
类型：string
取值范围：querySelector


### data-target

说明：需要操作的元素。
必选项：是
类型：string
取值范围：querySelector



### data-property

说明：需要检测的属性 ，如果属性值是一个元素内子元素的length;此项属性可省略。
必选项：否 
类型：string
取值范围：css属性，元素的长度 offsetHeight;

### data-gt-condition

说明：条件，比如说检测某个元素内的子元素是否大于0;可以这样设置 data-property="" data-gt-condition="0"
必选项：否
类型：string


### data-lt-condition

说明：条件，比如说检测某个元素内的子元素是否少于10;可以这样设置 data-property="" data-lt-condition="10"
必选项：否
类型：string



### data-eq-condition

说明：条件，比如说检测某个元素内的子元素是否==10;可以这样设置 data-property="" data-eq-condition="10"
必选项：否
类型：string


### data-flan
说明：一个状态值，根据要检测的属性种类，设置这个状态值。
如果为"true"表示的是一个对象的直接属性，而不是CSS属性。
如果是"false"，表示的是一个数组的属性，比如说数组的长度。
如果是"custom",表示这个属性是自定义的， 自定义。例如：maxheight='screen:0.5' ;这里先写死。以maxheight为例。
如果没有值，或者是其他值，表示的是CSS属性。
必选项：否
类型：string
取值范围："true" || "false" || "custom" ||其他任何值（默认）





## 注意事项
如果使用offsetHeight, offsetWidth ,scrollTop …… ，此类属性，需要设置data-flan="true"。
如果需要用到lenght属性，此类属性，需要设置data-flan="false"。
data-eq-condition ， data-lt-condition ，data-gt-condition三个属性只能存在一个。他们只间的优先级是 eq > gt > lt 