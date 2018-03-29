# mip-yyg-photo-wall

获取子元素中的所有图片并以大图展现

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-yyg-photo-wall/mip-yyg-photo-wall.js

## 示例

### 基本用法
```html
<mip-yyg-photo-wall bigSuffix="imageView2/1/w/600/h/300">
    <mip-img src="http://image.jknjl.net/blc/photo/1.jpg?imageView2/1/w/140/h/85" ></mip-img>
    <mip-img src="http://image.jknjl.net/blc/photo/2.jpg?imageView2/1/w/140/h/85"  ></mip-img>
    <mip-img src="http://image.jknjl.net/blc/photo/3.jpg?imageView2/1/w/140/h/85"  ></mip-img>
    
    <div>
        <mip-img src="http://image.jknjl.net/blc/photo/3.jpg?imageView2/1/w/140/h/85" ></mip-img>
    
    </div>
    <span>
        <mip-img src="http://image.jknjl.net/blc/photo/3.jpg?imageView2/1/w/140/h/85" ></mip-img>
    </span>
</mip-yyg-photo-wall>
```


## 属性

### {bigSuffix}

说明：{大图片的后缀值}
必选项：{是}
类型：{String}
默认值：{""}



