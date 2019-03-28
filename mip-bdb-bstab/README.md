# mip-bdb-bstab 

mip-bdb-bstab 多层关联条件内容切换

标题|内容
----|----
类型|定制
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-bdb-bstab/mip-bdb-bstab.js

## 示例

### 多层条件切换
```html
<mip-bdb-bstab>

    <div class="checkbox cond-49 block"><b>请选择 ：</b><span class="selected" data-id="73">往来港澳通行证</span><span data-id="74">前往港澳通行证</span></div>
	<div class="checkbox cond-73 block"><b>请选择 ：</b><span class="selected" data-id="63">证件</span><span data-id="64">签注</span></div>
	<div class="checkbox cond-63 block"><b>请选择 ：</b><span class="selected" data-id="65">首次办理</span><span data-id="68">补办</span>></div>
	<div class="checkbox cond-65 block"><b>请选择 ：</b><span class="selected" data-id="70">本地户籍</span><span data-id="71">省内异地</span></div>
	
	<div class="banshi-box banshi-70 block">
	  <div id="channelTab" class="channelTab">
		<ul class="nav-content">
		  <li class="cur"><span>指南</span></li>
		  <li><span>预约</span></li>
		  <li><span>关键</span></li>
		  <li><span>网点</span></li>
		  <li><span>问答</span></li>
		  <li><span>材料</span></li>
		</ul>
	  </div>
	  <div class="channel_block">
		<p> <strong>㈠办理往来港澳通行证条件</strong> </p>
	  </div>
	  <div class="channel_block none">
		  <p>预约入口</p>
	  </div>
	  <div class="channel_block none">
		<p> <strong><span>出入境证件同寄便民服务温馨提示</span></strong> </p>
	  </div>
	  <div class="channel_block banshi-wandian none">
		<p class="wdmore">查看更多网点</p>
	  </div>
	  <div class="channel_block none">
		  <p>办理港澳通行证可以微信/支付宝付款吗?</p>
	  </div>
	  <div class="channel_block none">
		  <p>《出入境证件相片照相指引》</p>
	  </div>
	</div>
	
	<div class="banshi-box banshi-71 none">
	  <div id="channelTab" class="channelTab">
		<ul class="nav-content">
		  <li class="cur"><span>指南</span></li>
		  <li><span>预约</span></li>
		  <li><span>关键</span></li>
		  <li><span>网点</span></li>
		  <li><span>问答</span></li>
		  <li><span>材料</span></li>
		</ul>
	  </div>
	  <div class="channel_block">
		<p> <strong>㈠办理往来港澳通行证条件</strong> </p>
	  </div>
	  <div class="channel_block none">
		  <p>预约入口</p>
	  </div>
	  <div class="channel_block none">
		<p> <strong><span>出入境证件同寄便民服务温馨提示</span></strong> </p>
	  </div>
	  <div class="channel_block banshi-wandian none">
		<p class="wdmore">查看更多网点</p>
	  </div>
	  <div class="channel_block none">
		  <p>办理港澳通行证可以微信/支付宝付款吗?</p>
	  </div>
	  <div class="channel_block none">
		  <p>《出入境证件相片照相指引》</p>
	  </div>
	</div>
	
</mip-bdb-bstab>
```


