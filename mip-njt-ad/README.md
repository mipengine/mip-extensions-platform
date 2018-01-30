# mip-njt-ad

mip-njt-ad 组件说明

标题|内容
----|----
类型|不通用
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-njt-ad/mip-njt-ad.js

## 示例

### 基本用法
```html
//组件
<mip-njt-ad 
	ajaxXml='/adm/15.xml'
	ajaxIp='/API/IP.ashx?action=js'
	pagename='procategory'
	ptypeid='7881'
	pcategoryid='93706'
	adplace='m_b1,m_b2'></mip-njt-ad>
//投放广告的元素
<div id="m_b1"></div>
```

## 属性

### {属性名}
>ajaxXml

说明：xml文件地址链接

必选项：否

类型：字符串

默认值：'/adm/15.xml'

>ajaxIp

说明：ip获取，不填不匹配地理位置定向策略

必选项：否

类型：字符串

默认值：无

>pagename

说明：广告投放的条件

必选项：是

类型：字符串

>ptypeid

说明：广告投放的条件

必选项：是

类型：字符串

>pcategoryid

说明：广告投放的条件

必选项：是

类型：字符串

>adplace

说明：广告投放的位置（元素id以“，”隔开）

必选项：是

类型：字符串

默认值：['m_b1']

## 注意事项

非通用

