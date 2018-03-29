# mip-pcgroup-user

mip-pcgroup-user 太平洋网络判断登录组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-pcgroup-user/mip-pcgroup-user.js

## 示例

### 基本用法
```html
<mip-pcgroup-user data-site="pconline">
    这里不放任何内容，把本组件放在body靠前的位置，保证首屏能立即执行
</mip-pcgroup-user>
```

## 属性

### data-site

说明：太平洋网站标志
必选项：是
类型：字符
取值范围：pconline|pcauto|pclady|pcbaby|pchouse|geeknev
默认值：pconline

## 注意事项
1、组件要放在body靠前的位置，保证第一时间就能执行，获取成功后，会将数据保存到window.PCGROUND_USER_INFO对象里，包含id、nickName、head三个字段。如果id>0就表示已经登录
2、因为有网络延迟问题，后面的组件不能直接实时关联这个全局对象，要在点击事件或用户触发时再判断是否登录