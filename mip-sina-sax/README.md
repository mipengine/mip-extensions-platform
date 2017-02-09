# mip-sina-sax

mip-sina-sax 新浪广告组件

标题|内容
----|----
类型|定制
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-sina-sax/mip-sina-sax.js

## 示例

### 基本用法

```html
<div sax-type="banner" class="j_sax sina_tj_banner" data-id="PDPS000000057793"></div>

<mip-sina-sax>
<div class="j_module" sax-type="banner">
    <template__a class="sax_template_0_a" href="{{ content[0].link[0] }}" target="_blank">
        <template__mip-img src="{{ content[0].src[0] }}"  alt="{{ content[0].src[1] }}"></template__mip-img>
        <mark class="new_icon">
            广告
        </mark>
    </template__a>
</div>
</mip-sina-sax>

```

## 配置参数

