# mip-cd-news

mip-cd-news 两性底部广告有数据时隐藏

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cd-news/mip-cd-news.js

## 示例

### 有来统计代码
```html
<mip-cd-news>
    <mip-fixed type="bottom" class='fuceng' >
        <mip-ad
               type="baidu-wm-ext"
               domain="a.iy.com.cn"
               token="xn3a1ecf91f3c3f63bdb1c3e82b8b034e058acde0a">
               <div id="xn3a1ecf91f3c3f63bdb1c3e82b8b034e058acde0a"></div>
            </mip-ad> 
    </mip-fixed>
</mip-cd-news>
```  
```style
<style mip-custom>
     .fuceng{overflow:inherit !important;}
     .hide{ display:none; }
     .Definition{ padding-bottom:55px;}
</style>
``` 
