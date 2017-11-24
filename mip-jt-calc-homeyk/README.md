# mip-jt-calc-homeyk

mip-jt-calc-homeyk 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-jt-calc-homeyk/mip-jt-calc-homeyk.js

## 示例

### 基本用法
```html
<section class="mt20 mb20">
		<div class="index_tit">
			  <i class="icon"></i>
			  <h2>盈亏计算器</h2>
		 </div>
		<div class="tool_c bg_f5f5f5">
		    <dl>
				<dt class="fl">银行：</dt>
				<dd class="fl">
					<select name="areas" id="areas">
						<option selected="selected" value="14">民生银行</option>
						<option value="17">兴业银行</option>
						<option value="19">工商银行</option>
						<option value="">其他</option>
					</select>
					<i class="icon"></i>
				</dd>
		    </dl>
		    <dl>
				<dt class="fl">手续费(万分之)：</dt>
				<dd class="fl">
					<input type="text" value="14" name="area" maxlength="18" id="area" class=" input_text">
					<input type="hidden" value="14" name="people" id="people" class="input_text">
					<input type="hidden" value="17" name="job" readonly="readonly" id="job" class=" input_text">
					<input type="hidden" value="19" name="commerce" id="commerce" class="input_text">
					<input type="hidden" name="others" id="others" class=" input_text">
					<i class="icon"></i>
				</dd>
		    </dl>
		    <dl>
				<dt class="fl">品种：</dt>
				<dd class="fl">
					<select name="trade" id="trade">
						<option selected="selected" value="1000">AU T+D</option>
						<option value="1">AG T+D</option>
					</select>
					<i class="icon"></i>
				</dd>
		    </dl>
		    <dl>
				<dt class="fl">多空单：</dt>
				<dd class="fl">
					<select name="lists" id="lists">
						<option selected="selected" value="1">多单</option>
						<option value="-1">空单</option>
					</select>
					<i class="icon"></i>
				</dd>
		    </dl>
		    <dl>
				<dt class="fl">持仓手数：</dt>
				<dd class="fl">
					<input type="text" name="grapnum" maxlength="10" id="grapnum" class="input_02" placeholder="请输入持仓手数">
				</dd>
		    </dl>
		    <dl>
				<dt class="fl">开仓价格：</dt>
				<dd class="fl">
					<input type="text" name="openprice" id="openprice"  maxlength="10" class="input_02" placeholder="请输入开仓价格">
				</dd>
		    </dl>
		    <dl>
				<dt class="fl">平仓价格：</dt>
				<dd class="fl">
					<input type="text" name="ordinaryprice" maxlength="10" id="ordinaryprice" class="input_02" placeholder="请输入平仓价格">
				</dd>
		    </dl>
		    <dl class="m_too_result">
				<dt class="fl">盈亏结果：</dt>
				<dd class="fl">
					<input name="show" maxlength="15" id="show" type="text" class="input_02" value="0.0">
				</dd>
		    </dl>

		    <dl class="m_too_btn clearfix">
				<dd>
					<div id="calBtn" class="fl">
						计 算
					</div>
				</dd>
		    </dl>
		  </div>
	</section>

<mip-jt-calc-homeyk></mip-jt-calc-homeyk>
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

