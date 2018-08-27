# mip-qtkj-tab

mip-qtkj-tab tab切换组件，选项卡切换功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qtkj-tab/mip-qtkj-tab.js

## 示例

### 基本用法
```html
<mip-qtkj-tab tindex="0" cindex="0">
    <div class="tab-tit">
        <ul class="clearfix">
            <li child class="fl tab-list">111111</li>
            <li child class="fl tab-list">222222</li>
            <li child class="fl tab-list">333333</li>
        </ul>
    </div>
</mip-qtkj-tab>
<div class="tab-con">
    <ul>
        <li class="tab-list">111111111的内容</li>
        <li class="dn tab-list">222222222的内容</li>
        <li class="dn tab-list">333333333的内容</li>
    </ul>
</div>
```

## 属性

### tindex

说明：tab标题块儿角标
必选项：否
类型：字符串
取值范围：页面中tab标题块儿实际的角标
默认值：0

### cindex

说明：tab内容块儿角标
必选项：否
类型：字符串
取值范围：页面中tab内容块儿实际的角标
默认值：0

### class属性名tab-list

说明：tab标题块儿和内容块儿子元素的类名
必选项：是

## 当第二次开始调用切换标签，那么tindex和cindex对应的角标一定要有

