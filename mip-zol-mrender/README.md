# mip-zol-mrender

渲染mip-data请求回来的数据的组件

标题|内容
----|----
类型|公司通用组件
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-zol-mrender/mip-zol-mrender.js

## 更新日志

## 示例

```html
<mip-zol-mrender m-bind:data="promotion.flag?'m.promotion':''">
    <template type="mip-mustache">
    <!-- 这里是渲染模板 -->
    </template>
</mip-zol-mrender>
```

## 属性

### data

`mip-data` 获取回来的数据，一般从 `window.m` 里边获取

## 注意事项

此组件只为配合 `mip-data` 使用，使用之前需要确认页面 使用 `mip-data` 来获取过数据
