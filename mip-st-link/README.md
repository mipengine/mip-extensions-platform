# mip-st-link

mip-st-link 在SF环境下使用loadiframe的方式打开连接

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-st-link/mip-st-link.js

## 示例

### 基本用法

```html
<mip-st-link data-id="mylink" data-title="标题">
    <a id="mylink" href="https://baidu.com" data-type="mip">
        <!-- 自定义内容 -->
    </a>
</mip-st-link>
```

## 属性

### data-con

说明：登录UI所需的父容器id
必选项：是
类型：string
默认值：无

### data-id

说明：组件内需要跳转的A标签的id
必选项：是
类型：string
默认值：无

### data-title

说明：需要跳转到的页面的标题
必选项：是
类型：string
默认值：无

## 注意事项

该跳转只在SuperFrame 里生效

