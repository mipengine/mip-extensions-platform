# mip-jia-design

百度提单页订单组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-design/mip-jia-design.js

## 示例

### 基本用法
```html
<mip-jia-design>
    <script type="application/json">
        {
            "params":{
                "user_id":"#userId",
                "desired_designer_ids":"#designId",
                "phone":"#mobile",
                "area":"#area",
                "city":".zx-input",
                "is_free":"#designPay",
                "time":"#time",
                "username":"#username",
                "attention":"#ruleCheck"
            },
            "request":{
                "url":"//test.m.jia.com/zuimei/reservation/baidu/submit",
                "skipto":"//test.m.jia.com/zx/baidu/design_success?attention=$#ruleCheck$"
            },
            "button":".form-btn",
            "loginbtn":".no-login"
        }
    </script>
</mip-jia-design>
```

## 属性

### {params}

说明：{接口参数}
必选项：{是}
类型：{Object}

### {request}

说明：{请求参数}
必选项：{是}
类型：{Object}


## 注意事项

