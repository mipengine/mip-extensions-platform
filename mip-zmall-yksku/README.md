# mip-zmall-yksku

友客MIP sku 选择组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-yksku/mip-zmall-yksku.js

## 示例

### 基本用法
```html
<mip-zmall-yksku type="bottom" id="skuWindow" template="tpl-sku">
    <script type="application/json">
        {
            "skuApi": "path/to/getsku",
            "url": "确认订单页地址",
            "isDisabledSkuCanClick": 1
        }
    </script>
    <template type="mip-mustache" id="tpl-sku">
        <figure class="sku-pic">
            <mip-img src="{{picUrl}}"></mip-img>
        </figure>
        ......
        <div class="sku-tips">订单实付金额满<span>399</span>元包邮，提醒您注意检验包装完整。</div>
        <div id="js_sku_button" class="sku-button">
            <button>确定</button>
            <a id="js_sku_link" data-type="mip" data-href="" class="sku-confirm-link"></a>
        </div>
    </template>
</mip-zmall-yksku>
```

## 属性


## 注意事项

