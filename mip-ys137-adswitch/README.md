# mip-ys137-adswitch

mip-ys137-adswitch 控制广告展现

标题|内容
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://mipcache.bdstatic.com/extensions/platform/v1/mip-ys137-ad/mip-ys137-adswitch.js

#adHTML,start_date,end_date,keyword,path,defaultHTML

## 示例

### 使用
```html
<mip-ys137-adswitch
 adhtml='我是广告' 
 defaulthtml='默认广告' 
 startdate='2018-04-08 17:23:20'
 enddate='2018-04-08 17:23:50'
 keyword=''
 path=''>
</mip-ys137-adswitch>
```

## 属性

### startdate

说明：广告开始时间，格式为YYY-MM-DD HH:ii:ss
必选项：否
类型：字符串
取值范围：无
默认值：''

### enddate

说明：广告结束时间，格式为YYY-MM-DD HH:ii:ss
必选项：否
类型：字符串
取值范围：无
默认值：''

### keyword

说明：标题中出现有相关词时展现，多个词之间用英文逗号分隔，如：血糖,淋巴,胃疼
必选项：否
类型：字符串
取值范围：无
默认值：''

### path

说明：指定路径展现，相对路径，如：/slys/，表示此目录下时才展现广告，多个目录之间用英文逗号分隔
必选项：否
类型：字符串
取值范围：无
默认值：''

