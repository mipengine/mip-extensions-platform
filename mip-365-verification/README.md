# mip-365-verification 

mip-365-verification 获取手机验证码的组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-365-verification/mip-365-verification.js

## 示例

### 基本用法
```html
<mip-365-verification loginuser="2052181">
    自定义内容，可以嵌套其他组件
	<div>
        <ul class="ask-list find-tab-con">
			<li>
                <label class="ask-label">联系电话：</label>
                <input type="text" name="form_mobile" validatetarget="form_mobile" validatetype="custom" validatereg="^([0\+]\d{2,3}-)?(1[3|4|5|8|7]\d{9})$" class="input_mobile" />
                <button class="yzm-btn btn_mobile">获取验证码</button>
                <div class="mip-form-target" target="form_mobile">请输入正确的电话号码</div>
            </li>
            <li>
                <label class="ask-label">验证码：</label>
                <input type="text" name="" placeholder="请输入短信验证码" id="verificationCode">
            </li>
        </ul>
    </div>
</mip-365-verification>
```

## 属性

### loginuser
说明：登录用户ID
必填：是
格式：数字

## 注意事项
