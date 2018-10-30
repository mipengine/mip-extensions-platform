# mip-winman-rem

mip-winman-rem 本组件用于移动端css3 rem单位适配 比例为 100:1，比如设计稿上div的宽度为200px,则相应的css应设为 width:2rem;

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed,flex
所需脚本|https://c.mipcdn.com/static/v1/mip-winman-rem/mip-winman-rem.js

## 示例
<style mip-custom>
    /* 自定义样式 */
   	.rem{
    		width: 7.5rem;
    		height: 3rem;
    		line-height: 3rem;
    		background-color: #0000FF;
    		color: #fff;
    		text-align: center;
    		font-size: 0.2rem;
    		margin: 20% auto;
    	}
</style>

### 基本用法
```html
  <div class="rem">
 	 <mip-winman-rem>666</mip-winman-rem>
  </div>
```
## 注意事项
必须在head引用|https://c.mipcdn.com/static/v1/mip-winman-rem/mip-winman-rem.js
