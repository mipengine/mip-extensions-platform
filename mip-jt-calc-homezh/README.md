# mip-jt-calc-homezh

mip-jt-calc-homezh 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-jt-calc-homezh/mip-jt-calc-homezh.js

## 示例

### 基本用法
```html
<section class="mt20 mb20">
	<div class="index_tit">
		  <i class="icon"></i>
		  <h2>报价转换器</h2>
	 </div>
	<div class="tool_c2 bg_f5f5f5">
		<dl>
	    	<dt>
	    		<select class="select_01" id="keyfrom" name="from">
		              <option value="USD">美元/盎司</option>
		              <option value="CNY">人民币/克</option>
		              <option value="HKD">港元/港两</option>
		              <option value="TWD">台币/台两</option>
		              <option value="JPY">日元/克</option>
	            </select>
	            <i class="icon"></i>
	    	</dt>
	        <dd>
	            <input type="text" id="amount" name="amount" class="input_03" placeholder="请输入想要换算的金额">
	        </dd>
	    </dl>
	    <dl class="tool_d1">
	    	<dt>
	    		<select class="select_01" id="keyto" name="to">
					<option value="CNY">人民币/克</option>
					<option value="USD">美元/盎司</option>
					<option value="HKD">港元/港两</option>
					<option value="TWD">台币/台两</option>
					<option value="JPY">日元/克</option>
	            </select>
	            <i class="icon"></i>
	    	</dt>
	        <dd>
	            <input id="result" disabled="true" type="text" class="input_03" placeholder="0.00">
	        </dd>
	    </dl>
	    <dl class="m_too_btn">
			<dd>
				<div id="calculator">
					转换计算
				</div>
			</dd>
	    </dl>
	</div>
</section>

<mip-jt-calc-homezh></mip-jt-calc-homezh>
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

