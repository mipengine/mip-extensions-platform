# mip-ilaw66-helpflow

mip-ilaw66-helpflow 组件说明
1,调用接口遍历卡种类详情
2,获取从哪个页面进入的，卡券列表页需要调用接口
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-helpflow/mip-ilaw66-helpflow.js

## 示例

### 基本用法
```html
<mip-ilaw66-helpflow>
    <input type="hidden" id="_csrf" th:name="${_csrf.parameterName}" th:value="${_csrf.token}"/>
	<input type="hidden" id="channel" name="channel" th:value="${session.channel}" />
    <div class="header_block">
		<span class="glyphicon glyphicon-menu-left pull-left helpBack" style="left:5px" ></span>操作流程
	</div> 	
	<div class="topbg_useflow topbg_useflow4">
		<mip-img data-original="images/whitepaper/useflow5.png" class="banner" src="images/whitepaper/useflow5.png" height="200px" border="0"></mip-img>

	</div>
    <div class="topbg_useflow topbg_useflow5">
        <mip-img data-original="images/whitepaper/donationflow1.png" class="banner" src="images/whitepaper/donationflow1.png" height="200px" border="0"></mip-img>
        <mip-img data-original="images/whitepaper/donationflow2.png" class="banner" src="images/whitepaper/donationflow2.png" height="200px" border="0"></mip-img>
        <mip-img data-original="images/whitepaper/donationflow3.png" class="banner" src="images/whitepaper/donationflow3.png" height="200px" border="0"></mip-img>
        <mip-img data-original="images/whitepaper/donationflow4.png" class="banner" src="images/whitepaper/donationflow4.png" height="200px" border="0"></mip-img>
        <mip-img data-original="images/whitepaper/donationflow5.png" class="banner" src="images/whitepaper/donationflow5.png" height="200px" border="0"></mip-img>
    </div>
</mip-ilaw66-helpflow>
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

