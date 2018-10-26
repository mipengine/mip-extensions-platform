# mip-toggle-menu

mip-toggle-menu 点击顶部按钮控制导航菜单的显示和隐藏

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-toggle-menu/mip-toggle-menu.js

## 示例

### 基本用法
```html
<style>
.menubox{
	position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: -1000px;
    z-index: 100;
    background: #1f1f1f;
    -moz-background-size: cover;
    background-size: cover;
    text-align: center;
    -webkit-transition: all .3s ease-in-out 0s;
    -moz-transition: all .3s ease-in-out 0s;
    -ms-transition: all .3s ease-in-out 0s;
    -o-transition: all .3s ease-in-out 0s;
    transition: all .3s ease-in-out 0s;
}
.menubox.active{
    right: 0px;
}
.menubox .myclose{
	float: right;
    width: 30px;
    height: 55px;
    padding: 0 10px;
    background: url(http://www.cqaaa.com/template/default/wap/imgx/icon_06.png) no-repeat center;
    -moz-background-size: 20px auto;
    background-size: 20px auto;
}
</style>
<div class="menubox">
  <span class="myclose"></span>
</div>
<mip-toggle-menu class="btn-menu"></mip-toggle-menu>
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

