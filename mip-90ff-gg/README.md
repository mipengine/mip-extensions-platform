# mip-90ff-gg 非凡漫画广告轮播组件

`<mip-90ff-gg>` 用于管理非凡漫画（90ff.com）广告固定位素材轮播的组件。 通过引入非凡漫画的素材管理组件，实现自动更换广告素材的功能

标题|内容
----|----
类型|通用
支持布局|responsive, fixed-height, fill, container, nodisplay, fixed, flex-item
所需脚本|https://c.mipcdn.com/static/v1/mip-90ff-gg/mip-90ff-gg.js

## 示例

### 基本使用

```html
<mip-90ff-gg></mip-90ff-gg>
```

1、在页面底部增加下面代码：
<script src="https://c.mipcdn.com/static/v1/mip-90ff-gg/mip-90ff-gg.js"></script>
<mip-90ff-gg></mip-90ff-gg>
2、在需要增加定位广告的地方增加
<div class="a-90ff" data-name="name1"></div>


## 属性
### mip-90ff-gg
说明：管理非凡漫画（90ff.com）广告固定位素材轮播的组件 , 广告类型是固定广告 , 在组件中通过获取页面中加载的div标签以图片的形式展示