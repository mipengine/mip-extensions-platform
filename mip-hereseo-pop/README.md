# mip-hereseo-pop

mip-hereseo-pop 悬浮留言组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-hereseo-pop/mip-hereseo-pop.js

## 示例

### 基本用法
```html

<style>
	.bordertwo{ border:2px solid #FFFFFF;height:20px;}
	#Mbutton1{height:50px;writh:100px;background-color:#FFFFFF;}
</style>

<button on="tap:my-hereseo-pop.toggle" id="btn-open" role="button" tabindex="0">
    sOpen lightbox
</button>


<mip-hereseo-pop id="my-hereseo-pop" dwidth="0.9" layout="nodisplay" class="mip-hidden" divid="lightbox1" popcontact="" poptel="Mtel1" popinfo="" popbutton="Mbutton1" projectid="222223"> 
<div class="Bgbox"> 
 <div class="srkIMGBox" id="lightbox1"> 
  <div class="srkImgTit"> 
   <div>
	 马上联系项目招商经理
   </div> 
   <button on="tap:my-hereseopop1.toggle" role="button" tabindex="0" id="btn-open" class="close"></button> 
  </div> 
  <div class="srkIMG"> 
   <mip-img src="https://m.hereseo.net/r/www/mobile/img/form_left_img.png"> 
   </mip-img>
  </div> 
  <p class="srtSlogen">我们立即与您沟通</p> 
  <div contenteditable="true" type="text" name="meTel" id="Mtel1"  class="bordertwo" value="" validatetarget="username" validatetype="must" placeholder="请输入您的手机号码~"></div> 
  <span type="submit" id="Mbutton1"  class="bordertwo">点击免费通话</span> 
  <p class="srkTips">温馨提示：提交后，企业招商经理立即给您回拨~</p> 
 </div> 
</div> 
</mip-hereseo-pop>
```

## 属性

### mip-hereseo-pop

说明：一款弹出功能小组件
必选项：否


