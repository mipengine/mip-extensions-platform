# mip-role-notice

mip-role-notice 滚动组件，加载后滚动这个dom

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-role-notice/mip-role-notice.js

## 示例

### 基本用法
```html
<style>
	mip-role-notice{ margin-bottom: 10px; margin-top: 10px;}
	.scroll-bar {margin-bottom: 10px;line-height: 25px;padding-right: 15vw;    font-size: 15px;}
	.scroll-bar * {display: inline-block;vertical-align: middle;}
	.scroll-bar .icon{width: 4vw;height: 4vw;margin-right: 1vw;margin-left: 1.2vw;background:url(http://qxmobi.test.q-dazzle.com/mobile_common/img/new-home/scroll-bar.png) center no-repeat;background-size: cover;}

</style>
<mip-role-notice speed="10">
    <span class="scroll-bar">
    	<i class="icon"></i>这是一行可以滚动的文字;这是一行可以滚动的文字;这是一行可以滚动的文字;这是一行可以滚动的文字;
    </span>
</mip-role-notice>
```

## 属性

### speed

说明：设置滚动速度
必选项：是
类型：字符串
取值范围：>0
单位：无
默认值：50

## 注意事项

