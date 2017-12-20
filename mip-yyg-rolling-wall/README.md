# mip-yyg-rolling-wall

简单的列表滚动功能

标题|内容
----|----
类型|通用
支持布局|responsive
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-yyg-rolling-wall/mip-yyg-rolling-wall.js

## 示例

### 基本用法
```html
<style mip-custom>
     
        .clearfix {
            *zoom: 1
        }

        .clearfix:before,.clearfix:after {
            display: table;
            line-height: 0;
            content: ""
        }

        .clearfix:after {
            clear: both
        }

    
        .showPhoto .child{display: block;position: relative;height: 100%;}
        .showPhoto .child span{margin: 0 2px;display: block;position: relative;height: 100%;}
        .showPhoto img{display: block;}

    </style>


<mip-yyg-rolling-wall ayout="responsive" width="375" height="100" class="showPhoto" showCount="2.5">
    <div class="child">
         <span>
             <mip-img src="http://image.jknjl.net/blc/photo/1.jpg?imageView2/1/w/140/h/85"  ></mip-img>
         </span>
    </div>
    <div class="child">
         <span>
             <mip-img src="http://image.jknjl.net/blc/photo/2.jpg?imageView2/1/w/140/h/85"  ></mip-img>
         </span>
    </div>
    <div class="child">
         <span>
             <mip-img src="http://image.jknjl.net/blc/photo/3.jpg?imageView2/1/w/140/h/85"  ></mip-img>
         </span>
    </div>
    <div class="child">
         <span>
             <mip-img src="http://image.jknjl.net/blc/photo/4.jpg?imageView2/1/w/140/h/85"  ></mip-img>
         </span>
    </div>
    <div class="child">
         <span>
             <mip-img src="http://image.jknjl.net/blc/photo/5.jpg?imageView2/1/w/140/h/85"  ></mip-img>
         </span>
    </div>
    <div class="child">
         <span>
             <mip-img src="http://image.jknjl.net/blc/photo/6.jpg?imageView2/1/w/140/h/85"  ></mip-img>
         </span>
    </div>
</mip-yyg-rolling-wall>
```

## 属性

### {showCount}

说明：{可见显示的列表个数}
必选项：{否}
类型：{int}
取值范围：{1~无穷}
单位：{float}
默认值：{3}

## 注意事项

