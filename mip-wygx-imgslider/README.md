# mip-wygx-imgslider

mip-wygx-imgslider 我要个性网头像栏目内容页图片展示

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-wygx-imgslider/mip-wygx-imgslider.js
## 示例

### 基本用法
```html
<mip-wygx-imgslider
data-app = true
data-appurl = "http://mip.woyaogexing.com/app/wygxw.apk"
data-nexturl = "http://mip.woyaogexing.com/touxiang/nv/2017/541178.html"
data-downText = "下载图片"
>
	<script id="mip-wygx-imgslider" type="application/json">
	{
		"items": [
			{"index":0,"src":"http://img.nr99.com/2017/04/24/25672d2252327195_600x600.jpg"},
			{"index":1,"src":"http://img.nr99.com/2017/04/24/79d98985fb2d061d_600x600.jpg"},
			{"index":2,"src":"http://img.nr99.com/2017/04/24/79d98985fb2d061d_600x600.jpg"},
			{"index":3,"src":"http://img.nr99.com/2017/04/24/79d98985fb2d061d_600x600.jpg"},
			{"index":4,"src":"http://img.nr99.com/2017/04/24/d55253269bd25466_600x600.jpg"},
			{"index":5,"src":"http://img.nr99.com/2017/04/24/79d98985fb2d061d_600x600.jpg"},
			{"index":6,"src":"http://img.nr99.com/2017/04/24/d55253269bd25466_600x600.jpg"},
			{"index":7,"src":"http://img.nr99.com/2017/04/24/79d98985fb2d061d_600x600.jpg"},
			{"index":8,"src":"http://img.nr99.com/2017/04/24/d55253269bd25466_600x600.jpg"}
		]
	}
	</script>
	<template type="mip-mustache" id="mip-template-id">
	<ul>
	{{#items}}
		<li class="size">
            <div class="box">
             <mip-img src={{src}} data-index={{index}}>
            </div>
        </li>
    {{/items}}
    </ul>
	</template>
</mip-wygx-imgslider>
<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
```

## 属性

### data-app

说明：是否显示APP推荐

必选项：否

类型：string

取值范围：true|false

默认值：false

### data-appurl

说明：APP推荐的下载地址,data-app 必须为true

必选项：否

类型：string

### data-nexturl

说明：下一页地址URL

必选项：否

类型：string

### data-downText

说明：下载图片文字

必选项：否

类型：string

## 注意事项
1. 组件必须引用mip-mustache.js作为模板渲染使用

