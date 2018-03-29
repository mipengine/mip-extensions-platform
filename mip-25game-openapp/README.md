# mip-25game-openapp

安装了app直接唤起app，如果没安装跳转到下载页面

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-25game-openApp/mip-25game-openapp.js

## 示例

### 基本用法
```html
<mip-25game-openapp scheme="aiwugame://AppDetail?AppId=13465" downurl="https://m.25game.com/Market.html" >唤起app或下载</mip-25game-openapp>
```

## 属性

### scheme

说明：唤起app的scheme
必选项：是
类型：超链接
取值范围：无
单位：无
默认值：无

### downurl

说明：App下载地址
必选项：是
类型：超链接
取值范围：无
单位：无
默认值：无

## 注意事项

