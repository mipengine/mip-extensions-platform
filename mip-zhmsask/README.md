# mip-zhmsask

mip-zhmsask 实现中华美食网mip咨询数据提交

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zhmsask/mip-zhmsask.js

## 示例

### 基本用法
```html
<mip-zhmsask pid="510000" cid="510100" brandid="454" merchantid="456" cateid="1" source="速度发送sd">
        <div class="mip-zhmsask-fz mip-zhmsask-bg-fff mip-zhmsask-ptb25 mip-zhmsask-plr15">
            <h2 class="mip-zhmsask-f16 mip-zhmsask-fw6">加盟咨询</h2>
            <p class="mip-zhmsask-s-c8c8 mip-zhmsask-mt10 mip-zhmsask-f12"><b class="mip-zhmsask-s-c595">温馨提示：</b>如果你对本品牌感兴趣，并希望了解更多加盟信息，请填写下方表格，方便本品牌企业与你联系。</p>
            <mip-form method="post" url="http://mip.zhms.cn/brand/addconsultation/">
                <ul class="mip-zhmsask-from-list mip-zhmsask-mt15">
                    <li class="mip-zhmsask-bor1">
                        <input type="text" name="nickname" placeholder="您的称谓" class="mip-zhmsask-text">
                    </li>
                    <li>
                        <p class="mip-zhmsask-radio-box" name="sex">
                            <span class="mip-zhmsask-cur" data-value="2"><i></i>女士</span>
                            <span data-value="1"><i></i>先生</span>
                        </p>
                    </li>
                    <li class="mip-zhmsask-bor1">
                        <input type="text" name="tel" class="mip-zhmsask-text" placeholder="请输入手机号">
                    </li>
                    <li class="mip-zhmsask-bor1">
                        <input type="text" name="weixin" class="mip-zhmsask-text" placeholder="微信（选填）">
                    </li>
                    <li class="mip-zhmsask-bor1">
                        <input type="text" name="qq" class="mip-zhmsask-text" placeholder="QQ（选填）">
                    </li>
                    <li class="mip-zhmsask-bor1">
                        <textarea class="mip-zhmsask-area" name="question" placeholder="您想了解的问题"></textarea>
                    </li>
                    <li><button class="mip-zhmsask-submit-btn">提交</button></li>
                </ul>
            </mip-form>
        </div>
</mip-zhmsask>
```

## 属性

### merchantid

说明：商家编号
必选项：否
类型：数字

### brandid

说明：品牌编号
必选项：否
类型：数字

### cateid

说明：通用分类编号
必选项：否
类型：数字

### pid

说明：省份编号
必选项：否
类型：数字

### cid

说明：城市编号
必选项：否
类型：数字

### source

说明：来源
必选项：否
类型：字符串

### nickname

说明：称谓
必选项：否
类型：字符串

### sex

说明：性别
必选项：是
类型：数字

### tel

说明：手机号
必选项：是
类型：字符串


### weixin

说明：微信
必选项：否
类型：字符串

### qq

说明：QQ
必选项：否
类型：字符串

### question

说明：问题
必选项：是
类型：字符串


## 注意事项
1.仅限mip.zhms.cn 加盟咨询提交业务使用
