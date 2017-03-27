/**
 * @file 东方财富行情自有业务组件
 * @author www.eastmoney.com技术部
 */
define(function (require) {
    var common = require('./em-hqcommon');
    var module = {};
    var stockid = '3000592';
    var $ = require('zepto');
    var nodeClass = [
        {
            'key': 'market',
            'status': 0
        },
        {
            'key': 'code',
            'status': 0
        },
        {
            'key': 'name',
            'status': 0
        },
        {
            'key': 'jkj',
            'status': 3
        },
        {
            'key': 'zsj',
            'status': 1
        },
        {
            'key': 'xj',
            'status': 2
        },
        {
            'key': 'zde',
            'status': 2
        },
        {
            'key': 'zdf',
            'status': 2
        },
        {
            'key': 'hsl',
            'status': 1
        },
        {
            'key': 'zgj',
            'status': 3
        },
        {
            'key': 'zdj',
            'status': 3
        },
        {
            'key': 'cjl',
            'status': 4
        },
        {
            'key': 'cje',
            'status': 4
        },
        {
            'key': 'ztj',
            'status': 3
        },
        {
            'key': 'dtj',
            'status': 3
        },
        {
            'key': 'wp',
            'status': 6
        },
        {
            'key': 'np',
            'status': 6
        },
        {
            'key': 'lb',
            'status': 1
        },
        {
            'key': 'syl',
            'status': 1
        },
        {
            'key': 'sylj',
            'status': 1
        },
        {
            'key': 'zgb',
            'status': 4
        },
        {
            'key': 'zsz',
            'status': 4
        },
        {
            'key': 'ltgb',
            'status': 4
        },
        {
            'key': 'ltsz',
            'status': 4
        },
        {
            'key': 'sjl',
            'status': 1
        },
        {
            'key': 'mgsy',
            'status': 1
        },
        {
            'key': 'mgsysj',
            'status': 5
        },
        {
            'key': 'uptime',
            'status': 0
        },
        {
            'key': 'status',
            'status': 0
        },
        {
            'key': 'xs',
            'status': 1
        },
        {
            'key': 'jzc',
            'status': 1
        }
    ];
    var redColor = '#e30000';
    var greenColor = '#007130';
    var stockPriceTemp = '';
    var loadBasicData = function (baseData) {
        var closedPrice = baseData[4];
        var zd = baseData[6];
        $('.s_stock_name .name').html(baseData[2] + '(' + baseData[1] + ')');
        // 基本数据
        for (var i = 0; i < baseData.length; i++) {
            var nodeSetting = nodeClass[i];
            if (nodeSetting.status === 4) {
                $('.' + nodeSetting.key).html(common.getValueWithUnit(baseData[i]));
                // 成交量、额盘口里面的不需要单位
                if (nodeSetting.key === 'cje' || nodeSetting.key === 'cjl') {
                    $('.' + nodeSetting.key + '_1').html(common.getIntValue(baseData[i]));
                }
            }
            else if (nodeSetting.status === 5) {
                $('.' + nodeSetting.key).html(common.getJiduByDate(baseData[i]));
            }
            else if (nodeSetting.status === 6) {
                $('.' + nodeSetting.key).html(common.getIntValue(baseData[i]));
            }
            else if (nodeSetting.status === 2) {
                if (zd > 0) {
                    $('.' + nodeSetting.key).css('color', redColor);
                }
                else if (zd < 0) {
                    $('.' + nodeSetting.key).css('color', greenColor);
                }
                else {
                    $('.' + nodeSetting.key).css('color', '');
                }
                $('.' + nodeSetting.key).html(baseData[i]);
            }
            else if (nodeSetting.status === 3) {
                var val = baseData[i] * 1;
                if (val > closedPrice) {
                    $('.' + nodeSetting.key).css('color', redColor);
                }
                else if (val < closedPrice) {
                    $('.' + nodeSetting.key).css('color', greenColor);
                }
                else {
                    $('.' + nodeSetting.key).css('color', '');
                }
                $('.' + nodeSetting.key).html(baseData[i]);
            }
            else if (nodeSetting.status === 1) {
                if (nodeSetting.key === 'syl') {
                    var val = baseData[i] * 1;
                    if (val >= 1000) {
                        $('.' + nodeSetting.key).html(parseInt(val, 10));
                    }
                    else {
                        $('.' + nodeSetting.key).html(baseData[i]);
                    }
                }
                else {
                    $('.' + nodeSetting.key).html(baseData[i]);
                }
            }
            if (baseData[i] === '-') {
                $('.' + nodeSetting.key).css('color', '');
            }
        }
    };
    var loadHqData = function loadHqData() {
        common.jsonP('https://cooperation.eastmoney.com/hqnum.aspx?type=CT&cmd=' + stockid + '&sty=MPICT&st=z&sr=&p=&ps=&cb=?&js=([[(x)]])&token=7bc05d0d4c3c22ef9fca8c2a912d779c', function (json) {
            if (json && json[0]) {
                var benData = json[0][0].split(',');
                var baseData = [];
                for (var i = 0; i <= 31; i++) {
                    if (i === 28) {
                        continue;
                    }
                    baseData.push(benData[i]);
                }
                var closedPrice = baseData[4];
                var price = baseData[5] * 1;
                // 设置闪光动画效果 css3
                if (stockPriceTemp && price !== stockPriceTemp) {
                    $('.xj_box,.zd_box').addClass('twinkle');
                    setTimeout(function () {
                        $('.xj_box,.zd_box').removeClass('twinkle');
                    }, 2000);
                }
                stockPriceTemp = baseData[5] === '-' ? closedPrice * 1 : baseData[5] * 1;
                loadBasicData(baseData);
            }
        }, function () {
            // alert('网络不给力,请点击重新加载！');
        });
        if ($('.content_canvas').data('url')) {
            $('.content_canvas').html('<img src="' + $('.content_canvas').data('url') + '&r=' + Math.random() + '">');
        }
    };
    module.intital = function (stockcode) {
        stockid = stockcode;
        $('.content_canvas').css('height', ($(window).width() * 177 / 365));
        $('.btnRef').on('click', function () {
            location.reload();
        });
        $('.stock_nav_bar_table td').on('click', function () {
            $('.stock_nav_bar_table td').removeClass('hover');
            $(this).addClass('hover');
            var hqpic = 'https://cooperation.eastmoney.com/hqpic.aspx?id=';
            hqpic = hqpic + stockid;
            hqpic = hqpic + '&token=894050c76af8597a853f5b408b759f5d&' + $(this).data('type');
            $('.content_canvas').data('url', hqpic);
            $('.content_canvas').html('<img src="' + hqpic + '&r=' + Math.random() + '">');
        });
        loadHqData();
        var hqpic = 'https://cooperation.eastmoney.com/hqpic.aspx?id=';
        hqpic = hqpic + stockid;
        hqpic = hqpic + '&token=894050c76af8597a853f5b408b759f5d&imageType=r';
        $('.content_canvas').data('url', hqpic);
        $('.content_canvas').html('<img src="' + hqpic + '&r=' + Math.random() + '">');
        setInterval(loadHqData, 10000);
    };
    return module;
});
