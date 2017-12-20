# mip-nszxyu-bookcase

mip-nszxyu-bookcase 主要用于jieqi小说网书架系统，包括加入书架，书签，看过的小说

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-nszxyu-bookcase/mip-nszxyu-bookcase.js <br/>https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js

## 示例

### 通过mip-nszxyu-bookcase添加最近阅读的小说
```html
<mip-nszxyu-bookcase mip-book-type="add_recent" mip-book-primary="bid">
<script id="mip-book-param" type="application/json">
{
   "bid" : 1,
   "cid" : 1,
   "book_title" : "万界至尊大领主" ,
   "chapter_title" : "第15章 送兵！送人！送粮！帝国好伯父！",
   "author"  : "亚当德里亚",
   "sort"    : "玄幻小说"
}
</script>
</mip-nszxyu-bookcase>

<mip-nszxyu-bookcase id="bookcase" mip-book-type="show_recent">
    <div mip-book-list>
        <template type="mip-mustache">
            <div>小说ID：{{bid}}</div>
            <div>小说书名：{{book_title}}</div>
            <div>最后阅读章节ID：{{cid}}</div>
            <div>最后阅读章节名：{{chapter_title}}</div>
            <div>作者：{{author}}</div>
            <div>分类：{{sort}}</div>
            <div on="tap:bookcase.remove_recent({{bid}})">删除</div>
         </template>
    </div>
    <div mip-book-empty>
        <template type="mip-mustache">
            <div>还木有任何书籍( ˙﹏˙ )</div>
        </template>
    </div>
</mip-nszxyu-bookcase>

<script src="https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js"></script>

```



