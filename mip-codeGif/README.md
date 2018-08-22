# mip-codeGif

mip-codeGif 组件说明
股票分线，日线，周线，月线
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-codeGif/mip-codeGif.js

## 示例

### 基本用法
```html
<mip-codeGif    fullcode='sh600330'  codeType='A'  >
<div class="m_hq_titles">
			<span class="m_hq_title m_hq_title_act" id="min"
				>分时</span> <span
				class="m_hq_title"  id="daily">日线</span>
			<span class="m_hq_title" 
				id="weekly">周线</span> <span class="m_hq_title"
				 id="monthly">月线</span>
		</div>
		<div class="m_hq_images">
			
				<mip-img id="codeGitImg" 
					src="http://image.sinajs.cn/newchart/min/sh600330.gif"></mip-img>              	
</div>
</mip-codeGif>	
```

## 属性

###fullcode
说明：股票代码
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无

###codeType
说明：股票类型
必选项：是
类型：字符串
取值范围：A或H或M
单位：无
默认值：无



## 注意事项
无
