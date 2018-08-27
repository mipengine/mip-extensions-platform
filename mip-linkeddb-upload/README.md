# mip-linkeddb-upload

mip-linkeddb-upload 上传图片 点击查看图片可以预览上传的图片

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkeddb-upload/mip-linkeddb-upload.js

## 示例

### 基本用法
```html
<div calss="content">
    <mip-linkeddb-upload data-cp-id="c.id" sign-in="sign-in" sign-in-id="sign-in-id">
        <div class="photo-album__hd" data-src="data-src"><a herf="javascript:;" class="view-photo-album">查看图片</a></dvi>
        <div class="photo-album-wrap" upload="upload" upload-pic="upload-pic" film="film">
            <div class="img-modal"></div>
            <div class="hidden"><input type="file" id="imgInput0">上传拼图底片</div>
            <div><input type="file" id="imgInput0">上传拼图照片</div>
            <div class="upload-num">
                <span class="now-cnt">101</span> / <span class="file-limit">135</span>
            </div>
        </div>
    </mip-linkeddb-upload>
</div>
```

## 属性

### data-cp-id

说明：标注当前页面的唯一性
必须项：是
类型：字符串

### sign

说明：提示登录的请求路劲
必选项：是
类型：字符串

### sign-in-id

说明：get的请求路径
必须项：是
类型：字符串

### data-src

说明：get请求路径
必选项：是
类型：字符串

### upload

说明：上传图片地址
必须项：是
类型：字符串

### request

说明：post请求路径
必须项：是
类型：字符串

### film

说明：上传底片的地址
必须项：是
类型：字符串

## 注意事项
<div id="content">必须是<mip-linkeddb-upload>的父元素

