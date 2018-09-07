# mip-miaotu-register

mip-miaotu-register 注册

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-miaotu-register/mip-miaotu-register.js

## 示例

### 基本用法
```html
<mip-miaotu-register>
    <mip-form id="form-register" name="form-register" url="" method="">
        <div class="reg-first" id="reg_first">
            <div class="inp-user">
                <input type="text" name="registerName" id="registerName" placeholder="请输入手机号" maxlength="11">
                <span class="error"></span>
            </div>
            <div class="inp-val">
                <input type="text" name="registerValidate" id="registerValidate" placeholder="请输入验证码">
                <input type="button" class="get-val clickme-get-countdown" value="免费获取验证码" id="regGetVal">
                <span class="error"></span>
            </div>
            <div class="btn-login">
                <input type="button" id="btnNextStep" value="下一步">
            </div>
        </div>
        <div class="reg-second" id="reg_second">
            <div class="inp-pwd">
                <input type="password" name="registerPassword" id="registerPassword" placeholder="请输入密码">
                <span class="error"></span>
            </div>
            <div class="inp-repwd">
                <input type="password" name="registerRepassword" id="registerRepassword" placeholder="请再次确认">
                <span class="error"></span>
            </div>
            <div class="btn-login">
                <input type="submit" id="btnSubmit" value="确定">
            </div>
        </div>
    </mip-form>
</mip-miaotu-register>
```



