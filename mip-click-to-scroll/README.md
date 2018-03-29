# mip-click-to-scroll
mip-click-to-scroll 可以使点击的元素滚动至页面顶部

标题|内容
----|----
类型|业务
布局|display: none
所需脚本|https://c.mipcdn.com/static/v1/mip-click-to-scroll/mip-click-to-scroll.js

## 示例

### 基本用法
```html
<mip-click-to-scroll bind-id='["scroll-01"]' video-id='["video"]'></mip-click-to-scroll>
``` 

## 属性说明

### bind-id
说明：点击可以滚动至该元素的id,格式为数组           
必选项：是  
类型：string

### video-id
说明：滚动元素后,页面中需要暂停视频播放id数组,该id是包含video标签的父级元素 (考虑到直接给mip组件内video元素添加id有困难)
必选项：否                               
类型：string


## 注意事项  
若页面高度不足以使页面滚动至该元素，则会滚动至能滚动的极限值