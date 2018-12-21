# mip-component-liuyan

mip-component-liuyan 用于公司留言组件弹出和数据提交

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-component-liuyan/mip-component-liuyan.js

## 示例

### 基本用法
```html
<mip-component-liuyan id='liuyanbox' data-type='liuyan'>
<form class="liuyan box">
    <input type='hidden' class='hidden' name='UserID' value='1224'>
    <div class="box-title">
        Title
        <em class="close hidden" ></em>
    </div>
    <div class="liuyan-form">
        <div class="line">
            <p class="k-v">
                <span>姓名</span>
                <input type="text" name="Name" />
            </p>
            <p class="radio">
                <label>
                    <input type="radio" name="Sex" value="先生" checked="checked" />先生</label>
                <label>
                    <input type="radio" name="Sex" value="女士" />女士</label>
            </p>
        </div>
        <p class="k-v">
            <span>手机</span>
            <input type="text" name="Phone"  maxlength="11"/>
        </p>
        <p class="k-v">
            <span>留言</span>
            <input type="text" name="Content" />
        </p>
        <p class="checkbox">
            <input type="checkbox" checked="checked" name="tiaokuan">
            <label for="tiaokuan">
                我已阅读并同意 《 <a class="font-red" href="#" >XX网服务条款</a>》
            </label>
        </p>
        <p>
            <button type="button" class="btn-default submit">提交咨询</button>
        </p>
    </div>
</form>
<div class="animate mask"></div>
</mip-component-liuyan>
```

## 属性

### data-type 

说明：弹出框的类型
必选项：是
类型：字符串
取值范围：freetalk | liuyan
默认值：无

## 注意事项

