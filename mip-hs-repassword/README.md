# mip-hs-repassword

mip-hs-repassword 组件说明
用于网站修改密码功能实现
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-repassword/mip-hs-repassword.js

## 示例

### 基本用法
```html
<mip-hs-repassword>
    <div class="form_action">
                <mip-form url="http://">
                    <input type="password" class="input borderRadius telphone" name='old_pwd' placeholder="请输入原始密码"/>
                    <input type="password" class="input borderRadius passText" name='new_pwd' placeholder="请输入新密码" />
                    <input type="password" class="input borderRadius passText" name='confirm_pwd' placeholder="请确认新密码" />
                    <p class="error"></p>
                    <span class="input btn borderRadius login" id="pwd">确认修改</span>
                </mip-form>
        </div>
        </div>
        <p class="link_login">
			<a data-type="mip" class="link_go" data-type="mip" href="/">返回首页</a>
		</p>
		</div>
</mip-hs-repassword>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

