# mip-zol-wapnav

mip-zol-wapnav 组件说明

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-zol-wapnav/mip-zol-wapnav.js

## 示例

### 基本用法
```html
<mip-zol-wapnav>
    <script type="application/json">
    {"nav": [{"name": "综述","link": "#","isActive": 0},{"name": "参数","link": "#","isActive": 0},{"name": "报价","link": "#","isActive": 0},{"name": "点评","link": "#","isActive": 0},{"name": "图片","link": "#","isActive": 0},{"name": "评测","link": "#","isActive": 0},{"name": "论坛","link": "#","isActive": 0},{"name": "问答","link": "#","isActive": 1}]}
    </script>
</mip-zol-wapnav>
```

## 注意事项

通过 `<script type="application/json"></script>` 来传值，`isActive` 为选中状态
