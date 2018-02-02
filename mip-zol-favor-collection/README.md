# mip-zol-favor-collection

请求

标题|内容
----|----
类型|业务
支持布局|N,S|
所需脚本|https://c.mipcdn.com/static/v1/mip-zol-favor-collection/mip-zol-favor-collection.js

## 示例

### 基本用法
```html
<mip-zol-favor-collection data-check-url="" data-favor-url="" data-favor-flag="type" data-actions='[1,2]' data-data='{}' data-favored-class=""></mip-zol-favor-collection>
```

## 属性

### data-check-url

说明：检查收藏状态的地址
必选项：是
类型：string

### data-favor-url

说明：提交收藏操作的地址
必选项：是
类型：string

### data-favor-flag

说明：提交收藏操作的字段名称
必选项：是
类型：string

### data-actions

说明：提交收藏操作的操作标志
必选项：是
类型：string

### data-data

说明：提交收藏操作的附加数据
必选项：否
类型：json

### data-favored-class

说明：收藏后追加的class
必选项：是
类型：string

### [data-name="favor-config"]
说明：包含此属性名的script/json数据，做数据提交时作为附加数据提交给后端
必选项：否
类型：json对象

### data-data-xxx
说明：此类型的数据可用作提交数据时的附加数据，自动转换为xxx:value形式
必选项：否
类型：字符串
