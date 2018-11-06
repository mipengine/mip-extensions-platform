# mip-qz-fadan

mip-qz-fadan 组件说明

标题|内容
----|----
类型|订制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-qz-fadan/mip-qz-fadan.js

## 示例

### 基本用法
```html
<mip-qz-fadan address="address" name="name" phone="phone" size="mianji" area="xiaoqu" url="http://baidu.com" btnText="立即获取">
   
</mip-qz-fadan>
```

## 属性

### address

说明：用户地址 
必选项：否
类型：字符串

### name

说明：用户名
必选项：否  
类型：字符串  

### phone

说明：电话号码
必选项：否
类型：字符串,数字

### size

说明：用户输入房屋面积
必选项：否
类型：数字
取值范围: >0 && <1000

### area

说明：用户所在小区
必选项：否  
类型：字符串 

### btnText

说明：提交按钮文案
必选项：是  
类型：字符串 

### url

说明：表单提交地址
必选项：是  
类型：字符串 