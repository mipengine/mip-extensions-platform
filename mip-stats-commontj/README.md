# mip-stats-commontj

mip-stats-commontj 组件说明
通用的统计脚本，通过模拟图片访问的方式，往对应地址发送相应的数据
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-stats-commontj/mip-stats-commontj.js

## 示例

### 基本用法
```html
<mip-stats-commontj>
        <script type="application/json">
            {
                "hosts" : "url",
                "sendparams":{
                    "url":"https://www.baidu.com"
                }
            }
        </script>
</mip-stats-commontj>
```

## 属性

### {属性名}
hosts
说明：{传输数据地址}
必选项：{是}
类型：{字符串}
取值范围：{http://.*, https://.*}

sendparams
说明：{序列化为 & 链接的参数}
必选项：{否}
类型：{Array}

## 注意事项

