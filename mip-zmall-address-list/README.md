# mip-zmall-address-list

地址列表页，用来显示地址列表

标题|内容
----|----
类型|公司业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js<br>https://c.mipcdn.com/static/v1/mip-zmall-address-list/mip-zmall-address-list.js

## 示例

### 基本用法

```html
<mip-zmall-address-list template="tpl-address" url="<?=$confirmUrl?>">
    <script type="application/json">
        {
            "list": "地址列表接口",
            "default": "设为默认接口",
            "delete": "删除接口"
        }
    </script>
    <template type="mip-mustache" id="tpl-address">
        {{#list}}
        <section class="address-item">
            <div class="address-inner">
                <a href="{{addressListUrl}}">
                    <div class="name"><span>{{truename}}</span><span>{{mobile}}</span></div>
                    <div class="address">{{provinceName}}{{cityName}}{{address}}</div>
                </a>
            </div>
            <div class="operation-bar">
                {{#isDefault}}
                <label for="address_{{addressId}}" class="label-radio label-radio--checked">
                    <input id="address_{{addressId}}" type="radio" name="default" value="{{addressId}}" checked>
                    <i></i><span>默认地址</span>
                </label>
                {{/isDefault}}
                {{^isDefault}}
                <label for="address_{{addressId}}" class="label-radio">
                    <input id="address_{{addressId}}" type="radio" name="default" value="{{addressId}}">
                    <i></i><span>设为默认</span>
                </label>
                {{/isDefault}}
                <span data-id="{{addressId}}" class="js_address_del delete">删除</span>
                <a class="edit" href="<?=$MipUrlPrefix?>/address/edit.html?addressId={{addressId}}">编辑</a>
            </div>
        </section>
        {{/list}}
    </template>
</mip-zmall-address-list>
```


## 属性



## 注意事项


