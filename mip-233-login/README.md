
# mip-233-login 

登录插件

标题|内容
----|----
类型|业务,广告
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-233-login/mip-233-login.js

## 示例

``` html
    <mip-233-login>
        <header class="indexheader clearfix">
            <div class="u_llogo">
                <a class="logo" href="#">233网校</a>
                <a class="sub-station" href="#"><i>资讯中心</i></a>
            </div>
            <div class="u_user">
                <div class="u_app"><a href="#" class="link-app">下载APP</a></div>
                <div class="u_login">
                    <span href="#" class="link-login">登录</span>
                    <a href="#" class="link-userIcon hide">
                        <mip-img src="http://wximg.233.com/student/img/headpic/2015/7/635719630976661898.jpg"></mip-img>
                    </a>
                </div>
            </div>
            <div class="body_mask hide"></div>
            <div class="login_panel hide">
                <div class="login_list">
                    <div class="m-container">
                        <div class="inputbox">
                            <span class="icon-username"></span>
                            <mip-form method="get" url="https://www.233.com">
                                <input placeholder="用户名/邮箱/手机号" name="" id="userId" class="j-inputtext" type="text">
                            </mip-form>
                            <span class="clear-btn show">清除</span>
                        </div>
                        <div class="inputbox">
                            <span class="icon-password"></span>
                            <mip-form method="get" url="https://www.233.com">
                                <input placeholder="密码" name="" class="j-inputtext" id="userPassword" type="password">
                            </mip-form>
                            <span class="clear-btn show">清除</span>
                        </div>
                        <div class="m-nerror cRed"></div>
                        <div class="login-btn"><span id="loginSubmit" class="orange-btn">登&nbsp;&nbsp;录</span></div>
                        <div class="m-unlogin clearfix"><a class="f-fl" href="#">立即注册</a><a class="f-fr cRed" href="#">忘记密码？</a></div>
                    </div>
                    <div class="third_login">
                        <div class="title"><span>社交账号登录</span></div>
                        <div class="select_section">
                            <div class="section_wrap"><a href="#"><i class="icon-qq"></i>QQ</a></div>
                            <div class="section_wrap"><a href="#"><i class="icon-sina"></i>新浪微博</a></div>
                            <div class="section_wrap"><a href="#"><i class="icon-weixin"></i>微信</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </mip-233-login>
```
