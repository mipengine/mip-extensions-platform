# mip-ask-pucker

120ask功能性组件

标题|内容
----|----
类型|广告
支持布局| N/S
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-ask-pucker/mip-ask-pucker.js

## 示例
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/> 
<title>一问多答-带标注</title>
<meta name="description" content="描述"/> 
<meta name="keywords" content="关键字"/>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /> 
<meta content="yes" name="apple-mobile-web-app-capable" />
<meta content="black" name="apple-mobile-web-app-status-bar-style" />
<meta content="telephone=no" name="format-detection" /> 
</head>
<body>
<style>
@charset "utf-8";
body,textarea,input,select,option {font-size:12px;color:#333;font-family:Arial,'微软雅黑',Tahoma,sans-serif;}h1,h2,h3,h4,h5,h6,input, textarea, select{font-size:100%;}body,h1,h2,h3,h4,h5,h6,blockquote,ol,ul,dl,dd,p,textarea,input,select,option,form {margin:0;}ol,ul,li,textarea,input,select,option,th,td {padding:0;}table {border-collapse:collapse;}ol,ul {list-style-type:none;}.clears:before,.clears:after {content:'';display:table;}.clears:after {clear:both;}.clears {*zoom:1;}.clear {clear:both;overflow:hidden;}a {text-decoration:none;color:#333;}a,textarea,input{outline:none}textarea {overflow:auto;resize:none;}.img img {display:block;}a img {border:none;}.z_index{position:fixed;_position:absolute;z-index:999;display:none;}label,label input{vertical-align:middle}.pr {position:relative;}.pa {position:absolute;}.fl {float:left;}.fr {float:right;}a:hover{text-decoration:none}body{word-break:normal;word-wrap:break-word;cursor:default;}input[type="checkbox"],input[type="text"],input[type="submit"],input[type="number"],input[type="tel"],textarea,button,input[type="button"]{-webkit-border-radius:0;border-radius:0;-webkit-appearance: none;}html, body, form,fieldset, p, div,h1, h2, h3, h4, h5, h6 {-webkit-text-size-adjust:none;}.d_box{display:-moz-box;display:-webkit-box;display:box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;width:100%;}html{font-size:62.5%;}body{font-size:1.2rem;width:100%;overflow-x:hidden;}i,var{font-style:normal;}.d_center{display: -webkit-box;display: -moz-box;display: box;-webkit-box-pack: center;-webkit-box-align: center;-moz-box-pack: center;-moz-box-align: center;box-pack: center;box-align: center;}.d_boxflex{-webkit-box-flex: 1;-moz-box-flex: 1;-ms-box-flex: 1;box-flex: 1;display:block;}.nowrap{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}b,i{font-style:normal;}.vm *{vertical-align: middle;}
img{display:block;}
body{background-color:#f5f5f5;max-width: 640px; margin: 0 auto;}
em,i,var{font-style: normal;}
.questionbox{padding:16px 17px 26px 17px; clear: both; overflow: hidden; background-color: #fff;}
.questionbox h1{font-weight: bold; display: block;font-size:24px;line-height:32px;}
.questionbox span{ display: block;color:#999;font-size:13px;padding-top:6px;}
.questionbox p{ display: block;line-height: 24px;padding-top:18px;font-size:16px;}
.questionbox .tag{ text-align: center; clear: both;}
.questionbox .tag a{ display: inline-block;line-height: 26px;padding:0 8px;border:1px solid #ccc;font-size:13px;margin:0 4px;}
.answerbox{ padding:16px 17px 0 17px;clear: both; overflow: hidden;background-color: #fff;margin-top:8px;}
.answerbox .ti{font-weight: normal; display: block;font-size:18px;}
.answerlist{ overflow: hidden; clear: both;padding-top:16px;border-top: 1px solid #f1f1f1;margin-top:10px;}
.answerlist .doc{ overflow: hidden; clear: both;}
.answerlist .doc img{ float: left; width:36px; height: 36px;border-radius: 50%;}
.answerlist .doc var{ color:#999;display: block;margin-left: 42px;font-size:13px;}
.answerlist .cont{position: relative; display: block;line-height: 24px;overflow:hidden;font-size:16px;padding:10px 0 0 0;margin-left: 42px;}
.answerlist .time{ display: block;color:#999;font-size:13px;margin-left:42px;padding:5px 0 16px 0;}
.answerlist .cont .showAll{background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 54%, rgb(255, 255, 255) 100%);position:absolute;right:0;bottom:0;padding:0 5px 0 60px;white-space:nowrap; display:inline-block;color:#888;padding-right:14px;}
.answerlist .cont .showAll:after{position:absolute;content:"";right:0;top:5px;border-top:1px solid #666;border-right:1px solid #666;width:8px;height:8px;-webkit-transform:rotate(135deg);-moz-transform:rotate(135deg);transform:rotate(135deg);}
.morelist{ display: block;margin-left: 42px;border-top: 1px solid  #f1f1f1; text-align: center;line-height: 44px;color:#666;font-size:13px;}
.morelist i{display:inline-block; vertical-align:2px;margin-left:4px;border-top:1px solid #666;border-right:1px solid #666;width:8px;height:8px;-webkit-transform:rotate(135deg);-moz-transform:rotate(135deg);transform:rotate(135deg);}
.reply-box{background-color: #f5f5f5;position:relative;border-radius: 4px;margin-left:42px;padding:10px;}
.reply-box::after{content: "";position: absolute;border-left: 10px solid #f5f5f5;left:20px;top:-12px;width: 0;height: 0;border-top: 10px solid transparent;border-bottom: 10px solid transparent;transform: rotate(-90deg);-webkit-transform: rotate(-90deg);-moz-transform: rotate(-90deg);}
.reply-box span{ display: block;color:#666;font-size:13px;}
.reply-box div{border-bottom: 1px solid #eee;}
.reply-box div:last-of-type{border: none;}
.reply-box .sick{background-color: #fff;padding:13px 10px;}
.reply-box .doc{background-color: #f5f5f5;padding:13px 10px;}
.reply-box .sick span{color:#90b277;}
.reply-box .doc span{color:#d7a584;}
.reply-box span var{ float: right;color:#999;font-size:12px;}
.reply-box p{ display: block;line-height: 20px;padding:6px 0;color:#666;font-size:14px;}
.answerlist .conHeight {height:96px;}
</style>
<div class="questionbox">
	<h1>我想带着我父母去北京玩的父母去北京玩一下父母去北京玩</h1>
	<span>2017-07-07　454人阅读</span>
	<p>导游你好，我想带着我的父母去北京玩一下，希望您给推荐几个老年人适合玩的景点！</p>
</div>
<div class="answerbox">
	<b class="ti">医生回答（5）</b>
	<div class="answerlist" id='askArea1'>
		<div class="doc">
			<img src="//u1.120askimages.com/9/3/8/57552839"/>
			<span>于雷</span>
			<var>主治医师　深圳第三人民医院</var>
		</div>
		<p class="cont">导游你好，我想带着我的父母去北京玩一下希望您给推荐几个老点希望您给推荐几个老年人适合玩的景点希望您给推荐几个老年人适合玩的景点我想带着我的父母去北京玩一下希望您给推荐几个老点希望您给推荐几个老年人适合玩的景点希望您给推荐几个老年人适合玩的景点<mip-ask-pucker class="showAll" ansArea='askArea1' ansAreaHeight="180" hiddparam="[{'type':'hide','target':'#ask1111'}]" showparam="[{'type':'show','target':'#ask1111'}]">展开</mip-ask-pucker></p>
		<var class="time">2017-07-07</var>
		<div class="reply-box" id='ask1111'>
			<div class="sick">
				<span>患者追问<var>2017-07-12　20:00</var></span>
				<p>导游你好，我想带着我的父母去北京玩一下，希望您给推荐几个老年人适合玩的景点希望您给推荐几个老年人适合玩的景点希望您给推荐几个老年人适合玩的景点希望您给推荐几个老年人适合玩的景点希望您给推荐几个老年人适合玩的景点希望您给推荐几个老年人适合玩的景点希望您给推荐几个老年人适合玩的景点！</p>
			</div>
			<div class="doc">
				<span>医生回答<var>2017-07-12　20:00</var></span>
				<p>导游你好，我想带着我的父母去北京玩一下，希望您给推荐几个老年人适合玩的景点！</p>
			</div>
			<div class="sick">
				<span>患者追问<var>2017-07-12　20:00</var></span>
				<p>导游你好，我想带着我的父母去北京玩一下，希望您给推荐几个老年人适合玩的景点！</p>
			</div>
			<div class="doc">
				<span>医生回答<var>2017-07-12　20:00</var></span>
				<p>导游你好，我想带着我的父母去北京玩一下，希望您给推荐几个老年人适合玩的景点！</p>
			</div>
		</div>
	</div>
	<div class="answerlist" id='askArea3'>
		<div class="doc">
			<img src="//u1.120askimages.com/9/3/8/57552839"/>
			<span>于雷</span>
			<var>主治医师　深圳第三人民医院</var>
		</div>
		<p class="cont">导游你好，我想带着我的父母去北京玩你好，我想你好，我想带着我的父母去北京玩带着我的父母去北京玩你好，我想带着我的父母去北京玩你好，我想带着我的父母去北京玩一下，希望您给推荐几个老年人适合玩的景点！<mip-ask-pucker class="showAll" ansArea='askArea3' ansAreaHeight="180">展开</mip-ask-pucker></p>
		<var class="time">2017-07-07</var>
	</div>
	
	<div class="answerlist" id='askArea5'>
		<div class="doc">
			<img src="//u1.120askimages.com/9/3/8/57552839"/>
			<span>于雷</span>
			<var>主治医师　深圳第三人民医院</var>
		</div>
		<p class="cont">导游你好，我想带着我的父母去北京玩你好，我想你好，我想带着我的父母去北京玩带着我的父母去北京玩你好，我想带着我的父母去北京玩你好<mip-ask-pucker class="showAll" ansArea='askArea5' ansAreaHeight="180">展开</mip-ask-pucker></p>
		<var class="time">2017-07-07</var>
	</div>
	<a class="morelist" href="###">展开更多<i></i></a>
</div>
</body>
</html>
```

## 属性

### ansArea
说明：回复区域
必填：是
格式：字符

### ansAreaHeight
说明：回复区域高度
必填：是
格式：数字

### hiddparam
说明：隐藏的参数配置
必填：是
格式：字符串

### showparam
说明：显示的参数配置
必填：是
格式：json串