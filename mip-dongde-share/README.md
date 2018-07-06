# mip-dongde-share
mip-dongde-share 是针对mip落地页，增加主流社交平台的分享功能

标题|内容
----|----
类型|业务,定制
支持布局|responsive,flex,container
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-dongde-share/mip-dongde-share.js

## 示例

### 基本用法
```html
<mip-dongde-share share-btn-class="share-button-wrap" title-class="video-title-wrap">
    <div class="share-wrap">
        <div class="share">
            <div class="share-mask"></div>
            <div class="share-content">
                <mip-img 
                    class="share-img" src="" alt=""
                    layout="responsive" 
                    width="260" 
                    height="414">
                </mip-img>
                <span class="share-close-button">
                    <mip-img 
                        src="" alt=""
                        layout="responsive" 
                        width="28" 
                        height="28">
                    </mip-img>
                </span>
                <span class="tip">长按图片保存</span>
                <div class="share-buttons-wrap">
                    <span class="icon icon-share-wechat-moments">
                        <mip-img 
                            src="" alt=""
                            layout="responsive" 
                            width="38" 
                            height="38">
                        </mip-img>
                    </span>
                    <span class="icon icon-share-wechat">
                        <mip-img 
                            src="" alt=""
                            layout="responsive" 
                            width="38" 
                            height="38">
                        </mip-img>
                    </span>
                    <a href="" target="_blank" rel="notfollow" class="icon icon-share-qzone">
                        <mip-img 
                            src="" alt=""
                            layout="responsive" 
                            width="38" 
                            height="38">
                        </mip-img>
                    </a>
                    <a href="" target="_blank" rel="notfollow" class="icon icon-share-weibo">
                        <mip-img 
                            src="" alt=""
                            layout="responsive" 
                            width="38" 
                            height="38">
                        </mip-img>
                    </a>
                </div>
            </div>
        </div>
    </div>
</mip-dongde-share>
``` 

## 说明
       
### share-btn-class
必选：是
页面中的分享按钮的class，点击按钮弹出分享弹窗

### title-class
必选：否
提交给社交平台的当前页面的标题，会获取对应class选择器中节点class为title的节点文本内容

## 注意事项  
- 仅针对具体业务定制，不具有通用性
- 可以分享到朋友圈，微信，QQ，微博。注：微信和朋友圈分享需要用户自行保存生成的图片再分享
- 分享弹窗显示时，会给body元素添加class="not-scroll"，使背景body不能滚动
