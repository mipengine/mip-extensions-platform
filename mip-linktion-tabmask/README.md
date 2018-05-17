# mip-linktion-tabmask

mip-linktion-tabmask 实现tab打开时body不可滚动

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linktion-tabmask/mip-linktion-tabmask.js<br>https://c.mipcdn.com/static/v1/mip-accordion/mip-accordion.js

## 示例


```html
<mip-linktion-tabmask>
    <div class="tab-mask"></div>
    <mip-accordion sessions-key="mip_1" animatetime='0.24' class="sub-box" expaned-limit>
                <section class="phone-section">
                  <h4>
                    <strong class="all_select">最新</strong>
                  </h4>
                  <div class="mip-accordion-content">
                    <div class="select-list" id="all-select">
                      <a href="" class="list-span active">全部</a>
                      <a href="" class="list-span">意外险</a>
                      <a href="" class="list-span">重疾险</a>
                      <a href="" class="list-span">医疗险</a>
                    </div>
                  </div>
                </section>
                <section class="phone-section">
                  <h4>
                    <strong class="all_select">最热</strong>
                  </h4>
                  <div class="mip-accordion-content">
                    <div class="select-list" id="classify">
                      <a href="" class="list-span active">全部</a>
                      <a href="" class="list-span">中国人寿</a>
                      <a href="" class="list-span">平安人寿</a>
                      <a href="" class="list-span">新华人寿</a>
                      <a href="" class="list-span">泰康人寿</a>
                      <a href="" class="list-span">中安人寿</a>
                      <a href="" class="list-span">合众人寿</a>
                      <a href="" class="list-span">太平洋保险</a>
                      <a href="" class="list-span">长城人寿</a>
                      <a href="" class="list-span">中意人寿</a>
                      <a href="" class="list-span">友邦保险</a>
                    </div>
                  </div>
                </section>
              </mip-accordion>
</mip-linktion-tabmask>
```

