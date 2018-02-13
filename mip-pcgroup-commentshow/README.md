# mip-pcgroup-commentshow

mip-pcgroup-commentshow 太平洋网络网站群的评论组件，有展示、顶、回复功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-pcgroup-commentshow/mip-pcgroup-commentshow.js

## 示例

### 基本用法
```html
<h3>电脑网评论</h3>
<mip-pcgroup-commentshow data-site="pconline" data-cmturl="http://www.pconline.com.cn/zhizuotest/869/8692161.html" data-pagesize="10" data-title=""></mip-pcgroup-commentshow>

<h3>汽车网评论</h3>
<mip-pcgroup-commentshow data-site="pcauto" data-cmturl="http://www.pcauto.com.cn/nation/894/8948034.html" data-pagesize="20" data-title=""></mip-pcgroup-commentshow>

<h3>时尚网评论</h3>
<mip-pcgroup-commentshow data-site="pclady" data-cmturl="http://beauty.pclady.com.cn/zxzq/1104/683200.html" data-pagesize=""></mip-pcgroup-commentshow>

<h3>亲子网评论</h3>
<mip-pcgroup-commentshow data-site="pcbaby" data-cmturl="http://product.pcbaby.com.cn/zx/nf/dg/1703/3474146.html" data-pagesize="" data-title=""></mip-pcgroup-commentshow>

<h3>家居网评论</h3>
<mip-pcgroup-commentshow data-site="pchouse" data-cmturl="http://sheji.pchouse.com.cn/184/1841854.html" data-pagesize="" data-title=""></mip-pcgroup-commentshow>
```

## 属性

### data-site

- 说明：网站标志
- 必选项：是
- 类型：字符
- 取值范围：pconline|pcauto|pclady|pcbaby|pchouse|geeknev
- 单位：无
- 默认值：无


### data-cmturl

- 说明：评论url
- 必选项：是
- 类型：字符
- 取值范围：符合标准的url，必需是太平洋网络的网站地址
- 单位：无
- 默认值：无


### data-title

- 说明：评论标题
- 必选项：否
- 类型：字符
- 取值范围：评论标题，如果没传，后台会直接抓取页面得标题
- 单位：无
- 默认值：无


### data-pagesize

- 说明：每页读取数据数量
- 必选项：否
- 类型：数字
- 取值范围：最大值是50，大于50就返回各网的默认配置，比如30
- 单位：无
- 默认值：5


## 注意事项
- 每个组件会根据不同网给加上不同自定义样式，比如：mip-comment-pconline、mip-comment-pcauto 等等，可以通过不同自定义样式来做区分。
- 顶是不需要登录的，回复是要登录的。
