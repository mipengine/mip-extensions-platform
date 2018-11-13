# mip-gzpd-infinite

提示组件

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-gzpd-infinite/mip-gzpd-infinite.js

## 示例

### 基本使用

```html
<meta charset="utf-8"> 
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<div class="content">
    <h1>文章标题</h1>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
    <p>bala bala bala... bala bala bala...</p>
</div>
<div class="relate_art">
    <ul>
        <mip-gzpd-infinite keyword="黑板报">
            <template>
            <li class="pic" id="lipic-{{page}}-{{index}}">
                <a target="_blank" href="{{url}}">
                    <div class="pic_img_1"><mip-img src="{{img_0}}"></mip-img></div>
                    <div class="pic_art"><h2>{{title}}</h2>
                        <p>{{description}}</p><div class="time">{{pubdate}}</div>
                    </div>
                </a>
            </li>
            </template>
            <template>
            <li class="pic" id="lipic-{{page}}-{{index}}">
                <div class="pic_img_3">
                    <a target="_blank" href="{{url}}">
                        <div class="pic_inner_img_3"><mip-img src="{{img_0}}"></mip-img></div>
                        <div class="pic_inner_img_3"><mip-img src="{{img_1}}"></mip-img></div>
                        <div class="pic_inner_img_3"><mip-img src="{{img_2}}"></mip-img></div>
                    </a>
                </div>
                <div class="pic_art pic_art_3">
                    <a target="_blank" href="{{url}}"><h2>{{title}}</h2></a>
                </div>
            </li>
            </template>
        </mip-gzpd-infinite>
    </ul>
</div>
```
