# mip-jia-footertl

mip-jia-footertl 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-footertl/mip-jia-footertl.js

## 示例

### 基本用法
```html
<mip-jia-footertl>
    <script type="application/json">
        {
            "username":["mip设计","mip报价","mip免息贷","mip全景"],
            "code":"nocode",
            "source":"m-mip",
            "ele":".fixed-footer-box .item",
            "self_url":"//m.jia.com/zixun/article/515903.html",
            "skipto":["https://m.jia.com/zixun/wanshanxinxi?type=app","https://m.jia.com/newzx/yusuan_success","https://m.jia.com/zx/freesheji/buquan/","https://m.jia.com/zx/sub/vr_jike_step2.html"]
        }
    </script>
</mip-jia-footertl>
```

## 属性

### {username}

说明：{用户名}
必选项：{是}
类型：{string}
默认值：{mip裝修}

### {code}

必选项：{否}
类型：{string}

### {source}

说明：{来源}
必选项：{否}
类型：{string}

### {ele}

说明：{show出弹层元素}
必选项：{否}
类型：{string}

### {self_url}

说明：{url}
必选项：{否}
类型：{string}

## 注意事项

