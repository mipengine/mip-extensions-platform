# mip-watch-carousel

mip-watch-carousel 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-watch-carousel/mip-watch-carousel.js

## 示例

### 基本用法
```html
<style>
    .watch-carousel{
        height: 300px;
        position: relative;
        max-width: 1280px;
        margin: 0 auto;
    }
    
    .watch-carousel-wrapper{
        max-width: 1120px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        overflow: hidden;

    }
    
    .icon-left{
        position: absolute;
        left: 50px;
        top: 50%;
        transform: translateY(-50%) scale(2,2);
    }
                
    .icon-right{
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translateY(-50%) scale(2,2);
    }
</style>
<div class="watch-carousel">
   <div class="watch-carousel-wrapper">
        <mip-watch-carousel class="watch-carousel-container">
            
         </mip-watch-carousel>
    </div>
   <span class="icon-left">
       <
   </span>
   <span class="icon-right">
       >       
   </span>
</div>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

