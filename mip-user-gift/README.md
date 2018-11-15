# mip-user-gift

mip-user-gift 领取礼包按钮

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-user-gift/mip-user-gift.js

## 示例

### 基本用法
```html
<style>
	span.welfare_download_a {
		line-height: 47px;
		display: inline-block;
		vertical-align: middle;
		text-align: center;
	}

	@media screen and (max-width: 500px){
		.welfare_detail span.welfare_download_a {
			line-height: 34px!important;
			margin-top: -34px;
		}
	}

	@media screen and (max-width:320px) {
		span.welfare_download_a{    width: 25%!important;}
	}
	.welfare_download_a mip-download-game,.welfare_download_a mip-user-gift{
				color: #fff;
			    padding: 3px 10px; 
			    border-radius: 5px;
			    line-height: 20px;
			    display: inline-block;
			    width: 100%;
			}
	.welfare_download_a .have_getten{ /*已领取*/
			    background-color: #bbb;
			}
	.rec_gift_mask{display: none;}
	.rec_gift_mask,.change-rec_gift_mask{
		display: none;
		width: 100%;
		height: 200%;
		background-color: rgba(0, 0, 0, .2);
		/* position: fixed; */
		position: absolute;
		top: 0;
		left: 0; 
		z-index: 1000;
	}
	.rec_gift_mask .rec_tip{
		width: 80%;
		height: auto;
		background-color: #fff;
		border-radius: 5px;
		border:1px solid #cecece;
		position: fixed;
		top: 20%;
		left: 50%;
		margin-left: -40%;
		padding-top: 20px;
	}
	/*.rec_gift_mask .rec_tip .dis_received{display:none;}*/
	.rec_tip .copy {
		width: 80%;
		margin:0 auto;  
	}
	.rec_tip .copy .code {
		    margin: 0 auto;
		width: 180px;
		height: 30px;
		border: 1px solid #e0e0e0;
		color: #666;
	}
	.rec_tip .copy .code:focus {
		box-shadow: 0px 0px 5px #7fd4cd;
		border: 1px solid #7fd4cd;
	}
	.rec_tip .copy .btn {
		background: #1ea4f2;
		width: 60px;
		height: 30px;
		border: #e0e0e0;
		color: #fff;
		cursor: pointer;
		border-radius: 3px;
	}
	.copy .btn:hover{
		background: #4289e0;
	}
	.rec_tip .title{
	    text-align: center;
		position: absolute;
		top: 0;
		width: 100%;
		background-color: #e9e9e9;
		/*padding: 8px 0 4px 44px;*/
		border-radius: 5px 5px 0 0;
		background-image: url(../img/logoicon_01.png);
		background-position:16px center;
		background-repeat: no-repeat;
	}
	.rec_tip .title span{
		display: inline-block;
		color: #3c3c3c;
		font-size: 14px;
		line-height: 26px;
	}   
	.rec_tip .title div{
		display: inline-block;
		position: absolute;
		right: 15px;
		top: 0;
		font: 16px "Comic Sans MS",Arial,Helvetica,sans-serif;
		cursor: pointer;    
	}

	.rec_tip p{
		text-align: center;
		width: 100%;
		margin:10px auto;
		margin-top: 24px;
		font-size:12pt;
		font-weight:bold;
		color:#333;
	}
	.copy p{
		width: 100%;
		margin:15px auto;
		font-size:12pt;
		color:#333;
	}
	.rec_tip .rec_tip_sure{
		color: #fff;
		background: #1ea4f2;
		display: block;
		border-radius: 3px;
		width: 44%;
		height: 30px;
		text-align: center;
		line-height: 30px;
		margin:15px auto;
		font-size:12pt;
		cursor:pointer;
	}
	.rec_tip .rec_tip_sure:hover{
		background: #4289e0;
	}

	.received{
		width: 100%;
		height: 84%;
	}
	.hide{display:none!important;}
	.received img{
		margin: 0px auto;
	}
	.mip-close-btn{
				    display: inline-block;
				    position: absolute;
				    right: 15px;
				    top: 0;
				    font: 16px "Comic Sans MS",Arial,Helvetica,sans-serif;
				    cursor: pointer;
			}
	mip-close-dom.close-btn{background-color:blue;}
</style>

<span class="welfare_download_a">
	<mip-user-gift class="have_getten" gift_id="9" mobile_domain="http://127.0.0.1/qdazzle_home/mobile/">已领取</mip-user-gift>
</span>


<div class="rec_gift_mask close-section" id="rec_gift_mask">
<mip-close-dom class="close-btn" target="outer"></mip-close-dom>
	<div class="rec_tip">
		<div class="title">
			<span>温馨提示</span>
			<mip-close-btn close-target="rec_gift_mask" class="mip-close-btn">X</mip-close-btn>
		</div>
		<div class="received" >
			<p id="received">您已经领取过了！</p>
			<mip-img src="http://qxmobi.test.q-dazzle.com/mobile_common/img/received.jpg?=1541692800" alt=""></mip-img>
			<mip-close-btn close-target="rec_gift_mask"  class="rec_tip_sure">确定</mip-close-btn>
		</div>
		<div class="dis_received hide">
			<p id="receive_msg">恭喜您领取成功！</p>
			<div class="copy">
				<p>长按复制礼包码</p>
				<div class="code" id="gift_code"></div>	
			</div>
			<mip-close-btn close-target="rec_gift_mask" class="rec_tip_sure">确定</mip-close-btn>
		</div>
	</div>
</div>

<script src="https://c.mipcdn.com/static/v1/mip-close-btn/mip-close-btn.js"></script>
```

## 属性

### gift_id

说明：礼包的游戏id
必选项：是
类型：string
默认值：无


### mobile_domain

说明：礼包域名
必选项：是
类型：string
默认值：无

## 注意事项

