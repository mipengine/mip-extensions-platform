# mip-qqy-digg

mip-qqy-digg 去去游戏DIGG组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qqy-digg/mip-qqy-digg.js

## 示例
<mip-qqy-digg val="#diggtopshowdiv" url="http://xxxx.com/e/extend/isajax.php?name=diggjson&classid=3&id=50&dotop=1"><div class="digg"><a href="#e" target="_self" class="diggget">支持 <span id="diggtopshowdiv">2</span></a></div></div></mip-qqy-digg>
### 基本用法
```html
<mip-qqy-digg val="" url="">
    自定义内容，可以嵌套其他组件
</mip-qqy-digg>
```

## 属性
url=""
val=""
### {属性名}

说明：url 为ajaxjson地址 val 为返回text数
必选项：是