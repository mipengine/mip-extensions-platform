/**
 * @file mip-qbb-base64 base64转码
 * @author yml
 */

define(function (require) {
    var customElement = require('customElement').create();
    var base64 = {
        base64EncodeChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        base64DecodeChars: [-1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1,
            62, -1, -1, -1, 63, 52, 53, 54, 55,
            56, 57, 58, 59, 60, 61, -1, -1, -1,
            -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6,
            7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
            17, 18, 19, 20, 21, 22, 23, 24, 25,
            -1, -1, -1, -1, -1, -1, 26, 27, 28,
            29, 30, 31, 32, 33, 34, 35, 36, 37,
            38, 39, 40, 41, 42, 43, 44, 45, 46,
            47, 48, 49, 50, 51, -1, -1, -1, -1, -1],

        // base64编码
        base64encode: function (str) {
            var that = this;
            var out;
            var i;
            var len;
            var c1;
            var c2;
            var c3;
            len = str.length;
            i = 0;
            out = '';
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i === len) {
                    out += that.base64EncodeChars.charAt(c1 >> 2);
                    out += that.base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += '==';
                    break;
                }

                c2 = str.charCodeAt(i++);
                if (i === len) {
                    out += that.base64EncodeChars.charAt(c1 >> 2);
                    out += that.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += that.base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += '=';
                    break;
                }

                c3 = str.charCodeAt(i++);
                out += that.base64EncodeChars.charAt(c1 >> 2);
                out += that.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += that.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += that.base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        },

        // base64解码
        base64decode: function (str) {
            var that = this;
            var c1;
            var c2;
            var c3;
            var c4;
            var i;
            var len;
            var out;
            len = str.length;
            i = 0;
            out = '';
            while (i < len) {

                // c1
                do {
                    c1 = that.base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 === -1);
                if (c1 === -1) {
                    break;
                }

                // c2
                do {
                    c2 = that.base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 === -1);
                if (c2 === -1) {
                    break;
                }

                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                // c3
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 === 61) {
                        return out;
                    }

                    c3 = that.base64DecodeChars[c3];
                } while (i < len && c3 === -1);
                if (c3 === -1) {
                    break;
                }

                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

                // c4
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 === 61) {
                        return out;
                    }

                    c4 = that.base64DecodeChars[c4];
                } while (i < len && c4 === -1);
                if (c4 === -1) {
                    break;
                }

                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        },

        // utf16转utf8
        utf16to8: function (str) {
            var out;
            var i;
            var len;
            var c;
            out = '';
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                }
                else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
                else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        },

        // utf8转utf16
        utf8to16: function (str) {
            var out;
            var i;
            var len;
            var c;
            var char2;
            var char3;
            out = '';
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        out += str.charAt(i - 1);
                        break;
                    case 12:
                    case 13:
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0F) << 12)
                            | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        }
    };

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var type = element.getAttribute('type');
        if (type === 'utf8to16') {
            base64.utf8to16();
        }
        else if (type === 'base64decode') {
            base64.base64decode();
        }
        else if (type === 'utf16to8') {
            base64.utf16to8();
        }
        else {
            base64.base64encode();
        }

    };

    return customElement;
});
