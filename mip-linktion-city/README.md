# mip-linktion-city

mip-linktion-city 级联城市组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-linktion-city/mip-linktion-city.js<br>https://c.mipcdn.com/static/v1/mip-lightbox/mip-lightbox.js<br>https://c.mipcdn.com/static/v1/mip-vd-tabs/mip-vd-tabs.js

## 示例

```html
<mip-linktion-city id="city" data-login=false>
<!-- search的弹框 -->
<a on="tap:select-city.toggle tap:city.open" id="btn-open" role="button" class="city-pop-btn" href="javascrpt:;" tabindex="0" data-domain="http://47.100.7.250:8080" data-submiturl="http://47.100.7.250:8080/city"><i class="fa fa-map-marker"></i><p class="tre-location-txt">北京/海淀</p></a>
<button id="btn">btn</button>
<a href="javascript:;" on="tap:select-city-phone.toggle tap:city.open" data-domain="http://47.100.7.250:8080" data-submitUrl="http://47.100.7.250:8080/city" id="phone-btn-open" role="button" class="city-pop-btn" href="javascrpt:;"tabindex="0" class="phone-clientele-head">北京/海淀 -phone</a>
<!-- 选城市弹框 -->
  <mip-lightbox id="select-city" layout="nodisplay" class="mip-hidden">
    <div class="modal-dialog select-city modal-blue-top" role="document">
      <div class="modal-content">
        <div class="hints"></div>
        <div class="load-mask">
          <div class="loading">
            <mip-img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" class="loading-img"></mip-img>
            提交中...
          </div>
        </div>
        <div class="modal-header">
          <p>切换城市</p>
          <button type="button" class="close" on="tap:select-city.toggle"><span>&times;</span></button>
        </div>
        <div class="modal-body">
          <div class="select-city-info">
            <h3 class="info-head">亲爱的用户您好：</h3>
            <p class="info-txt">切换城市，让我们为您提供更准确地理财信息</p>
            <p class="info-location">点击进入<button type="button">海淀</button>or 手动切换到其他城市</p>
          </div>
          <div class="city-card">
            <h2>手动切换城市</h2>
            <div data-value="" class="city-label" id="province-tag">
              <p></p>
              <button class="location-close" data-location="province">&times;</button>
            </div>
            <div data-value="" class="city-label second-tag" id="city-tag">
              <p></p>
              <button class="location-close" type="button" data-location="city">&times;</button>
            </div>
            <div data-value="" class="city-label second-tag third-tag" id="area-tag">
              <p></p>
              <button class="location-close"  data-location="area">&times;</button>
            </div>
            <div data-value="" class="city-label second-tag third-tag forth-tag" id="street-tag">
              <p></p>
              <button class="location-close" type="button" data-location="street">&times;</button>
            </div>
            <mip-vd-tabs class="select-city-tabs">
              <section>
                  <li id="province-tab" >省份</li>
                  <li id="city-tab" >城市</li>
                  <li id="area-tab">县/区</li>
                  <li id="street-tab" >街道</li>
              </section>
              <div id="province">
                <div class="tab-line">
                  <h4>A-G</h4>
                  <ul class="line-box AG">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>H-K</h4>
                  <ul class="line-box HK">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>L-S</h4>
                  <ul class="line-box LS">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>T-Z</h4>
                  <ul class="line-box TZ">
                  </ul>
                </div>
              </div>

              <div id="city">
                <div class="tab-line">
                  <h4>A-G</h4>
                  <ul class="line-box AG">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>H-K</h4>
                  <ul class="line-box HK">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>L-S</h4>
                  <ul class="line-box LS">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>T-Z</h4>
                  <ul class="line-box TZ">
                  </ul>
                </div>
              </div>

              <div id="area">
                <div class="tab-line">
                  <h4>A-G</h4>
                  <ul class="line-box AG">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>H-K</h4>
                  <ul class="line-box HK">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>L-S</h4>
                  <ul class="line-box LS">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>T-Z</h4>
                  <ul class="line-box TZ">
                  </ul>
                </div>
              </div>

              <div id="street">
                <div class="tab-line">
                  <h4>A-G</h4>
                  <ul class="line-box AG">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>H-K</h4>
                  <ul class="line-box HK">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>L-S</h4>
                  <ul class="line-box LS">
                  </ul>
                </div>
                <div class="tab-line">
                  <h4>T-Z</h4>
                  <ul class="line-box TZ">
                  </ul>
                </div>
              </div>
            </mip-vd-tabs>
          </div>
        </div>
      </div>
    </div>
  </mip-lightbox>
<!-- 选城市弹框 -->
<!-- 选城市手机弹框 -->
  <mip-lightbox id="select-city-phone" layout="nodisplay" class="mip-hidden">
    <div class="modal-dialog select-city-phone" role="document">
      <div class="modal-content">
        <div class="hints"></div>
        <div class="load-mask">
          <div class="loading">
            <mip-img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" class="loading-img"></mip-img>
            提交中...
          </div>
        </div>
        <div class="modal-header">
          <p class="modal-center-h">切换城市</p>
          <button type="button" class="close modal-center-span" on="tap:select-city-phone.toggle tap:select-city-phone.close"><span>&times;</span></button>
	        <div class="modal-body">
	          <mip-vd-tabs class="select-city-phonetab">
	            <section>
	              <li data-val="" class="city-label-phone " id="phone-province-tab">省份</li>
	              <li data-val="" class="city-label-phone second-tag" id="phone-city-tab" >城市</li>
	              <li data-val="" class="city-label-phone second-tag third-tag" id="phone-area-tab">县/区</li>
	              <li data-val="" class="city-label-phone second-tag third-tag forth-tag" id="phone-street-tab" >街道</li>
	            </section>
	            <div class="scroll-wrapper">
	              <ul class="phone-city-ul" id="phone-province">
	              </ul>
	            </div>
	            <div class="scroll-wrapper">
	              <ul class="phone-city-ul" id="phone-city">
	              </ul>
	            </div>
	            <div class="scroll-wrapper">
	              <ul class="phone-city-ul" id="phone-area">
	              </ul>
	            </div>
	            <div class="scroll-wrapper">
	              <ul class="phone-city-ul" id="phone-street">
	              </ul>
	            </div>
	          </mip-vd-tabs>
	        </div>
      	</div>
    	</div>
    </div>
  </mip-lightbox>
<!-- 选城市手机弹框 -->
</mip-linktion-city>
```
