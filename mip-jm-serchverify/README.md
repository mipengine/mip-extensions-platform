# mip-jm-serchverify

mip-jm-serchverify 组件说明
此组件结合mip-form组件进行表单提交并验证，验证通过则提交至服务器。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jm-serchverify/mip-jm-serchverify.js

## 示例

### 基本用法
```html
<mip-jm-serchverify>
    <div class="header_search">
		<mip-form method="post" url="xxx/Project/search">
			<input type="search" name="name" class="input_search search" placeholder="输入项目/品牌关键字">
			<button class="serbtn" type="button">提交</button>
		</mip-form>
	</div>
</mip-jm-serchverify>
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

