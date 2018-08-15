# mip-hunliji-tabSwitch

mip-hunliji-tabSwitch tab切换组件可嵌套mip-fixed

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hunliji-tabSwitch/mip-hunliji-tabSwitch.js

## 示例

### 基本用法
```html
<mip-hunliji-tabSwitch>
    <div class="tab_box">
        <div data-type="top-nav-list1">xxx</div>
        <div data-type="top-nav-list2">sss</div>
    </div>
    <div class="text_box">
        <div class="top-nav-list1">list1</div>
        <div class="top-nav-list2">list2</div>
    </div>
</mip-hunliji-tabSwitch>

组合使用mip-semi-fixed时结构
<mip-hunliji-tabSwitch>
    <mip-semi-fixed id="semi-fixed" fixedClassNames="fixedStyle">
        <div mip-semi-fixed-container class="absoluteStyle">
            <div class="tab_box">
                <div data-type="top-nav-list1">xxx</div>
                <div data-type="top-nav-list2">sss</div>
            </div>
        </div>
    </mip-semi-fixed>
    <div class="text_box">
        <div class="top-nav-list1">list1</div>
        <div class="top-nav-list2">list2</div>
    </div>
</mip-hunliji-tabSwitch>
```

## 属性

### {data-type}

说明：{text_box下被切换的class类名}
必选项：{是}
类型：{类型}

## 注意事项
使用mip-semi-fixed时记得引用mip-semi-fixed.js
