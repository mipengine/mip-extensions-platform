# mip-bdb-custom-content 

mip-bdb-custom-content 用来支持本地宝文章结尾的自定义内容版块显示

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-bdb-custom-content/mip-bdb-custom-content.js

## 示例

### 自定义内容版块
在MIP HTML中,直接使用标签, 用于展示文章结尾的自定义内容版块。示例如下:

```html
   <mip-bdb-custom-content 
	webdir="news" 
	url="http://m.cd.bendibao.com/news/240473.html"
	title="成都本地宝"
	type="mobile"
	>
	</mip-bdb-custom-content>

```


# 属性

### webdir

说明：当前调用页面的目录
必填：是


### url

说明：当前调用页面的网址
必填：是

### title

说明: 当前调用页面的标题
必填: 是

### type

说明: 调取内容类型
必填: 否，默认mobile
    