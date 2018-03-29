# mip-container-expand
mip-container-expand 可以在页面任意位置展开组件里的内容

标题|内容
----|----
类型|业务,定制
支持布局|responsive,flex,container
所需脚本|https://c.mipcdn.com/static/v1/mip-container-expand/mip-container-expand.js

## 示例

### 基本用法
```html
<div id="container-button-wrap">
    <div id="container-expand-button" class="active">按钮文字</div>
    <div id="container-collapse-button">按钮文字<div>
</div>
<mip-container-expand 
    container-collapse-class="container-collapse"
    expand-button-id="container-expand-button"
    collapse-button-id="container-collapse-button"
    video-wrap-class="video-wrap"
>
    <div class="expand-content">
        需要折叠和展开的内容
    </div>
</mip-container-expand>
<div class="container-collapse">
    组件内容展开时页面中需要折叠的其他元素
</div>
<div class="video-wrap">
    <video></video>
    需要暂停的视频
</div>
<video>
``` 

## 属性说明

### container-collapse-class
说明：组件内容展开时页面中需要折叠的其他元素的class           
必选项：否                   
类型：string

### expand-button-id
说明：展开按钮的id,点击该按钮可以展开组件里的内容
必选项：是                               
类型：string

### collapse-button-id
说明：折叠按钮的id,点击该按钮可以折叠组件里的内容           
必选项：是  
类型：string

### video-wrap-class
说明：组件内容展开时,页面中需要暂停视频播放时,则可以填入包含该视频的容器的class,折叠组件内容时恢复播放 
必选项：否                               
类型：string


## 注意事项  
- 仅支持移动端，强行使用pc端打开可能会有布局混乱的风险
```
<div class="expand-content">...</div> 
元素中可以包含自定义内容
```
```
<div id="container-button-wrap">
    <div id="container-expand-button" class="active">按钮文字</div>
    <div id="container-collapse-button">按钮文字<div>
</div>
包含按钮的元素位置可以自定义，可以在组件外或组件内，按钮只能有两个，有active的class的按钮是当前显示的按钮，可以切换
```