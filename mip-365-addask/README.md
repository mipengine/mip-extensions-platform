# mip-365-addask

mip-365-addask 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-365-addask/mip-365-addask.js

## 示例

### 基本用法
```html
<mip-365-addask type="0" lawyerId="0" cityId="510100" loginuser="0" islawyer="1">
    自定义内容，可以嵌套其他组件
	<div id="btnadd">
	<div>
		<mip-form url="http://m.64365.com/ask/askok.aspx">
			<textarea id="form_content" placeholder="请在此输入具体问题，以便律师回复更精准...">附加到三方吗，第三方吗，撒旦法撒旦法马发达发范德萨发 </textarea>
		</mip-form>
	</div>
	<div>
		<h5>简单解答，追问有限</h5>
		<div><button type="submit" value="" id="btn_addAsk" data-clicklog="addAsk" data-type="0">发布咨询</button>
		</div>
	</div></div>
	<div class="none" id="teleph">
    <p>
        <mip-form url="http://mip.64365.com/ask/ask.aspx">
            <input id="format_mobilePhone" type="text" placeholder="请输入手机号"/>
        </mip-form>
    </p>
    <p class="f12 s-cbbb mt10">律师回复后将第一时间短信通知您，请认真填写。</p>
    <p class="p20">
        <button value="" id="btn_authentication" type="submit"
                data-clicklog="authentication">
            完成
        </button>
    </p>
</div>
</mip-365-addask>
```

## 属性

### type

说明：咨询类型
必填：是
格式：数字

### lawyerId

说明：律师id
必填：是
格式：数字

### cityId

说明：城市ID
必填：是
格式：数字

### loginuser
说明：登录用户ID
必填：是
格式：数字

### islawyer
说明：是否是律师
必填：是
格式：数字

## 注意事项

