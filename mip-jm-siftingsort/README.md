# mip-jm-siftingsort

mip-jm-siftingsort 组件说明
此组件用于菜单列表里进行筛选分类实现
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jm-siftingsort/mip-jm-siftingsort.js

## 示例

### 基本用法
```html
<mip-jm-siftingsort>
   <div class="side_left">
		<ul>
			
				<li class="side_left_active" data-pinyin="1">
					<a data-type="mip" href="#">
						<div class="side_left_img">
								<mip-img src="__UPLOAD__/category_image/wap_logo.png" alt=""></mip-img>
								<mip-img src="__MOBILE__/img/bar2.png" alt=""></mip-img>
						</div>
						<span></span>
					</a>
				</li>
		</ul>
	</div>
	<div class="side_right">
		<ul class="get_catelists">
			<li class="side_right_active">
				<a data-type="mip" href="/home">全部</a>
			</li>
			<li>
				<a data-type="mip" href="/home" class="product"></a>
			</li>
		</ul>
	</div>
</mip-jm-siftingsort>
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

