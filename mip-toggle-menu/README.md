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

.menubox .dbox .pubtop{
    width: 100%;
    height: 55px;
    line-height: 55px;
    background: #000000;
    position: absolute;
    left: 0;
    top: 0;
}
.menubox .dbox .pubtop .myclose{
	float: right;
    width: 30px;
    height: 55px;
    padding: 0 10px;
    background: url(http://www.cqaaa.com/template/default/wap/imgx/icon_06.png) no-repeat center;
    -moz-background-size: 20px auto;
    background-size: 20px auto;
}


.menubox .ulbox{ width: 100px; height: 100%; background: #0a84e5; margin:0; padding: 0; position: relative;}
.menubox .ulbox li{
    width:100%;
    overflow: hidden;
    padding: 0;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px dashed #0d6ebb;
    display: block;
    -webkit-transition: all .2s ease-in-out 0s;
    -moz-transition: all .2s ease-in-out 0s;
    -ms-transition: all .2s ease-in-out 0s;
    -o-transition: all .2s ease-in-out 0s;
    transition: all .2s ease-in-out 0s;
} 
.menubox .ulbox li h3{width:100%; height: 55px; line-height: 55px; color: #ebf1f9;font-size: 16px; font-weight: normal; overflow: hidden; margin: 0;}
.menubox .ulbox li h3:after{ content: "|"; color: #0a84e5; float: right;}
.menubox .ulbox li h3 a{ color: #ebf1f9; display: block; width: 100%; height: 100%;}
.menubox .ulbox li:last-child{ border: 0; }

.menubox .dbox{ position: relative;width:100%;height:100%; padding-top: 55px;}
.menubox .dbox .abox{ position: absolute; left: 110px; top: 10px; height: 100%; display: none; overflow: hidden;}
.menubox .dbox .abox a,.menubox .dbox .abox span{ 
    width: 42%; 
    height: 36px; 
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    color: #ebf1f9; 
    float: left;
    margin: 7px 4px;
    display: block; 
    border: 1px solid #4c4c4c; 
    border-radius: 5px;
    -webkit-transition: all .2s ease-in-out 0s;
    -moz-transition: all .2s ease-in-out 0s;
    -ms-transition: all .2s ease-in-out 0s;
    -o-transition: all .2s ease-in-out 0s;
    transition: all .2s ease-in-out 0s; 
}
.menubox .dbox .abox a:hover,.menubox .dbox .abox a:active,.menubox .dbox .abox span:hover{ background: #1b3347; border: 1px solid #1b3347;}

.menubox .dbox .abox .nav_imgbox{ width: 93%; position: relative; margin: 7px 0;}
.menubox .dbox .abox .nav_imgbox .img1{ width: 100%; }
.menubox .dbox .abox .nav_imgbox a{ 
    border: 0;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    text-indent: -999em;
}
.menubox .dbox .abox .nav_imgbox a:hover,.menubox .dbox .abox .nav_imgbox a:active{ background: none; border: none;}


.menubox .ulbox li.active{ background: #1f1f1f;}
.menubox .ulbox li.active .abox{ display: block;}


</style>
<div class="menubox">
  <div class="dbox">  
    <div class="pubtop">
      <span class="myclose"></span>
    </div>     
    <ul class="ulbox" id="ulbox">
        <li>
            <h3>标题一</h3>
            <div class="abox">
                <a href="" title="" rel="nofollow">链接一</a>
                <a href="" title="" rel="nofollow">链接二</a>
                <a href="" title="" rel="nofollow">链接三</a>
                <a href="" title="" rel="nofollow">链接四</a>
                <span>文字一</span>            
            </div>
        </li> 
        <li>
            <h3>标题二</h3>
            <div class="abox">
                <a href="" title="" rel="nofollow">链接一</a>
                <a href="" title="" rel="nofollow">链接二</a>
                <span>文字一</span> 
                <span>文字二</span>           
            </div>
        </li>                                   
    </ul>
  </div>
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

