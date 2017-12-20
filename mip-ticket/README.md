# mip-ticket

mip-ticket 组件说明
适用于票价的选择、票数的增加和减少
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-ticket/mip-ticket.js## 示例

### 基本用法
```html
<mip-ticket >
    <ul>
        <li class="mip-ticket-list" data-name="票价一" data-id="1233" data-price="100" data-min="1" data-max="10">
            <div>
                票价一
            </div>
            <button role="sub" class="mip-btn">减少</button><span class="mip-number">0</span><button role="add" class="mip-btn">增加</button>
        </li>
        <li class="mip-ticket-list" data-name="票价二" data-id="1234" data-price="100" data-min="1" data-max="10">
              <div>
                   票价二
               </div>
               <button role="sub" class="mip-btn">减少</button><span class="mip-number">0</span><button role="add" class="mip-btn">增加</button>
         </li>
    </ul>
    <p>
        总价：<span totalpay></span>
        名称：<span ticketname></span>
        总数：<span totalnum></span>
        票价id：<span priceid></span>
    </p>
</mip-ticket>
```

## 属性

### totalpay

说明：需要填充总价的元素
必选项：否
备注:  一个mip-ticket内只允许出现一个 totalpay

### totalnum

说明：需要填充总数量的元素
必选项：否
备注:  一个mip-ticket内只允许出现一个 totalnum

### ticketname

说明：需要填充票价名称的元素
必选项：否
备注:  一个mip-ticket内只允许出现一个 ticketname

### priceid

说明：需要填充票价id的元素
必选项：否
备注:  一个mip-ticket内只允许出现一个 priceid

### data-name

说明：票价名称
必选项：否

### data-id

说明：票价id
必选项：否

### data-price

说明：单价
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无

### data-max

说明：最大购买数量
必选项：是
类型：数字
取值范围：数值
单位：无
默认值：无

### data-min

说明：最小购买数量
必选项：是
类型：数字
取值范围：数值
单位：无
默认值：无

## 注意事项

