# mip-xz6-down

mip-xz6-down 小说落地页逻辑

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/static/v1/mip-xz6-down/mip-xz6-down.js

## 示例

### 基本用法
```html
<mip-xz6-down>
  <mip-vd-tabs>
  <nav id="tab"><span>小说简介</span><span>在线阅读</span><span>评论</span></nav>
  <div>
  <section class="wrap" id="rIntro">
      <div class="tags">
      </div>
      <mip-down-hideshow hsId="2">
        <div id="summary" class="summary">简略内容<span class="summary-more"></span></div>
        <div id="details" class="content">
          <p>详细内容</p>
        </div>
      </mip-down-hideshow>
  </section>
  </div>
  <div id="cpyd"></div><!--不可删，阅读-->
  <div id="cppl"></div><!--不可删，评论-->
  </mip-vd-tabs>
  <section class="wrap" id="bookCata">
    <div class="hd">
        <h3>免费章节在线阅读</h3>
    </div>
    <ul id="chapter-list">
     <li><a href="">第一章 一章</a></li>
     <li><a href="">第二章 二章</a></li>
     <li><a href="">第三章 三章</a></li>
     <li><a href="">第四章 四章</a></li>
     <li><a href="">第五章 五章</a></li>
  </ul>
      <p id="moer-chapter"><a href="">查看全部目录</a></p>
  </section>
  <section class="wrap tbsm">
      <div class="hd">
          <h3>版权说明</h3>
      </div>
      <div class="keyText">
      </div>
  </section>
  <section class="wrap module tzz">
    <div class="hd">
        <h3>作者其他作品</h3>
    </div>
    <div class="scroll">
        <ul>
        </ul>
    </div>
  </section>
  <mip-down-comment>
    <section  class="wrap" id="comment">
        <div class="hd">
            <h3>网友评论</h3>
        </div>
    </section>
  </mip-down-comment>
</mip-xz6-down>
```



