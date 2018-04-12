# mip-cgcep-header

顶部header的导航展开收起

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cgcep-header/mip-cgcep-header.js

## 示例

### 基本用法
```html
<header class="hhh">
    <div class="contenter">
        <mip-history history="go, -1" class="mip-history-default back"><mip-img src="http://m.cgcep.com/images/back.png" alt=""  layout="responsive" width="11" height="20"></mip-img></mip-history>
        <a href="http://m.cgcep.com/" class="title">
            <mip-img src="http://m.cgcep.com/images/logo2.png" alt="" layout="responsive" width="63" height="68"></mip-img>
            <b>人类的好朋友</b>
        </a>
        <mip-cgcep-header goalclass="taggle_box" taclass="show_nav" layout="container" class="flo-right">
		    <input type="image" src="http://m.cgcep.com/images/btn-nav.png" />
		</mip-cgcep-header>
        
    </div>
    <nav class="transAnimate hide-nav taggle_box">
        <ul class="clearfix">
            <li class="flo-left"><a href="#">猫猫</a></li>
            <li class="flo-left"><a href="#">狗狗</a></li>
            <li class="flo-left"><a href="#">小宠</a></li>
            <li class="flo-left"><a href="#">鸟儿</a></li>
            <li class="flo-left"><a href="#">鱼儿</a></li>
            <li class="flo-left"><a href="#">趣闻</a></li>
            <li class="flo-left mar"><a href="http://m.cgcep.com/wiki/">护理</a></li>
        </ul>
    </nav>
</header>
```

## 属性

### goalclass

说明：目标节点的class名
必选项：是
类型：字符串
取值范围：例如"taggle_box"

### taclass

说明：需要切换的class名
必选项：是
类型：字符串
取值范围：例如"show_nav"

## 注意事项

