# mip-sytown-ad

mip-sytown-ad 尚一堂广告组件

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-sytown-ad/mip-sytown-ad.js

## 示例

### 普通用法

```html
<mip-sytown-ad ad-id="详情id" type="类型"></mip-sytown-ad>
```

### 嵌套mip-ad

```html
<mip-sytown-ad ad-id="详情id" type="类型">
	<div class="mip-adbd">
	    <mip-ad layout="responsive" type="ad-baidu" cproid="u1234567"></mip-ad>
	</div>
</mip-sytown-ad>
```

## 属性

### ad-id

说明：详情页的id  
必选项：是
类型：字符串

### type

说明：文章类型
必选项：是  
类型：数字  
取值范围：文章：1, 视频：2, 音频：3 

## 注意事项  

mip-sytown-ad中嵌套mip-ad组件，默认展示mip-ad广告, 当接口返回数据后显示mip-sytown-ad广告

