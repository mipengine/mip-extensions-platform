# mip-tiebaobei-baike

展示百科内容，支持tab切换

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-tiebaobei-baike/mip-tiebaobei-baike.js

## 示例

### 基本用法
```html
<mip-tiebaobei-baike>
    <article class="baike-wrap">
        <div class="m-header">
            <div>铁甲百科</div><a href="http://m.test.tiebaobei.com/html/baike.html">更多<i class="icon-uniE609"></i></a>
        </div>
        <div class="tab-con">
            <ul class="tab-head" id="typeList">
                
            </ul>
            <div class="tab-items" id="subTypeList">
                
            </div>
        </div>
    </article>
</mip-tiebaobei-baike>
```