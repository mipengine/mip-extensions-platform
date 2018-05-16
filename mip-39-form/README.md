# mip-39-form

mip-39-form 通过填写相关信息，提交表单来预约医生


标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-39-form/mip-39-form.js

## 示例

### 基本用法
```html
<mip-39-form>
    自定义内容，可以嵌套其他组件
</mip-39-form>
```

## 属性
### {on}

说明：{
    值为click:名称.select为选项卡选择事件，名称为需要选项卡id名称，选择子元素时将选择的value，data-type，price填到属性名为select-value的元素上展示
    值为click:名称.toggle为展示隐藏元素，名称为需要展示隐藏元素的id名称
}
必选项：{否}
类型：{string}

## 属性
### {input和textarea的name}

说明：{
    将input和textarea输入的值序列化到对象中，并判断值是否符合标准
}
必选项：{否}
类型：{string}


## 属性
### {checkbox的agreement}

说明：{
    checkbox中的agreement属性，为阅读并同意条款的选择
}
必选项：{是}
类型：{string}



