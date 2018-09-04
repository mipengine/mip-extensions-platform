# mip-scroll-top

mip-scroll-top 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-scroll-top/mip-scroll-top.js

## 示例

### 基本用法
```html
<style lang="less">
    body{height:1500px!important;}
    .header{text-align: center;line-height: 45px;.f16;box-shadow: 0 0 4px rgba(0,0,0,.1);.overflow;}

</style>
<mip-scroll-top class="header" targrt="myself">
    <span class="btn">
        <i class="iconfont icon-fanhui"></i>
    </span>
    自定义内容，可以嵌套其他组件
</mip-scroll-top>
<section>
1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>  1 <br>
</section>
```

## 属性

### targrt

说明：选取滚动超出对象的高度，支持queryselector
必选项：否
类型：字符串
取值范围：'myself',queryselector 内容
默认值：myself

## 注意事项

