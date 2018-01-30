# mip-sn-shop-list

mip-sn-shop-list 实现了自定义实现了sn获取接口数据后，渲染列表数据的功能

标题|内容
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-sn-shop-list/mip-sn-shop-list.js

## 示例

### 基本用法

```html
<div class="list-data wonder-activity">
    <ul>
        <mip-sn-shop-list id="list" template="shop-list" preLoad pnName="pageNum" pn=1 src="//mois.suning.com/activityStore/storeContent/?-activityListInfoCallback.html">
            <template id="shop-list" type="mip-mustache">
            <li>
                {{activePicUrl}}
            </li>
            </template>
        </mip-sn-shop-list>
    </ul>
</div>
```


## 属性

### src

说明：异步请求的数据接口，如果没有其他参数结尾请不要带 ？
必选项：否
类型：字符串
取值范围：必须是https的
单位：无
默认值：无

## 注意事项  

1、接口格式参考：https://mois.suning.com/activityStore/storeContent/8727-activityListInfoCallback.html
