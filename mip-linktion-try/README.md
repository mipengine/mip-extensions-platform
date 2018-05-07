# mip-linktion-try

mip-linktion-try 弹框ajax提交信息并后续弹框提示操作结果

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-linktion-try/mip-linktion-try.js<br>https://c.mipcdn.com/static/v1/mip-lightbox/mip-lightbox.js

## 示例

```html
<mip-linktion-try id="try">
  <div class="hints"></div>
  <button type="button" class="try-btn" on="tap:insurance-modal.toggle">试一试</button>
  <button type="button" class="try-btn-end" on="tap:insurance-modal-end.toggle"></button>
  <mip-lightbox id="insurance-modal" layout="nodisplay" class="mip-hidden">
	  <div class="modal-dialog insurance-modal-ad modal-blue-top" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <p>专人+专业的理财指导</p>
	        <button type="button" class="close form-close" on="tap:insurance-modal.toggle">&times;</button>
	      </div>
	      <div class="modal-body clearfix">
          <mip-form>
            <div class="modal-input-info">
              <div class="form-group">
                <label>我的姓名</label>
                <input type="text" placeholder="请输入姓名" id="name" required="required">
              </div>
              <div class="form-group">
                <label>手机号码</label>
                <input type="number" placeholder="请输入手机号码" id="mobile" required="required">
              </div>
            </div>
            <div class="select-checkbox" data-choicetype="checkbox" id="demand">
              <h3 class="checkbox-h">我需要</h3>
              <div class="form-group">
                <input type="checkbox" name="myinfo" value="保险规划" id="card_insurance" checked><label for="card_insurance">保险规划</label>
              </div>
              <div class="form-group">
                <input type="checkbox" name="myinfo" value="投资" id="card_invest"><label for="card_invest">投资</label>
              </div>
              <div class="form-group">
                <input type="checkbox" name="myinfo" value="贷款" id="card_loans"><label for="card_loans">贷款</label>
              </div>
            </div>
            <div class="form-group-but">
              <button type="button" class="insurance-but"  id="try-btn"  data-type="5" on="tap:try.open" data-url="http://www.caifu.org/memberCustomization/saveCustomization">提交</button>
            </div>
          </mip-form>
	      </div>
	    </div>
	  </div>
  </mip-lightbox>
  <mip-lightbox id="insurance-modal-end" layout="nodisplay" class="mip-hidden">
    <div class="modal-dialog insurance-modal-ad modal-blue-top" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <p>专人+专业的理财指导</p>
          <button type="button" class="close" on="tap:insurance-modal-end.toggle tap:insurance-modal-end.close tap:insurance-modal.close tap:try.close">&times;</button>
        </div>
        <div class="modal-body clearfix">
          <div class="insurance-modal-complete">
            <h3>您的申请我们已经收到，会尽快与您联系！</h3>
          </div>
          <div class="form-group-but">
            <button type="button" class="insurance-but" on="tap:insurance-modal-end.toggle tap:insurance-modal-end.close tap:insurance-modal.close tap:try.close">确认</button>
          </div>
        </div>
      </div>
    </div>
  </mip-lightbox>
</mip-linktion-try>
```
