# mip-jjyy-msg

mip-jjyy-msg 用于提交联系方式的组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jjyy-msg/mip-jjyy-msg.js

## 示例

### 基本用法

```html
<style>
	.bordertwo{ border:2px solid #000000;height:20px;}
	#subTel{height:50px;writh:100px;background-color:#000000;}
</style>
    <div class="leavemsgBox"> 
     <p class="laveMsg-tit">在线留言</p> 
     <div class="laveMsg-srk"> 
      <mip-jjyy-msg popcontact="Mcontact3" poptel="Mtel3" popinfo="Minfo3" popbutton="Mbutton3" projectid="1234"> 
       <p contenteditable="true" name="Mcontact3" id="Mcontact3" validatetarget="meContact" validatetype="must" placeholder="请输入您的姓名~"></p> 
       <p contenteditable="true" name="Mtel3" id="Mtel3" validatetarget="meTel" validatetype="must" placeholder="请输入您的手机~"></p> 
       <p contenteditable="true" class="msgTxt" name="Minfo3" id="Minfo3" placeholder="请输入留言内容~"></p> 
       <span id="Mbutton3">提交留言</span> 
      </mip-jjyy-msg> 
     </div> 
    </div> 
   </div>
   
     <mip-jjyy-msg popcontact="" poptel="TelValue" popinfo="" popbutton="subTel" projectid="22222"> 
      <p class="bordertwo" contenteditable="true" name="TelValue" id="TelValue" validatetarget="username" validatetype="must" placeholder="请输入您的手机号码~"></p> 
      <span class="bordertwo" id="subTel" value="立即获取资料">提交留言</span> 
     </mip-jjyy-msg>
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