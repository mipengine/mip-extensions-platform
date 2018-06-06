# mip-xxd-round-list

mip-xxd-round-list 选校帝列表轮换组件

该组件实现列表的轮换效果。

标题|内容
----|----
类型|通用,定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xxd-round-list/mip-xxd-round-list.js

## 示例

### 基本用法
```html
<mip-xxd-round-list size="3">
    <ul mip-xxd-round-container>
        <li>第一页内容</li>
        <li>第一页内容</li>
        <li>第一页内容</li>
        <li>第二页内容</li>
        <li>第二页内容</li>
        <li>第二页内容</li>
        <li>第三页内容</li>
        <li>第三页内容</li>
        <li>第三页内容</li>
    </ul>
    <button mip-xxd-round-trigger>下一页</button>
</mip-xxd-round-list>
```

## 属性

### size

说明：展示的列表长度
必选项：否
类型：数字
取值范围：>0
单位：个
默认值：5

## 注意事项

- 组件内必须有一个包含 `mip-xxd-round-container` 属性的元素表示列表容器。
- 可以有一个包含 `mip-xxd-round-trigger` 属性的元素作为换页触发器。