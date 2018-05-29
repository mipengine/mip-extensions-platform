# mip-linkeddb-sign

mip-linkeddb-sign 登录

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkeddb-sign/mip-linkeddb-sign.js

## 示例

### 基本用法
```html
<mip-linkeddb-sign>
    <div class="user-avatar"><a href="{% if Front_USER %}###{% else %}/sign_in/{% endif %}"><mip-img layout="responsive" src="{{Front_USER.img or 'https://static.linkeddb.com/m/images/user-avatar.png'}}" width="50" height="50" alt=""></mip-img></a></div>
</mip-linkeddb-sign>
``