# mip-ys137-ad

mip-ys137-ad 管理页面上的所有广告位

标题|内容
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://c.mipcdn.com/extensions/platform/v1/mip-ys137-ad/mip-ys137-ad.js

## 示例

### 普通广告
```html
<mip-ys137-ad id="1">
</mip-ys137-ad>
```

### lazy广告
```html
<div style="height:1000px;">
</div>
<mip-ys137-ad id="2" lazy="true">
</mip-ys137-ad>
```

### 直接投放百度广告
```html
<mip-ys137-ad tu="tfgERfhhh">
</mip-ys137-ad>
```

### 投放图加广告 因为MIP里的图片都是lazyload，所以要把图加广告投放广告放在最前面以便能够在图片加载前准备好
```html

<br><br><br>
<br><br><br>
<div class="pic">
<mip-img src="http://ztd00.photos.bdimg.com/ztd/w%3D350%3Bq%3D70/sign=e3bb1c4b97ef76c6d0d2fd2ead2d8cc7/f703738da9773912b57d4b0bff198618367ae205.jpg"></mip-img><br><br><br>
<mip-img src="http://pic23.photophoto.cn/20120624/0035035911522673_b.jpg"></mip-img>
</div>
<mip-ys137-ad id="99999" for-class="pic" lazy="false">
</mip-ys137-ad>
```

## 属性

### id

说明：广告ID
必选项：是
类型：数字
取值范围：>0
默认值：0

### lazy

说明：默认不加载代码，当用户滚动到代码位时才加载
必选项：否
类型：布尔
取值范围：true,false
默认值：false

### tu

说明：百度代码位反屏蔽代码
必选项：否
类型：字符串
取值范围：无
默认值：''