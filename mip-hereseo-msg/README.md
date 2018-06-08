# mip-hereseo-msg

mip-hereseo-msg 用于提交联系方式的组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-hereseo-msg/mip-hereseo-msg.js

## 示例

### 基本用法

```html
    <div class="leavemsgBox"> 
     <p class="laveMsg-tit">在线留言</p> 
     <div class="laveMsg-srk"> 
      <mip-hereseo-msg popcontact="Mcontact3" poptel="Mtel3" popinfo="Minfo3" popbutton="Mbutton3" projectid="1234"> 
       <p contenteditable="true" name="Mcontact3" id="Mcontact3" validatetarget="meContact" validatetype="must" placeholder="请输入您的姓名~"></p> 
       <p contenteditable="true" name="Mtel3" id="Mtel3" validatetarget="meTel" validatetype="must" placeholder="请输入您的手机~"></p> 
       <p contenteditable="true" class="msgTxt" name="Minfo3" id="Minfo3" placeholder="请输入留言内容~"></p> 
       <span id="Mbutton3">提交留言</span> 
      </mip-hereseo-msg> 
     </div> 
    </div> 
   </div>
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