# mip-xiandu-showmorebtn

mip-xiandu-showmorebtn 点击加载更多内容

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-xiandu-showmorebtn/mip-xiandu-showmorebtn.js

## 示例

### 基本用法
```html
<table id="tbList">
<tr>
<td>td1</td>
</tr>
</table>
<mip-xiandu-showmorebtn class="showmorebtn" target="tbList"  jsurl="http://localhost:60822/" pagecount="1">
   <div style="width:100px;height:50px" id="divMore">点击加载</div>
</mip-xiandu-showmorebtn>
```

## 属性

### target
说明：指向需要加载更多的dom的id
必选项：是
类型：字符串
取值范围：控件id
默认值：tbList 

 

### jsurl
说明：当前调用js所在目录或http地址
必选项：是
类型：字符串 
默认值：tbList 

 

### pagecount
说明：总页数
必选项：是
类型：字符串 
默认值：tbList 
