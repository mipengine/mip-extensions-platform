# mip-25game-star

mip-25game-star 显示评星

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-25game-star/mip-25game-star.js

## 示例

### 基本用法
```html
<mip-25game-star total="5" sum="3" bgcolor="#cccccc" color="#1681ba" size="30px"></mip-25game-star>
```

## 属性

### {total}

说明：{总共星星数量}
必选项：{否}
类型：{数字}
取值范围：{无}
单位：{无}
默认值：{5}

### {sum}

说明：{选中星星数量}
必选项：{是}
类型：{数字}
取值范围：{小于total}
单位：{无}
默认值：{0}

### {bgcolor}

说明：{未选中星星颜色}
必选项：{否}
类型：{颜色}
取值范围：{无}
单位：{无}
默认值：{#cccccc}

### {color}

说明：{选中的星星颜色}
必选项：{是}
类型：{颜色}
取值范围：{无}
单位：{无}
默认值：{无}

### {size}

说明：{星星大小}
必选项：{是}
类型：{大小}
取值范围：{无}
单位：{无}
默认值：{无}
## 注意事项

