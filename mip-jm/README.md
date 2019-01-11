# mip-jm

mip-jm 验证加密

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jm/mip-jm.js

## 示例


```html
<style mip-custom>
.btn-zx { font-size:.5rem; background:#f00; color:#fff; text-align:center; line-height:.8rem; width:3rem; margin-bottom:.5rem; position: relative;}
.target-id { position: absolute; top: 0; left: 0; opacity: 0;}
</style>
    <p class="btn-zx">点我资讯<span class="target-id">770</span></p>
    <p class="btn-zx">点我资讯<span class="target-id">6725696</span></p>
<mip-jm class="mip-project">
    <div class="zhez"></div>
        <div class="tc-bg">
            <p class="tc-close">X</p>
            <p class="zx-tit">立即咨询</p>
            <p class="zx-txt">验证手机号码，方便品牌方及时回复您</p>
            <div class="zx-xinx">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/useName_01.png" class="name-img fl"></mip-img>
                <input type="text" placeholder="请输入姓名" class="input-name fl" />
                <p class="sex fl">
                    <input type="radio" name="sex" id="male" value="0" checked="checked"><label class="gender-radio" for="male" value="0">男</label>
                    <input type="radio" name="sex" id="female" value="1">
                    <label class="gender-radio" for="female" value="1">女</label>
                </p>
            </div>
            <p class="err err-name">姓名为1-6位字符</p>
            <div class="zx-xinx">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/tell_03.png" class="name-img fl"></mip-img>
                <input type="text" placeholder="请输入手机号" class="input-tell" />
            </div>
            <p class="err err-tell">请输入正确格式的手机号</p>
            <div class="zx-xinx">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/dunpai_05.png" class="name-img fl"></mip-img>
                <input type="text" placeholder="请输入验证码" maxlength='4' class="input-yanzm fl" />
                <p class="yanzm fl">
                    <button class="getYzm">获取验证码</button>
                </p>
            </div>
            <p class="err err-yzm">请输入正确的验证码</p>
            <div class="zx-xinx zx-liuyan">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/liuyan_07.png" class="name-img fl"></mip-img>
                <textarea rows="3" cols="20" class="input-liuyan">【现金奖励活动】我有意向加盟小碗布丁项目，申请领取现金奖励！</textarea>
            </div>
            <input type="submit" class="tijao" value="提交" />
        </div>
        <div class="tishi"><p class="ts-txt">留言成功</p><span class="qued">确定</span></div>
</mip-jm>
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

