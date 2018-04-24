# mip-linktion-fix-rightnav

mip-linktion-fix-rightnav 页面右下角固定导航并用ajax提交反馈数据

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linktion-fix-rightnav/mip-linktion-fix-rightnav.js

## 示例


```html
<mip-linktion-fix-rightnav>
    <div class="fixed-nav clearfix">
        <ul class="nav-ul">
          <li class="list-li" id="list-service">
            <mip-img src="../img/icon/service.png" class="nav-icon"></mip-img>
            <div class="erweima-service">
              <div class="box-head">
                <p>联系客服</p>
              </div>
              <div class="box-info">
                <mip-img src="../img/indent.png"></mip-img>
                <ol class="list-ol">
                  <li>打开微信 ></li>
                  <li>发现 ></li>
                  <li>扫一扫</li>
                </ol>
                <p class="box-txt">添加客服微信</p>
              </div>
            </div>
          </li>
          <li class="list-li" id="erweima-reply">
            <mip-img src="../img/icon/tickling.png" class="nav-icon"></mip-img>
            <div class="erweima-reply">
              <div class="box-head">
                <p>反馈意见</p>
                <button type="button" id="reply-hidden">&times;</button>
              </div>
              <div class="box-info retroaction-form">
                <textarea placeholder="告诉我们你的建议或遇到的问题" class="info-textarea"></textarea>
                <button type="button" class="info-submit" data-src="http://www.caifu.org/feedback/addFeedback">提交</button>
              </div>
            </div>
          </li>
          <li class="list-li" id="list-top"><mip-img src="../img/icon/top.png" class="nav-icon nav-icon-stack"></mip-img><p class="stack-txt">top</p></li>
        </ul>
      </div>
</mip-linktion-fix-rightnav>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

