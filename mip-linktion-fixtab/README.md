# mip-linktion-fixtab

mip-linktion-fixtab 实现tab导航在页面一定高度时固定

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linktion-fixtab/mip-linktion-fixtab.js<br>https://c.mipcdn.com/static/v1/mip-vd-tabs/mip-vd-tabs.js

## 示例


```html
<mip-linktion-fixtab>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
    <div class="phone-show row consult-box phone-console-box">
        <div class="hints"></div>
          <mip-data class="mip-element mip-layout-container">
              <script type="application/json">
                  {
                      "plannerid": 0,
                      "productid": 0
                  }
              </script>
          </mip-data>
          <div class="col-lg-4 col-xs-12 col-sm-4 consult-box">
              <div class="person-card consult-box" data-consulturl="/product/consult" data-plannerid="57" data-productid="34">
                  <div class="click-lightbox slide-up">
                      <button class="click-hidden" type="button">×</button>
                      <h3>咨询TA</h3>
                      <p class="consult-describe">请留下您的信息，方便这位理财师联系您。</p>
                      <mip-form class="consult-form pc-form mip-element mip-layout-container" url="//www.caifu.org/">   
                      <form action="//www.caifu.org/" method="GET" target="_blank"><div class="form-group-input">
                              <label>姓名</label>
                              <input name="name" placeholder="请输入姓名" required="required" type="text" value="">
                          </div><div class="form-group-input">
                              <label>手机</label>
                              <input name="phone" placeholder="请输入手机号" required="required" type="number" value="">
                          </div><h4 class="checkbox-head">首选联系时间</h4><div class="checkbox-flex">
                              <div class="form-group-checkbox">
                                  <input id="phonetopam" name="times" required="required" type="radio" value="1">
                                  <label for="phonetopam">白天</label>
                              </div>
                              <div class="form-group-checkbox">
                                  <input id="phonetoppm" name="times" required="required" type="radio" value="2">
                                  <label for="phonetoppm">晚间</label>
                              </div>
                              <div class="form-group-checkbox">
                                  <input id="phonetopanytimes" name="times" required="required" type="radio" value="3">
                                  <label for="phonetopanytimes">任何时刻</label>
                              </div>
                          </div><button class="but-submit consult-submit" type="button">提交</button></form></mip-form>
                  </div>
                  <div class="recommend-icon">
                      <mip-img src="/img/icon/recommend.png" class="mip-element mip-layout-container mip-img-loaded"><img class="mip-fill-content mip-replaced-content" src="/img/icon/recommend.png"></mip-img>
                  </div>
                  <div class="card-box">
                      <div class="person-icon">
                          <mip-img src="http://47.100.7.250:8080/image/07f9d887-87e4-42ab-8251-31f7937ab572.png" class="mip-element mip-layout-container mip-img-loaded"><img class="mip-fill-content mip-replaced-content" src="http://47.100.7.250:8080/image/07f9d887-87e4-42ab-8251-31f7937ab572.png"></mip-img>
                      </div>
                      <div class="info-text">
                          <div class="text-name">
                              <p class="person-name">做理财客</p>
                              <p class="person-info">准咨询顾问</p>
                          </div>
                          <div class="info-label">
                              <p class="txt-major">专业领域</p>
                              
                          </div>
                      </div>
                      <div class="person-info-txt">
                          
                      </div>
                  </div>
                  <div class="card-but">
                      <a class="but-about" href="/planner/57">了解TA</a>
                      
                      <!-- 这部分是咨询TA按钮，分不同的状态。把ID改成modal-consult是登录后的弹框，现在是未登录的咨询TA弹框-->
                      <button class="but-advisory">
                          咨询TA
                      </button>
                  </div>
                  <div class="card-phone-but">
                      <!-- 未登录或会员登录显示咨询TA或者咨询中 -->
                      <a class="but-about hide-video" href="javascript:;" role="button" tabindex="0" on="tap:modal-consult.toggle tap:MIP.setData({plannerid:'57',productid:'34'})">咨询TA</a>
                      
                     <!-- 未登录或会员登录显示咨询TA或者咨询中 -->

                     <!-- 理财师登录时显示了解TA -->
                      
                      <!-- 理财师登录时显示了解TA -->

                      <!-- 会员或理财师时 只有在推荐理财师超过1位时才显示 -->
                      <a class="but-advisory hide-video" href="javascript:;" id="" on="tap:planner-more.toggle" role="button" tabindex="0">换一位理财师</a>
                  </div>
              </div>
          </div>
    </div>
    <mip-vd-tabs>
      <section class="nav nav-justified fixed-nav" role="tablist">
        <li>案例介绍</li>
        <li>常见问题</li>
        <li>特邀点评</li>
      </section>
      <!-- Tab panes -->
      <div class="tab-content clearfix">
        <div>
          <div class="tab-info">
            <h3>太平周全保意外保险</h3>
            <div class="tab-info-card">
              <div class="col-lg-4 col-xs-6 particulars-card">
                <label>投保范围:</label>
                <p>30天-17 周岁</p>
              </div>
              <div class="col-lg-4 col-xs-6 particulars-card">
                <label>投保期间:</label>
                <p>30年</p>
              </div>
              <div class="col-lg-4 col-xs-6 particulars-card">
                <label>缴费方式:</label>
                <p>10年</p>
              </div>
            </div>
            <p class="tab-info-txt">
              我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍我是产品介绍
            </p>
          </div>
        </div>
      </div>
      <div class="tab-content clearfix">
        <div>
          <div class="tab-info">
            <!-- 没有常见问题时显示 -->
            <!-- <h3>暂时没有常见问题</h3> -->
            <h3>你关心的，就是我们关注的</h3>
          </div>
        </div>
      </div>
      <div class="tab-content clearfix">
        <div>
          <div class="tab-info">
            <h3>“小评论” 也有大意义</h3>
            <div class="info-comment clearfix">
              <div class="info-comment-name">
                <h3>--BY张小姐</h3>
                <p>某某公司艺术总监 行业：互联网</p>
              </div>
              <div class="info-comment-txt">
                <p>这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！</p>
              </div>
            </div>
            <div class="info-comment clearfix">
              <div class="info-comment-name">
                <h3>--BY张小姐</h3>
                <p>某某公司艺术总监 行业：互联网</p>
              </div>
              <div class="info-comment-txt">
                <p>这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！</p>
              </div>
            </div>
            <div class="info-comment clearfix">
              <div class="info-comment-name">
                <h3>--BY张小姐</h3>
                <p>某某公司艺术总监 行业：互联网</p>
              </div>
              <div class="info-comment-txt">
                <p>这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！</p>
              </div>
            </div>
            <div class="info-comment clearfix">
              <div class="info-comment-name">
                <h3>--BY张小姐</h3>
                <p>某某公司艺术总监 行业：互联网</p>
              </div>
              <div class="info-comment-txt">
                <p>这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！这个产品很不错！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mip-vd-tabs>
    <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
  <div>jksdfksasdlfjsdk</div>
</mip-linktion-fixtab>
```



