# mip-pcgroup-zancai

mip-pcgroup-zancai 太平洋网络文章踩赞组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-pcgroup-zancai/mip-pcgroup-zancai.js


## 示例

### 基本用法
```html
<h2>电脑网</h2>
<mip-pcgroup-zancai data-site="pconline" data-articleId="10937446"></mip-pcgroup-zancai>
<mip-pcgroup-zancai data-site="pconline" data-articleId="10944845"></mip-pcgroup-zancai>
<mip-pcgroup-zancai data-site="pconline" data-articleId="10951325"></mip-pcgroup-zancai>

<h2>汽车网</h2>
<mip-pcgroup-zancai data-site="pcauto" data-articleId="11621227"></mip-pcgroup-zancai>

<h2>时尚网</h2>
<mip-pcgroup-zancai data-site="pclady" data-articleId="1807189"></mip-pcgroup-zancai>

<h2>亲子网</h2>
<mip-pcgroup-zancai data-site="pcbaby" data-articleId="4066348"></mip-pcgroup-zancai>

<h2>家居网</h2>
<mip-pcgroup-zancai data-site="pchouse" data-articleId="2141521"></mip-pcgroup-zancai>

<h2>极电网</h2>
<mip-pcgroup-zancai data-site="geeknev" data-articleId="2615667"></mip-pcgroup-zancai>
```

## 属性

### data-site

说明：网站标志   
必选项：是   
类型：字符   
取值范围：pconline|pcauto|pclady|pcbaby|pchouse|geeknev   
单位：无   
默认值：无   


### data-articleId

说明：文章id   
必选项：是   
类型：字符   
取值范围：各网文章id   
单位：无   
默认值：无   

## 注意事项
data-site和data-articleId必需要有，而且不能调乱，比如pconline的网站，填了pcauto的文章id

