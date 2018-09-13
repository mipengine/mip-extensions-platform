# mip-zmall-login-data

mip-zmall-login-data 登录后请求数据

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-login-data/mip-zmall-login-data.js

## 示例

### 基本用法
```html
<mip-zmall-login-data src="path" on="loaded:xxx.xxx"></mip-zmall-login-data>
```

组件向外提供了 `load` 方法给其他组件调用，比方说，登录组件，登录成功后调该组件的 `load`

## 属性

### on  

数据加载后执行的事件，可以调用其他组件的方法

## 注意事项

