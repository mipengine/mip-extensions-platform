# mip-xz6-read

mip-xz6-read 小说阅读页逻辑

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-xz6-read/mip-xz6-read.js

## 示例

### 基本用法
```html
<mip-xz6-read>
  <div id="read">
    <div id="blockOverlay"></div>
    <div id="read-body">
        <h1>第一章</h1>
        <p>　　推开卧室的门，打开壁灯，接着微弱的亮光，江琛看到可可满脸泪痕的抱着骨灰盒，蜷缩在床上。当初依着可可喜欢，特意定制的两米四的双人床上，可可只占了一个角落。</p>
    </div>
    <div class="page-read-top">
      <a href="https://d.safeurl.cn/qirexiaoshuo.com/Apk/qrxs_25429202.apk" class="downApp">打开APP</a>
      <p id="chapterTitle" class="read-book-name">[!--title--]</p>
    </div>
    <div class="updown">
      <a href=''>上一章</a>
      <span class='catalink'><a href=''></a></span>
      <a href=''>返回列表</a>
    </div>
    <div class="install">
      <a href="https://d.safeurl.cn/qirexiaoshuo.com/Apk/qrxs_25429202.apk" class="btn" data-read="http://m.9kus.com/Book/content/book_id/43810/id/1753988/fr/11350/op/10066" data-apk="" data-ipa="">安装APP，阅读更多小说精彩内容！</a>
    </div>
    <div class="morebook">
      <p class="title">更多好书</p>
      <ul>
       
      </ul>
    </div>
    <div id="rs-chapter">
  <div class="title">
    <h2>[!--book.name--]章节</h2>
    <p></p>        
  </div>
  <p class="chapter-tit">正文卷</p>
  <ul id="chapter-list">

  </ul>
</div>
<div id="read-opt">
    <header id="read-head" class="head">
        <div class="sy-nav"><a href="<?=str_replace('{id}', $GLOBALS['navinfor']['bookid'], BOOK_URL)?>" class="back"></a>[!--book.name--]</div>
        <div class="operate"><a href="https://m.xz6.com/" class="gohome"></a><a href="https://m.xz6.com/e/member/cp" class="userLogin"></a><a href="javascript:" class="addBook"></a></div>
    </header>
    <div id="rs-app">
      <p class="title">离线缓存</p>
      <div class="rs-app-btn"><a href="" data-apk="[!--apk.url--]" data-ipa="[!--ipa.url--]">下载移动客户端，免费离线缓存</a></div>
    </div>    

    <footer id="read-footer">
        <div class="btn-group">
          <a href="javascript:" class="rgChapter"><span>章节</span></a>
          <a href="javascript:" class="rgAPP"><span>缓存</span></a>                    
          <a href="https://m.xz6.com/xs/<?=$GLOBALS['navinfor']['bookid']?>/#comment" class="comment"><span>评论</span></a>
        </div>
    </footer>
</div>
    <mip-down-address site=""
bookid="156367"
id="158121"
Username="ljh"
Type="0"
DateTime="2018/10/12"
ChapterId="158121"
></mip-down-address>
  </div>
</mip-xz6-read>
```



