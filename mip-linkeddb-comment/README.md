# mip-linkeddb-comment

mip-linkeddb-comment 评论`回复 功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-linkeddb-comment/mip-linkeddb-comment.js

## 示例

### 基本用法
```html
<link rel="stylesheet" href="https://cdn.bootcss.com/weui/1.1.2/style/weui.min.css">
<link rel="stylesheet" href="https://cdn.bootcss.com/jquery-weui/1.2.0/css/jquery-weui.min.css">
<mip-linkeddb-comment>
	<div class="review-cont top-border" data-page-type="{{pageType}}" data-page-oid="{{pageOid}}">
        <div class="write-comment bgc-fff">
            <div class="weui-cells weui-cells_form comment-cont m0">
                <div class="weui-cell pl10 pr10">
                    <div class="weui-cell__bd">
                        <textarea class="weui-textarea textarea" name="textarea" id="textarea" cols="40" rows="5" placeholder="写下你的评论..." rows="3"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/1000</div>
                    </div>
                </div>
            </div>
            <div class="footer row no-gutter pt10 pb10 pl10 pr10 clearfix">
                <a href="###" class="col-20 updata-pic color-999 float-l">
                    <span class="icon icon-pic"></span>
                    图片
                </a>
                <div class="pic-pop">
                    <div class="pic-pop-flex">
                        <!-- <img src="https://i.linkeddb.com/person2/070d/d9c3/0fe9aa40e9c3014d23fadcce.jpg" alt=""> -->
                    </div>
                    <span class="icon icon-delete"></span>
                </div>
                <div class="cancel-ok col-80 float-r">
                    <button class="ok pull-right color-fff bgc-658ccd">发表$</button>
                    <button class="cancel pull-right mr20 color-999">取消$</button>
                </div>
                <input class="comment-pic hidden" id="comment-pic0" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" name="comment-pic">
            </div>
        </div>
   
        <h4 class="review-title">
            <span class="num">暂无评论<i>  </i>条评论</span>
            <a href="###" class="pull-right write" data-login-status="-1">
                <span class="icon icon-write color-select"></span>
                写评论
            </a>
        </h4>
    
        <div class="review-item" data-comment-id="{{parent.oid}}" data-goods-num="{{parent.goods_cnt}}" data-user-id="{{parent.User.oid}}">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <img src="" alt="{{parent.User.nick_name}}" title="{{parent.User.nick_name}}" class="use-pic mr5">
                            <span class="name mr5 color-000">{{parent.User.nick_name}}</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 remove">
                        <span class="icon icon-remove"></span>
                    </a>
                
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
        
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree"></span>
                        <i>{{parent.goods_cnt}}</i>
                    </a>
                </div>
            </div>

            <div class="list-block media-list m0 ml40">
                <ul>
                    <li class="items">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <h4><span>{{parent.content|safe}}</span></h4>
                                    
                                        <div class="pics-wrap">
                                        
                                            <div class="comment-pics mr5"><img src="" title="" class="view-pic-img" data-preview-src="" data-preview-group="1"></div>
                                        
                                        </div>
                                    
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">{{parent.add_time}}</span>
                                    <!-- <a href="###" class="ml20 color-999">{$回复$}</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li class="items">
                        <div class="item-content" data-comment-id="{{child.oid}}" data-user-id="{{child.User.oid}}">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <a href="###" class="name">{{child.User.nick_name}}:</a>
                                        <h5>
                                            
                                            <a href="###" class="other-name">@{{child.call_user_name}}</a>
                                            
                                            <span>{{child.content|safe}}</span>
                                        
                                        </h5>
                                        
                                        <div class="pics-wrap">
                                            <div class="comment-pics mr5"><img src="" alt="" title="" class="view-pic-img" data-preview-src="" data-preview-group="1"></div>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">{{child.add_time}}</span>
                                
                                    <a href="###" class="ml20 color-999 child-remove">删除</a>
                                
                                    <a href="###" class="ml20 color-999 child-reply">回复</a>
                            
                                </div>
                            </div>
                        </div>
                    </li>
                
                </ul>

                <div class="more-reply border">
                    <a href="###" class="">更多条回复</a>
                </div>

            </div>
        </div>

        <!-- <div class="view-pic-wrap">
            <img class="view-pic-item" src="https://i.linkeddb.com/upload/8454/4e3e/a15db6e2b04fcc55f73d113d.jpg" alt="">
        </div> -->
        <div class="review-modal-overlay"></div>
    </div>
</mip-linkeddb-comment>
```