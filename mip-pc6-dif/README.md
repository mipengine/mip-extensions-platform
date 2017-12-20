# mip-pc6-dif

mip-pc6-dif 软件、手游区分

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-pc6-dif/mip-pc6-dif.js

## 示例

### 基本用法
```html
<body cid="790">
    <mip-pc6-dif>
        <h4>热门<font class="ca"></font>推荐</h4>
		<div class="dif">
            <div>安卓游戏 469</div>
            <div>安卓软件 465</div>
            <div>苹果游戏 481</div>
            <div>苹果软件 480</div>
         </div>         
    </mip-pc6-dif>
</body>
```

## 属性

### cid

说明：所属分类下的大类ID {$dcatalogid}
必选项：是
类型：数字
默认值：空 (为空的情况整块移除)

### class='ca'

说明：按ID输出软件或者手游
必选项：是

### class='dif'
说明：按ID输出对应大分类下的数据
必选项：是

