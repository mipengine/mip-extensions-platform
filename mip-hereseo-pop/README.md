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
<button on="tap:my-hereseo-pop.toggle" id="btn-open" role="button" tabindex="0">
    sOpen lightbox
</button>

<mip-hereseo-pop   id="my-hereseo-pop"
    layout="nodisplay"
    class="mip-hidden"  Dwidth= '0.53'  divId = "lightbox" popContact="Mcontact" popTel="Mtel" popInfo="Minfo" popButton="Mbutton" projectId="123">
    <div class="lightbox" id="lightbox">       
	    <p contenteditable="true" id="Mcontact" placeholder="请输入您的手机号码~" ></p>  
	    <p contenteditable="true" id="Mtel" placeholder="请输入您的姓名~" ></p>
	    <p contenteditable="true" id="Minfo" placeholder="请输入您的手机号码~" ></p>
	    <span id="Mbutton" value="立即提交" ></span>   
    </div>
</mip-hereseo-pop>
 
```

## 属性

### mip-hereseo-pop

说明：一款弹出功能小组件
必选项：否


