/**
 * @file mip-linkeddb-relation 组件
 * @author
 */
// import { Base64 } from './base64js.min';

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var d3 = require('./d3.min');
    // var Base64 = require('./base64.min');
    var MakeSvgPicClass = require('./d3-rolesMap.min').MakeSvgPicClass;

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {


        function Base64() {
            // private property
            this._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        }
        //  public method for encoding
        Base64.prototype.encode = function (input) {
            var output = '';
            var chr1;
            var chr2;
            var chr3;
            var enc1;
            var enc2;
            var enc3;
            var enc4;
            var i = 0;
            input = this.utf8encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output
                    + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2)
                    + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        };

        // public method for decoding
        Base64.prototype.decode = function (input) {
            var output = '';
            var chr1;
            var chr2;
            var chr3;
            var enc1;
            var enc2;
            var enc3;
            var enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = this.utf8decode(output);
            return output;
        };

        // private method for UTF-8 encoding
        Base64.prototype.utf8encode = function (string) {
            string = string.replace(/\r\n/g, '\n');
            var utftext = '';
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        };

        // private method for UTF-8 decoding
        Base64.prototype.utf8decode = function (utftext) {
            var string = '';
            var i = 0;
            var c = 0;
            var c1 = 0;
            var c2 = 0;
            var c3 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        };
        var base64 = new Base64();
        var graph = $(this.element).find('#roleMap').data('graph');
        if (graph) {
            var rolesData = JSON.parse(base64.decode(graph));
            var configs = {
                nodes: rolesData.nodes,
                links: rolesData.links,
                width: $(this.element).find('#roleMap').width(),
                height: $(this.element).find('#roleMap').height()
            };
            new MakeSvgPicClass('roleMap', configs);
        }
    };
    return customElement;
});