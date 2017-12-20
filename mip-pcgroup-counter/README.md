# mip-pcgroup-counter

mip-pcgroup-counter 太平洋网络通用计数器组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-pcgroup-counter/mip-pcgroup-counter.js

## 示例

### 基本用法
```html
<mip-pcgroup-counter data-channel="channel=591" data-uuid="__uuid=000047032:1.0:cms&" data-site="pcbaby" data-from="cms">
    自定义内容，不要嵌套其他组件。这部分的内容会被计数器替换掉。
</mip-pcgroup-counter>
```

## 属性

### data-channel

说明：计数器栏目id
必选项：是
类型：字符
取值范围：由各应用传递。不为空。
默认值：无

### data-from

说明：来源
必选项：否
类型：字符
取值范围：专门描述文章来源，由cms传递。可为空，文章是cms发布的，值为"cms"；非cms发布的的，值一般为空。
默认值：无

### data-uuid

说明：产品ID
必选项：否
类型：字符
取值范围：产品id或cms栏目id，由各应用传递。产品id是页面内容包含的产品对应的id，cms栏目id即为cms栏目id。可为空；不为空时包含一个以上（uuid值：权重：uuid分类）值对，其中uuid值、权重为必须项，各值对的权重相等，和为1。例："__uuid=000047032:1.0:cms&";

默认值：无

### data-site

说明：网站名称
必选项：是
类型：字符
取值范围：[pconline|pcauto|pclady|pcbaby|pchouse]
默认值：无

## 注意事项

1、为了保证计数的准确性，此组件尽量在跟在<body>之后使用。
2、cms页面注意data-from="cms"，data-uuid有<cms:uuid id=''>uuid</cms:uuid>可以获得。