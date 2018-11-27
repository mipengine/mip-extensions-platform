# mip-free-trial

mip-free-trial 提交申请免费体验

标题|内容
----|----
类型|私用
支持布局|container
所需脚本|https://c.mipcdn.com/static/v1/mip-free-trial/mip-free-trial.js

## 示例

### 基本用法
```html
<mip-free-trial>
    <div class="fm-box">
        <div class="fm-c">
            <dl class="clearfix">
                <div class="t1">姓名：</div>
                <input type="text" class="ipt-txt" name="name" placeholder="请输入姓名" value="" />
            </dl>
            <dl>
                <div class="t1">手机：</div>
                <input type="text" class="ipt-txt" name="tel" placeholder="请输入手机" value="" />
            </dl>
            <dl>
                <div class="t1">企业名称：</div>
                <input type="text" class="ipt-txt" name="company" placeholder="请输入企业名称" value="" />
            </dl>
            <input on="tap:my-free-trial.checkFrom" type="submit" class="ipt-submit" value="提交申请免费体验">
        </div>
    </div>
    <div class="reveal-modal-bg" on="tap:my-free-trial.modalClose"></div>
    <div class="reveal-modal">
        <div class="reveal-msgbox">
            <div class="msgbox-b">
                <div class="t1">
                    <a href="#" class="close-reveal-modal"></a>
                    <span>验证手机</span>
                </div>
                <div class="des tx-des">验证码已发送到
                    <span class="send-phone"></span>
                    <br>30分钟内输入有效，请勿泄漏</div>
                <div class="ipt-b">
                    <input type="text" class="ipt-txt" placeholder="短信验证码" name="code" />
                    <div class="ipt-code">
                        <a href="javascript:void(0);" class="reg-verify-btn" on="tap:my-free-trial.getVerify">获取验证码</a>
                    </div>
                </div>
                <div class="ipt-btn">
                    <input type="submit" class="ipt-submit" value="提交" on="tap:my-free-trial.submitFrom" />
                </div>
            </div>
        </div>
    </div>
</mip-free-trial>
```

## 属性

### {属性名}

## 注意事项
