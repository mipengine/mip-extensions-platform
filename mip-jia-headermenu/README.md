# mip-jia-headermenu

mip-jia-headermenu 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-headermenu/mip-jia-headermenu.js

## 示例

### 基本用法
```html
<mip-jia-headermenu>
   <script type="application/json">
        {
          "type":"forum",
          "element":".head-main-nav",
          "append":".topic-list",
          "share":".share-new-icon",
          "sharebox":".popupFloatTips"
        }
    </script>
   <section class="head-main-nav"></section>
</mip-jia-headermenu>
```

### type
说明：需要点击头部的频道，有ask、forum
必选项：否

### element
说明：添加的元素
必选项：是

### append
说明：论坛调取的添加的元素
必选项：否

### share
说明：点击分享的元素
必选项：否

### sharebox
说明：展示分享的元素
必选项：否
