# mip-taoge-scaydk

mip-taoge-scaydk 是wap.scaydk.com网业务逻辑组件

标题|内容
----|----
类型|通用
支持布局|不使用布局
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-taoge-scaydk/mip-taoge-scaydk.js

## 示例

### 基本用法
```html
<mip-taoge-scaydk
    qq-open-target="_blank"
    qq-url-type="3"
    sq-open-target="_blank"
    sq-site-id="xxxxxx"
    sq-user-id="xxxxxx"
    sq-browser-list="Baidu,Miui,MZ-MX"
    go-back-id="goback"
    >
</mip-taoge-scaydk>
```

## 属性

### qq-open-target

说明：QQ聊天窗口打开方式
必选项：是
类型：字符串
取值范围：_blank，_self,_top,_parent
默认值：_blank

### qq-url-type

说明：QQ聊天代码模式，1：tencent 2：http 3：mqqwpa
必选项：是
类型：整数
取值范围：1|2|3
默认值：3

### sq-open-target

说明：百度商桥聊天窗口打开方式
必选项：是
类型：字符串
取值范围：_blank，_self,_top,_parent
默认值：_blank

### sq-site-id

说明：百度商桥站点ID
必选项：是
类型：整数

### sq-user-id

说明：百度商桥用户ID
必选项：是
类型：整数

### sq-browser-list

说明：使用百度商桥的浏览器列表，多个浏览器用英文（,）分割
必选项：否
类型：字符串
默认值：Baidu,Miui,MZ-MX

### go-back-id

说明：返回上一级按钮元素ID
必选项：否
类型：字符串
默认值：goback

## 注意事项

聊天功能在元素上添加类名触发，商桥类名：ocmb，QQ类名：oqqc，拨打电话类名：tel。
商桥模式下默认优先使用QQ聊天模式，属性sq-browser-list中添加浏览器标示后，在该浏览器下使用商桥模式。