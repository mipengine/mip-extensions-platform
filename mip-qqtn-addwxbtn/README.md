# mip-qqtn-addwxbtn

mip-qqtn-addwxbtn 根据配置文件添加指定内容，弹窗、关闭效果

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-qqtn-addwxbtn/mip-qqtn-addwxbtn.js

## 示例

### 基本用法
```html
<style mip-custom="">

.g-cms-content h1 {width: 100%;height: auto;line-height: 34px;font-size: 22px;font-weight: bold;color: #000;text-align: center;display: block;overflow: hidden;padding: 10px 10px 5px 10px;}
.f-hide { display: none }

</style>



<mip-qqtn-addwxbtn data-shield="qqtn">

    <article class="g-cms-content">
        <h1>王者荣耀2.0更新后闪退进不去 王者荣耀闪退后特效消失怎么办</h1>
        <mip-fy-hits data-hitsurl="https://m.qqtn.com/ajax.asp?Action=4&amp;id=" data-hitsid="275404" class="mip-element mip-layout-container">
        <em><time pubdate="pubdate">时间:2019/1/17 16:48:00</time>  作者:网友整理  人气:<span id="hits">1719</span></em>
        </mip-fy-hits>
    </article>

<div class="f-infopzwj f-hide" data-star="2"></div>
</mip-qqtn-addwxbtn>







</body></html>
