# mip-rz-photoswipe

mip-rz-photoswipe 组件说明
图片全屏放大轮播插件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-rz-photoswipe/mip-rz-photoswipe.js

## 示例

### 基本用法
```html
<mip-rz-photoswipe id="diyphotoswipe">
    不可以自定义内容，不可以嵌套其他组件
</mip-rz-photoswipe>
<mip-xx on="eventName:diyphotoswipe.openfull"></mip-xx>
mip-xx组件的js
viewer.eventAction.execute('eventName', element, {
    order: order,
    items: items
});
```

## 参数
### order

说明：从第几个图片开始轮播
必选项：是

### items

说明：轮播的图片数组   
必选项：是   
举例：items = [   
        {   
            src:'',//图片地址   
            w: 281,//宽度   
            h: 211,//高度   
            title: ''//标题   
        },   
    ];   

## 注意事项

