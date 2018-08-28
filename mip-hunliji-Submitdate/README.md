# mip-hunliji-Submitdate

mip-hunliji-Submitdate 用户提交预约信息

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hunliji-Submitdate/mip-hunliji-Submitdate.js

## 示例

### 基本用法
```html
<mip-hunliji-Submitdate data-url="//api.hunliji.com/p/wedding/web/baidu/MakeAppointment" data-type='hotel' data-id='147853'>
    <div class="mipfrom">
        <div class="open_box_div"><span>姓名：</span><input type="text" name="fullname" placeholder="请输入真实姓名"></div>
        <div class="tishi_box name_box">姓名不能为空</div>
        <div class="open_box_div"><span class="spanbox">查询日期</span><input type="date" name="time" ></div>
        <div class="tishi_box"></div>
        <div class="open_box_div"><span>联系电话：</span><input type="number" name="phone_num" placeholder="请输入您的联系电话"></div>
        <div class="tishi_box phone_box">请输入正确的联系电话</div>
        <input type="submit" value="提交" class="open_box_submit">
    </div>
    <div id="open_tips">
        <p></p>
    </div>
</mip-hunliji-Submitdate>
```

## 属性

### {data-url}

说明：{api接口地址}
必选项：{是}

### {data-type}

说明：{区分套餐还是酒店预约}
必选项：{是}
类型：{string}
取值范围：{package,hotel}

### {data-id}

说明：{如果data-type=‘package’,此属性必须有}
必选项：{否}
类型：{number}


## 注意事项
