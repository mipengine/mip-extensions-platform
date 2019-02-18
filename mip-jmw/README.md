# mip-jmw

mip-jmw 加密验证

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jmw/mip-jmw.js

## 示例


```html
<style mip-custom>
.btn-zx { font-size:.5rem; background:#f00; color:#fff; text-align:center; line-height:.8rem; width:3rem; margin-bottom:.5rem; position: relative;}
.target-id{ position: absolute; top: 0; left: 0; opacity: 0;}
.zx-gai .tc-bg{position: static; margin-top:4rem;}
</style>
    <div class="btn-zx">点我资讯<span class="target-id">770</span></div>
    <div class="btn-zx">点我资讯<span class="target-id">6725696</span></div>
    <div class="btn-zx">点我资讯<span class="target-id">67256</span></div>
    <div class="zx-gai">
    <mip-jmw class="mip-project d-show">
    <div class="zhez hidd"></div>
        <div class="tc-bg">
            <p class="tc-close">X</p>
            <span class="target-id">770</span>
            <p class="zx-tit">立即咨询</p>
            <p class="zx-txt">验证手机号码，方便品牌方及时回复您</p>
            <div class="zx-xinx">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/useName_01.png" class="name-img fl"></mip-img>
                <p contenteditable="true" name="Mcontact2" class="input-name fl" validatetarget="meContact" validatetype="must" placeholder="请输入姓名"></p>
                <p class="sex fl">
                    <span class="someP">
                        <u class="someU bgChange" value="1"></u> <u class="sex1">女</u>
                    </span>
                    <span class="someP">
                        <u class="someU bgChange1" value="0"></u> <u class="sex1">男</u>
                    </span>
                </p>
            </div>
            <p class="err err-name">姓名为1-6位字符</p>
            <div class="zx-xinx">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/tell_03.png" class="name-img fl"></mip-img>
                <p contenteditable="true" name="Mcontact2" class="input-tell fl" validatetarget="meContact" validatetype="must" placeholder="请输入手机号"></p>
            </div>
            <p class="err err-tell">请输入正确格式的手机号</p>
            <div class="zx-xinx">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/dunpai_05.png" class="name-img fl"></mip-img>
                <p contenteditable="true" name="Mcontact2" class="input-yanzm fl" validatetarget="meContact" validatetype="must" placeholder="请输入验证码"></p>
                <p class="yanzm fl">
                    <button class="getYzm">获取验证码</button>
                </p>
            </div>
            <p class="err err-yzm">请输入正确的验证码</p>
            <div class="zx-xinx zx-liuyan">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/liuyan_07.png" class="name-img fl"></mip-img>
                <p contenteditable="true" name="Mcontact2" class="input-liuyan" validatetarget="meContact" validatetype="must" placeholder="请输入手机号">【现金奖励活动】我有意向加盟小碗布丁项目，申请领取现金奖励！</p>
            </div>
            <p class="tijao">提交</p>
        </div>
        <div class="tishi"><p class="ts-txt">留言成功</p><span class="qued">确定</span></div>
</mip-jmw>
</div>
<mip-jmw class="mip-project">
    <div class="zhez"></div>
        <div class="tc-bg">
            <p class="tc-close">X</p>
            <p class="zx-tit">立即咨询</p>
            <p class="zx-txt">验证手机号码，方便品牌方及时回复您</p>
            <div class="zx-xinx">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/useName_01.png" class="name-img fl"></mip-img>
                <p contenteditable="true" name="Mcontact2" class="input-name fl" validatetarget="meContact" validatetype="must" placeholder="请输入姓名"></p>
                <p class="sex fl">
                    <span class="someP">
                        <u class="someU bgChange" value="1"></u> <u class="sex1">女</u>
                    </span>
                    <span class="someP">
                        <u class="someU bgChange1" value="0"></u> <u class="sex1">男</u>
                    </span>
                </p>
            </div>
            <p class="err err-name">姓名为1-6位字符</p>
            <div class="zx-xinx">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/tell_03.png" class="name-img fl"></mip-img>
                <p contenteditable="true" name="Mcontact2" class="input-tell fl" validatetarget="meContact" validatetype="must" placeholder="请输入手机号"></p>
            </div>
            <p class="err err-tell">请输入正确格式的手机号</p>
            <div class="zx-xinx">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/dunpai_05.png" class="name-img fl"></mip-img>
                <p contenteditable="true" name="Mcontact2" class="input-yanzm fl" validatetarget="meContact" validatetype="must" placeholder="请输入验证码"></p>
                <p class="yanzm fl">
                    <button class="getYzm">获取验证码</button>
                </p>
            </div>
            <p class="err err-yzm">请输入正确的验证码</p>
            <div class="zx-xinx zx-liuyan">
                <mip-img src="http://image1.jmw.com.cn/public/images/message_m/liuyan_07.png" class="name-img fl"></mip-img>
                <p contenteditable="true" name="Mcontact2" class="input-liuyan" validatetarget="meContact" validatetype="must" placeholder="请输入手机号">【现金奖励活动】我有意向加盟小碗布丁项目，申请领取现金奖励！</p>
            </div>
            <p class="tijao">提交</p>
        </div>
        <div class="tishi"><p class="ts-txt">留言成功</p><span class="qued">确定</span></div>
</mip-jmw>

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

