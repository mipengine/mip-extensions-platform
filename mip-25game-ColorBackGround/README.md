# mip-25game-ColorBackGround

通过icon动态获取色块生成渐变背景色

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-25game-ColorBackGround/mip-25game-ColorBackGround.js

## 示例

### 基本用法
```html
<mip-25game-ColorBackGround elementid="icon" defaultcolor="#5d9cec">
		<mip-img width="96" height="96" id="icon" style="margin:50px;" src="https://file.25game.com/upload/icon/2016/03/31/37831aebbe50.png"></mip-img>
</mip-25game-ColorBackGround>
```

## 属性

### elementid

说明：需要取色的图片Id
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无

### defaultcolor

说明：取不到颜色值时使用
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无

## 注意事项

