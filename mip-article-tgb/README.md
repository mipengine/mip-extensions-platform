# mip-article-tgb

     mip-article-tgb 组件说明
    帖子组件
    标题|内容
     ----|----
    类型|通用
    支持布局|responsive,fixed-height,fill,container,fixed
    所需脚本|https://c.mipcdn.com/static/v1/mip-article-tgb/mip-article-tgb.js

## 示例

### 基本用法
```html
<mip-article-tgb    topicID=‘4132546’>
       <div class="data_none"></div>
      <div class="plzan"></div>
     <div class="collectimg"></div>
     <div class="zhankai"></div>
     <div id="#gzh2"></div>
     <div class="tzitem_text"></div>
    <div class="isover"></div>
    <div class="tzitem_bot"></div>
    <div class="tzitem_hide"></div>
    <div class="collectBtn"></div>
    <div class="Mboke_username"></div>
    <div id="#addGoodFriend"></div>
    <div id="#offYZ"></div>
   <div id="#addFriendInfo"></div>
   <div id="#openArticletie"></div> 
</mip-article-tgb>
```

## 属性

###catalogID

    说明：组件id，记录20009这个标志位，当文章为此标志位时，重新发起请求，获取文章信息
    必选项：否
    类型：字符串
    取值范围：无
    单位：无
    默认值：无

###topicID

    说明：帖子id，每篇文章都对应一个唯一的id
    必选项：是
    类型：整数
    取值范围：无
    单位：无
    默认值：无

## 注意事项
    html文件里需要包含上述标签，样式可以自定义，其中帖子id必传, 特别说明openArticletie的标签用于展开过长的文章，addFriendInfo的标签用于添加好友验证
