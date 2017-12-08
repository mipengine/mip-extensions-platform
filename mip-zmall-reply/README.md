# mip-zmall-reply

商品详情页评论回复组件

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-zmall-reply/mip-zmall-reply.js

## 版本更新

### 1.0.3

- 解决没有mip-form 不能通过验证的问题

### 1.0.2

- 解决关闭回复弹层时的报错问题

### 1.0.1

- 解决了一些bug

## 示例

### 基本用法
```html
<mip-zmall-reply data-src="//wap.yinweida.test.zol.com/index.php?c=Shop_Ajax_Mip_MipReview&a=ReviewRely">
    <input type="hidden" value="818751" id="reviewId"/>
    <input type="hidden" value="48430716" id="tUserId"/>
    <div class="textareaDiv">
       <p>发表回复</p>
    </div>
    <div class="reply-input bottom">
        <div class="reply-input--hd">
            <span class="close"></span>
            <p class="tl">请输入回复内容</p>
        </div>
        <textarea name="" id="" rows="1" placeholder="发表回复" class="textarea"></textarea>
        <span class="reply-btn">回复</span>
    </div>
</mip-zmall-reply>
```

## 属性

### data-src

说明：回复接口      
必选项：是
类型：String
默认值：~

## 注意事项
