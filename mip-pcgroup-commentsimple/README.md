# mip-pcgroup-commentsimple

mip-pcgroup-commentsimple 太平洋网络网站群的评论组件通用版本，不区分各网样式，有展示、顶、回复功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-pcgroup-commentsimple/mip-pcgroup-commentsimple.js

## 示例

### 基本用法
```html

此组件回复功能依赖另外一个组件
<mip-pcgroup-user></mip-pcgroup-user>
<script src="https://c.mipcdn.com/extensions/platform/v1/mip-pcgroup-user/mip-pcgroup-user.js"></script>

<h3>电脑网评论</h3>
<mip-pcgroup-commentsimple data-site="pconline" data-cmturl="http://www.pconline.com.cn/zhizuotest/869/8692161.html" data-pagesize="10" data-title=""></mip-pcgroup-commentsimple>

<h3>汽车网评论</h3>
<mip-pcgroup-commentsimple data-site="pcauto" data-cmturl="http://www.pcauto.com.cn/nation/894/8948034.html" data-pagesize="20" data-title=""></mip-pcgroup-commentsimple>

<h3>时尚网评论</h3>
<mip-pcgroup-commentsimple data-site="pclady" data-cmturl="http://beauty.pclady.com.cn/zxzq/1104/683200.html" data-pagesize=""></mip-pcgroup-commentsimple>

<h3>亲子网评论</h3>
<mip-pcgroup-commentsimple data-site="pcbaby" data-cmturl="http://product.pcbaby.com.cn/zx/nf/dg/1703/3474146.html" data-pagesize="" data-title=""></mip-pcgroup-commentsimple>

<h3>家居网评论</h3>
<mip-pcgroup-commentsimple data-site="pchouse" data-cmturl="http://sheji.pchouse.com.cn/184/1841854.html" data-pagesize="" data-title=""></mip-pcgroup-commentsimple>
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
- 依赖组件mip-pcgroup-user：https://github.com/mipengine/mip-extensions-platform/tree/master/mip-pcgroup-user
- 组件的自定义样式是mip-comment-simple。
- 顶是不需要登录的，回复是要登录的。

