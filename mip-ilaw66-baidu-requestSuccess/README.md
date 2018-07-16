# mip-ilaw66-baidu-requestSuccess

mip-ilaw66-baidu-requestSuccess 组件说明
匹配律师成功页面

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js
所需脚本|https://c.mipcdn.com/static/v1/mip-cdel-swiper/mip-cdel-swiper.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidu-popup/mip-ilaw66-baidu-popup.js
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-baidu-requestSuccess/mip-ilaw66-baidu-requestSuccess.js

## 示例

### 基本用法
```html
<mip-ilaw66-baidu-requestSuccess>
    <!--<input type="hidden" id="lawyerId" name="lawyerId" />
        <input type="hidden" id="requestId" name="requestId" />
        <input type="hidden" id="questionType" name="questionType" />
        <input type="hidden" id="askingType" name="askingType" />-->
        <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
        <div class="top_header">
            <span class="glyphicon glyphicon-menu-left pull-left"></span>
            <div class="div_header">问律师</div>
        </div>
    
        <div class="requestcontent_div">
            <b>匹配成功，律师正在联系您</b>
            <div class="requestconntent_lawyer" id="mip-template-lawyerMsg">
                <template type="mip-mustache">
                    <mip-img class="requestconntent_lawyerimg" src="{{imgUrl}}"></mip-img>
                    <p>{{lawyerName}}</p>
                    <table>
                        <tr>
                            <td>擅长类型</td>
                            <td>服务次数</td>
                            <td>用户评价</td>
                        </tr>
                        <tr>
                            <td>{{questionType}}</td>
                            <td>{{count}}次</td>
                            <td>
                                <span class="star_blockindex star_blockindex0" data-score="{{score.length}}" title="优">
                                    {{#score}}
                                        <mip-img src="./images/icon_star_c_c.png" alt="1" title="优"></mip-img>
                                    {{/score}}
                                    <!--<mip-img src="./images/icon_star.png" alt="5" title="优"></mip-img>-->
                                    {{score.length}}.0
                                    <input type="hidden" class="common_arg" name="score" value="{{score.length}}" readonly="readonly"/>
                                </span>
                            </td>
                        </tr>
                    </table>
                    <p>律师执业证号：{{cardId}}</p>
                </template>
            </div>
        </div>
</mip-ilaw66-baidu-requestSuccess>
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

