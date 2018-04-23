# mip-linktion-select-consulter

mip-linktion-select-consulter 传参数拉去筛选数据

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linktion-select-consulter/mip-linktion-select-consulter.js<br>https://c.mipcdn.com/static/v1/mip-linktion-fortune-consults/mip-linktion-fortune-consults.js<br>https://c.mipcdn.com/static/v1/mip-lightbox/mip-lightbox.js<br>https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js<br>https://c.mipcdn.com/static/v1/mip-bind/mip-bind.js


## 示例

```html
<mip-linktion-select-consulter>
    <div class="person-head">
    <h3>更多推荐</h3>
    <a href="javascrpt:;" id="change">换一批</a>
  </div>
    <div class="modal-dialog planner-more" role="document" id="planner_more" data-src="https://www.caifu.org/user/planner">
        <div class="modal-content">
            <div class="modal-header">
                <mip-form>
                    <a href="javascrpt::" class="more-all" >综合</a>
                    <div class="more-grade">
                        <select class="planner-grade">
                            <option>等级</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <mip-img src="" class="select-icon"></mip-img>
                    </div>
                    <a href="" class="more-vitality">活跃度</a>
                </mip-form>
                <button type="button" class="close" on="tap:planner-more.toggle">&times;</button>
            </div>
            <div class="modal-body clearfix">
                <div class="financial-planner financial-planner-modal clearfix" th:each="planner : ${morePlanners}">
                    <mip-linktion-fortune-consults>
                        <mip-data>
                            <script type="application/json">
                                {
                                    "plannerid": 0,
                                    "productid": 0
                                }
                            </script>
                        </mip-data>
                        <div class="template-box" id="template_box">
                            <template type="mip-mustache">
                                <div class="col-lg-4 col-xs-6 col-sm-4 financial-card financial-search-card clearfix">
                                    <div class="person-card consult-box financial-planner-box" data-plannerid={{id}} data-productid="2"
                                         data-consulturl="http://www.caifu.org/product/consult">
                                        <div class="click-lightbox slide-up">
                                            <button type="button" class="click-hidden">&times;</button>
                                            <h3>咨询TA</h3>
                                            <p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>
                                            <mip-form class="consult-form pc-form">
                                                <div class="form-group-input">
                                                    <label>姓名</label>
                                                    <input type="text" name="name" placeholder="请输入姓名"
                                                           value="" required="required">
                                                </div>
                                                <div class="form-group-input">
                                                    <label>手机</label>
                                                    <input type="number" name="phone" placeholder="请输入手机号"
                                                            value="" required="required">
                                                </div>
                                                <h4 class="checkbox-head">首选联系时间</h4>
                                                <div class="checkbox-flex">
                                                    <div class="form-group-checkbox">
                                                        <input type="radio" name={{id}}day value="1" id={{id}}day required="required">
                                                        <label for="times-am">白天</label>
                                                    </div>
                                                    <div class="form-group-checkbox">
                                                        <input type="radio" name={{id}}night value="2" id={{id}}night required="required">
                                                        <label for="times-pm">晚间</label>
                                                    </div>
                                                    <div class="form-group-checkbox">
                                                        <input type="radio" name={{id}}anytimes value="3" id={{id}}anytimes required="required">
                                                        <label for="anytimes">任何时刻</label>
                                                    </div>
                                                </div>
                                                <button type="button" class="but-submit consult-submit">提交</button>
                                            </mip-form>
                                        </div>
                                        <div class="card-box" th:if="${priPlanner != null}">
                                            <div class="planner-head">
                                                <mip-img src={{avatar}} th:src="${priPlanner?.avatar}"></mip-img>
                                            </div>
                                            <div class="info-text">
                                                <div class="text-name">
                                                    <p class="planner-name" th:text="${priPlanner?.name!=null?priPlanner.name:'无'}">
                                                        {{name}}</p>
                                                    <p class="planner-post">咨询顾问</p>
                                                </div>
                                                <div class="planner-label">
                                                    <p class="txt-major">专业领域</p>
                                                    {{#plannerInfo.workDomains}}
                                                    <p class="card-label">{{.}}</p>
                                                    {{/plannerInfo.workDomains}}
                                                </div>
                                            </div>
                                            <div class="person-info-txt">
                                                <p>推荐理财师的范围均为购买了此营销视频的理财师；若，15天内，此理财师已经</p>
                                            </div>
                                        </div>
                                        <div class="card-but">
                                            <button class="planner-submit-about"
                                                th:onclick="'location=\'/planner/' + ${planner.id} + '\''">了解TA
                                            </button>
                                            <button class="planner-submit-consult but-advisory"
                                                th:if="${planner != null && planner.consulStatus == 0}">咨询TA
                                            </button>
                                            <!-- 咨询中 -->
                                            <!-- <button class="planner-submit-consult3"
                                                    th:if="${planner != null && planner.consulStatus != 0}">咨询中
                                            </button> -->
                                        </div>
                                        <div class="card-phone-but">
                                            <button class="planner-submit-consult2 but-advisory"
                                                    th:if="${planner != null && planner.consulStatus != 0}"
                                                    on='tap:planner-more.toggle tap:modal-consult.toggle tap:MIP.setData({plannerid:"{{id}}",productid:"{{id}}"})'>
                                                咨询TA
                                            </button>
                                            <!-- 移动端咨询中 -->
                                            <!-- <button class="planner-submit-consult2">咨询中</button> -->
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <mip-lightbox id="modal-consult" layout="nodisplay" class="mip-hidden">
                            <div class="modal-dialog modal-consult modal-blue-top" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <p>咨询TA</p>
                                        <button type="button" class="close" on="tap:modal-consult.toggle">&times;</button>
                                    </div>
                                    <div class="modal-body click-lightbox-phone clearfix consult-box"
                                         m-bind:data-plannerid="plannerid" m-bind:data-productid="productid"
                                         data-consulturl="http://www.caifu.org/product/consult">
                                        <p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>
                                        <form class="consult-form phone-form">
                                            <div class="form-group-input">
                                                <label>姓名</label>
                                                <input type="text" name="name" placeholder="请输入姓名" required="required"
                                                       th:value="${session.currentUser != null ? session.currentUser.name : ''}">
                                            </div>
                                            <div class="form-group-input">
                                                <label>手机</label>
                                                <input type="number" name="phone" placeholder="请输入手机号" required="required"
                                                       th:value="${session.currentUser != null ? session.currentUser.mobile : ''}">
                                            </div>
                                            <h4 class="checkbox-head">首选联系时间</h4>
                                            <div class="checkbox-flex">
                                                <div class="form-group-checkbox">
                                                    <input type="radio" name="times" id="am" required="required" value="1">
                                                    <label for="am">白天</label>
                                                </div>
                                                <div class="form-group-checkbox">
                                                    <input type="radio" name="times" id="pm" required="required" value="2">
                                                    <label for="pm">晚间</label>
                                                </div>
                                                <div class="form-group-checkbox">
                                                    <input type="radio" name="times" id="anytime" required="required" value="3">
                                                    <label for="anytime">任何时刻</label>
                                                </div>
                                            </div>
                                            <button type="button" class="but-submit consult-submit">提交</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </mip-lightbox>
                    </mip-linktion-fortune-consults>
                </div>
            </div>
        </div>
    </div>
</mip-linktion-select-consulter>
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

