# mip-liveinau-loginRedirect

mip-liveinau-loginRedirect 登录成功跳转页面

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-liveinau-loginRedirect/mip-liveinau-loginRedirect.js

## 示例

### 基本用法
```html
<mip-liveinau-loginRedirect id="aa">


<mip-form method="post" on="submitSuccess:aa.rediret(1,https://www.baidu.com)" url="http://localhost:64721/web/Assess.aspx?assessFlag=1" fetch-url="http://localhost:64721/web/Assess.aspx?assessFlag=1">
    <input type="text" name="name" placeholder="姓名">
    <div submit-success>
        <template type="mip-mustache">
            Success! Thanks for {{name}} trying the mip demo.
        </template>
    </div>
    <div submit-error>
        <template type="mip-mustache">
            Error!.
        </template>
    </div>
    <input type="submit" value="提交">
 </mip-form>

</mip-liveinau-loginRedirect>
<script src="https://c.mipcdn.com/static/v1/mip-form/mip-form.js"></script>
```

## 属性

id
说明：引用组件的id
必选项：是
类型：{类型}
取值范围：无
单位：字符串
默认值：无

## 注意事项
无
