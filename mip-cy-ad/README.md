# mip-cy-ad

`<mip-cy-ad>` 用于在 MIP 页中引入春雨自营广告位, 即A区广告位。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-cy-ad/mip-cy-ad.js

## 示例

只需要一个`<mip-cy-ad>`标签，无须其他填充dom

### 基本用法

```html
<mip-cy-ad
    url='http://a.app.qq.com/o/simple.jsp?pkgname=me.chunyu.ChunyuDoctor&medweb_url_type=seo_mip_qa_top_banner'
    bg-url='https://media2.chunyuyisheng.com/@/media/images/2018/03/12/7cc5/fc8cf3c4f17b_w1242_h50_.jpg'
></mip-cy-ad>
```

## 属性

### url

说明：广告点击跳转url
必选项：是,[如没有则不展示广告位]
类型：字符串
取值范围：链接类型
单位：无
默认值：无

### doc-image

说明：医生图像
必选项：否
类型：字符串
取值范围：链接类型
单位：无
默认值：无

### doc-info

说明：医生信息
必选项：否
类型：字符串
取值范围：无
单位：无
默认值：无

### bg-url

说明：背景图片
必选项：否
类型：字符串
取值范围：链接类型
单位：无
默认值：空

## 注意事项

春雨广告位除url必填外, 还必须填写bg-url或doc-*中的至少一个属性; 此外, 填写doc-*属性指doc-image和doc-info属性都填写。
