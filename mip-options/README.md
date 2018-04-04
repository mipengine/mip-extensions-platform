# mip-options

mip-options 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-options/mip-options.js

## 示例

### 基本用法
```html
<mip-options id="myoptions">
    <div class="price">
        <span on="tap:myoptions.setParam(order,desc)">降序</span>
        <span on="tap:myoptions.setParam(order,asc)">升序</span>
        <span on="tap:myoptions.setParam(order,default)">默认</span>
    </div>
    <div class="color">
        <span on="tap:myoptions.setParam(color,red)">红色</span>
        <span on="tap:myoptions.setParam(color,blue)">蓝色</span>
        <span on="tap:myoptions.setParam(color,yellow)">黄色</span>
    </div>
    <div class="size">
        <span on="tap:myoptions.setParam(size,big)">大</span>
        <span on="tap:myoptions.setParam(size,middle)">中</span>
        <span on="tap:myoptions.setParam(size,small)">小</span>
    </div>
</mip-options>

```

## 属性

### data-class

说明：点击某一列时给对应列父元素添加的类名
必选项：否
类型：string
默认值：active

## 方法
组件自身提供的方法有：

### setParam(key, value)

参数：

- key: 筛选属性
- value: 属性值

## 事件
当`mip-options`筛选属性变化后会触发`change`事件，然后会触发绑定在该组件`on`属性中其他组件的方法，用来组件间交互。如:

```html
<mip-opther id="othercase"></mip-opther>

<mip-options id="myoptions" on="change:othercase.refresh">
    <div class="price">
        <span on="tap:myoptions.setParam(order,DESC")>降序</span>
        <span on="tap:myoptions.setParam(order,ASC)">升序</span>
        <span on="tap:myoptions.setParam(order,DEFAULT)">默认</span>
    </div>
</mip-options>
```

## 注意事项

mip-options绑定`setParam`方法中的参数中间没有空格。


