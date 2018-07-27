# mip-ilaw66-xzh-linking

mip-ilaw66-xzh-linking 组件说明
成功匹配律师，进行通话

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-sina-rem/mip-sina-rem.js
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-baidu/mip-stats-baidu.js
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-xzh-linking/mip-ilaw66-xzh-linking.js

## 示例

### 基本用法
```html
<mip-ilaw66-xzh-linking>
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
    <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
</mip-form>
    <div class="top_header">
        <span class="glyphicon glyphicon-menu-left pull-left"></span>
        <div class="div_header">精选成功</div>
    </div>
    <div class="link_middle linkingDom">
        <div>若通话总时长不足1分钟，则不计费</div>
        <i class="link_phone">请接听律师来电<span></span></i>
    </div>
    <div class="link_bottom linkingDom">
        <div class="linkingcontent_div" id="mip-template-content">
            <template type="mip-mustache">
            <div class="linkingconntent_lawyer">
                <div class="linkingconntent_lawyerimg">
                    <div><mip-img src="{{avatar}}"></mip-img><span>{{lawyerName}}</span></div>
                    <mip-img class="linkingconntent_iconphone" src="tempbaidu/images/icon/icon_phone.png"></mip-img>
                    <div><mip-img src="tempbaidu/images/icon/icon_user.png"></mip-img><span class="linkingconntent_user">您</span></div>
                </div>
                <table class="linkingconntentnotel">
                    <tr>
                        <td>擅长类型</td>
                        <td>服务次数</td>
                        <td>用户评价</td>
                    </tr>
                    <tr>
                        <td>{{lawyerField}}</td>
                        <td>{{serviceTimes}}次</td>
                        <td>
                            <span class="star_blockindex star_blockindex0" data-score="{{lightStar.length}}">
                                {{#lightStar}}
                                    <mip-img src="./images/icon_star_c_c.png"></mip-img>
                                {{/lightStar}}
                                {{#grayStar}}
                                    <mip-img src="./images/icon_star.png"></mip-img>
                                {{/grayStar}}
                                {{lightStar.length}}
                                <input type="hidden" class="common_arg" name="score" value="{{lightStar.length}}" readonly="readonly"/>
                            </span>
                        </td>
                    </tr>
                </table>
                <p class="linkingconntent_lawyerid linkingconntent_lawyeridnotel">律师执业证号：{{authorizedNo}}</p>
            </div>
            </template>
        </div>
        <img class="linkingcontent_stepimg" src="tempbaidu/images/icon/icon_step.png"/>
    </div>
    <div class="banner_top linkingDom">
        通话总时长不足60秒不收费
    </div>
    <div id="pop_consulationEnd">
        <div class="linkingcontent_div" id="mip-template-contentdone">
            <template type="mip-mustache">
            <b>服务完成</b>
            <div class="linkingconntent_lawyer linkingconntenttel">
                <mip-img class="linkingconntent_lawyericon" src="{{avatar}}"></mip-img>
                <p>{{lawyerName}}</p>
                <table class="linkingconntenttel">
                    <tr>
                        <td>擅长类型</td>
                        <td>服务次数</td>
                        <td>用户评价</td>
                    </tr>
                    <tr>
                        <td>{{lawyerField}}</td>
                        <td>{{serviceTimes}}次</td>
                        <td>
                            <span class="star_blockindex star_blockindex0" data-score="{{lightStar.length}}">
                                {{#lightStar}}
                                    <mip-img src="./images/icon_star_c_c.png"></mip-img>
                                {{/lightStar}}
                                {{#grayStar}}
                                    <mip-img src="./images/icon_star.png"></mip-img>
                                {{/grayStar}}
                                {{lightStar.length}}
                                <input type="hidden" class="common_arg" name="score" value="{{lightStar.length}}" readonly="readonly"/>
                            </span>
                        </td>
                    </tr>
                </table>
                <p class="linkingconntent_lawyerid linkingconntent_lawyeridtel">律师执业证号：{{authorizedNo}}</p>
            </div>
            </template>
        </div>
        <div class="outOfUnusual">
            <div id="js-gotoPay" class="gotoPay js-gotoPay">去付律师辛苦费</div>
            <div class="end_unusual">通话异常</div>
        </div>
        <div class="inOfUnusual">
            <div class="outGotoPay outGotoPay__recall">重新呼叫</div>
            <div class="outGotoPay unusual_type js-gotoPay">已得到解答，去付律师辛苦费</div>
        </div>
        <!-- 通话异常选项 B -->
        <div class="pop_unusual" id="pop_unusual">
            <div class="unusual_wrapper"></div>
            <div class="unusual_popLayer">
                <div class="unusual_type type_dropline">意外掉线</div>
                <div class="unusual_type type_nocall">没有电话打进来</div>
                <div class="unusual_type type_disconnect">对律师服务不满意</div>
                <div class="unusual_type type_cancell">取消</div>
            </div>
        </div>
    </div>
    <div class="pop_backcheck_bg">
        <div class="pop_backcheck_div">
            <div></div>
            <button>狠心放弃</button>
            <button>继续支付</button>
        </div>
    </div>
</mip-sina-rem>
</mip-ilaw66-xzh-linking>
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

