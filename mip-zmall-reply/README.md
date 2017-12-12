# mip-zmall-reply

商品详情页评论回复组件

标题|内容
----|----
类型|业务组件
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-zmall-reply/mip-zmall-reply.js

## 版本更新

### 1.1.0

- 改为独立层弹出，主要解决因 不能自己写fixed元素，而用mip-fixed导致的问题，实现逻辑变了

### 1.0.3

- 解决没有mip-form 不能通过验证的问题

### 1.0.2

- 解决关闭回复弹层时的报错问题

### 1.0.1

- 解决了一些bug

## 示例

### 基本用法
```html
<mip-fixed type="bottom">
    <div on="click:reply.show" class="">
        <p>发表回复</p>
    </div>
</mip-fixed>
<mip-fixed type="top" zmall-fixed-id="reply" class="mip-zmall-reply-fixed">
    <div class="reply-input-box">
        <div class="reply-input--hd">
            <span class="close"></span>
            <p class="tl">请输入回复内容</p>
        </div>
        <mip-form url="path/to/submit"><textarea name="replyCon" rows="1" placeholder="发表回复" class="textarea"></textarea></mip-form>
        <span class="reply-btn">回复</span>
    </div>
</mip-fixed>

<!-- 输入 -->
<mip-zmall-reply data-review-id="" data-user-id="" data-src="path/to/api" data-trigger="click:reply.show" data-target="reply"></mip-zmall-reply>

```

## 属性

### data-src

说明：回复接口       
必选项：是           
类型：String    
默认值：~   

### data-trigger

说明：触发按钮      
必选项：是
类型：String
默认值：~    

### data-target

说明：触发面板           
必选项：是
类型：String
默认值：~

## 注意事项
