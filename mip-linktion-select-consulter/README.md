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
    <div class="modal-dialog planner-more" role="document" id="planner_more" data-src="https://www.caifu.org/planner/more" data-type="planners">
        <div class="modal-content">
            <div class="modal-header">
                <mip-form url="https://">
                    <a href="javascrpt::" class="more-all" id="synthesize">综合</a>
                    <div class="more-grade">
                        <select class="planner-grade" id="level">
                            <option value="" selected>等级</option>
                            <option value="准咨询顾问">准咨询顾问</option>
                            <option value="咨询顾问">咨询顾问</option>
                            <option value="专业人士">专业人士</option>
                            <option value="专家">专家</option>
                            <option value="资深专家">资深专家</option>
                        </select>
                        <!-- <mip-img src="abc" class="select-icon"></mip-img> -->
                    </div>
                    <a href="javascrpt::" class="more-vitality" id="hot">活跃度</a>
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
                            <div class="col-lg-4 col-xs-12 col-sm-4 consult-box">
                    <div class="person-card consult-box" data-plannerid="1" data-productid="2"
                         data-consulturl="http://www.caifu.org/product/consult">
                        <div class="click-lightbox slide-up">
                            <button type="button" class="click-hidden">&times;</button>
                            <h3>咨询TA</h3>
                            <p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>
                            <form class="consult-form pc-form">
                                <div class="form-group-input">
                                    <label>姓名</label>
                                    <input type="text" name="name" placeholder="请输入姓名"
                                           th:value="${session.currentUser != null ? session.currentUser.name : ''}">
                                </div>
                                <div class="form-group-input">
                                    <label>手机</label>
                                    <input type="number" name="phone" placeholder="请输入手机号"
                                           th:value="${session.currentUser != null ? session.currentUser.mobile : ''}">
                                </div>
                                <h4 class="checkbox-head">首选联系时间</h4>
                                <div class="checkbox-flex">
                                    <div class="form-group-checkbox">
                                        <input type="radio" name="times" value="1" id="topam" required="required">
                                        <label for="topam">白天</label>
                                    </div>
                                    <div class="form-group-checkbox">
                                        <input type="radio" name="times" value="2" id="toppm" required="required">
                                        <label for="toppm">晚间</label>
                                    </div>
                                    <div class="form-group-checkbox">
                                        <input type="radio" name="times" value="3" id="topanytimes" required="required">
                                        <label for="topanytimes">任何时刻</label>
                                    </div>
                                </div>
                                <button type="button" class="but-submit consult-submit">提交</button>
                            </form>
                        </div>
                        <div class="recommend-icon">
                            <mip-img src="/img/icon/recommend.png"></mip-img>
                        </div>
                        <div class="card-box" th:if="${priPlanner != null}">
                            <div class="person-icon">
                                <mip-img src="/img/head.jpg" th:src="${priPlanner?.avatar}"></mip-img>
                            </div>
                            <div class="info-text">
                                <div class="text-name">
                                    <p class="person-name" th:text="${priPlanner?.name!=null?priPlanner.name:'无'}">
                                        王琨越1</p>
                                    <p class="person-info">咨询顾问</p>
                                </div>
                                <div class="info-label">
                                    <p class="txt-major">专业领域</p>
                                    <p class="card-label">重疾险重</p>
                                    <p class="card-label">意外险</p>
                                    <p class="card-label">少儿险</p>
                                    <p class="card-label">重疾险</p>
                                </div>
                            </div>
                            <div class="person-info-txt">
                                <p>推荐理财师的范围均为购买了此营销视频的理财师；若，15天内，此理财师已经</p>
                            </div>
                        </div>
                        <div class="card-but" th:if="${priPlanner != null}">
                            <a th:href="'/planner/' + ${priPlanner.id}" class="but-about">了解TA</a>
                            <a class="but-advisory " th:if="${priPlanner != null && priPlanner.consulStatus != 0}"
                               href="javascript:return false;" onclick="return false;">咨询中</a>
                            <!-- 这部分是咨询TA按钮，分不同的状态。把ID改成modal-consult是登录后的弹框，现在是未登录的咨询TA弹框-->
                            <button class="but-advisory" th:if="${priPlanner != null && priPlanner.consulStatus == 0}">
                                咨询TA
                            </button>
                        </div>
                        <div class="card-phone-but" th:if="${priPlanner != null}">
                            <a href="javascript:;" class="but-about"
                               th:if="${priPlanner != null && priPlanner.consulStatus == 0}"
                               th:attr="on='tap:modal-consult.toggle tap:MIP.setData({plannerid:\'' + ${priPlanner.id} + ',productid:\'' + ${product.id} + '\'})'"
                               role="button" tabindex="0">咨询TA</a>

                            <!-- 未登录用户的咨询TA弹框 -->
                            <!-- <a href=javascript:;"" class="but-about" on="tap:modal-consult-visitor.toggle" id="" role="button" tabindex="0">咨询TA</a> -->
                            <a href="javascript:;" on="tap:planner-more.toggle" id="" role="button" tabindex="0"
                               class="but-advisory">换一位理财师</a>
                        </div>
                    </div>
                </div>
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
                                        <mip-form class="consult-form phone-form" url="https://">
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
                                        </mip-form>
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

