# mip-zol-commenter

评论发布模块

标题|内容
----|----
类型|业务
支持布局|N,S|
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-zol-commenter/mip-zol-commenter.js

## 示例

### 基本用法
```html
<mip-zol-commenter class="write-box" id="write-box">vivo X20全面屏 邀您说点什</mip-zol-commenter>
```

## 属性

### data-maxlength: 200
说明：评论最大长度
必选项：否
类型：数字
取值范围：> 0
默认值：200

### data-minlength: 4
说明：评论最小长度
必选项：否
类型：数字
取值范围：> 0
默认值：4

### data-data-xxx: ''
说明：提交评论时的追加信息,name="xxx"
必选项：否
类型：字符串
默认值：''

### data-onSuccess: null
说明：评论成功后的回调函数
必选项：否
类型：函数
默认值：null

### data-onBeforeSubmit: null
说明：提交评论之前处理数据的回调函数
必选项：否
类型：函数
默认值：null
