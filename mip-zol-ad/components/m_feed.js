/**
 * @file m站信息流广告
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    var config = require('../config');
    function MFeed(adBar) {
        this.adBar = adBar;
    }
    MFeed.prototype.create = function (util) {
        var li;
        var fodder = this.adBar.conf;
        function create() {
            var a;
            var li;
            var liClass;
            liClass = fodder.type === 'pics' ? 'pics' : (fodder.type === 'big_pic' ? 'pic-showcase' : '');
            li = util.dom.createElement('li', {
                class: liClass
            });
            a = util.dom.createElement('a', {
                href: fodder.click_url
            });
            a.appendChild(createFigure(fodder.src));
            if (fodder.type === 'pics') {
                a.appendChild(createFigure(fodder.src_2));
                a.appendChild(createFigure(fodder.src_3));
            }
            a.appendChild(createDiv(fodder));
            li.appendChild(a);
            return li;
        }
        function createFigure(src) {
            var img;
            var figure;
            figure = util.dom.createElement('figure', {
                class: 'pic flex-pic'
            }, {
                'background-image': 'url(' + src + ')'
            });
            img = util.dom.createElement('img', {
                src: src
            });
            figure.appendChild(img);
            return figure;
        }
        function createDiv() {
            var h3;
            var div;
            div = util.dom.createElement('div', {
                class: 'detail-text'
            });
            h3 = util.dom.createElement('h3', {
                class: 'title',
                title: fodder.title
            });
            h3.innerHTML = fodder.title;
            div.appendChild(h3);
            div.appendChild(createP(fodder));
            return div;
        }
        function createP() {
            var p;
            var adTag;
            var brand;
            p = util.dom.createElement('p', {
                class: 'tags'
            });
            adTag = util.dom.createElement('span');
            brand = util.dom.createElement('span');
            adTag.innerHTML = config.adWord;
            brand.innerHTML = fodder.factory;
            p.appendChild(adTag);
            p.appendChild(brand);
            return p;
        }
        li = create();
        return {elements: [li], height: fodder.height, appendAfterFn: function () {
            util.ad.zolImpTrack(li, this.adBar);
            util.ad.zolClkTrack(li, this.adBar);
        }};
    };
    module.exports = MFeed;
});
