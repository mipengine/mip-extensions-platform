# mip-zmall-sku

商城SKU选择

标题|内容
----|----
类型|业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-sku/mip-zmall-sku.js

## 示例

### 基本用法
```html
<mip-zmall-sku type="bottom" id="skuWindow" template="tpl-sku">
    <script type="application/json">
        {
            "skuApi": "path/to/getsku",
            "emptyApi": "path/to/getEmptySku"
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
</mip-zmall-sku>
```

## 属性


## 注意事项


