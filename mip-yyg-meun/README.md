# mip-yyg-meun

处理菜单选中的hover效果

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-yyg-meun/mip-yyg-meun.js

## 示例

### 基本用法
```html

 <style mip-custom>
      


        html,body{max-width: 640px;margin: 0 auto;background: #f2f2f2;}

        .meun ul{width: 100%;height: 60px;border-top: 2px solid #d3d3d3;background: #e7e7e7;z-index: 2;position: relative;}
        .meun>span{position: absolute;top: -20px;left: 50%;margin-left: -30px;width: 60px;height: 60px;border-radius: 100%;border: 2px solid #d3d3d3;background: #e7e7e7; }
        .meun li.home{position: absolute;top: -2px;left: 50%;margin-left: -26px;width: 56px!important;height: 60px;background: #e7e7e7;}
        .meun li.home a{background: url("http://www.yygblc.com/mDist/img/base/logo_bt.png") #fff no-repeat;width: 38px;height: 38px;background-size: contain;display: block;margin: 0 auto;border: 5px solid #fff;border-radius: 100%;position: relative;top: -10px;z-index: 3;}
        .meun li.home:before{content: "";background: #464646;width: 52px;height: 52px;position: absolute;left: 2px;top: -12px;border-radius: 100%;z-index: 1;}

        .meun li:not(.home){display: block;width: 20%;font-size: 12px;text-align: center;}
        .meun li:nth-child(-n+2){float: left;}
        .meun li:nth-child(n+4){float: right;}
        .meun li:not(.home) a{color: #464646;display: block;}
        .meun li:not(.home) span{display: block;background: url("http://www.yygblc.com/mDist/img/base/meun_bt_01.png") no-repeat;background-size: 60%!important;width: 50px;height: 40px;margin: 0 auto;}
        .meun li:nth-child(1) span{background-position: center 6px!important;;}
        .meun li:nth-child(2) span{background-position: center -42px!important;}
        .meun li:nth-child(4) span{background-position: center -145px!important;}
        .meun li:nth-child(5) span{background-position: center -97px!important;}

        .meun li.active span,.meun li:hover span{background: url("http://www.yygblc.com/mDist/img/base/meun_bt_02.png") no-repeat;}
        .meun li.active:not(.home) a,.meun li:hover:not(.home) a{color: #63902e;display: block;}
        .meun li.active:before{background: #63902e!important;}

    </style>


<mip-yyg-meun class="meun"  childClass="child">

        <span></span>
        <ul>
            <li class="child" regStr="mip/aboutus.htm">
                <a data-type="mip" href="http://www.yygblc.com/mip/aboutus.htm" >
                    <span></span>
                    <p>品牌故事</p>
                </a>
            </li>
            <li class="child" regStr="culture/mip/">
                <a data-type="mip" href="http://www.yygblc.com/culture/mip/1.htm" >
                    <span></span>
                    <p>茶香文化</p>
                </a>
            </li>

            <!-- 首页 -->
            <li class="home child" regStr="mip.htm">
                <a data-type="mip" href="http://www.yygblc.com/mip.htm" >

                </a>
            </li>
            <li class="child" regStr="/advisory/mip/">
                <a data-type="mip" href="http://www.yygblc.com/advisory/mip/1.htm" >
                    <span></span>
                    <p>咨询问答</p>
                </a>
            </li>
            <li class="child" regStr="/news/mip/">
                <a data-type="mip" href="http://www.yygblc.com/news/mip/1.htm" >
                    <span></span>
                    <p>行业资讯</p>
                </a>
            </li>
        </ul>

</mip-yyg-meun>


```

## 属性

### {active}

说明：{hover效果的class名称}
必选项：{否}
类型：{String}
默认值：{"active"}


### {childClass}

说明：{可选择的子菜单class名称}
必选项：{否}
类型：{String}
默认值：{element下的子元素}

## 注意事项

