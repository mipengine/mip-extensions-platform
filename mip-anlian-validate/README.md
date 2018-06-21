# mip-anlian-validate

mip-anlian-validate 内部数据提交验证

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-anlian-validate/mip-anlian-validate.js

## 示例

### 基本用法
```html
<mip-anlian-validate>
    <div class="content2">
        <div class="content2_right">
            <h3>或者留下您的联系方式，安联量行会尽快联系您：</h3>
            <p>您的姓名 <input id="name" type="text"></p>
            <p>您的电话 <input class="input_phone" id="phone" type="text" placeholder="+86(singapore)"></p>
            <p>您的邮箱 <input id="email" type="text"></p>
        </div>
        <button id="submit">保存修改</button>
    </div>
    <div class="layer">请填写姓名</div>
</mip-anlian-validate>
```

## 属性


## 注意事项
内部数据提交验证，ajax提交地址需要修改
