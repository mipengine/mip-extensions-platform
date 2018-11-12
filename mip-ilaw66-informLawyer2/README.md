# mip-ilaw66-informLawyer2

mip-ilaw66-informLawyer2 组件说明
通知律师
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sina-rem/mip-sina-rem.js
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-informLawyer2/mip-ilaw66-informLawyer2.js

## 示例

### 基本用法
```html
<mip-ilaw66-informLawyer2>
    <mip-sina-rem>
        <mip-stats-baidu>
            <script type="application/json">
                {
                    "token": "d5a24ec2321d65ed4b781d2fce73c834"
                }
            </script>
        </mip-stats-baidu>
        <mip-form url='https://www.baidu.com'>
            <input type="hidden" id="lawyerId" name="lawyerId" />
            <input type="hidden" id="requestId" name="requestId" />
            <input type="hidden" id="questionType" name="questionType" />
            <input type="hidden" id="askingType" name="askingType" />
            <input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
            <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
        </mip-form>
        
        <div class="header_block">
            <span class="glyphicon glyphicon-menu-left pull-left" onclick="gobackHandle();"></span>通知律师
        </div>
        <div class="content_block" style="display:none;" id="content_block"></div>
        <div class="main">
            <img src="images/bg_touxaingnan.png" class="end_avatar inform_top_img" />
            <div class="end_name"></div>
            <table>
                <tr>
                    <td class="linking_lawyerFieldTxt">擅长类型</td>
                    <td class="linking_serviceTimesTxt">服务次数</td>
                    <td>用户评价</td>
                </tr>
                <tr>
                    <td class="linking_lawyerField"></td>
                    <td class="linking_serviceTimes"></td>
                    <td class="linking_star"></td>
                </tr>
            </table>
            <p class="linkingconntent_lawyerid"></p>
    
        </div>
        <div class="bottomtime">
            <i class="countdownTime"></i>
            <div class="countdownCircle">
                <div class="wrapper left">
                    <div class="circleProgress leftcircle"></div>
                </div>
                <div class="wrapper right">
                    <div class="circleProgress rightcircle"></div>
                </div>
            </div>
        </div>
        
    </mip-sina-rem>
</mip-ilaw66-informLawyer2>
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

