/**
 * @file mip-lc-demo 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        $.getJSON('https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?', function (data) {
            var allData = [{
                id: 38825,
                title: '双色球 预测 0703 权5',
                simg: '',
                bimg: '',
                source: '广告',
                views: 45,
                brief: ' 新华社北京7月3日电&nbsp; 中共中央总书记、国家主席、'
                    + '中央军委主席习近平日前对上合组织青岛峰会成功举办作出重要指示指出，上合组织青岛峰会办得很成功，山东省特别是青岛市作出了很大贡献，服务保障',
                catename: ['ssq',
                    'yuce'],
                time: '2018-07-03 17:53:47'
            },
                {
                    id: 38780,
                    title: '0702 大乐透预测',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-10-1.jpg',
                    bimg: '',
                    source: '是的感受',
                    views: 64,
                    brief: '是的发达是的阿斯蒂发斯蒂芬阿萨德发阿斯蒂阿斯蒂阿萨德发阿萨德发阿萨德发阿斯蒂阿萨德发安抚',
                    catename: ['dlt',
                        'yuce'],
                    time: '2018-07-02 19:05:50'
                },
                {
                    id: 38721,
                    title: '排三预测',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-10-1.jpg',
                    bimg: '/orchard/Media/Default/2018-06-29/2018-06-29-22.jpg',
                    source: '翻翻翻翻付付付',
                    views: 65,
                    brief: '定胆参考：胆码：胆码：14、25；杀号：15、16、27、32、33。 （彩民周刊）',
                    catename: ['pl3',
                        'yuce'],
                    time: '2018-06-29 15:06:13'
                },
                {
                    id: 38781,
                    title: '0702 排三预测',
                    simg: '',
                    bimg: '/orchard/Media/Default/2018-06-29/2018-06-29-22.jpg',
                    source: '撒旦法师打发埃尔文而非飞安抚啊',
                    views: 91,
                    brief: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发'
                        + '埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而',
                    catename: ['pl3',
                        'yuce'],
                    time: '2018-07-02 19:07:45'
                },
                {
                    id: 38782,
                    title: '0702 排五预测',
                    simg: '',
                    bimg: '/orchard/Media/Default/2018-06-29/2018-06-29-10-1.jpg',
                    source: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安',
                    views: 31,
                    brief: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非'
                        + '飞安撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞',
                    catename: ['pl5',
                        'yuce'],
                    time: '2018-07-02 19:08:49'
                },
                {
                    id: 38824,
                    title: '山东11选5预测+技巧 权5',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-10-1.jpg',
                    bimg: '',
                    source: '水电费',
                    views: 41,
                    brief: '阿萨德发尬舞大飞哥阿萨德发阿伟大阿我的手法阿伟大发我水电费阿萨德发阿萨德发大发单发斯蒂芬发斯蒂芬阿斯蒂',
                    catename: ['sd11x5',
                        'yuce',
                        'jiqiao'],
                    time: '2018-07-03 17:51:18'
                },
                {
                    id: 38787,
                    title: '权重5 最新发布 小图',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-22.jpg',
                    bimg: '',
                    source: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安',
                    views: 88,
                    brief: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文'
                        + '而非飞安撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞',
                    catename: ['ah11x5',
                        'yuce'],
                    time: '2018-07-02 19:14:01'
                },
                {
                    id: 38784,
                    title: '0702日预测 第一名 小图',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-22.jpg',
                    bimg: '',
                    source: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安',
                    views: 40,
                    brief: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打'
                        + '发埃尔文而非飞安撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞',
                    catename: ['gd11x5',
                        'yuce'],
                    time: '2018-07-02 19:11:33'
                },
                {
                    id: 38786,
                    title: '0702日 无图 权重4',
                    simg: '',
                    bimg: '',
                    source: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安',
                    views: 64,
                    brief: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文'
                        + '而非飞安抚啊撒旦法师打发埃尔文而非飞安撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞',
                    catename: ['zj11x5',
                        'yuce'],
                    time: '2018-07-02 19:13:17'
                },
                {
                    id: 38785,
                    title: '0702日11选5 权重4 大图',
                    simg: '',
                    bimg: '/orchard/Media/Default/2018-06-29/2018-06-29-10-1.jpg',
                    source: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安',
                    views: 35,
                    brief: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦'
                        + '法师打发埃尔文而非飞安撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞',
                    catename: ['sd11x5',
                        'yuce'],
                    time: '2018-07-02 19:12:22'
                },
                {
                    id: 38793,
                    title: '江西快三 0702 预测，权5 最新发布',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-20.jpg',
                    bimg: '',
                    source: '水上黄昏：06 11 20 26 29+04 09',
                    views: 63,
                    brief: '水上黄昏：06 11 20 26 29+04 09水上黄昏：06 11 20 26 29+04 09水上黄昏：06 11 20 26 29+04 09 '
                        + '奇偶：近十期整体来看，奇偶近期出号波动，上期奇',
                    catename: ['jxk3',
                        'yuce'],
                    time: '2018-07-02 19:25:07'
                },
                {
                    id: 38791,
                    title: '江苏快三最新预测 0702 权5',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-22.jpg',
                    bimg: '',
                    source: '专家推荐综合一注：11 13 18 20 29 + 05 10',
                    views: 66,
                    brief: '专家推荐综合一注：11 13 18 20 29 + 05 10专家推荐综合一注：11 13 18 20 29 + 05 10专家'
                        + '推荐综合一注：11 13 18 20 29 + 05 10专家推荐综合一',
                    catename: ['jsk3',
                        'yuce'],
                    time: '2018-07-02 19:20:58'
                },
                {
                    id: 38727,
                    title: '江西快三八月预测',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-22.jpg',
                    bimg: '/orchard/Media/Default/2018-06-29/2018-06-29-10-1.jpg',
                    source: '可以哇谁让他赶紧',
                    views: 46,
                    brief: '专家推荐综合一注：11 13 18 20 29 + 05 10',
                    catename: ['jxk3',
                        'yuce'],
                    time: '2018-06-29 15:05:15'
                },
                {
                    id: 38795,
                    title: '俄罗斯快三 0702 预测中奖 权重4',
                    simg: '',
                    bimg: '',
                    source: '行”，而不再是“商户-收单机构或聚合支付服务方-A/T-发卡行”。',
                    views: 47,
                    brief: '行&rdquo;，而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo;。行&rdquo;，'
                        + '而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo',
                    catename: ['jxk3',
                        'yuce'],
                    time: '2018-07-02 19:28:33'
                },
                {
                    id: 38796,
                    title: '中国快三 0702大起底预测 ',
                    simg: '',
                    bimg: '',
                    source: '行”，而不再是“商户-收单机构或聚合支付服务方-A/T-发卡行”。',
                    views: 76,
                    brief: '行&rdquo;，而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo;。行&rdquo;，'
                        + '而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo',
                    catename: ['qhk3',
                        'yuce'],
                    time: '2018-07-02 19:29:35'
                },
                {
                    id: 38800,
                    title: '彩市大新闻，不小心就中奖 0702权5 最新',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-10-1.jpg',
                    bimg: '',
                    source: '行”，而不再是“商户-收单机构或聚合支付服务方-A/T-发卡行”。',
                    views: 75,
                    brief: '行&rdquo;，而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo;。行&rdquo;，'
                        + '而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo',
                    catename: ['zj11x5',
                        'xinwen'],
                    time: '2018-07-02 19:36:15'
                },
                {
                    id: 38798,
                    title: '彩票新闻 0702 权重5 大图',
                    simg: '',
                    bimg: '/orchard/Media/Default/2018-06-29/2018-06-29-22.jpg',
                    source: '行”，而不再是“商户-收单机构或聚合支付服务方-A/T-发卡行”。',
                    views: 51,
                    brief: '行&rdquo;，而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo;。行&rdquo;，'
                        + '而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo',
                    catename: ['sd11x5',
                        'xinwen'],
                    time: '2018-07-02 19:33:58'
                },
                {
                    id: 38729,
                    title: '彩票大新闻',
                    simg: '',
                    bimg: '',
                    source: '个水电费尴尬',
                    views: 67,
                    brief: '专家推荐综合一注：11 13 18 20 29 + 05 10',
                    catename: ['gd11x5',
                        'xinwen'],
                    time: '2018-06-29 15:09:01'
                },
                {
                    id: 38799,
                    title: '广东今报新闻 0702 权重4 ',
                    simg: '',
                    bimg: '',
                    source: '撒旦法师打发埃尔文而非飞安抚啊',
                    views: 56,
                    brief: '行&rdquo;，而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo;。行&rdquo;，'
                        + '而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo',
                    catename: ['gd11x5',
                        'xinwen'],
                    time: '2018-07-02 19:35:07'
                },
                {
                    id: 38749,
                    title: '快三新闻',
                    simg: '',
                    bimg: '',
                    source: '水电费刚',
                    views: 60,
                    brief: '按说破洞裤乐安康的两个内打开就光靠不v 阿萨德高度初步是单个我提前vs下注册拿掉后gas'
                        + '大家哈不宣传册阿斯顿发达深V萨比阿瑟提供商稍等稍等的VB按说破洞裤乐安康的两个内打开就光靠不v 阿萨德高度初步是',
                    catename: ['jsk3',
                        'xinwen'],
                    time: '2018-06-29 16:44:58'
                },
                {
                    id: 38824,
                    title: '山东11选5预测+技巧 权5',
                    simg: '/orchard/Media/Default/2018-06-29/2018-06-29-10-1.jpg',
                    bimg: '',
                    source: '水电费',
                    views: 51,
                    brief: '阿萨德发尬舞大飞哥阿萨德发阿伟大阿我的手法阿伟大发我水电费阿萨德发阿萨德发大发单发斯蒂芬发斯蒂芬阿斯蒂',
                    catename: ['sd11x5',
                        'yuce',
                        'jiqiao'],
                    time: '2018-07-03 17:51:18'
                },
                {
                    id: 38803,
                    title: '双色球技巧，500万很轻松 0702 最新权5 大图',
                    simg: '',
                    bimg: '/orchard/Media/Default/2018-06-29/2018-06-29-20.jpg',
                    source: '撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安抚啊撒旦法师打发埃尔文而非飞安',
                    views: 70,
                    brief: '行&rdquo;，而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo;。行&rdquo;，'
                        + '而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo',
                    catename: ['ssq',
                        'jiqiao'],
                    time: '2018-07-02 19:41:05'
                },
                {
                    id: 38801,
                    title: '0702日使用技巧，每日一技巧 权5 小图',
                    simg: '',
                    bimg: '/orchard/Media/Default/2018-06-29/2018-06-29-10-1.jpg',
                    source: '水上黄昏：06 11 20 26 29+04 09',
                    views: 67,
                    brief: '行&rdquo;，而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo;。行&rdquo;，而不再'
                        + '是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo',
                    catename: ['sd11x5',
                        'jiqiao'],
                    time: '2018-07-02 19:38:32'
                },
                {
                    id: 38802,
                    title: '中奖不可以少的技巧 0702 每日一题 权4',
                    simg: '',
                    bimg: '',
                    source: '专家推荐综合一注：11 13 18 20 29 + 05 10',
                    views: 86,
                    brief: '行&rdquo;，而不再是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo;。行&rdquo;，而不再'
                        + '是&ldquo;商户-收单机构或聚合支付服务方-A/T-发卡行&rdquo',
                    catename: ['gd11x5',
                        'jiqiao'],
                    time: '2018-07-02 19:39:18'
                },
                {
                    id: 38747,
                    title: '山东11选5技巧预测',
                    simg: '',
                    bimg: '',
                    source: '撒噶十多个sad',
                    views: 70,
                    brief: '近期,央行、证监会等多部门相继出台利好政策,解析当前经济形势和回应市场热点释放积极信号。与此同时,'
                        + '《证券日报》记者注意到,多方资金也已经开始入场&ldquo;抄底&rdquo;。在A股市场资金流向上,',
                    catename: ['sd11x5',
                        'jiqiao'],
                    time: '2018-06-29 16:30:15'
                }];
            var templates = require('templates');

            var arrayOne = [];
            var arrayTwo = [];
            var arrayThree = [];
            var arrayFour = [];
            var arrayFive = [];
            // 1
            for (var i = 0, length = allData.length; i < length; i++) {
                if (allData[i].brief.length > 50) {
                    allData[i].brief = allData[i].brief.slice(0, 50) + '...';
                }

                // 1
                if ((allData[i].catename.indexOf('ssq') > -1 || allData[i].catename.indexOf('dlt') > -1
                    || allData[i].catename.indexOf('pl3') > -1 || allData[i].catename.indexOf('pl5') > -1
                    || allData[i].catename.indexOf('fc3d') > -1)
                    && allData[i].catename.indexOf('yuce') > -1) {
                    arrayOne.push(allData[i]);
                }

                // 2
                var switchData = false;
                for (var j = 0, lengthj = allData[i].catename.length; j < lengthj; j++) {
                    if (allData[i].catename[j].indexOf('11x5') > -1) {
                        switchData = true;
                        break;
                    }

                }
                if (switchData && allData[i].catename.indexOf('yuce') > -1) {
                    arrayTwo.push(allData[i]);
                }

                switchData = false;
                for (var j = 0, lengthj = allData[i].catename.length; j < lengthj; j++) {
                    if (allData[i].catename[j].indexOf('k3') > -1) {
                        switchData = true;
                        break;
                    }

                }
                // 3
                if (switchData) {
                    arrayThree.push(allData[i]);
                }

                // 4
                if (allData[i].catename.indexOf('xinwen') > -1) {
                    arrayFour.push(allData[i]);
                }

                // 5
                if (allData[i].catename.indexOf('jiqiao') > -1) {
                    arrayFive.push(allData[i]);
                }

            }
            // 1
            templates.render($(element).find('#one')[0], {
                stooges: arrayOne
            }).then(function (html) {
                if (arrayOne.length > 0) {
                    $(element).find('#one').html(html);
                }
                else {
                    $(element).find('#one').html('');
                }
            });
            // 2
            templates.render($(element).find('#two')[0], {
                stooges: arrayTwo
            }).then(function (html) {
                if (arrayTwo.length > 0) {
                    $(element).find('#two').html(html);
                }
                else {
                    $(element).find('#two').html('');
                }
            });
            // 3
            templates.render($(element).find('#three')[0], {
                stooges: arrayThree
            }).then(function (html) {
                if (arrayThree.length > 0) {
                    $(element).find('#three').html(html);
                }
                else {
                    $(element).find('#three').html('');
                }
            });
            // 4
            templates.render($(element).find('#four')[0], {
                stooges: arrayFour
            }).then(function (html) {
                if (arrayFour.length > 0) {
                    $(element).find('#four').html('');
                }
                else {
                    $(element).find('#four').html('');
                }
            });
            // 5
            templates.render($(element).find('#five')[0], {
                stooges: arrayFive
            }).then(function (html) {
                if (arrayFive.length > 0) {
                    $(element).find('#five').html(html);
                }
                else {
                    $(element).find('#five').html('');
                }
            });
        });
    };
    return customElement;
});
