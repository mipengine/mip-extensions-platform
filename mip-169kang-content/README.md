# mip-169kang-content

mip-169kang-content 网站异步数据加载

| 标题     | 内容                                                                               |
| -------- | ---------------------------------------------------------------------------------- |
| 类型     | 通用                                                                               |
| 支持布局 | responsive,fixed-height,fill,container,fixed                                       |
| 所需脚本 | https://mipcache.bdstatic.com/static/v1/mip-169kang-content/mip-169kang-content.js |

## 示例

### 基本用法

```html
<mip-169kang-content
    sg-id="123456"
    sg-width="20"
    sg-height="5"
    el-index="1"
    base-url="https://test.example.com/"
>
    自定义内容，可以嵌套其他组件
</mip-169kang-content>
```

## 属性

### {sg-id}

说明：{指定 id}
必选项：{是}
类型：{number|text}

### {sg-width}

说明：{指定宽度}
必选项：{是}
类型：{number|text}

### {sg-height}

说明：{指定高度}
必选项：{是}
类型：{number|text}

### {el-index}

说明：{元素唯一标识}
必选项：{是}
类型：{number|text}

### {base-url}

说明：{基础 url}
必选项：{是}
类型：{url}
