# mip-code-msg

mip-code-msg 组件说明
获取股票当前价，涨跌幅，涨跌额，昨收，今开，最高，最低数据
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-code-msg/mip-code-msg.js

## 示例

### 基本用法
```html
<div class="mhq_top" >
			<div class="mhq_top_num">
			<div class="left" id="current_price">--</div>
			<div class="right">
				<span id="rise_fall_amount">--</span>
				<p id="zd_Rate_str">--</p>
			</div>
			<div class="clear"></div>
		</div>	
</div>
<div class="hq_nowTime" id="datetime">2018-08-3 09:44(北京时间)</div>
		<div class="m_hq_groups">
			<ul class="m_hq_group">
				<li>
				<p id="yestodEndPri">--</p> <span>昨收</span>
				</li>
				<li>
				<p id="todayStartPri">--</p> <span>今开</span>
				</li>
				<li>
					<p id="todayMax">--</p> <span>最高</span>
				</li>
				<li>
					<p id="todayMin">--</p> <span>最低</span>
				</li>
			</ul>
        </div>
</div>
<mip-code-msg   code='sh600330' >
</mip-code-msg>
```

## 属性

###code

说明：股票代码
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无

## 注意事项
id需要跟示例相同。
