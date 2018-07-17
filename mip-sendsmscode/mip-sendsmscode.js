/**
 * @file mip-sendsmscode 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var me = this.element;
        var url = me.getAttribute('url');
        var mo;
        var btn;
        var btnText;
        var ce;
        var timer;
        var s;
        var xmlhttp = new XMLHttpRequest();

        for (var i = 0; i < me.childNodes.length; i++) {
            ce = me.childNodes[i];
            if (ce.nodeType === 1) {
                switch (ce.type) {
                    case 'tel':
                        if (!mo) {
                            mo = ce;
                        }
                        break;
                    case 'button':
                        if (!btn) {
                            btn = ce;
                        }
                        break;
                }
            }
        }

        if (btn) {
            btnText = btn.value || btn.innerHTML;
            btn.addEventListener('click', function () {
                var m = mo.value;
                if (/^1\d{10}$/.test(m)) {
                    xmlhttp.open('POST', url, true);
                    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xmlhttp.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest');
                    xmlhttp.onreadystatechange = function () {
                        var data;
                        if (xmlhttp.readyState === 4) {
                            if (xmlhttp.status === 200) {
                                try {
                                    data = JSON.parse(xmlhttp.responseText);
                                    if (data.status === 1) {
                                        s = 60;
                                        btn.value ? btn.value = '发送成功' : btn.innerHTML = '发送成功';
                                        timer = setInterval(function () {
                                            if (--s < 1) {
                                                clearInterval(timer);
                                                btnSet();
                                            } else
                                            {
                                                btnSet(btnText + '(' + s + 's)', true);
                                            }
                                        }, 1000);
                                    }
                                    else
                                    {
                                        alert('发送失败！');
                                        btnSet();
                                    }
                                }
                                catch (e) {
                                    alert('发送失败！');
                                    btnSet();
                                }
                            }
                            else {
                                alert('发送失败！');
                                btnSet();
                            }
                        }
                    };
                    xmlhttp.send(mo.name + '=' + m);
                    btnSet('发送中', true);
                } else
                {
                    alert('手机号码错误！');
                    mo.focus();
                    return false;
                }

                function btnSet(txt, disabled) {
                    var t = txt === undefined ? btnText : txt;
                    btn.value ? btn.value = t : btn.innerHTML = t;
                    btn.disabled = disabled === undefined ? false : true;
                }
            });
        }
        else {
            console.error('验证码发送组件配置错误！');
        }
    };

    return customElement;
});
