# mip-ilaw66-informLawyerFailed2

mip-ilaw66-informLawyerFailed2 组件说明
通知律师失败页

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sina-rem/mip-sina-rem.js
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-informLawyerFailed2/mip-ilaw66-informLawyerFailed2.js

## 示例

### 基本用法
```html
<mip-ilaw66-informLawyerFailed2>
    <mip-sina-rem class="rem">
        <mip-stats-baidu>
            <script type="application/json">
                {
                    "token": "d5a24ec2321d65ed4b781d2fce73c834"
                }
            </script>
        </mip-stats-baidu>

        <mip-data>
            <script type="application/json">
                {
                    "user": {}
                }
            </script>
        </mip-data>

        <mip-login-xzh
                id="user"
                data-endpoint="https://test.ilaw66.com/jasmine/baidusearch/authorize2"
                data-client-id="X6AyjqI3QaDevHbWrwEp2VZnyc91TTNm"
                on="login:comment.login logout:comment.exit logout:comment.error">

            <mip-form url='https://www.baidu.com'>
                <input type="hidden" id="popValue" th:name="popValue" th:value="${popValue}" />
                <input type="hidden" id="userId" name="userId" th:value="${session.userId}" />
                <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
                <input type="hidden" id="channel" name="channel" value="baidusearch" />
                <input type="hidden" id="price" name="price" th:value="${price}"/>
            </mip-form>
            <div class="header_block baidu">
                <mip-history history="go, -1">
                    <span class="glyphicon glyphicon-menu-left pull-left " ></span>
                </mip-history>
                通知律师
            </div>

            <div class="main">
                <div class="end_result"><span class="end_name"></span>未回应</div>
                <div class="l_photo">
                    <mip-img src="images/bg_touxaingnan.png" class="end_avatar"></mip-img>
                    <div class="end_name f_name">王律师</div>
                </div>
                <div class="inform_failed_middle">
                    <div class="inform_failed_tip"></div>
                    <div class="inform_failed_nonworking">
                        <div>当前是非工作时间</div>
                        <div>建议您在8:00-23:00之间咨询</div>
                    </div>
                </div>
            </div>
            <div class="inform_failed_bottom">
                <div class="askOthers" >立刻推荐其他律师</div>
                <div class="continueAsk reAsk">继续问</div>
            </div>
            <div class="popUp_uncheckErr">
                <div class="talking_result text-center">
                    <h4>温馨提示</h4>
                    <p id="tips"></p>
                    <div class="link_btn_uncheckErrConfirm">
                        <span class="link_confirm">确认</span>
                    </div>
                </div>
            </div>
            <div class="popUp_confirm" >
                <div class="talking_result text-center">
                    <h4>温馨提示</h4>
                    <p>您咨询的律师已下线或正在服务中</p>
                    <div class="link_btn">
                        <span data-type="02" id="knowBtn">我知道了</span>
                    </div>
                </div>
            </div>
            <div class="popUp_sysErr">
                <div class="talking_result text-center">
                    <h4>温馨提示</h4>
                    <p>系统异常，请返回重新咨询</p>
                    <div class="link_btn_sysErrConfirm">
                        <span class="link_confirm">确认</span>
                    </div>
                </div>
            </div>
            <div class="popUp_unFinishedBillErr">
                <div class="talking_result text-center">
                    <h4>温馨提示</h4>
                    <p>您有订单未结束，请等待1分钟后再试</p>
                    <div class="link_btn_unFinishedBillErrConfirm">
                        <span class="link_confirm">确认</span>
                    </div>
                </div>
            </div>
            <div class="popUp_unpaidErr">
                <div class="talking_result text-center">
                    <h4>温馨提示</h4>
                    <p>您有订单未支付，请支付后再咨询</p>
                    <div class="link_btn_unpaidErrConfirm">
                        <span class="link_confirm">确认</span>
                    </div>
                </div>
            </div>
            <div class="loadingArea">
                <div class="loadingText">
                    页面加载中...
                </div>
            </div>
        </mip-login-xzh>
    </mip-sina-rem>
</mip-ilaw66-informLawyerFailed2>
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

