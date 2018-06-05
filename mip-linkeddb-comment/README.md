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
	 <div class="review-cont top-border" id="reviewWrap" data-page-type="movie_intro" data-page-oid="o6DHgqn5Bg">
        <div class="write-comment bgc-fff">
            <div class="weui-cells weui-cells_form comment-cont m0">
                <div class="weui-cell pl10 pr10">
                    <div class="weui-cell__bd">
                        <mip-form url="http://">
                            <textarea class="weui-textarea textarea" name="textarea" id="textarea" cols="40" rows="5" placeholder="写下你的评论..." rows="3"></textarea>
                        </mip-form>
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
                    <button class="ok pull-right color-fff bgc-658ccd">发表</button>
                    <button class="cancel pull-right mr20 color-999">取消</button>
                </div>
                <mip-form url="http://" class="pic-input">
                    <input class="comment-pic hidden" id="comment-pic0" type="file" accept="image/*" name="comment-pic">
                </mip-form>
            </div>
        </div>
        
        <h4 class="review-title">
            <span class="num"><i>10</i>条评论</span>
            <a href="###" class="pull-right write" data-login-status="-1">
                <span class="icon icon-write color-select"></span>
                写评论
            </a>
        </h4>
        
        <div class="review-item" data-comment-id="Bof8zRdeC6" data-goods-num="2" data-user-id="7rCjjCk5zf">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="http://tva4.sinaimg.cn/crop.0.0.480.480.50/e2d35facjw8eflvyx5lmlj20dc0dcwem.jpg" alt="放飞斌梦想" title="放飞斌梦想" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">放飞斌梦想</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree full"></span>
                        <i class="num">2</i>
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
                                        <h4><span>235423452354234</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-25 02:33</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    <li class="items">
                        <div class="item-content" data-comment-id="P6ngLX4FBJ" data-user-id="c5NgPD3pWb">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <a href="###" class="name">90后小青年:</a>
                                        <h5>
                                            
                                            
                                            <span>123123123123123123</span>
                                            
                                        </h5>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-28 03:00</span>
                                    
                                    <a href="###" class="ml20 color-999 child-remove">删除</a>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li class="items">
                        <div class="item-content" data-comment-id="sWQ4bYgUrY" data-user-id="c5NgPD3pWb">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <a href="###" class="name">90后小青年:</a>
                                        <h5>
                                            
                                            
                                            <span>asdfghjkl</span>
                                            
                                        </h5>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-28 03:08</span>
                                    
                                    <a href="###" class="ml20 color-999 child-remove">删除</a>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <li class="items">
                        <div class="item-content" data-comment-id="nu5wazXPs5" data-user-id="c5NgPD3pWb">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <a href="###" class="name">90后小青年:</a>
                                        <h5>
                                            
                                            
                                            <span>123123123</span>
                                            
                                        </h5>
                                        
                                        <div class="pics-wrap">
                                            <div class="comment-pics mr5"><mip-img src="https://i.linkeddb.com/upload/8877/7b3e/0371df174bff834379bdf862.jpg?x-oss-process=image/resize,m_fill,w_144,h_144" alt="" title="" class="view-pic-img" data-preview-src="" data-preview-group="1"></mip-img></div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-28 03:08</span>
                                    
                                    <a href="###" class="ml20 color-999 child-remove">删除</a>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                </ul>
                
                <!-- <div class="more-reply border">
                    <a href="###" class="">更多1条回复</a>
                </div> -->
                <a href="###" class="view-more-reply external border bgc-eee">
                    <!--<span class="icon icon-down"></span>-->
                    <span class="text" data-down="更多1条回复" data-up="收起">更多1条回复</span>
                </a>
                
            </div>
        </div>
        
        <div class="review-item" data-comment-id="LMbmiKzvEu" data-goods-num="1" data-user-id="7rCjjCk5zf">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="http://tva4.sinaimg.cn/crop.0.0.480.480.50/e2d35facjw8eflvyx5lmlj20dc0dcwem.jpg" alt="放飞斌梦想" title="放飞斌梦想" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">放飞斌梦想</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree "></span>
                        <i class="num">1</i>
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
                                        <h4><span>2354234523542354</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-25 02:32</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    
                </ul>
                
            </div>
        </div>
        
        <div class="review-item" data-comment-id="XRQwSw9DT5" data-goods-num="2" data-user-id="7rCjjCk5zf">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="http://tva4.sinaimg.cn/crop.0.0.480.480.50/e2d35facjw8eflvyx5lmlj20dc0dcwem.jpg" alt="放飞斌梦想" title="放飞斌梦想" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">放飞斌梦想</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree full"></span>
                        <i class="num">2</i>
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
                                        <h4><span>234234523452354</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-25 02:32</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    
                </ul>
                
            </div>
        </div>
        
        <div class="review-item" data-comment-id="GU3d8TGrHr" data-goods-num="6" data-user-id="56teXcqjuF">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="http://thirdqq.qlogo.cn/qqapp/101477236/0383347A2D533F7AA37C30714FED73A0/40" alt="啊" title="啊" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">啊</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree full"></span>
                        <i class="num">6</i>
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
                                        <h4><span>    #缓存池，缓存池最大大小20m
    ssl_session_cache shared:SSL:20m;
    #缓存时间
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #ssl_ciphers !kEDH:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-17 07:33</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    <li class="items">
                        <div class="item-content" data-comment-id="NUWFJf8tXk" data-user-id="c5NgPD3pWb">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <a href="###" class="name">90后小青年:</a>
                                        <h5>
                                            
                                            
                                            <span>1235456</span>
                                            
                                        </h5>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-18 09:54</span>
                                    
                                    <a href="###" class="ml20 color-999 child-remove">删除</a>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                </ul>
                
            </div>
        </div>
        
        <div class="review-item" data-comment-id="LTXBvkgtp9" data-goods-num="13" data-user-id="g7CrR4emgC">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJw0KdsTHfIWueghqkM9iawI1ufqSomLLHVEn9qickeACRn6Nyaom2soqjOH3IicKqmrCzFRSWSRNVxA/132" alt="一切从春天开始" title="一切从春天开始" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">一切从春天开始</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree full"></span>
                        <i class="num">13</i>
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
                                        <h4><span>6666</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-14 07:01</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    
                </ul>
                
            </div>
        </div>
        
        <div class="review-item" data-comment-id="bQtiRqeXBM" data-goods-num="3" data-user-id="UvpCiDKKxM">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="http://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJw0KdsTHfIWueghqkM9iawI1ufqSomLLHVEn9qickeACRn6Nyaom2soqjOH3IicKqmrCzFRSWSRNVxA/132" alt="qwert" title="qwert" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">qwert</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree full"></span>
                        <i class="num">3</i>
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
                                        <h4><span>0000</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-14 06:57</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    <li class="items">
                        <div class="item-content" data-comment-id="fWWEzDF67a" data-user-id="g7CrR4emgC">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <a href="###" class="name">一切从春天开始:</a>
                                        <h5>
                                            
                                            
                                            <span>.....
