# mip-all-checkout

可配置的全选复选框来操作组件中的复选框。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-all-checkout/mip-all-checkout.js

## 示例

### 基本用法
```html
<mip-all-checkout>
    <ul>
        <li>
            <label for="demo-1">测试</label>
            <input type="checkbox" class="mip-all-checkout-input" id="demo-1">
        </li>
        <li>
            <label for="demo-2">测试2</label>
            <input type="checkbox" class="mip-all-checkout-input" id="demo-2">
        </li>
        <li>
            <label for="demo-3">测试3</label>
            <input type="checkbox" class="mip-all-checkout-input" id="demo-3">
        </li>
        <li>
            <label for="demo-all">全选</label>
            <input type="checkbox" class="mip-all-checkout-btn" id="demo-all">
        </li>
    </ul>
</mip-all-checkout>
```

### 默认全选中

理论上来说，元素的选中状态应该由后端输出，要求是输出到选择框的 `<input type="checkout" class="mip-all-checkout-input" checked>` 元素和全选按钮的 `<input type="checkout" class="mip-all-checkout-btn" checked>` 中，不过组件也兼容了只设置某一个全选按钮从而其他按钮也全选的状态。

```html
<mip-all-checkout>
    <ul>
        <li>
            <label for="demo2-1">测试</label>
            <input type="checkbox" class="mip-all-checkout-input" id="demo2-1">
        </li>
        <li>
            <label for="demo2-3">测试3</label>
            <input type="checkbox" class="mip-all-checkout-input" id="demo2-3">
        </li>
        <li>
            <label for="demo2-all">全选按钮1</label>
            <input type="checkbox" checked class="mip-all-checkout-btn" id="demo2-all">
        </li>
        <li>
            <label for="demo2-all">全选按钮2</label>
            <input type="checkbox" checked class="mip-all-checkout-btn" id="demo2-all">
        </li>
    </ul>
</mip-all-checkout>
```

## 属性

### data-all-selector

说明：全选按钮选择器  
必选项：否  
类型：字符串  
取值范围：选择器  
默认值：`.mip-all-checkout-input`  
注意事项：该条件只是在当前组件内的元素进行筛选

### data-filter-selector

说明：筛选组件内的可操作元素  
必选项：否  
类型：字符串  
取值范围：选择器  
默认值：`.mip-all-checkout-btn`  
注意事项：该条件只是在当前组件内的元素进行筛选

## 注意事项

1. 示例中的 `<label for>` 和 `<input id>` 属性对应并没有特殊含义，只是为了达到点击文字时操作复选框的功能，具体请查看 [HTML `<label>` 标签](http://www.w3school.com.cn/tags/tag_label.asp) 说明。
2. 组件的选择器查找是以组件元素本身中查找，要注意全选按钮和复选框按钮选择器的分隔。
3. 选择器是使用的 `querySelectorAll` 接口去处理，具体请参考 [Document.querySelectorAll 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll) 。