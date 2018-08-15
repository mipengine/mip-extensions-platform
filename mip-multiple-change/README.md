# mip-multiple-change

mip-multiple-change 组件说明

### 一款多选项，模块切换的功能，数量，样式自定义

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-multiple-change/mip-multiple-change.js

## 示例
```html
<mip-multiple-change>
    <div>
        <div class="multiple-change" data-show="a">A</div>
        <div class="multiple-change" data-show="b">B</div>
        <div class="multiple-change" data-show="c">C</div>
    </div>
    <div>
        <div class="multiple-change-view" id="a">aaaaaaaa</div>
        <div class="multiple-change-view" id="b">bbbbbbbbbbb</div>
        <div class="multiple-change-view" id="c">cccccccccc</div>
    </div>
</mip-multiple-change>
```

### 基本用法
```html
<mip-multiple-change>
    <div>
        <div class="multiple-change" data-show="a">A</div>
        <div class="multiple-change" data-show="b">B</div>
        <div class="multiple-change" data-show="c">C</div>
    </div>
    <div>
        <div class="multiple-change-view" id="a">aaaaaaaa</div>
        <div class="multiple-change-view" id="b">bbbbbbbbbbb</div>
        <div class="multiple-change-view" id="c">cccccccccc</div>
    </div>
</mip-multiple-change>
```

## 属性
    class，data-show，id
### multiple-change，multiple-change-view
说明：class是为了找到相应的对象，multiple-change是点击的对象，multiple-change-view是点击后显示的对象
必选项：是

## 属性
    data-show，id
### 值自定义
说明：data-show是点击要显示的元素的标记，id值与data-show一一对应
必选项：是

## 注意事项
    避免属性与页面其他冲突