00000</span>
                                            
                                        </h5>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-14 07:00</span>
                                    
                                    <a href="###" class="ml20 color-999 child-reply">回复</a>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                </ul>
                
            </div>
        </div>
        
        <div class="review-item" data-comment-id="Aa6MNB6Tzj" data-goods-num="1" data-user-id="7rCjjCk5zf">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="http://tva4.sinaimg.cn/crop.0.0.480.480.50/e2d35facjw8eflvyx5lmlj20dc0dcwem.jpg" alt="放飞斌梦想" title="放飞斌梦想" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">放飞斌梦想</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree full"></span>
                        <i class="num">1</i>
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
                                        <h4><span>11111</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-14 06:49</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    
                </ul>
                
            </div>
        </div>
        
        <div class="review-item" data-comment-id="Hko4w8QRPP" data-goods-num="1" data-user-id="s98s9">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="https://static.linkeddb.com/m/images/user-avatar.png" alt="17******385" title="17******385" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">17******385</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree full"></span>
                        <i class="num">1</i>
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
                                        <h4><span>test1234</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-14 06:39</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    
                </ul>
                
            </div>
        </div>
        
        <div class="review-item" data-comment-id="6TUAfGt7E8" data-goods-num="2" data-user-id="s98s9">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="https://static.linkeddb.com/m/images/user-avatar.png" alt="17******385" title="17******385" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">17******385</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree full"></span>
                        <i class="num">2</i>
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
                                        <h4><span>**abcd**aa**</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-11 06:16</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    
                </ul>
                
            </div>
        </div>
        
        <div class="review-item" data-comment-id="PMgjshgb5k" data-goods-num="3" data-user-id="s98s9">
            <div class="items-title clearfix">
                <div class="use pull-left">
                    <div class="clearfix use-msg">
                        <a href="###">
                            <mip-img src="https://static.linkeddb.com/m/images/user-avatar.png" alt="17******385" title="17******385" class="use-pic mr5"></mip-img>
                            <span class="name mr5 color-000">17******385</span>
                        </a>
                    </div>
                </div>
                <div class="reply-icon pull-right">
                    
                    <a href="###" class="mr20 reply">
                        <span class="icon icon-comment"></span>
                    </a>
                    
                    <a href="###" class="mr5 color-999 agree">
                        <span class="icon icon-agree full"></span>
                        <i class="num">3</i>
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
                                        <h4><span>**qqacd**Qqxxx李华**qQ</span></h4>
                                        
                                        <div class="pics-wrap">
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="item-text">
                                    <span class="time color-999">2018-05-11 06:11</span>
                                    <!-- <a href="###" class="ml20 color-999">回复</a> -->
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    
                    
                </ul>
                
            </div>
        </div>
        
        
        <div class="review-modal-overlay"></div>
    </div>
</mip-linkeddb-comment>
```