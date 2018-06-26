# mip-st-slide

触屏滑动特效组件，能实现触屏焦点图、触屏Tab切换、触屏多图切换等常用效果。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-st-slide/mip-st-slide.js

## 示例

### 基本用法
```html
<mip-st-slide>
    <script type="application/json">
        { 
            "slideCell": "#slideBox",
            "titCell": ".hd ul",
            "mainCell": ".bd ul", 
            "effect": "leftLoop", 
            "autoPage": true,
            "autoPlay": true
        }
    </script>
    <div id="slideBox" class="slideBox">
    
        <div class="bd">
            <ul>
                    <li>
                        <a class="pic" href="#"><img src="http://pic.food886.com/20180308/东坡.jpg" /></a>
                        <a class="tit" href="#">东坡肉</a>
                    </li>
                    <li>
                        <a class="pic" href="#"><img src="http://pic.food886.com/20180308/四喜.jpg"/></a>
                        <a class="tit" href="#">四喜烤麸</a>
                    </li>
                    <li>
                        <a class="pic" href="#"><img src="http://pic.food886.com/20180308/蜜汁.jpg"/></a>
                        <a class="tit" href="#">蜜汁叉烧肉</a>
                    </li>
                    <li>
                        <a class="pic" href="#"><img src="http://pic.food886.com/20180308/菠萝古老.jpg"/></a>
                        <a class="tit" href="#">菠萝咕噜肉</a>
                    </li>
            </ul>
        </div>
    
        <div class="hd">
            <ul></ul>
        </div>
    </div>
</mip-st-slide>
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

详细参数设置与用法可参考http://www.superslide2.com/TouchSlide/param.html
