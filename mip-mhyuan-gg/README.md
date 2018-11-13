# mip-mhyuan-gg 漫画园广告轮播组件

`<mip-mhyuan-gg>` 用于管理漫画园（mhyuan.com）广告固定位素材轮播的组件。 通过引入漫画园的素材管理组件，实现自动更换广告素材的功能

标题|内容
----|----
类型|通用
支持布局|responsive, fixed-height, fill, container, nodisplay, fixed, flex-item
所需脚本|https://c.mipcdn.com/static/v1/mip-mhyuan-gg/mip-mhyuan-gg.js

## 示例

### 基本使用

```html
<mip-mhyuan-gg></mip-mhyuan-gg>
```

1、在页面底部增加下面代码：
<script src="https://c.mipcdn.com/static/v1/mip-mhyuan-gg/mip-mhyuan-gg.js"></script>
<mip-mhyuan-gg></mip-mhyuan-gg>
2、在需要增加定位广告的地方增加
<div class="a-mhyuan" data-name="name1"></div>


## 属性
### mip-mhyuan-gg
说明：管理漫画园（mhyuan.com）广告固定位素材轮播的组件 , 广告类型是固定广告 , 在组件中通过获取页面中加载的div标签以图片的形式展示