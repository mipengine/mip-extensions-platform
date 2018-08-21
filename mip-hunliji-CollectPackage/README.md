# mip-hunliji-CollectPackage

mip-hunliji-CollectPackage 收藏、取消收藏商家套餐

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hunliji-CollectPackage/mip-hunliji-CollectPackage.js

## 示例

### 基本用法
```html
<mip-hunliji-CollectPackage data-api='//api.hunliji.com/p/wedding/web/baidu/addCollection' package-id='458428' data-type='collect'>
    <span id='btn_collect'>收藏</span>
</mip-hunliji-CollectPackage>
```

## 属性

### {data-api}

说明：{接口api路径}
必选项：{是}

### {package-id}

说明：{套餐id}
必选项：{是}
类型：{number}

### {data-type}

说明：{判断收藏还是取消}
必选项：{是}
类型：{string}
取值范围：{collect是收藏,cancel取消}

## 注意事项

