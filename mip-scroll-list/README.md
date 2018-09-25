# mip-scroll-list

mip-scroll-list 用来支持列表内容滚动显示

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-scroll-list/mip-scroll-list.js

## 示例

### 基本用法
```html
<style type="text/css">
    #box{width:260px;height:100px;margin:0 auto;border:2px solid red;overflow: hidden}
    ul{padding:0;margin:0;list-style: none;overflow: hidden}
    ul li{float:left;width:45%;height:24px;line-height: 24px;padding-left:10px;overflow:hidden;}
    a{text-decoration: none;color:#000;}
    a:hover{color:#f00}
</style>
<mip-scroll-list id="box" speed="50">
    <ul>
        <li><a href="#" >1,课程html</a> </li>
        <li><a href="#">2,课程css</a> </li>
        <li><a href="#">3,课程js</a> </li>
        <li><a href="#">4,课程jquery</a> </li>
        <li><a href="#">5,课程html5</a> </li>
        <li><a href="#">6,课程css3</a> </li>
        <li><a href="#">7,课程hp</a> </li>
        <li><a href="#">8,课程bpootstrap</a> </li>
        <li><a href="#">9,课程apicloud</a> </li>
    </ul>
    <ul></ul>
</mip-scroll-list>
```

## 属性

### speed

说明：滚动速度
必选项：是
类型：数字（毫秒）
取值范围：1-正无穷
默认值：无

## 注意事项

