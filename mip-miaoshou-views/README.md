# mip-miaoshou-views

mip-miaoshou-views 妙手医生统计MIP页面浏览次数组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-miaoshou-views/mip-miaoshou-views.js

## 示例

### 基本用法
```html
<mip-miaoshou-views tid="1" type="2" url="https://m.miaoshou.net" selectName="view-num"></mip-miaoshou-views>
```

## 属性

### tid

说明：帖子ID
必选项：是
类型：数字
取值范围：>0  
默认值：0


### type

说明：帖子类型
必选项：是
类型：数字
取值范围：1:普通文章; 2:音频; 3:视频
默认值： 1

### url

说明：请求url地址
必选项：是
类型：字符串

### selectName

说明：浏览次数ID选择器名称
必选项：是
类型：字符串
默认值：view_num