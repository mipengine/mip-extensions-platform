# mip-shouji56-code

mip-shouji56-code 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-shouji56-code/mip-shouji56-code.js

## 示例

### 基本用法
```html
<mip-shouji56-code website="mshouji56" catepath="/19/" type="news" url="http://pb.sys.pp8.com/api/op.ashx/getgzh" ids="1234">
    <div class="sm">
        <div class="qr">
    	    <mip-img src="" class="mip_img"></mip-img>
    	</div>
        <div class="text">
    	    <h4></h4>
    	    <strong></strong>
        </div>
    </div>
</mip-shouji56-code>
```

## 属性

### website

说明：站点名称,用于区分站点  
必选项：是  
类型：字符串


### catepath

说明：类别id  
必选项：否  
类型：字符串


### type

说明：新闻或软件  
必选项：是  
类型：字符串

### url

说明：接口地址  
必选项：是  
类型：字符串


### ids

说明：新闻或者软件id  
必选项：是  
类型：字符串