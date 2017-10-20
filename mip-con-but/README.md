# mip-con-but
mip-con-but 多功能控制按钮

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-con-but/mip-con-but.js
## 示例

### 多功能控制按钮
```html
<mip-con-but con-selecter="#selecter" con-type="shiwHide">点我</mip-con-but>
<section id="selecter" style="display:none;border:1px solid red;">
    <ul>
    	<li>1231232132</li>
    	<li>1231232132</li>
    	<li>1231232132</li>
    	<li>1231232132</li>
    	<li>1231232132</li>
    	<li>1231232132</li>
    	<li>1231232132</li>
    	<li>1231232132</li>
    	<li>1231232132</li>
    	<li>1231232132</li>
    </ul>
</section>
``` 

## 属性

### con-selecter
说明：控制目标的queryselecter
必选项：是
类型：string

### con-type
说明：控制方式
必选项：是
类型：string - 可选项 close(关闭)、shiwHide(显示隐藏)

