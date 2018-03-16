# mip-53pop

mip-53pop 一款弹出功能小组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-53pop/mip-53pop.js

## 示例

### 基本用法
```html
<button on="tap:my-53pop.toggle" id="btn-open" role="button" tabindex="0">
    sOpen lightbox
</button>

<mip-53pop   id="my-53pop"
    layout="nodisplay"
    class="mip-hidden"  Dwidth= '0.53'  divId = "lightbox" popContact="Mcontact" popTel="Mtel" popInfo="Minfo" popButton="Mbutton" projectId="123">
    <div class="lightbox" id="lightbox">       
       <input type="text" id="Mcontact" value="" />
       <input type="text" id="Mtel" value="" />       
       <input type="text" id="Minfo" value="" />
       <input type="button" id="Mbutton" value="立即提交" />     
    </div>
</mip-53pop>
 
```

## 属性

### mip-53pop

说明：一款弹出功能小组件
必选项：否


