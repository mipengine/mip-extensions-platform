# mip-mylike-referrerurl

mip-mylike-referrerurl 组件说明

标题|内容
----|----
类型|通用
支持布局|N/S
所需脚本|https://c.mipcdn.com/static/v1/mip-mylike-referrerurl/mip-mylike-referrerurl.js

## 示例

### 基本用法
```html
<mip-mylike-referrerurl time='86400000' project='项目' hname='地区'></mip-mylike-referrerurl>
```

## 属性

### time

说明：存储的过期时间 
必选项：否  
类型：数字  
取值范围：>0  
单位：毫秒(ms)  
默认值：86400000

### 项目

说明：存储的项目 
必选项：否  
类型：字符串
取值范围：字符串   
默认值：项目

### 地区

说明：存储的地区
必选项：否  
类型：字符串  
取值范围：字符串  
默认值：地区

## 注意事项

### 储存变量列表

- `expiry` 过期时间。

- `referrerUrl` 来源URL。

- `firstEnterUrl` 着落页面URL(第一次访问页面)。

- `enterUrl` 当前页面。

- `project` 着落页面所属项目。

- `hname` 着落页面所属地区。