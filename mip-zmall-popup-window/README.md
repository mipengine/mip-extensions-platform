# mip-zmall-popup-window

底部弹出的弹层，可以关闭，动态获取数据。

标题|内容
----|----
类型|公司业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js<br>https://c.mipcdn.com/static/v1/mip-zmall-popup-window/mip-zmall-popup-window.js

## 示例

### 基本用法

```html
<mip-zmall-popup-window type="bottom" id="giftPopupWindow" template="tpl-gift">
    <script type="application/json">
        {
            "title": "免费赠品",
            "type": "",
            "url": ""
        }
    </script>
    <template type="mip-mustache" id="tpl-gift">
        <div class="gifts">
            {{#info.gifts}}
            <div class="option-item fix-flex">
                <div class="caption">
                    <figure><mip-img src="{{pic}}"></mip-img></figure>
                </div>
                <div class="radio-select flex-item">
                    <div class="title">{{name}}</div>
                    <div class="number">x1</div>
                </div>
            </div>
            {{/info.gifts}}
        </div>
    </template>
</mip-zmall-popup-window>
```

可以再页面中DOM用 on 来绑定

```html
<div on="tap:giftPopupWindow.open"></div>
```



## 属性

```javascript
    {
        "title": "免费赠品", // 标题
        "type": "", // 类型，用来区分
        "url": "" // 数据接口地址
    }
```

## 注意事项


