# mip-ilaw66xzh-informLawyerFailed2

mip-ilaw66xzh-informLawyerFailed2 组件说明
通知律师失败

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sina-rem/mip-sina-rem.js
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66xzh-informLawyerFailed2/mip-ilaw66xzh-informLawyerFailed2.js

## 示例

### 基本用法
```html
<mip-ilaw66xzh-informLawyerFailed2>
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
    
            <mip-form url='https://www.baidu.com'>
                <input type="hidden" id="popValue" th:name="popValue" th:value="${popValue}" />
                <input type="hidden" id="userId" name="userId" th:value="${session.userId}" />
                <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
                <input type="hidden" id="channel" name="channel" value="baidusearch" />
                <input type="hidden" id="price" name="price" th:value="${price}"/>
            </mip-form>
            <!--<div class="header_block baidu">
                <mip-history history="go, -1">
                    <span class="glyphicon glyphicon-menu-left pull-left " ></span>
                </mip-history>
                通知律师
            </div>-->
    
            <div class="main">
                <div class="end_result"><span class="end_name"></span>未回应</div>
                <div class="l_photo">
                    <mip-img src="images/bg_touxaingnan.png" class="end_avatar"></mip-img>
                    <div class="end_name f_name"></div>
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
    
            <div class="popUp_sysErr backOr_div">
                <div class="backOr_txt back__popLayer">
                    <span>温馨提示</span>
                    <span id="err_msg"></span>
                    <div class="back-leave" id="err_confirm">我知道了</div>
                </div>
            </div>
    
            <div class="loadingArea">
                <div class="loadingText">
                    页面加载中...
                </div>
        </div>
        </mip-sina-rem>
</mip-ilaw66xzh-informLawyerFailed2>
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

