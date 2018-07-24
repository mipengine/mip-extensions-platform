# mip-otto-rem

mip-otto-rem 本 rem 以 iphone 6： 375 宽, 750 设计稿, 1rem = 20px

| 标题     | 内容                                                        |
| -------- | ----------------------------------------------------------- |
| 类型     | 通用                                                        |
| 支持布局 | responsive,fixed-height,fill,container,fixed                |
| 所需脚本 | https://c.mipcdn.com/static/v1/mip-otto-rem/mip-otto-rem.js |

## 示例

### 基本用法

```html
<mip-otto-rem baseWidth="750" baseFont="20">
    自定义内容，可以嵌套其他组件
</mip-otto-rem>
```

## 属性

### baseWidth

说明：UI 设计稿的宽度
必选项：否
类型：数字
取值范围：任意数值，320-750 最佳
单位：px
默认值：750

### baseFont

说明：iPhone6 下 1rem 代表的宽度
必选项：否
类型：数字
取值范围：任意数值，20-40 最佳
单位：px
默认值：20

## 注意事项

1.  本插件可作为通用插件使用
