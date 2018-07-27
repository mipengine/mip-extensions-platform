# mip-ilaw66-xzh-order

mip-ilaw66-xzh-order 组件说明
法律网订单详情

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-xzh-order/mip-ilaw66-xzh-order.js

## 示例

### 基本用法
```html
<mip-ilaw66-xzh-order>
    <mip-sina-rem>
      <mip-stats-baidu token="d5a24ec2321d65ed4b781d2fce73c834"></mip-stats-baidu>
      <mip-form url='https://www.baidu.com'>
        <input type="hidden" id="requestId" name="requestId" />
        <input type="hidden" id="questionType" name="questionType" />
        <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" value="dbbac8cc-24f7-4796-8385-188a7c811975" />
      </mip-form>

      <div class="header_block baidu">
        <a data-type="mip" data-title="返回" href="#" class="glyphicon glyphicon-menu-left pull-left headerlf5"></a>
        <div class="header_title">分秒律师</div>
        <a data-type="mip" data-title="返回" href="#" class="glyphicon pull-right headerright"> <mip-img layout="responsive"  width="20px"height= "20px" src="tempbaidu/images/user.png"></mip-img></a>
      </div>
      <div class="order_block">
        <div class="orderlist-layout" id="orderInfo">
        </div>
        <div class="orderlist-layout">
          <div class="orderlist__status border_bottom" id="lawyerInfo">
          </div>
          <div class="orderlist__status">
            <div class="order_info">
              <p>温馨提示：</p>
              <p>咨询结束7日内，您可以对服务提出异议，如无异议，7日后将自动打款给律师。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="copy_block">
        <p>法律服务来源于第三方：分秒律师平台</p>
        <p>客服电话 021-80117789</p>
      </div>

      <div class="popUp_uncheckErr">
        <div class="talking_result text-center">
          <h4>温馨提示</h4>
          <p id="tips"></p>
          <div class="link_btn_uncheckErrConfirm">
            <span class="link_confirm">确认</span>
          </div>
        </div>
      </div>
      <div class="popUp_confirm">
        <div class="talking_result text-center">
          <h4>温馨提示</h4>
          <p>您咨询的律师已下线或正在服务中</p>
          <div class="link_btn">
            <span data-type="02" id="still_reAsk">希望重试</span>
            <span class="link_others">咨询其他律师</span>
          </div>
        </div>
      </div>
      <div class="popUp_sysErr">
        <div class="talking_result text-center">
          <h4>温馨提示</h4>
          <p>系统异常，请返回重新咨询</p>
          <div class="link_btn_sysErrConfirm">
            <span class="link_confirm">确认</span>
          </div>
        </div>
      </div>
      <div class="popUp_unFinishedBillErr">
        <div class="talking_result text-center">
          <h4>温馨提示</h4>
          <p>您有订单未结束，请等待1分钟后再试</p>
          <div class="link_btn_unFinishedBillErrConfirm">
            <span class="link_confirm">确认</span>
          </div>
        </div>
      </div>
      	<div class=" payalert" >
					<div class="talking_result text-center">
						<p><mip-img  layout="responsive" width="20px" height="20px" src="tempbaidu/images/payok.png"></mip-img>支付成功</p>
						<div class="link_btn">
							<span id="gohome">再次提问</span>
							<span id="cleardpayalert" >查看订单</span>
						</div>
					</div>
				</div>
      <div class="popUp_unpaidErr">
        <div class="talking_result text-center">
          <h4>温馨提示</h4>
          <p>您有订单未支付，请支付后再咨询</p>
          <div class="link_btn_unpaidErrConfirm">
            <span class="link_confirm">确认</span>
          </div>
        </div>
      </div>
      <div class="loadingArea">
        <div class="loadingText">
          页面加载中...
        </div>
      </div>
    </mip-sina-rem>
  </mip-ilaw66-xzh-order>
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

