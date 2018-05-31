# mip-linktion-fix-scroll-content

mip-linktion-fix-scroll-content 实现列表根据页面滚动到底部是固定，回滚时滚到顶部固定

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linktion-fix-scroll-content/mip-linktion-fix-scroll-content.js<br>https://c.mipcdn.com/static/v1/mip-linktion-select-consulter/mip-linktion-select-consulter.js<br>https://c.mipcdn.com/static/v1/mip-linktion-fortune-consults/mip-linktion-fortune-consults.js<br>https://c.mipcdn.com/static/v1/mip-lightbox/mip-lightbox.js<br>https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js<br>https://c.mipcdn.com/static/v1/mip-bind/mip-bind.js

## 示例
```html
<mip-linktion-fix-scroll-content>
  <div class="col-lg-4 col-sm-4 details-fix-top">
    <div class="scroll-wrap">
      <div class="details-heat clearfix">
        <div class="details-heat-left clearfix">
          <p class="heat-nub-box">第<span>3</span>名</p>
          <p class="heat-nub-bottom">同类产品热力值</p>
        </div>
        <div class="details-heat-right clearfix">
          <a href="" on="tap:modal-hot.toggle" id="btn-open" role="button" tabindex="0">加热</a>
          <!-- 未登录的用户点击加热提示登录弹框 -->
          <!-- <a href="" on="tap:login-modal.toggle">加热</a> -->
          <p class="nub-new">当前<span>1234455</span>点</p>
        </div>
      </div>
      <mip-linktion-fortune-consults class="top-slidebox phone-hide">
        <div class="hints"></div>
        <mip-data>
          <script type="application/json">
          {
            "plannerid": 0,
            "productid": 0
          }
          </script>
        </mip-data>
        <div class="clearfix">
          <div class="person-card consult-box" data-plannerid="1" data-productid="2" data-consulturl="http://47.100.7.250:8080/product/consult" id="dataoption">
            <div class="click-lightbox slide-up">
              <button type="button" class="click-hidden">&times;</button>
              <h3>咨询TA</h3>
              <p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>
              <form class="consult-form pc-form">
                <div class="form-group-input">
                  <label>姓名</label>
                  <input type="text" name="name" placeholder="请输入姓名" required="required">
                </div>
                <div class="form-group-input">
                  <label>手机</label>
                  <input type="number" name="phone" placeholder="请输入手机号" required="required">
                </div>
                <h4 class="checkbox-head">首选联系时间</h4>
                <div class="checkbox-flex">
                  <div class="form-group-checkbox">
                    <input type="radio" name="times" value="1" id="times-am" required="required">
                    <label for="times-am">白天</label>
                  </div>
                  <div class="form-group-checkbox">
                    <input type="radio" name="times"  value="2" id="times-pm" required="required">
                    <label for="times-pm">晚间</label>
                  </div>
                  <div class="form-group-checkbox">
                    <input type="radio" name="times"  value="3" id="anytimes" required="required">
                    <label for="anytimes">任何时刻</label>
                  </div>
                </div>
                <button type="button" class="but-submit consult-submit">提交</button>
              </form>
            </div>
            <div class="recommend-icon">
            </div>
            <div class="card-box">
              <div class="person-icon">
              </div>
              <div class="info-text">
                <div class="text-name">
                  <p class="person-name">王琨越1</p>
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
            <div class="card-but">
              <a href="/" class="but-about">了解TA</a>
              <!-- <a class="but-advisory " href="javascript:return false;" onclick="return false;">咨询中</a> -->
              <!-- 这部分是咨询TA按钮，分不同的状态。把ID改成modal-consult是登录后的弹框，现在是未登录的咨询TA弹框-->
              <button class="but-advisory" >咨询TA</button>
            </div>
            <div class="card-phone-but">
              <a href="javascript:;" class="but-about" on="tap:modal-consult.toggle tap:MIP.setData({plannerid:5,productid:6})" id="" role="button" tabindex="0">咨询TAp</a>

              <!-- 未登录用户的咨询TA弹框 -->
              <!-- <a href=javascript:;"" class="but-about" on="tap:modal-consult-visitor.toggle" id="" role="button" tabindex="0">咨询TA</a> -->
              <a href="javascript:;" on="tap:planner-more.toggle" id="" role="button" tabindex="0"  class="but-advisory">换一位理财师</a>
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
              <div class="modal-body click-lightbox-phone clearfix consult-box" m-bind:data-plannerid="plannerid" m-bind:data-productid="productid" data-consulturl="http://47.100.7.250:8080/product/consult">
                <p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>
                <form class="consult-form phone-form">
                  <div class="form-group-input">
                    <label>姓名</label>
                    <input type="text" name="name" placeholder="请输入姓名" required="required">
                  </div>
                  <div class="form-group-input">
                    <label>手机</label>
                    <input type="number" name="phone" placeholder="请输入手机号" required="required">
                  </div>
                  <h4 class="checkbox-head">首选联系时间</h4>
                  <div class="checkbox-flex">
                    <div class="form-group-checkbox">
                      <input type="radio" name="times" id="am11" required="required" value="1">
                      <label for="am11">白天</label>
                    </div>
                    <div class="form-group-checkbox">
                      <input type="radio" name="times" id="pm11" required="required" value="2">
                      <label for="pm11">晚间</label>
                    </div>
                    <div class="form-group-checkbox">
                      <input type="radio" name="times"  id="anytime11" required="required" value="3">
                      <label for="anytime11">任何时刻</label>
                    </div>
                  </div>
                  <button type="button" class="but-submit consult-submit">提交</button>
                </form>
              </div>
            </div>
          </div>
        </mip-lightbox>
      </mip-linktion-fortune-consults>
      <div class="person-batch">
        <mip-linktion-select-consulter>
          <div class="person-head">
            <h3>更多推荐</h3>
            <a href="javascrpt:;" id="change" class="pointer">换一批</a>
          </div>
          <div id="planner_more" data-src="https://www.caifu.org/user/planner" data-type="change">
            <mip-linktion-fortune-consults>
              <div class="hints"></div>
              <mip-data>
                <script type="application/json">
                    {
                        "plannerid": 0,
                        "productid": 0
                    }
                </script>
              </mip-data>
              <div class="template-box" id="change_template_box">
                <div class="consult-box">
                    <div class="person-card consult-box " th:attr="data-plannerid=${planner.id}"
                         th:attr="data-productid=${product.id}"
                         data-consulturl="http://www.caifu.org/product/consult" id="dataoption">
                        <div class="click-lightbox slide-up">
                            <button type="button" class="click-hidden">&times;</button>
                            <h3>咨询TA</h3>
                            <p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>
                            <mip-form class="consult-form pc-form" url="https://">
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
                                        <input type="radio" name="times" id="times-am1" value="1"
                                               required="required" >
                                        <label for="times-am1">白天</label>
                                    </div>
                                    <div class="form-group-checkbox">
                                        <input type="radio" name="times" id="times-pm1" value="2"
                                               required="required">
                                        <label for="times-pm1">晚间</label>
                                    </div>
                                    <div class="form-group-checkbox">
                                        <input type="radio" name="times" id="anytimes1" value="3"
                                               required="required">
                                        <label for="anytimes1">任何时刻</label>
                                    </div>
                                </div>
                                <button type="button" class="but-submit consult-submit">提交</button>
                            </mip-form>
                        </div>
                        <div class="card-box">
                            <div class="person-icon">
                            </div>
                            <div class="info-text">
                                <div class="text-name">
                                    <p class="person-name" th:text="${planner.name}">王琨越1</p>
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
                        <div class="card-but">
                            <a th:href="'/planner/' + ${planner.id}" class="but-about">了解TA</a>
                            <button class="but-advisory"
                                    th:if="${planner != null && planner.consulStatus == 0}">咨询TA
                            </button>
                            <!-- 咨询中 -->
                            <button th:if="${planner != null && planner.consulStatus != 0}" class="but-advisory-way"
                                    type="button">咨询中
                            </button>
                        </div>
                    </div>
                </div>
                 <div class="consult-box">
                    <div class="person-card consult-box " th:attr="data-plannerid=${planner.id}"
                         th:attr="data-productid=${product.id}"
                         data-consulturl="http://www.caifu.org/product/consult" id="dataoption">
                        <div class="click-lightbox slide-up">
                            <button type="button" class="click-hidden">&times;</button>
                            <h3>咨询TA</h3>
                            <p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>
                            <mip-form class="consult-form pc-form" url="https://">
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
                                        <input type="radio" name="times" id="times-am1" value="1"
                                               required="required" >
                                        <label for="times-am1">白天</label>
                                    </div>
                                    <div class="form-group-checkbox">
                                        <input type="radio" name="times" id="times-pm1" value="2"
                                               required="required">
                                        <label for="times-pm1">晚间</label>
                                    </div>
                                    <div class="form-group-checkbox">
                                        <input type="radio" name="times" id="anytimes1" value="3"
                                               required="required">
                                        <label for="anytimes1">任何时刻</label>
                                    </div>
                                </div>
                                <button type="button" class="but-submit consult-submit">提交</button>
                            </mip-form>
                        </div>
                        <div class="card-box">
                            <div class="person-icon">
                            </div>
                            <div class="info-text">
                                <div class="text-name">
                                    <p class="person-name" th:text="${planner.name}">王琨越1</p>
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
                        <div class="card-but">
                            <a th:href="'/planner/' + ${planner.id}" class="but-about">了解TA</a>
                            <button class="but-advisory"
                                    th:if="${planner != null && planner.consulStatus == 0}">咨询TA
                            </button>
                            <!-- 咨询中 -->
                            <button th:if="${planner != null && planner.consulStatus != 0}" class="but-advisory-way"
                                    type="button">咨询中
                            </button>
                        </div>
                    </div>
                </div>
                 <div class="consult-box">
                    <div class="person-card consult-box " th:attr="data-plannerid=${planner.id}"
                         th:attr="data-productid=${product.id}"
                         data-consulturl="http://www.caifu.org/product/consult" id="dataoption">
                        <div class="click-lightbox slide-up">
                            <button type="button" class="click-hidden">&times;</button>
                            <h3>咨询TA</h3>
                            <p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>
                            <mip-form class="consult-form pc-form" url="https://">
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
                                        <input type="radio" name="times" id="times-am1" value="1"
                                               required="required" >
                                        <label for="times-am1">白天</label>
                                    </div>
                                    <div class="form-group-checkbox">
                                        <input type="radio" name="times" id="times-pm1" value="2"
                                               required="required">
                                        <label for="times-pm1">晚间</label>
                                    </div>
                                    <div class="form-group-checkbox">
                                        <input type="radio" name="times" id="anytimes1" value="3"
                                               required="required">
                                        <label for="anytimes1">任何时刻</label>
                                    </div>
                                </div>
                                <button type="button" class="but-submit consult-submit">提交</button>
                            </mip-form>
                        </div>
                        <div class="card-box">
                            <div class="person-icon">
                            </div>
                            <div class="info-text">
                                <div class="text-name">
                                    <p class="person-name" th:text="${planner.name}">王琨越1</p>
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
                        <div class="card-but">
                            <a th:href="'/planner/' + ${planner.id}" class="but-about">了解TA</a>
                            <button class="but-advisory"
                                    th:if="${planner != null && planner.consulStatus == 0}">咨询TA
                            </button>
                            <!-- 咨询中 -->
                            <button th:if="${planner != null && planner.consulStatus != 0}" class="but-advisory-way"
                                    type="button">咨询中
                            </button>
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
        </mip-linktion-select-consulter>
        <div class="person-more">
          <div class="person-more-box">
            <a href="javascript:;" on="tap:planner-more.toggle" id="btn-open" role="button" tabindex="0" >更多当地理财师</a>
          </div>
          <div class="person-more-a">
            <p>加盟理财师，</p><a href="javascript:;" on="tap:judge-user.toggle">点击这里了解</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</mip-linktion-fix-scroll-content>
```


