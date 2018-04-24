# mip-zmall-mobile-bind

商城手机绑定功能

标题|内容
----|----
类型|业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-mobile-bind/mip-zmall-mobile-bind.js

## 示例

### 基本用法
```html
<mip-zmall-mobile-bind id="mobilePhone" template="tpl-mobile-bind">
        <script type="application/json">
        {
            "check": "path/to/check",
            "code": "path/to/SendCode",
            "bind": "path/to/BindPhone",
            "input": {
                "number":"<input name=\"number\" type=\"number\" placeholder=\"请输入您的手机号\" class=\"mobile-bind-input-number\">",
                "code":"<input name=\"code\" type=\"text\" placeholder=\"请输入验证码\" class=\"mobile-bind-input-code\">"
            }
        }
        </script>
        <template type="mip-mustache" id="tpl-mobile-bind">
            <div id="js_bind_layer" class="mobile-bind-layer">
                <h5 class="mobile-bind-head">绑定手机号</h5>
                <div id="js_bind_close" class="mobile-bind-close"></div>
                <div class="mobile-bind-input">
                    {{{input.number}}}
                </div>
                <div class="mobile-bind-input fix-flex">
                    {{{input.code}}}
                    <div class="mobile-bind-code flex-item">
                        <span id="js_get_code" data-timer="60" class="mobile-bind-code-get">获取验证码</span>
                    </div>
                </div>
                <button id="js_bind_button" class="mobile-bind-button" disabled>绑定</button>
            </div>
            <div id="js_bind_mask" class="mobile-bind-mask"></div>
        </template>
    </mip-zmall-mobile-bind>
```

## 属性


## 注意事项

配置里边的`input`字段不能少。必须存在

