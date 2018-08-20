# mip-loadJS-tgb

mip-loadJS-tgb 组件说明
获取股票的当前价，涨跌幅，涨跌额信息
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-loadJS-tgb/mip-loadJS-tgb.js

## 示例

### 基本用法
```html
<div class="gupiao_zhi"  id="l_d_sz000636">
<mip-loadJS-tgb code='sz000636' code-id='l_d_sz000636' code-type='A' code-count='three'>
</mip-loadJS-tgb>
</div>
```

## 属性

###code
说明：国际通用的股票代码如sz000636
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：sh600330
###code-id
说明：父层节点的id，一般自定义前缀加上股票代码作为id
必选项：是
类型：字符串
取值范围：无
单位：无
默认值：无
###code-type
说明：股票类型，有A，H，M，AHZ，MZ五种，A是沪深股票，H是港股股票，M是美股股票，AHZ是是沪深和港股的指数，MZ是美股的指数
必选项：否
类型：字符串
取值范围：A，H，M，AHZ，MZ
单位：无
默认值：A
### code-count
说明：是获取当前价，涨跌幅，涨跌额 (three)还是获取当前价，涨跌幅(two)的标志位
必选项：否
类型：字符串
取值范围：two或three
单位：无
默认值：three
## 注意事项
默认获取sh600330股票的当前价，涨跌幅，涨跌额信息，注意所传入的股票必须要核对好股票类型，传入股票类型参数不匹配，获取到的数据会出现错误。
