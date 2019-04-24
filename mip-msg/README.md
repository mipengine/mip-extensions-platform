# mip-msg

mip-msg 用于提交联系方式的组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-msg/mip-msg.js

## 示例

### 基本用法

```html
<mip-msg popContact="Mcontact" popTel="Mtel" popInfo="Minfo" popButton="Mbutton" projectId="123">
	<p contenteditable="true" id="Mcontact" placeholder="请输入您的手机号码~" ></p>  
    <p contenteditable="true" id="Mtel" placeholder="请输入您的姓名~" ></p>
   
    <p contenteditable="true" id="Minfo" placeholder="请输入您的手机号码~" ></p>
    <span id="Mbutton" value="立即提交" ></span>
</mip-msg>
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

