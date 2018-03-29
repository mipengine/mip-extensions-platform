# mip-fn-swiper
<p>蜂鸟网WAP站图片滚动加评论等内容</p>

 ## 示例 
<p>mip-fn-swiper html结构如下，其中加载上一组，下一组，会自动创建DOM结构 </p>

```html
<mip-fn-swiper
    layout="responsive"  
    width="300"     
    height="200"
    threshold = "0.1"
    indicator 
    commentLink = "http://m.fengniao.com/comment/5345039.html"
    currentAlbum = "http://m.fengniao.com/5345269.html"
    prevAlbum = "http://m.fengniao.com/document/pic_5345269.html"
    nextAlbum = "http://m.fengniao.com/document/pic_5345230.html"> 
    <mip-img 
        src="http://img2.fengniao.com/product/157/989/cefVrnG4h5zi2.jpg">
    </mip-img>
    <mip-img 
        src="http://img2.fengniao.com/product/157/990/cexaspav8Coao.jpg">
    </mip-img>
    <mip-img 
        src="http://img2.fengniao.com/product/157/994/cep7y7RAmleM.jpg">
    </mip-img> 
</mip-fn-swiper>  
```

标题|内容
----|----
类型|通用 
所需脚本|https://c.mipcdn.com/static/v1/mip-fn-swiper/mip-fn-swiper.js

## 属性   

### width
说明：宽度，不是实际宽度，与高度属性配合来设置图片比例，详见组件布局
必选项：是
类型：数字
单位：无
默认值：无

### height
说明：高度，不是实际高度，与宽度属性配合来设置图片比例，详见组件布局
必选项：是
类型：数字
单位：无
默认值：无

### threshold
说明：屏幕上划过距离占总宽度的比，确定是否翻页
必选项：是
类型：数字
单位：无
默认值：无

### indicatorId
说明：下方指示器功能字段，和指示器的父节点的 id 取值请保持一致,指示器的个数和轮播的 item 个数必须保持一致，指示器这块对 ID 是强依赖，样式可以自行修改，示例中是官方默认样式。指示器可点击定位。
必选项：否
类型：字符串
单位：无
默认值：无 

### commentLink
说明：评论页链接
必选项：是 
类型：字符串 
取值范围：URL 

### currentAlbum
说明：当前页链接
必选项：是 
类型：字符串 
取值范围：URL 

### prevAlbum
说明：上一组组图页链接
必选项：是 
类型：字符串 
取值范围：URL 

### nextAlbum
说明：上一组组图页链接
必选项：是 
类型：字符串 
取值范围：URL 
