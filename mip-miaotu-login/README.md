# mip-miaotu-login

mip-miaotu-login 登录组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-miaotu-login/mip-miaotu-login.js

## 示例

### 基本用法
```html
<mip-miaotu-login>
    <mip-form id="form-login" name="form-login" url="" method="">
        <div class="log-val" id="log_val">
            <div class="inp-user">
                <input type="text" name="loginUserName" id="logValUserName" placeholder="请输入手机号" maxlength="11">
                <span class="error"></span>
            </div>
            <div class="inp-val">
                <input type="text" name="loginValidate" id="loginValidate" class="validate" placeholder="请输入验证码">
                <input type="button" class="get-val clickme-get-countdown" value="免费获取验证码" id="logGetVal">
                <span class="error"></span>
            </div>
        </div>
        <div class="log-pwd" id="log_pwd">
            <div class="inp-user">
                <input type="text" name="loginUserName" id="logPwdUserName" placeholder="请输入用户名">
                <span class="error"></span>
            </div>
            <div class="inp-pwd">
                <input type="password" name="loginPassword" id="loginPassword" placeholder="请输入密码">
                <span class="error"></span>
            </div>
        </div>
        <div class="btn-login">
            <input type="submit" id="btnLogPwd" value="登录">
        </div>
    </mip-form>
    <div class="login-bypwd">
        <span id="loginByPwd">使用密码登录</span>
        <span id="loginByVal">使用短信验证码登录</span>
    </div>
</mip-miaotu-login>
```



