/**
 * @file mip-linkage-select 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var DATA = [];
        var sv = false;
        var spv = false;
        var me = this.element;
        var name = me.getAttribute('name');
        var value = me.getAttribute('value') || '';
        var validatetype = me.getAttribute('validatetype') || '';
        var validatereg = me.getAttribute('validatereg') || '';
        var validatetarget = me.getAttribute('validatetarget') || '';
        var url = me.getAttribute('url');
        var key = me.getAttribute('key') || 'id';
        var pk = me.getAttribute('parent-key') || 'parent';
        var nk = me.getAttribute('name-key') || 'name';
        var tips = me.getAttribute('tips') ? me.getAttribute('tips').split('|') : false;
        var tipsValue = me.getAttribute('tips-value') ? me.getAttribute('tips-value').split('|') : false;
        var must = me.getAttribute('must-final') === 'true';
        var html = '';
        var lsi;
        var ls1;
        var ls2;

        html = '<input  type="hidden" name="' + name + '" value="' + value + '"'
            + (validatetype ? ' validatetype="' + validatetype + '"' : '')
            + (validatereg ? ' validatereg="' + validatereg + '"' : '')
            + (validatetarget ? ' validatetarget="' + validatetarget + '"' : '')
            + '/>';
        html += '<select id="mip-' + name + '-ls-1">';
        if (tips && tips[0]) {
            html += '<option value="' + tipsValue[0] + '">' + tips[0] + '</option>';
        }
        html += '</select>';
        html += '<select id="mip-' + name + '-ls-2">';
        if (tips && tips[1]) {
            html += '<option value="' + tipsValue[1] + '">' + tips[1] + '</option>';
        }
        html += '</select>';
        me.innerHTML = html;

        lsi = me.querySelector('input[name="' + name + '"]');
        ls2 = me.querySelectorAll('select');
        ls1 = ls2[0];
        ls2 = ls2[1];

        ls1.addEventListener('change', function () {
            spv = this.value;
            sv = false;
            if (spv && DATA[spv]) {
                if (DATA[spv].count > 0) {
                    html = '';
                    if (tips && tips[1]) {
                        if (must && tipsValue && tipsValue[1]) {
                            sv = tipsValue[1];
                        }
                        html += '<option value="' + tipsValue[1] + '">' + tips[1] + '</option>';
                    }

                    for (var i in DATA[spv]['childs']) {
                        if (html === '' && sv === false) {
                            sv = i;
                        }
                        html += '<option value="' + i + '">' + DATA[spv]['childs'][i][nk] + '</option>';
                    }

                    if (sv === false) {
                        sv = spv;
                    }
                    ls2.innerHTML = html;
                    ls2.classList.remove('ls-hide');
                    lsi.value = sv;
                } else {
                    sv = spv;
                    ls2.classList.add('ls-hide');
                }
                lsi.value = sv;
            } else {
                if (must) {
                    sv = tipsValue && tipsValue[1] ? tipsValue[1] : '';
                } else {
                    sv = spv;
                }
                lsi.value = sv;
                ls2.classList.add('ls-hide');
            }
        });
        ls2.addEventListener('change', function () {
            sv = this.value;
            if ((sv === '' || sv === '0') && !must) {
                sv = spv;
            }
            lsi.value = sv;
        });

        fetch(url).then(function (res) {
            return res.text();
        }).then(function (res) {
            var res = JSON.parse(res);
            var pi;
            var ci;
            for (var i in res) {
                if (value > 0 && res[i][key] === value) {
                    if (res[i][pk] > 0) {
                        spv = res[i][pk];
                        sv = res[i][key];
                    } else {
                        spv = res[i][key];
                    }
                }
                if (res[i][pk] === '0' || res[i][pk] === '') {
                    pi = res[i][key];
                    DATA[pi] = res[i];
                    DATA[pi]['childs'] = [];
                    DATA[pi]['count'] = 0;
                    for (var j in res) {
                        if (DATA[pi][key] === res[j][pk]) {
                            ci = res[j][key];
                            DATA[pi]['childs'][ci] = res[j];
                            DATA[pi]['count']++;
                        }
                    }
                }
            }

            if (spv && sv === false) {
                if (DATA[spv]['count'] > 0) {
                    if (!must) {
                        sv = spv;
                    }
                } else {
                    sv = spv;
                    ls2.classList.add('ls-hide');
                }
            }

            html = '';
            if (tips && tips[0]) {
                if (spv === false) {
                    spv = tipsValue[0];
                }
                html += '<option value="' + tipsValue[0] + '">' + tips[0] + '</option>';
            }
            for (var i in DATA) {
                if (spv === false) {
                    spv = i;
                }
                html += '<option value="' + i + '"' + (i === sv || i === spv ? ' selected' : '') + '>'
                    + DATA[i][nk] + '</option>';
            }
            ls1.innerHTML = html;

            html = '';
            if (tips && tips[1]) {
                if (sv === false) {
                    sv = tipsValue[1];
                }
                html += '<option value="' + tipsValue[1] + '">' + tips[1] + '</option>';
            }
            if (spv && DATA[spv] && DATA[spv]['childs']) {
                for (var i in DATA[spv]['childs']) {
                    if (sv === false) {
                        sv = i;
                    }
                    html += '<option value="' + i + '"' + (i === sv ? ' selected' : '') + '>'
                        + DATA[spv]['childs'][i][nk] + '</option>';
                }
            }
            ls2.innerHTML = html;
            if (sv !== false) {
                lsi.value = sv;
            }
        });
    };

    return customElement;
});
