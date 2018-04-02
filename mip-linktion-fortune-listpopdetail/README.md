# mip-linktion-fortune-listpopdetail

mip-linktion-fortune-listpopdetail 列表信息带入弹框

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-linktion-fortune-listpopdetail/mip-linktion-fortune-listpopdetail.js<br>https://c.mipcdn.com/static/v1/mip-lightbox/mip-lightbox.js

## 示例

```html
<mip-linktion-fortune-listpopdetail id="listpop">
  <div class=" lists-box planner-relation job-relation">
    <h3>来自成员的心声</h3>
    <ul id="lists">
        <li class="member-card" on="tap:partner-comment.toggle tap:listpop.open" data-name="小王子1" data-position="产品经理1">
        <mip-img src=""></mip-img>
        <div class="card-txt">
          <p>1我是个活泼可爱的星星我是个活泼可爱的星星我是个活泼可爱的星星</p>
        </div>
      </li>
      <li class="member-card" on="tap:partner-comment.toggle tap:listpop.open" data-name="小王子2" data-position="产品经理2">
        <mip-img src=""></mip-img>
        <div class="card-txt">
          <p>2我是个活泼可爱的星星我是个活泼可爱的星星我是个活泼可爱的星星</p>
        </div>
      </li>
      <li class="member-card" on="tap:partner-comment.toggle tap:listpop.open" data-name="小王子3" data-position="产品经理3">
        <mip-img src=""></mip-img>
        <div class="card-txt">
          <p>3我是个活泼可爱的星星我是个活泼可爱的星星我是个活泼可爱的星星</p>
        </div>
      </li>
      <li class="member-card" on="tap:partner-comment.toggle tap:listpop.open" data-name="小王子4" data-position="产品经理4">
        <mip-img src=""></mip-img>
        <div class="card-txt">
          <p>4我是个活泼可爱的星星我是个活泼可爱的星星我是个活泼可爱的星星</p>
        </div>
      </li>
    </ul>
  </div>
  <mip-lightbox id="partner-comment" layout="nodisplay" class="mip-hidden" >
    <div class="modal-dialog partner-comment modal-blue-top" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <p>致亲爱的小伙伴：</p>
          <button type="button" class="close" on="tap:partner-comment.toggle">&times;</button>
        </div>
        <div class="modal-body clearfix">
          <div class="comment-head">
            <mip-img src="" id="popImgSrc"></mip-img>
          </div>
          <div class="head-name">
            <p>称谓：</p>
            <span id="popName"></span>
          </div>
          <div class="head-position">
            <p>职位：</p>
            <span id="popDetail"></span>
          </div>
          <p class="comment-info" id="popWord">
          </p>
        </div>
      </div>
    </div>
  </mip-lightbox>
</mip-linktion-fortune-listpopdetail>
```