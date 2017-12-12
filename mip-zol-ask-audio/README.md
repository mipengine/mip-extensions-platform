# mip-zol-ask-audio

评论发布模块

标题|内容
----|----
类型|业务
支持布局|N,S|
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-zol-ask-audio/mip-zol-ask-audio.js

## 示例

### 基本用法
```html
<mip-zol-ask-audio data-data='{}' class="autio-list__audio-detail" data-askid="11058" data-replyid="9506">
    <mip-link href="http://wap.zol.com.cn/ask/pay_1249_2692.html" class="audio mip-ask-audio-link">
        <em class="blue-gradient mip-ask-audio-btn listen"><span>1元听答案</span></em>
        <b>99"</b>
    </mip-link>
</mip-zol-ask-audio>
```

## 属性

### data-data
说明：音频数据（如果有此属性，则无需下面两条属性）
必选项：否
类型：json对象

### data-askid
说明：问题id
必选项：否
类型：数字

### data-replyid
说明：回答id
必选项：否
类型：数字