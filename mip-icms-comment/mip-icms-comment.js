/**
 * @file mip-icms-comment 组件
 * @author 点点
 */
define(function (require) {
    var i = require('customElement').create();
    var fetch = require('fetch');
    return i.prototype.firstInviewCallback = function () {
            var i = this.element;
            var a = i.getAttribute('API') || document.location.origin + '/public/api.php';
            var u = i.getAttribute('UHOME') || document.location.origin + '/public/api.php?app=user&do=home&uid={uid}';
            var p = i.getAttribute('PUBLIC') || document.location.origin + '/public';
            var s = i.getAttribute('seccode') | '1';
            var t = i.getAttribute('type') || 'init';
            var j = i.getAttribute('aid');
            var title = i.getAttribute('title');
            var o = document.createElement('script');
            o.type = 'text/javascript';
            o.src = document.location.origin + '/public/js/iCMS.min.js?' + Math.round(new Date().getTime() / 1000);
            var r = ['iCMS.init({API:"' + a + '",\r\nUHOME:"' + u + '",\r\nPUBLIC:"' + p + '",'
            + '\r\nCOOKIE:\'iCMS\',\r\nCOMMENT:{seccode:"' + s + '"},'
            + '\r\nDIALOG:{title:\'' + title + '\'},});'].join('');
            var d = document.createElement('script');
            d.innerHTML = r;
            if (t === 'comment') {
                document.getElementsByTagName('head')[0].appendChild(o);
                fetch(a + '?app=article&do=hits&mip=1&id=' + j)
                    .then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        var params = ['"suid":"' + data.suid + '","iid":"' + data.iid + '","cid":"' + data.cid + '",'
                    + '"appid":"' + data.appid + '","title":"' + data.title + '"'].join('');
                        var q = 'var iCOMMENT=iCOMMENT||iCMS.run(\'comment\');\r\n'
                        + 'var comment_page_ajax=function(pn,a){\r\nvar pp=$(a).parent().parent();'
                        + '\r\niCOMMENT.page(pn,a,function(html){\r\nvar list=$(".comment-list-wrap",$(html)).html(),'
                        + '\r\npagenav=$(".comment-pagenav",$(html)).html();\r\n$(".comment-list-wrap",pp).html(list);'
                        + '\r\n$(".comment-pagenav",pp).html(pagenav);\r\n});\r\n}'
                        + '\r\n$(function(){var commentList=$(\'.comment-list\');'
                        + 'commentList.on(\'click\',\'[i="comment_reply"]\','
                        + 'function(event){console.log(\'asd\');event.preventDefault();'
                        + 'iCOMMENT.reply(this);}).on(\'click\','
                        + '\'[i="comment_like"]\',function(event){event.preventDefault();'
                        + 'var me=this;iCOMMENT.like(this);}).on(\'click\','
                        + '\'[i="comment_put"]\',function(event){event.preventDefault();'
                        + 'var that=$(this),param={' + params + '};'
                        + 'var _form=that.parent().parent();iCOMMENT.add(_form,param,'
                        + 'function(ret){iCOMMENT.widget(\'item\','
                        + 'function(tmpl){iCOMMENT._widget.item=tmpl});var itemp=that.parents(\'.commentApp-item\');'
                        + 'console.log(itemp);iCOMMENT.list(itemp,param.iid,ret.forward,\'after\');})})});'
                        + 'var iUSER = iCMS.run(\'user\');$(function(){var $form=$(\'.comment-form\');iUSER.STATUS({},'
                        + 'function($info){console.log($info);$(".passport",$form).hide();$(".profile",$form).show()},'
                        + 'function(f){console.log(f)});'
                        + '$(\'.cmt-cancel\').click(function(event){var pp=$(this).parent().parent();'
                        + 'pp.removeClass(\'expanded\');$(\'[i="comment_content"]\',pp).val("").focus()});'
                        + '$(\'.cmt-add\').click(function(event){event.preventDefault();var param={' + params + '};'
                        + 'iCOMMENT.add($form,param,function(ret){$(".empty",".comment-list-wrap").remove();'
                        + 'iCOMMENT.widget(\'item\',function(tmpl){iCOMMENT._widget.item=tmpl});'
                        + 'var $list=$(".comment-list-wrap");iCOMMENT.list($list,param.iid,ret.forward,\'append\')},'
                        + 'function(ret){iCMS.UI.alert(ret.msg)})})})';
                        var f = document.createElement('script');
                        f.innerHTML = q;
                        window.onload = function () {
                            document.getElementsByTagName('head')[0].appendChild(d);
                            i.appendChild(f);
                        };
                    }).catch(function (e) {});
            }
            else {
                document.getElementsByTagName('head')[0].appendChild(o);
                window.onload = function () {
                    document.getElementsByTagName('head')[0].appendChild(d);
                };
            }
        }, i;
});
